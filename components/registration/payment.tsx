"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function Payment({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">6. Paiement</h2>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="payment.method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mode de paiement</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un mode de paiement" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="card">Carte bancaire</SelectItem>
                  <SelectItem value="transfer">Virement bancaire</SelectItem>
                  <SelectItem value="mobile">Paiement mobile</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("payment.method") === "card" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="payment.card.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de carte</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="payment.card.expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d&apos;expiration</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment.card.cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input type="password" maxLength={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="payment.installments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paiement en plusieurs fois</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir le nombre de versements" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Paiement unique</SelectItem>
                  <SelectItem value="2">2 versements</SelectItem>
                  <SelectItem value="3">3 versements</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment.termsAccepted"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  J&apos;accepte les conditions générales de vente et la politique de confidentialité
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}