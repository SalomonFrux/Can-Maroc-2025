"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6"; // Font Awesome 6




export function Validation({ form }: { form: UseFormReturn<any> }) {
  const formData = form.getValues();

  const sections = [
    {
      title: "Informations Personnelles",
      fields: [
        { label: "Nom complet", value: formData.personalInfo?.fullName },
        { label: "Email", value: formData.personalInfo?.email },
        { label: "Téléphone", value: formData.personalInfo?.phone },
      ],
    },
    {
      title: "Organisation du Séjour",
      fields: [
        { 
          label: "Assistance administrative", 
          value: formData.stayOrganization?.administrativeAssistance?.visaAssistance ? "Oui" : "Non" 
        },
        {
          label: "Hébergement",
          value: formData.stayOrganization?.accommodation?.needed ? "Oui" : "Non"
        },
      ],
    },
    {
      title: "Billetterie",
      fields: [
        { 
          label: "Billets demandés", 
          value: formData.tickets?.needed ? "Oui" : "Non" 
        },
        {
          label: "Catégorie",
          value: formData.tickets?.category
        },
      ],
    },
    {
      title: "Services Additionnels",
      fields: [
        {
          label: "Package touristique",
          value: formData.additionalServices?.tourism?.package
        },
        {
          label: "Transport local",
          value: formData.additionalServices?.transportation?.type
        },
      ],
    },
    {
      title: "Accompagnants",
      fields: [
        {
          label: "Nombre d'accompagnants",
          value: formData.accompanyingPersons?.length || 0
        },
      ],
    },
    {
      title: "Paiement",
      fields: [
        {
          label: "Mode de paiement",
          value: formData.payment?.method
        },
        {
          label: "Versements",
          value: formData.payment?.installments
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">7. Validation de votre inscription</h2>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">{section.title}</h3>
            <div className="space-y-2">
              {section.fields.map((field) => (
                <div key={field.label} className="flex justify-between items-center">
                  <span className="text-gray-600">{field.label}</span>
                  <span className="font-medium">{field.value || "Non spécifié"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <FaCheck className="h-5 w-5 text-green-500" />
            <p className="text-green-700">
              Votre inscription est prête à être soumise. Veuillez vérifier les informations ci-dessus avant de confirmer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}