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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function PersonalInfo({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">1. Informations Personnelles</h2>
      
      <FormField
        control={form.control}
        name="personalInfo.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom complet</FormLabel>
            <FormControl>
              <Input placeholder="Entrez votre nom complet" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="personalInfo.birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                  onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexe</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femme</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="personalInfo.nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationalité</FormLabel>
              <FormControl>
                <Input placeholder="Votre nationalité" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>N°CNI / passeport</FormLabel>
              <FormControl>
                <Input placeholder="Numéro d'identité" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.idExpiryDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date d'expiration CNI / passeport</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                {...field}
                value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone/WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="+XXX XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="personalInfo.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Votre ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pays</FormLabel>
              <FormControl>
                <Input placeholder="Votre pays" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.supportedTeam.supports"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Supportez-vous une équipe ?
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      {form.watch("personalInfo.supportedTeam.supports") && (
        <FormField
          control={form.control}
          name="personalInfo.supportedTeam.teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quelle équipe ?</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'équipe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}