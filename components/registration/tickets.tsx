"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Tickets({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">3. Billetterie & Expérience Supporter</h2>

      <FormField
        control={form.control}
        name="tickets.needed"
        render={({ field }) => (
          <FormItem className="flex items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Billetterie</FormLabel>
            </div>
          </FormItem>
        )}
      />

      {form.watch("tickets.needed") && (
        <div className="space-y-6">
          <div className="space-y-4">
            <FormLabel>Matchs souhaités</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tickets.matches.groupStage"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Phase de groupes</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tickets.matches.roundOf16"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>1/8 finale</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tickets.matches.quarterFinal"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>1/4 finale</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tickets.matches.semiFinal"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Demi-finale</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tickets.matches.final"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Finale</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="tickets.category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de billet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cat1">Catégorie 1 (150€)</SelectItem>
                    <SelectItem value="cat2">Catégorie 2 (100€)</SelectItem>
                    <SelectItem value="vip">VIP (300€)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}