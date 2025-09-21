import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Auto-confirm user function called');

    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { email } = await req.json();
    
    if (!email) {
      throw new Error("Email is required");
    }

    console.log(`Attempting to confirm user: ${email}`);

    // Get the user by email
    const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (getUserError) {
      console.error('Error listing users:', getUserError);
      throw getUserError;
    }

    const user = userData.users.find(u => u.email === email);
    
    if (!user) {
      console.log(`User not found: ${email}`);
      return new Response(JSON.stringify({ 
        success: false, 
        message: "User not found" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    console.log(`User found: ${user.id}, confirmed: ${!!user.email_confirmed_at}`);

    // If user is already confirmed, return success
    if (user.email_confirmed_at) {
      console.log(`User already confirmed: ${email}`);
      return new Response(JSON.stringify({ 
        success: true, 
        message: "User already confirmed",
        user_id: user.id
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Confirm the user
    const { data: confirmData, error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { 
        email_confirm: true
      }
    );

    if (confirmError) {
      console.error('Error confirming user:', confirmError);
      throw confirmError;
    }

    console.log(`User confirmed successfully: ${email}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "User confirmed successfully",
      user_id: user.id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in auto-confirm-user function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || "Internal server error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});