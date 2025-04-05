// components/auth/SessionChecker.tsx
'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SessionChecker() {
  const router = useRouter()
  const searchParams = useSearchParams()
//   const supabase = createClientComponentClient()

  useEffect(() => {
    const handleAuth = async () => {
      const code = searchParams.get('code')
      
      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          
          if (error) {
            console.error('Auth error:', error)
            return router.push(`/login?error=auth_failed`)
          }

          // Immediately check session status
          const { data: { session } } = await supabase.auth.getSession()
          
          if (session?.user) {
            return router.push('/register?step=1')
          }
        } catch (err) {
          console.error('Session check error:', err)
          return router.push('/login?error=unknown')
        }
      }
    }

    handleAuth()
  }, [searchParams, supabase.auth, router])

  return null
}