<?php

namespace App\Entity;

use App\Repository\FormFieldRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FormFieldRepository::class)]
class FormField
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: "Label is required.")]
    private ?string $label = null;

    #[ORM\Column(type: 'string', length: 50)]
    #[Assert\NotBlank(message: "Type is required.")]
    #[Assert\Choice(
        choices: ["text", "textarea", "number", "checkbox", "radio", "dropdown", "date", "time", "email", "password", "url", "phone"],
        message: "Invalid field type."
    )]
    private ?string $type = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isRequired = false;

    // Polje sa opcijama (koristi se za checkbox, radio, dropdown)
    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $options = null;

    #[ORM\ManyToOne(targetEntity: FormTemplate::class, inversedBy: 'fields')]
    #[ORM\JoinColumn(nullable: false)]
    private ?FormTemplate $formTemplate = null;

    // Getteri i setteri...

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function isRequired(): bool
    {
        return $this->isRequired;
    }

    public function setIsRequired(bool $isRequired): self
    {
        $this->isRequired = $isRequired;
        return $this;
    }

    public function getOptions(): ?array
    {
        return $this->options;
    }

    public function setOptions(?array $options): self
    {
        $this->options = $options;
        return $this;
    }

    public function getFormTemplate(): ?FormTemplate
    {
        return $this->formTemplate;
    }

    public function setFormTemplate(?FormTemplate $formTemplate): self
    {
        $this->formTemplate = $formTemplate;
        return $this;
    }
}
