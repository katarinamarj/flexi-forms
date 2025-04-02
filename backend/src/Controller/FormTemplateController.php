<?php

namespace App\Controller;

use App\Entity\FormTemplate;
use App\Repository\FormTemplateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/form-templates', name: 'api_forms_')]
class FormTemplateController extends AbstractController
{
    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, ValidatorInterface $validator, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $formTemplate = new FormTemplate();
        $formTemplate->setName($data['name'] ?? '');
        $formTemplate->setDescription($data['description'] ?? null);

        $errors = $validator->validate($formTemplate);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
        }

        $em->persist($formTemplate);
        $em->flush();

        return $this->json(['message' => 'Form Template created successfully'], 201);
    }

    #[Route('', methods: ['GET'])]
    public function getAll(FormTemplateRepository $repository): JsonResponse
    {
        $forms = $repository->findAll();
        return $this->json($forms);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function getOne(int $id, FormTemplateRepository $repository): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
            return $this->json(['error' => 'Form Template not found'], 404);
        }
        return $this->json($form);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request, EntityManagerInterface $em, FormTemplateRepository $repository, ValidatorInterface $validator): JsonResponse
    {
        $form = $repository->find($id);
        if (!$form) {
            return $this->json(['error' => 'Form Template not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        $form->setName($data['name'] ?? $form->getName());
        $form->setDescription($data['description'] ?? $form->getDescription());

        $errors = $validator->validate($form);
        if (count($errors) > 0) {
            return $this->json(['error' => (string) $errors], 400);
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

        $em->remove($form);
        $em->flush();

        return $this->json(['message' => 'Form Template deleted successfully']);
    }
}