<?php

namespace App\Controller;

use App\Entity\FormTemplate;
use App\Repository\FormTemplateRepository;
use App\Entity\FormField;
use App\Repository\FormFieldRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[Route('/api/form-templates', name: 'api_forms_')]
class FormTemplateController extends AbstractController
{
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $formTemplate = new FormTemplate();
        $formTemplate->setName($data['name'] ?? '');
        $formTemplate->setDescription($data['description'] ?? null);
        $formTemplate->setUser($this->getUser());

        $errors = $validator->validate($formTemplate);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        if (!empty($data['fields']) && is_array($data['fields'])) {
            foreach ($data['fields'] as $fieldData) {
                $field = new FormField();
                $field->setLabel($fieldData['label'] ?? '');
                $field->setType($fieldData['type'] ?? '');
                $field->setIsRequired($fieldData['isRequired'] ?? false);
                $field->setOptions($fieldData['options'] ?? null);
                $field->setFormTemplate($formTemplate);
                $em->persist($field);
            }
        }

        $em->persist($formTemplate);
        $em->flush();

        $frontendUrl = $_ENV['FRONTEND_URL'] ?? 'http://localhost:3000';
        $formTemplate->setLink($frontendUrl . '/public-form/' . $formTemplate->getId());

        $em->flush();

        return $this->json([
            'message' => 'Form Template created successfully',
            'id' => $formTemplate->getId(),
            'link' => $formTemplate->getLink(),
        ], 201);
    }

    #[Route('', methods: ['GET'])]
    public function getAll(FormTemplateRepository $repository): JsonResponse
    {
        $forms = $repository->findBy(['user' => $this->getUser()]);

        $data = array_map(function (FormTemplate $form) {
            return [
                'id' => $form->getId(),
                'name' => $form->getName(),
                'description' => $form->getDescription(),
                'link' => $form->getLink(),
                'user' => [
                    'id' => $form->getUser()->getId(),
                    'username' => $form->getUser()->getUsername(),
                    'fullName' => $form->getUser()->getFullName(),
                ],
                'fields' => array_map(function (FormField $field) {
                    return [
                        'id' => $field->getId(),
                        'label' => $field->getLabel(),
                        'type' => $field->getType(),
                        'isRequired' => $field->isRequired(),
                        'options' => $field->getOptions(),
                    ];
                }, $form->getFields()->toArray()),
            ];
        }, $forms);

        return $this->json($data);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getOne(int $id, FormTemplateRepository $repository): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
            return $this->json(['error' => 'Form Template not found'], 404);
        }

        if ($form->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Unauthorized'], 403);
        } 

        $fields = $form->getFields()->toArray();
        $fieldsData = array_map(function ($field) {
            return [
                'id' => $field->getId(),
                'label' => $field->getLabel(),
                'type' => $field->getType(),
                'isRequired' => $field->isRequired(),
                'options' => $field->getOptions(),
            ];
        }, $fields);

        $data = [
            'id' => $form->getId(),
            'name' => $form->getName(),
            'description' => $form->getDescription(),
            'link' => $form->getLink(),
            'user' => [
                'id' => $form->getUser()->getId(),
                'username' => $form->getUser()->getUsername(),
                'fullName' => $form->getUser()->getFullName(),
            ],
            'fields' => array_map(function ($field) {
               return [
            'id' => $field->getId(),
            'label' => $field->getLabel(),
            'type' => $field->getType(),
            'isRequired' => $field->isRequired(),
            'options' => $field->getOptions(),
        ];
    }, $form->getFields()->toArray()),
        ];
    
        return $this->json($data);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, FormTemplateRepository $repository, ValidatorInterface $validator): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
            return $this->json(['error' => 'Form Template not found'], 404);
        }

        if ($form->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Unauthorized'], 403);
        }        

        $data = json_decode($request->getContent(), true);
        $form->setName($data['name'] ?? $form->getName());
        $form->setDescription($data['description'] ?? $form->getDescription());

        $errors = $validator->validate($form);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        foreach ($form->getFields() as $field) {
            $em->remove($field);
        }

        if (!empty($data['fields']) && is_array($data['fields'])) {
            foreach ($data['fields'] as $fieldData) {
                $field = new FormField();
                $field->setLabel($fieldData['label'] ?? '');
                $field->setType($fieldData['type'] ?? '');
                $field->setIsRequired($fieldData['isRequired'] ?? false);
                $field->setOptions($fieldData['options'] ?? null);
                $field->setFormTemplate($form);
                $em->persist($field);
            }
        }

        $em->flush();

        return $this->json(['message' => 'Form Template updated successfully']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em, FormTemplateRepository $repository): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
            return $this->json(['error' => 'Form Tempate not found'], 404);
        }

        if ($form->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Unauthorized'], 403);
        } 

        $em->remove($form);
        $em->flush();

        return $this->json(['message' => 'Form Template deleted successfully']);
    }

    #[Route('/{id}/fields', methods: ['POST'])]
    public function addField(int $id, Request $request, EntityManagerInterface $em, FormTemplateRepository $templateRepo, ValidatorInterface $validator): JsonResponse {
        $formTemplate = $templateRepo->find($id);
        if (!$formTemplate || $formTemplate->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Form Template not found or unauthorized'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $field = new FormField();
        $field->setLabel($data['label'] ?? '');
        $field->setType($data['type'] ?? '');
        $field->setIsRequired($data['isRequired'] ?? false);
        $field->setOptions($data['options'] ?? null);
        $field->setFormTemplate($formTemplate);

        $errors = $validator->validate($field);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        $em->persist($field);
        $em->flush();

        return $this->json(['message' => 'Field added successfully'], 201);
    }

    #[Route('/{templateId}/fields', methods: ['GET'])]
    public function getFields(int $templateId, FormTemplateRepository $templateRepo): JsonResponse
    {
        $formTemplate = $templateRepo->find($templateId);
        if (!$formTemplate || $formTemplate->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Form Template not found or unauthorized'], 404);
        }

        $fields = $formTemplate->getFields()->toArray();

        $data = array_map(function (FormField $field) {
            return [
                'id' => $field->getId(),
                'label' => $field->getLabel(),
                'type' => $field->getType(),
                'isRequired' => $field->isRequired(),
                'options' => $field->getOptions(),
            ];
        }, $fields);

        return $this->json($data);
    }

    #[Route('/fields/{fieldId}', methods: ['GET'])]
    public function getField(int $fieldId, FormFieldRepository $fieldRepo): JsonResponse {
    $field = $fieldRepo->find($fieldId);

    if (!$field || $field->getFormTemplate()->getUser() !== $this->getUser()) {
        return $this->json(['error' => 'Field not found or unauthorized'], 404);
    }

    $data = [
        'id' => $field->getId(),
        'label' => $field->getLabel(),
        'type' => $field->getType(),
        'isRequired' => $field->isRequired(),
        'options' => $field->getOptions(),
    ];

    return $this->json($data);
    }


    #[Route('/fields/{fieldId}', methods: ['PUT'])]
    public function updateField(int $fieldId, Request $request, EntityManagerInterface $em, FormFieldRepository $fieldRepo, ValidatorInterface $validator) : JsonResponse {
        $field = $fieldRepo->find($fieldId);
        if (!$field || $field->getFormTemplate()->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Field not found or unauthorized'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $field->setLabel($data['label'] ?? $field->getLabel());
        $field->setType($data['type'] ?? $field->getType());
        $field->setIsRequired($data['isRequired'] ?? $field->isRequired());
        $field->setOptions($data['options'] ?? $field->getOptions());

        $errors = $validator->validate($field);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        $em->flush();

        return $this->json(['message' => 'Field updated successfully']);
    }

    #[Route('/fields/{fieldId}', methods: ['DELETE'])]
    public function deleteField(int $fieldId, EntityManagerInterface $em, FormFieldRepository $fieldRepo): JsonResponse {
        $field = $fieldRepo->find($fieldId);
        if (!$field || $field->getFormTemplate()->getUser() !== $this->getUser()) {
            return $this->json(['error' => 'Field not found or unauthorized'], 404);
        }

        $em->remove($field);
        $em->flush();

        return $this->json(['message' => 'Field deleted successfully']);
    }

    #[Route('/public/{id}', methods: ['GET'])]
    public function publicView(int $id, FormTemplateRepository $repository): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
           return $this->json(['error' => 'Form Template not found'], 404);
        }

        $fields = $form->getFields()->toArray();

        $fieldsData = array_map(function (FormField $field) {
            return [
               'id' => $field->getId(),
               'label' => $field->getLabel(),
               'type' => $field->getType(),
               'isRequired' => $field->isRequired(),
               'options' => $field->getOptions(),
            ];
        }, $fields);

        $data = [
           'id' => $form->getId(),
           'name' => $form->getName(),
           'description' => $form->getDescription(),
           'link' => $form->getLink(),
           'fields' => $fieldsData,
        ];

        return $this->json($data);
    }

}