import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS, GET'
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    // 1. Get JWT from header (if required)
    const authHeader = req.headers.get('Authorization') || ''
    
    // 2. Initialize client
    const supabase = createClient(
      Deno.env.get('URL')!,
      Deno.env.get('SERVICE_ROLE_KEY')!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        },
        global: {
          headers: { Authorization: authHeader }
        }
      }
    )

    // 3. Process request
    const { email } = await req.json()
    const { data: { user } } = await supabase.auth.admin.getUserByEmail(email)
    
    return new Response(
      JSON.stringify({ exists: !!user }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: corsHeaders,
        status: error.status || 500
      }
    )
  }
})


// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// import { createClient } from '@supabase/supabase-js'
// import { corsHeaders } from '../_shared/cors.ts'


// Deno.serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { headers: corsHeaders })
//   }

//   try {
//     // Initialize admin client with the new variable names
//     const supabaseAdmin = createClient(
//       Deno.env.get('URL')!,              // Changed from SUPABASE_URL
//       Deno.env.get('SERVICE_ROLE_KEY')!, // Kept same
//       {
//         auth: {
//           persistSession: false,
//           autoRefreshToken: false
//         }
//       }
//     )

//     // Rest of your function remains the same...
//     const { email } = await req.json()
    
//     const { data: { user }, error } = await supabaseAdmin.auth.admin.getUserByEmail(email)

//     return new Response(
//       JSON.stringify({ exists: !!user }),
//       { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
//     )

//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500, headers: corsHeaders }
//     )
//   }
// })

