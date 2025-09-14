import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT-SETUP] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    logStep("User authenticated", { userId: user.id, email: user.email });

    const { action, ...requestData } = await req.json();
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Get or create customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: requestData.name
      });
      customerId = customer.id;
    }

    logStep("Customer ready", { customerId });

    if (action === "create_setup_intent") {
      // Create setup intent for card collection
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        usage: "off_session",
        metadata: {
          user_id: user.id,
          user_email: user.email
        }
      });

      logStep("Setup intent created", { setupIntentId: setupIntent.id });

      return new Response(JSON.stringify({ 
        client_secret: setupIntent.client_secret,
        customer_id: customerId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (action === "process_payment") {
      const { payment_method_id, group_classes } = requestData;

      if (group_classes) {
        // Create immediate payment for group classes (TEST: $0.01)
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1, // $0.01 for testing
          currency: "usd",
          customer: customerId,
          payment_method: payment_method_id,
          confirm: true,
          return_url: `${req.headers.get("origin")}/dashboard`,
          metadata: {
            group_classes: 'true',
            user_name: requestData.name,
            user_id: user.id
          }
        });

        logStep("Group classes payment created", { paymentIntentId: paymentIntent.id });

        // Create trial subscription
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: "price_1S6XpdLBctfCMRN8nJ7Gqaus" }],
          trial_period_days: 3,
          default_payment_method: payment_method_id,
          metadata: {
            trial_type: 'platform_access',
            user_name: requestData.name,
            user_id: user.id
          }
        });

        return new Response(JSON.stringify({ 
          success: true,
          payment_intent: paymentIntent,
          subscription: subscription
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        // Create trial subscription only
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: "price_1S6XpdLBctfCMRN8nJ7Gqaus" }],
          trial_period_days: 3,
          default_payment_method: payment_method_id,
          metadata: {
            trial_type: 'platform_access',
            user_name: requestData.name,
            user_id: user.id
          }
        });

        logStep("Trial subscription created", { subscriptionId: subscription.id });

        return new Response(JSON.stringify({ 
          success: true,
          subscription: subscription
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    throw new Error("Invalid action specified");

  } catch (error: any) {
    logStep("ERROR", { message: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});