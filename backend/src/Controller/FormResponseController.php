<?php

namespace App\Controller;

use App\Entity\FormResponse;
use App\Entity\FormTemplate;
use App\Repository\FormTemplateRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/form-responses', name: 'api_form_responses_')]
final class FormResponseController extends AbstractController{
    #[Route('', name: 'submit', methods: ['POST'])]
    public function submit(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $formId = $data['formId'] ?? null;
        $answers = $data['answers'] ?? [];

        if (!$formId || empty($answers)) {
            return new JsonResponse(['error' => 'Invalid data'], 400);
        }

        $form = $em->getRepository(FormTemplate::class)->find($formId);
        if (!$form) {
            return new JsonResponse(['error' => 'Form not found'], 404);
        }

        $formResponse = new FormResponse();
        $formResponse->setForm($form);
        $formResponse->setData($answers);
        $formResponse->setSubmittedAt(new \DateTime());

        $em->persist($formResponse);
        $em->flush();

        return new JsonResponse(['message' => 'Response saved']);
    }

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function getResponses(FormTemplate $form): JsonResponse
    {
        $responses = $form->getFormResponses();

        return $this->json(array_map(fn($r) => [
            'id' => $r->getId(),
            'submittedAt' => $r->getSubmittedAt()->format('Y-m-d H:i:s'),
            'data' => $r->getData(),
        ], $responses->toArray()));
    }

}
