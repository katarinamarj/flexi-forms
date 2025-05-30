<?php

namespace App\Entity;

use App\Repository\FormTemplateRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: FormTemplateRepository::class)]
class FormTemplate
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Name can't be empty.")]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'formTemplates')]
    #[ORM\JoinColumn(nullable: false)] 
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'formTemplate', targetEntity: FormField::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $fields;

    #[ORM\Column(length: 255, unique: true, nullable: true)]
    private ?string $link = null;

    /**
     * @var Collection<int, FormResponse>
     */
    #[ORM\OneToMany(targetEntity: FormResponse::class, mappedBy: 'form')]
    private Collection $formResponses;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
       $this->user = $user;

       return $this;
    }

    public function __construct()
    {
       $this->fields = new ArrayCollection();
       $this->formResponses = new ArrayCollection();
    }

    public function getFields(): Collection
    {
       return $this->fields;
    }

    public function getLink(): ?string
    {
       return $this->link;
    }

    public function setLink(string $link): static
    {
       $this->link = $link;
       return $this;
    }

    /**
     * @return Collection<int, FormResponse>
     */
    public function getFormResponses(): Collection
    {
        return $this->formResponses;
    }

    public function addFormResponse(FormResponse $formResponse): static
    {
        if (!$this->formResponses->contains($formResponse)) {
            $this->formResponses->add($formResponse);
            $formResponse->setForm($this);
        }

        return $this;
    }

    public function removeFormResponse(FormResponse $formResponse): static
    {
        if ($this->formResponses->removeElement($formResponse)) {
            // set the owning side to null (unless already changed)
            if ($formResponse->getForm() === $this) {
                $formResponse->setForm(null);
            }
        }

        return $this;
    }
}
