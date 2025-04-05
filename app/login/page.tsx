// app/login/page.tsx
"use client";
import { AuthStep } from "@/components/registration/AuthStep";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from '@/lib/supabase';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from "react-icons/fa"; //

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  //   const supabase = createClientComponentClient();





  // const handleEmailLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data: { session }, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password
  //     });

  //     if (error) throw error;

  //     if (session) {
  //       router.push("/register?step=1");
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     toast({
  //       title: "Erreur",
  //       description: error instanceof Error
  //         ? error.message.includes('Email')
  //           ? "Email ou mot de passe incorrect"
  //           : error.message
  //         : "Erreur inconnue",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



  const handleEmailLogin = async () => {
    setIsLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (session) {
        // Fetch user's registration status
        const { data: registrationData, error: registrationError } = await supabase
          .from('registrations')
          .select('current_step')
          .eq('user_id', session.user.id)
          .single();

        if (registrationError) {
          console.error("Error fetching registration data:", registrationError);
          // Fallback to register if there's an error fetching registration data
          router.push("/register?step=1");
        } else if (registrationData?.current_step >= 7) {
          // Redirect to account if registration is complete
          router.push("/account");
        } else {
          // Redirect to register at their current step if not complete
          router.push(`/register?step=${registrationData?.current_step || 1}`);
        }
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error
          ? error.message.includes('Email')
            ? "Email ou mot de passe incorrect"
            : error.message
          : "Erreur inconnue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
       
      <div className="max-w-md w-full rounded-lg shadow-md border border-gray-300 bg-white">
        <div className="text-center mb-8 mt-6">
          <h1 className="text-3xl font-bold text-gray-900">Se connecter</h1>
          <p className="mt-2 text-gray-600">
            Connectez-vous à votre compte pour continuer.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {(
                <p className="mt-1 text-sm text-orange-500">
                  { }
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full py-4 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 ease-in-out"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          {/* Google Login */}
          <AuthStep redirectAfterLogin="/register?step=1" />

          {/* Sign-up Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Pas encore de compte?{" "}
              <Link href="/pre-register" className="text-orange-500 hover:text-orange-600 hover:underline">
                S&apos;inscrire
              </Link>
            </p>
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


