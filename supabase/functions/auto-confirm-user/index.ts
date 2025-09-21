import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    console.log('Auto-confirming user:', email);
    
    if (!email) {
      throw new Error('Email is required');
    }

    // Create Supabase client with service role key to modify auth.users
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Update the user to confirm their email
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id || '',
      {
        email_confirm: true
      }
    );

    if (error) {
      console.error('Error confirming user:', error);
      // Try direct database update as fallback
      const { error: dbError } = await supabaseAdmin
        .from('auth.users')
        .update({ email_confirmed_at: new Date().toISOString() })
        .eq('email', email);
        
      if (dbError) {
        console.error('Database update failed:', dbError);
        throw new Error('Failed to confirm user');
      }
    }

    console.log('User confirmed successfully:', email);
    
    return new Response(
      JSON.stringify({ success: true, message: 'User confirmed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Auto-confirm error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});