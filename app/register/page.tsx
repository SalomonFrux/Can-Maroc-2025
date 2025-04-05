// app/register/page.tsx
// This file is part of the registration process for the CAN 2025 event.
// It handles user registration, form submission, and navigation through different steps of the registration process.
// It uses React, Next.js, Supabase for authentication, and Zod for form validation.
// The code is structured to provide a smooth user experience with clear navigation and error handling.
// It also includes a Google login option and handles session management.
// The form is divided into multiple steps, each represented by a separate component.
// The components are imported from a local directory and are responsible for rendering specific sections of the form.
// The form is built using React Hook Form and Zod for validation.
// The code is designed to be modular and reusable, making it easy to maintain and extend in the future.
// The code is written in TypeScript, providing type safety and better developer experience.
// app/register/page.tsx
"use client";
import { supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from './schema'; // Assuming schema is defined correctly
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast'; // Assuming custom hook
import { Form } from '@/components/ui/form'; // Assuming shadcn/ui
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui
import { Card } from '@/components/ui/card'; // Assuming shadcn/ui
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Steps } from '@/components/registration/steps'; // Assuming custom component
import { PersonalInfo } from '@/components/registration/personal-info'; // Assuming custom component
import { StayOrganization } from '@/components/registration/stay-organization'; // Assuming custom component
import { Tickets } from '@/components/registration/tickets'; // Assuming custom component
import { AdditionalServices } from '@/components/registration/additional-services'; // Assuming custom component
import { AccompanyingPersons } from '@/components/registration/accompanying-persons'; // Assuming custom component
import { Payment } from '@/components/registration/payment'; // Assuming custom component
import { Validation } from '@/components/registration/validation'; // Assuming custom component
import { AuthStep } from '@/components/registration/AuthStep'; // Assuming custom component
// Assuming Input and other form controls are handled within the step components

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // const supabase = createClientComponentClient();

  // Initialize form with default values (ensure schema matches defaults)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // auth: { email: "", password: "", confirmPassword: "" },
      personalInfo: { fullName: "", birthDate: undefined, gender: undefined, nationality: "", idNumber: "", idExpiryDate: undefined, phone: "", email: "", city: "", country: "", supportedTeam: { supports: false, teamName: "" } },
      stayOrganization: { stayOrganization: { visaAssistance: false, passportRenewal: false, travelInsurance: false, other: "" }, travel: { departureCity: "", arrivalDate: undefined, departureDate: undefined, stayCity: [], otherCity: "", transport: { needed: false, flightTicket: false, localTransport: false } }, accommodation: { needed: false, type: undefined, otherType: "" }, additionalServices: { meals: false, tourism: false, simCard: false, other: "" } }, // Check this nested additionalServices
      tickets: { needed: false, matches: { groupStage: false, roundOf16: false, quarterFinal: false, semiFinal: false, final: false }, category: undefined },
      additionalServices: { tourism: { wanted: false, package: undefined }, transportation: { needed: false, type: undefined }, communication: { simCard: false, wifi: false }, other: { description: "" } }, // Check this top-level additionalServices
      accompanyingPersons: [],
      payment: { method: undefined, card: { number: "", expiry: "", cvv: "" }, installments: undefined, termsAccepted: false }
    }

  });
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const stepNumber = parseInt(stepParam, 10);
      if (!isNaN(stepNumber) && stepNumber >= 1 && stepNumber <= 7) {
        setCurrentStep(stepNumber);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("Form state updated:", {
      values: form.getValues(),
      isValid: form.formState.isValid,
      isSubmitting: form.formState.isSubmitting,
      errors: form.formState.errors
    });
  }, [form.watch()]); // Triggers on any form change




  // --- Callbacks and Effects (from Batch 2) ---
  const handleGoogleSuccess = useCallback((email: string) => {
    form.setValue('auth.email', email);
    form.setValue('personalInfo.email', email);
    toast({
      title: "Connexion Google réussie",
      description: `Connecté en tant que ${email}`,
      variant: "success",
    });
    setCurrentStep(prev => prev === 0 ? 1 : prev);
  }, [form, toast]);

  const handleAuthSuccess = useCallback((email: string) => {
    form.setValue('auth.email', email);
    form.setValue('personalInfo.email', email);
    setCurrentStep(1);
  }, [form]);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=/register`;
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
    } catch (error) {
      console.error("Google Login Error:", error);
      toast({ title: "Erreur Google Login", description: error instanceof Error ? error.message : "Erreur inconnue", variant: "destructive" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        handleGoogleSuccess(session.user.email);
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Should be empty if handleGoogleSuccess is stable via useCallback

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN' && session?.user?.email) {
          handleGoogleSuccess(session.user.email);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [handleGoogleSuccess, supabase.auth]);













  // --- Navigation Handlers (from Batch 2, slightly adjusted validation keys) ---


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("--- Starting submission ---");
    console.log("Form values:", values);

    // 1. Validate entire form
    const isValid = await form.trigger();
    console.log("Form isValid:", isValid, "Errors:", form.formState.errors);

    if (!isValid) {
      toast({
        title: "Formulaire invalide",
        description: "Veuillez corriger les erreurs avant de soumettre",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Handle authentication
      console.log("Authenticating user...");
      const { data: { session }, error: authError } = await supabase.auth.getSession();

      if (authError) throw authError;
      if (!session?.user?.id) throw new Error("No active session");

      console.log("User authenticated:", session.user.id);

      // 3. Save data
      console.log("Saving registration data...");
      const { error: dbError } = await supabase
        .from('registrations')
        .upsert({
          user_id: session.user.id,
          current_step: currentStep,
          form_data: values,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (dbError) throw dbError;
      console.log("Data saved successfully");

      // 4. Handle final step
      if (currentStep === 7) {
        console.log("Final step completed - redirecting");
        router.push('/confirmation');
      } else {
        console.log("Moving to next step");
        setCurrentStep(prev => prev + 1);
      }

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive"
      });
    } finally {
      console.log("--- Submission complete ---");
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const stepValidations: Record<number, string[]> = {
      // 0: ['auth.email', 'auth.password', 'auth.confirmPassword'],
      1: ['personalInfo.fullName', 'personalInfo.birthDate', 'personalInfo.gender', 'personalInfo.nationality', 'personalInfo.idNumber', 'personalInfo.phone', 'personalInfo.email', 'personalInfo.city', 'personalInfo.country'], // Example: Validate specific fields within personalInfo
      2: ['stayOrganization'], // Use top-level keys for nested objects if schema supports it
      3: ['tickets'],
      4: ['additionalServices'], // Which one? Be specific if keys are duplicated/nested. e.g., 'additionalServices.tourism.wanted'
      5: ['accompanyingPersons'],
      6: ['payment.method', 'payment.termsAccepted'] // Example: Validate specific fields within payment
    };

    const currentFields = stepValidations[currentStep];
    let isValid = false;

    if (currentFields && currentFields.length > 0) {
      isValid = await form.trigger(currentFields as any, { shouldFocus: true });
    } else if (currentStep < 7) {
      // If no specific fields defined for validation, assume valid to proceed (or define validation for all steps)
      isValid = true;
      console.warn("No validation fields triggered for step:", currentStep);
    }


    if (isValid) {
      // If on step 0 (Auth), successful validation means we attempt onSubmit
      // which handles the actual sign-in/sign-up and initial data save.
      if (currentStep === 0) {
        await onSubmit(form.getValues());
        // onSubmit now handles advancing the step internally upon success
      } else {
        // For other steps (1 through 6), just advance visually.
        // Consider if you want to upsert data here too to save progress incrementally.
        setCurrentStep(prev => Math.min(prev + 1, 7));
      }
    } else {
      toast({ title: "Champs invalides", description: "Veuillez corriger les erreurs avant de continuer.", variant: "destructive" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // --- JSX Rendering (from Batch 3) ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm transition-all hover:shadow-md">
            <FaArrowLeft className="h-5 w-5 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Title */}
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulaire d&apos;Inscription CAN 2025 MAROC
          </h1>
          <p className="mt-2 text-gray-600">
            Remplissez le formulaire ci-dessous pour vous inscrire à la CAN 2025
          </p>
        </div> */}

        {/* Steps Indicator */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#FF6600] to-[#009933] p-1">
            <div className="bg-white p-4">
              <Steps currentStep={currentStep} />
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-[#FF6600] to-[#009933] p-1">
            <div className="bg-white p-6 sm:p-8">
              <Form {...form}>
                {/* Use a single form element handling submission via the final button */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-8  border-gray-300"> {/* Prevent default submission unless type=submit */}
                  {/* Conditionally Render Step Components */}
                  {/* {currentStep === 0 && (
                    <AuthStep
                      onGoogleLogin={handleGoogleLogin}
                      isGoogleLoading={isGoogleLoading}
                    />
                  )} */}
                  {currentStep === 1 && <PersonalInfo form={form} />}
                  {currentStep === 2 && <StayOrganization form={form} />}
                  {currentStep === 3 && <Tickets form={form} />}
                  {currentStep === 4 && <AdditionalServices form={form} />}
                  {currentStep === 5 && <AccompanyingPersons form={form} />}
                  {currentStep === 6 && <Payment form={form} />}
                  {currentStep === 7 && <Validation form={form} />}
                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 1 || isSubmitting} // Also disable during submission
                      className="bg-white hover:bg-gray-50"
                    >
                      <FaArrowLeft className="h-4 w-4 mr-2" />
                      Précédent
                    </Button>
                    {currentStep === 7 ? (
                      // <Button
                      //   type="Button" // Changed to button, submission handled by explicit call in onSubmit
                      //   onClick={form.handleSubmit(onSubmit)} // Trigger final submit validation & logic
                      //   className="bg-[#FF6600] hover:bg-[#FF8533] text-white"
                      //   disabled={isSubmitting}
                      // >
                      //   {isSubmitting ? "Envoi en cours..." : "Confirmer l'inscription"}
                      // </Button>

                      <Button
                        type="button"
                        onClick={async () => {
                          const isValid = await form.trigger();
                          if (!isValid) {
                            toast({
                              title: "Formulaire invalide",
                              description: "Verifiez les etapes precedentes avant de soumettre SVP",
                              variant: "warning"
                            });
                          } else {
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                        className="bg-[#FF6600] hover:bg-[#FF8533] text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Confirmer l\'inscription'}
                      </Button>


                    ) : (
                      <Button
                        type="button"
                        onClick={handleNext} // handleNext now triggers validation and potentially onSubmit for step 0
                        className="bg-[#009933] hover:bg-[#00B33C] text-white"
                        disabled={isSubmitting} // Disable next during any submission
                      >
                        Suivant
                        <FaArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}