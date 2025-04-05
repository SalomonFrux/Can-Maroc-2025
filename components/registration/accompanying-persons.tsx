"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FaTrashAlt as Trash2, FaPlus as Plus } from "react-icons/fa";

interface AccompanyingPerson {
  fullName: string;
  age: string;
  relationship: string;
  needsVisa: boolean;
}

interface AccompanyingPersonsProps {
  form: UseFormReturn<{
    accompanyingPersons?: AccompanyingPerson[];
  }>;
}

export function AccompanyingPersons({ form }: { form: UseFormReturn<any> }) {
  const accompaniedPersons = form.watch("accompanyingPersons") || [];

  const addPerson = () => {
    const currentPersons = form.getValues("accompanyingPersons") || [];
    form.setValue("accompanyingPersons", [
      ...currentPersons,
      { fullName: "", age: "", relationship: "", needsVisa: false }
    ]);
  };

  const removePerson = (index: number) => {
    const currentPersons = form.getValues("accompanyingPersons") || [];
    form.setValue("accompanyingPersons", 
      currentPersons.filter((person: AccompanyingPerson, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">5. Personnes Accompagnantes</h2>

      <div className="space-y-6">
        {accompaniedPersons.map((person: AccompanyingPerson, index: number) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Accompagnant {index + 1}</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removePerson(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`accompanyingPersons.${index}.fullName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`accompanyingPersons.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Âge</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`accompanyingPersons.${index}.relationship`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lien de parenté</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`accompanyingPersons.${index}.needsVisa`}
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 pt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Besoin de visa</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addPerson}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un accompagnant
        </Button>
      </div>
    </div>
  );
}