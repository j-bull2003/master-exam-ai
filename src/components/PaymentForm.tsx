import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  const [billingInfo, setBillingInfo] = useState({
    name: formData.name || '',
    email: formData.email || '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });

  React.useEffect(() => {
    const createSetupIntent = async () => {
      try {
        console.log('PaymentForm: Starting setup intent creation...');
        
        // Wait for session to be available with retry logic
        let session = null;
        let retries = 0;
        const maxRetries = 10;
        
        while (!session && retries < maxRetries) {
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          console.log(`PaymentForm: Session check ${retries + 1}/${maxRetries}:`, !!currentSession);
          
          if (currentSession) {
            session = currentSession;
            break;
          }
          
          console.log(`PaymentForm: No session found, retry ${retries + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
          retries++;
        }
        
        if (!session) {
          console.log('PaymentForm: No session found after retries');
          toast({
            title: "Session Error",
            description: "Please try refreshing the page and logging in again.",
            variant: "destructive",
          });
          return;
        }

        console.log('PaymentForm: Session found, calling create-payment-setup...');
        console.log('PaymentForm: Request body:', {
          action: 'create_setup_intent',
          name: formData.name
        });

        const { data, error } = await supabase.functions.invoke('create-payment-setup', {
          body: {
            action: 'create_setup_intent',
            name: formData.name
          }
        });

        console.log('PaymentForm: Function response:', { data, error });

        if (error) {
          console.error('PaymentForm: Setup intent error:', error);
          throw error;
        }
        
        if (!data?.client_secret) {
          console.error('PaymentForm: No client_secret in response:', data);
          throw new Error('Invalid response from payment setup');
        }
        
        console.log('PaymentForm: Setup intent created successfully:', data.client_secret);
        setSetupIntent(data.client_secret);
      } catch (error: any) {
        console.error('PaymentForm: Setup intent error:', error);
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
    
    console.log('Form submitted');
    console.log('Stripe available:', !!stripe);
    console.log('Elements available:', !!elements);
    console.log('Setup intent available:', !!setupIntent);
    
    if (!stripe || !elements || !setupIntent) {
      console.log('Missing requirements for payment');
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
      if (!cardElement) {
        console.log('Card element not found');
        throw new Error('Card element not found');
      }

      console.log('Confirming card setup...');
      // Confirm the setup intent to get payment method
      const { error: confirmError, setupIntent: confirmedSetupIntent } = await stripe.confirmCardSetup(setupIntent, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
            address: {
              line1: billingInfo.address.line1,
              city: billingInfo.address.city,
              state: billingInfo.address.state,
              postal_code: billingInfo.address.postal_code,
              country: billingInfo.address.country,
            },
          },
        },
      });

      if (confirmError) {
        console.error('Card setup confirmation error:', confirmError);
        throw new Error(confirmError.message);
      }

      console.log('Card setup confirmed, processing payment...');
      // Process the payment with the saved payment method
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('No session found during payment processing');
        throw new Error('No session found');
      }

      console.log('Calling create-payment-setup for payment processing...');
      const { data, error } = await supabase.functions.invoke('create-payment-setup', {
        body: {
          action: 'process_payment',
          payment_method_id: confirmedSetupIntent.payment_method,
          group_classes: formData.groupClasses,
          name: formData.name
        }
      });

      if (error) {
        console.error('Payment processing error:', error);
        throw error;
      }

      console.log('Payment successful:', data);
      toast({
        title: "Payment Successful!",
        description: formData.groupClasses 
          ? "Group classes payment processed and trial started!"
          : "Trial subscription created successfully!",
      });

      // Small delay then call success handler
      setTimeout(() => {
        onPaymentSuccess();
      }, 1000);

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
        {!setupIntent && (
          <p className="text-sm text-muted-foreground">Initializing payment form...</p>
        )}
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
          {/* Billing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  value={billingInfo.name}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => setBillingInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Address</label>
              <Input
                value={billingInfo.address.line1}
                onChange={(e) => setBillingInfo(prev => ({ 
                  ...prev, 
                  address: { ...prev.address, line1: e.target.value }
                }))}
                placeholder="Street address"
                required
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">City</label>
                <Input
                  value={billingInfo.address.city}
                  onChange={(e) => setBillingInfo(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, city: e.target.value }
                  }))}
                  placeholder="City"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">State</label>
                <Input
                  value={billingInfo.address.state}
                  onChange={(e) => setBillingInfo(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, state: e.target.value }
                  }))}
                  placeholder="State"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">ZIP Code</label>
                <Input
                  value={billingInfo.address.postal_code}
                  onChange={(e) => setBillingInfo(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, postal_code: e.target.value }
                  }))}
                  placeholder="ZIP"
                  required
                />
              </div>
            </div>
          </div>

          {/* Card Information */}
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

          {/* Debug info */}
          <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
            <p>Debug: Setup Intent: {setupIntent ? 'Ready' : 'Loading...'}</p>
            <p>Stripe: {stripe ? 'Ready' : 'Not Ready'}</p>
            <p>Name: {billingInfo.name.trim() ? 'OK' : 'Missing'}</p>
            <p>Email: {billingInfo.email.trim() ? 'OK' : 'Missing'}</p>
            <p>Address: {billingInfo.address.line1.trim() ? 'OK' : 'Missing'}</p>
            <p>City: {billingInfo.address.city.trim() ? 'OK' : 'Missing'}</p>
          </div>
        </div>

        <Button 
          type="submit"
          disabled={
            isLoading || 
            !stripe || 
            !setupIntent ||
            !billingInfo.name.trim() ||
            !billingInfo.email.trim() ||
            !billingInfo.address.line1.trim() ||
            !billingInfo.address.city.trim() ||
            !billingInfo.address.state.trim() ||
            !billingInfo.address.postal_code.trim()
          }
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