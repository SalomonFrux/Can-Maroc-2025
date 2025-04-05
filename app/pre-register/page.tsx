// app/pre-register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthStep } from "@/components/registration/AuthStep";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export default function PreRegistrationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [emailExistsMessage, setEmailExistsMessage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }

  });
  // Add this helper function near your other component logic
  // const getSupabaseToken = async () => {
  //   const { data: { session } } = await supabase.auth.getSession()
  //   return session?.access_token
  // }

  const { watch, handleSubmit, register, formState: { errors } } = form;
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const isPasswordMatch = passwordValue === confirmPasswordValue;


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // 1. Attempt sign-up (this will reveal if email exists)
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      });

      // 2. Check if email already exists (confirmed account)
      if (signUpData.user?.identities?.length === 0) {
        toast({
          title: "Email déjà enregistré",
          description: "Cet email est déjà associé à un compte. Veuillez vous connecter.",
          variant: "warning",
        });
        return;
      }

      // 3. Handle unconfirmed emails (optional)
      if (signUpData.user && signUpData.user.identities?.length > 0) {
        toast({
          title: "Confirmation requise",
          description: "Nous avons envoyé un lien de confirmation à votre adresse email",
          duration: 9000,
          variant: "info",
        });
        return;
      }

      // 4. Handle other errors
      if (error) throw error;

    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Échec de l'inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleEmailConfirmation = async () => {
    setIsLoading(true);
    try {
      // Check if user has confirmed their email
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: registeredEmail,
        password: form.getValues("password")
      });

      if (error) throw error;

      if (user) {
        router.push("/register?step=1");
      }
    } catch (error) {
      toast({
        title: "Email non confirmé",
        description: "Veuillez vérifier votre email et cliquer sur le lien de confirmation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full rounded-lg shadow-md border border-gray-300 bg-white p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Vérifiez votre email</h1>
            <p className="mt-2 text-gray-600">
              Nous avons envoyé un lien de confirmation à <span className="font-semibold">{registeredEmail}</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Après avoir confirmé votre email, cliquez ci-dessous pour continuer:
            </p>

            <Button
              onClick={handleEmailConfirmation}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Vérification..." : "Continuer vers L'inscription finale"}
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-orange-500 hover:text-orange-600"
              >
                Retour à l&apos;inscription
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div>


      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">



        <div className="max-w-md w-full rounded-lg shadow-md border border-gray-300 bg-white">
          <div className="text-center mb-8 mt-6">
            <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
            <p className="mt-2 text-gray-600">
              Commencez votre inscription pour la <span className="font-semibold">CAN </span>
              <span className="font-semibold ">20</span>
              <span className="font-semibold ">25</span>
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  className="w-full border-gray-300"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
                {emailExistsMessage && (
                  <p className="mt-1 text-sm text-orange-500">
                    {emailExistsMessage}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full border-gray-300 pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    {showPassword ? (
                      <FaEyeSlash onClick={() => setShowPassword(false)} className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye onClick={() => setShowPassword(true)} className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmez le mot de passe
                </label>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  className={`w-full border-gray-300`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {isPasswordMatch && confirmPasswordValue ? (
                  <p className="mt-1 text-sm text-green-500">
                    Les mots de passe correspondent
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full py-4 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                disabled={isLoading || !!emailExistsMessage}
              >
                {isLoading ? "En cours..." : "S'inscrire"}
              </Button>
            </form>

            <div className="mt-6">
              <AuthStep
                type="register"
                redirectAfterLogin="/register?step=1"
              />
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Déjà un compte?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 hover:underline">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center text-gray-700 hover:text-gray-900">
          <FaArrowLeft className="h-5 w-5 mr-2" />
          Retour à l&apos;accueil
        </Link>
      </div>


    </div>






  );
}