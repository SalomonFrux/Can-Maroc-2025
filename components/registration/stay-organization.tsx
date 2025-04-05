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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function StayOrganization({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">2. Organisation du Séjour</h2>

      {/* Administrative Assistance */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">A. Préparation administrative</h3>
        <p className="text-sm text-gray-500">Besoin d&apos;assistance pour :</p>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="stayOrganization.administrativeAssistance.visaAssistance"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Demande de visa marocain</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.administrativeAssistance.passportRenewal"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Renouvellement de passeport</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.administrativeAssistance.travelInsurance"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Assurance voyage</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.administrativeAssistance.other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autre assistance</FormLabel>
                <FormControl>
                  <Input placeholder="Précisez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Travel Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">B. Options de voyage</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="stayOrganization.travel.departureCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville de départ</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ville" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="abidjan">Abidjan</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("stayOrganization.travel.departureCity") === "other" && (
            <FormField
              control={form.control}
              name="stayOrganization.travel.otherCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Précisez la ville</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de la ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="stayOrganization.travel.arrivalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date d&apos;arrivée</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} 
                    onChange={(e) => field.onChange(new Date(e.target.value))} // Ensure the value 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.travel.departureDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de départ</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} // Handle undefined value
                    onChange={(e) => field.onChange(new Date(e.target.value))} // Ensure the value is a Date object
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="stayOrganization.travel.transport.needed"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Transport nécessaire</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("stayOrganization.travel.transport.needed") && (
          <div className="space-y-4 ml-6">
            <FormField
              control={form.control}
              name="stayOrganization.travel.transport.flightTicket"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Billet d&apos;Avion Aller – Retour au Maroc</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stayOrganization.travel.transport.localTransport"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Déplacement sur place</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Accommodation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hébergement</h3>

        <FormField
          control={form.control}
          name="stayOrganization.accommodation.needed"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Hébergement nécessaire</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("stayOrganization.accommodation.needed") && (
          <FormField
            control={form.control}
            name="stayOrganization.accommodation.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d&apos;hébergement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hotel">Hôtel</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="shared">Colocation</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>

      {/* Additional Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Services additionnels</h3>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="stayOrganization.additionalServices.meals"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Restauration</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.additionalServices.tourism"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Excursions/Tourisme</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.additionalServices.simCard"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Carte SIM locale</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stayOrganization.additionalServices.other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autres services</FormLabel>
                <FormControl>
                  <Input placeholder="Précisez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}