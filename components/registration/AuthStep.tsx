// components/registration/AuthStep.tsx
"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';


interface AuthStepProps {
  type?: "login" | "register";  // Added this line
  redirectAfterLogin?: string;  // Added this line
  onGoogleLogin?: () => Promise<void>;
  isGoogleLoading?: boolean;
}

export const AuthStep = ({
  isGoogleLoading = false,
  redirectAfterLogin = "/register?step=1"
}: AuthStepProps) => {
  const { toast } = useToast();
  const router = useRouter();
  // const supabase = createClientComponentClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectAfterLogin}`
        }
      });

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Google Login Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // return (
  //   <div className="space-y-6">
  //     <Button
  //       type="button"
  //       onClick={handleGoogleLogin}
  //       className="w-full h-14 px-6 rounded-lg border-2 border-gray-300 hover:border-[#C1272D] transition-all"
  //       variant="ghost"
  //       disabled={isGoogleLoading}
  //     >
  //       <div className="flex items-center justify-center gap-4 w-full">
  //         <div className="bg-white p-1.5 rounded-full border border-gray-200">
  //           <FcGoogle className="h-6 w-6" />
  //         </div>
  //         <span className="text-gray-800 font-medium text-base">
  //           {isGoogleLoading ? "Connexion..." : "Continuez Avec Google"}
  //         </span>
  //       </div>
  //     </Button>
  //   </div>
  // );


  return (
    <div className="space-y-3">

      {/* Divider */}
      <div className="flex items-center justify-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 font-medium">OU</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-14 px-6 rounded-lg border-2 border-gray-400 hover:border-[#C1272D] transition-all"
        variant="ghost"
        disabled={isGoogleLoading}
      >

        <div className="flex items-center justify-center gap-4 w-full">
          <div className="bg-white p-1.5 rounded-full border border-gray-200">
            <FcGoogle className="h-8 w-8" />
          </div>
          <span className="text-gray-800 font-medium text-base">
            {isGoogleLoading ? "Connexion..." : "Continuez Avec Google"}
          </span>
        </div>
      </Button>



      {/* Other content can go here */}
    </div>
  );

};