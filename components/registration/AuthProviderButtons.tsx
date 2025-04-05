// components/registration/AuthProviderButtons.tsx
"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";


export function AuthProviderButtons() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    });
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="w-full gap-2"
        onClick={signInWithGoogle}
      >
        Continue with Google
      </Button>
    </div>
  );
}