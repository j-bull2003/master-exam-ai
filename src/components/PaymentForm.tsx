import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PaymentFormProps {
  formData: {
    name: string;
    email: string;
    groupClasses: boolean;
  };
  onPaymentSuccess: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PaymentForm = ({ formData, onPaymentSuccess, isLoading, setIsLoading }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [setupIntent, setSetupIntent] = useState<string | null>(null);

  React.useEffect(() => {
    const createSetupIntent = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase.functions.invoke('create-payment-setup', {
          body: {
            action: 'create_setup_intent',
            name: formData.name
          }
        });

        if (error) throw error;
        setSetupIntent(data.client_secret);
      } catch (error: any) {
        console.error('Setup intent error:', error);
        toast({
          title: "Setup Error",
          description: error.message || 'Failed to initialize payment setup',
          variant: "destructive",
        });
      }
    };

    createSetupIntent();
  }, [formData.name, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !setupIntent) {
      toast({
        title: "Payment Error",
        description: "Payment system not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // Confirm the setup intent to get payment method
      const { error: confirmError, setupIntent: confirmedSetupIntent } = await stripe.confirmCardSetup(setupIntent, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Process the payment with the saved payment method
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session found');

      const { data, error } = await supabase.functions.invoke('create-payment-setup', {
        body: {
          action: 'process_payment',
          payment_method_id: confirmedSetupIntent.payment_method,
          group_classes: formData.groupClasses,
          name: formData.name
        }
      });

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: formData.groupClasses 
          ? "Group classes payment processed and trial started!"
          : "Trial subscription created successfully!",
      });

      onPaymentSuccess();

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || 'Please check your card details and try again',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: 'hsl(var(--foreground))',
        fontFamily: 'system-ui, sans-serif',
        '::placeholder': {
          color: 'hsl(var(--muted-foreground))',
        },
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CreditCard className="mx-auto h-16 w-16 text-primary" />
        <h2 className="text-3xl font-bold text-foreground">Payment Details</h2>
        <p className="text-muted-foreground">Secure payment processing with Stripe</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Your Plan Summary</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Platform Access (3-day trial)</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              
              {formData.groupClasses && (
                <div className="flex justify-between items-center">
                  <span>Expert Group Classes</span>
                  <span className="font-semibold">$50/week</span>
                </div>
              )}
              
              <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
                <span>Starting Today:</span>
                <span className="text-primary">
                  {formData.groupClasses ? '$50/week + Trial' : 'Free Trial'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Card Information</label>
            <div className="border rounded-lg p-4 bg-background">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Powered by Stripe • PCI DSS compliant</span>
          </div>
        </div>

        <Button 
          type="submit"
          disabled={isLoading || !stripe || !setupIntent}
          size="lg"
          className="w-full h-14 text-lg"
        >
          {isLoading ? 'Processing Payment...' : 'Complete Setup & Start Trial →'}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Secure payment • Cancel anytime • No hidden fees
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;