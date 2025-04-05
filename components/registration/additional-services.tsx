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

export function AdditionalServices({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">4. Services Additionnels</h2>

      {/* Tourism Packages */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Packages Touristiques</h3>
        
        <FormField
          control={form.control}
          name="additionalServices.tourism.wanted"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Je souhaite découvrir le Maroc</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("additionalServices.tourism.wanted") && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="additionalServices.tourism.package"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choisissez votre package</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un package" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cultural">Découverte Culturelle (3 jours)</SelectItem>
                      <SelectItem value="desert">Aventure Désert (2 jours)</SelectItem>
                      <SelectItem value="coastal">Circuit Côtier (4 jours)</SelectItem>
                      <SelectItem value="imperial">Villes Impériales (5 jours)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Transportation */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Transport Local</h3>
        
        <FormField
          control={form.control}
          name="additionalServices.transportation.needed"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Service de transport local</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch("additionalServices.transportation.needed") && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="additionalServices.transportation.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de transport</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Véhicule privé avec chauffeur</SelectItem>
                      <SelectItem value="shared">Navette partagée</SelectItem>
                      <SelectItem value="rental">Location de voiture</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>

      {/* Communication */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Communication</h3>
        
        <FormField
          control={form.control}
          name="additionalServices.communication.simCard"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Carte SIM marocaine</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalServices.communication.wifi"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Routeur WiFi portable</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Other Services */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Autres Services</h3>
        
        <FormField
          control={form.control}
          name="additionalServices.other.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autres besoins spécifiques</FormLabel>
              <FormControl>
                <Input placeholder="Décrivez vos besoins additionnels" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}