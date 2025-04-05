//components/auth/AuthForm.tsx


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

// Extended schema to include confirmPassword for registration
const authSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string().optional(), // Only required for registration
}).superRefine((data, ctx) => {
  if (data.confirmPassword && data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Les mots de passe ne correspondent pas",
      path: ["confirmPassword"]
    });
  }
});

type AuthFormProps = {
  type: "login" | "register";
  showConfirmPassword?: boolean;
};

export const AuthForm = ({
  type,
  showConfirmPassword = type === "register"
}: AuthFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const handleSubmit = async (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    try {
      if (type === "login") {
        // Clear existing cookies (optional, based on your original code)
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.split('=')
          document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        });

        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password
        });

        if (error) throw error;
        if (typeof window !== 'undefined') {
          window.location.href = "/account";
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
          },
        });
        if (error) throw error;
        toast({
          title: "Vérifiez votre email",
          description: "Un lien de confirmation a été envoyé",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error
          ? error.message.includes('already registered')
            ? "Cet email est déjà utilisé"
            : error.message
          : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: false // Ensure full redirect flow
        }
      });

      if (error) {
        console.error('Google sign-in error:', error);
        toast({
          title: 'Error signing in with Google',
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            {...form.register("email")}
            type="email"
            className="w-full border-gray-300  "
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <Input
            {...form.register("password")}
            type="password"
            className="w-full border-gray-300  "
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Conditional Confirm Password */}
        {showConfirmPassword && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmez le mot de passe
            </label>
            <Input
              {...form.register("confirmPassword")}
              type="password"
              className="w-full border-gray-300  "
            />
            {form.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {type === "login" ? "Se connecter" : "S'inscrire"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OU</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={signInWithGoogle}
        disabled={isLoading}
      >
        <FcGoogle className="mr-2 h-4 w-4" />
        Continuer avec Google
      </Button>

      {type === "login" ? (
        <div className="text-center text-sm text-gray-600">
          Pas encore de compte?{' '}
          <Link href="/pre-register" className="text-orange-500 hover:text-orange-600">
            S&apos;inscrire
          </Link>
        </div>
      ) : (
        <div className="text-center text-sm text-gray-600">
          Déjà un compte?{' '}
          <Link href="/login" className="text-orange-500 hover:text-orange-600">
            Se connecter
          </Link>
        </div>
      )}
    </div>
  );
};


//LE LFORMULAIRE A DEUX BALLES
//   return (
//     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           {...form.register("email")}
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//         {form.formState.errors.email && (
//           <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
//         )}
//       </div>
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Mot de passe
//         </label>
//         <input
//           type="password"
//           id="password"
//           {...form.register("password")}
//           className="mt-1 p-2 w-full border rounded-md"
//         />
//         {form.formState.errors.password && (
//           <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
//         )}
//       </div>
//       {showConfirmPassword && (
//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//             Confirmer le mot de passe
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             {...form.register("confirmPassword")}
//             className="mt-1 p-2 w-full border rounded-md"
//           />
//           {form.formState.errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
//           )}
//         </div>
//       )}
//       <div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           disabled={isLoading}
//         >
//           {isLoading ? "Chargement..." : type === "login" ? "Se connecter" : "S'inscrire"}
//         </button>
//       </div>
//       {type === "login" && (
//         <div>
//           <button
//             type="button"
//             onClick={signInWithGoogle}
//             className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//             disabled={isLoading}
//           >
//             {isLoading ? "Chargement..." : "Se connecter avec Google"}
//           </button>
//         </div>
//       )}
//     </form>
//   );
// };

