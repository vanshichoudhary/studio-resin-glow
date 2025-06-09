
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, MapPin, CreditCard, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY'),
  cvv: z.string().min(3, 'CVV must be 3-4 digits'),
  cardName: z.string().min(2, 'Cardholder name required'),
});

const CheckoutModal = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      pincode: '',
      country: 'India',
    },
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
    },
  });

  const onAddressSubmit = (data) => {
    console.log('Address submitted:', data);
    setStep(2);
  };

  const onPaymentSubmit = (data) => {
    console.log('Payment submitted:', data);
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      onClose();
      setStep(1);
      setOrderPlaced(false);
    }, 3000);
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 5) + 3); // 3-7 days
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!isOpen) return null;

  // Step 1: Full Page Address Collection (Flipkart style)
  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X size={20} />
                </Button>
                <h1 className="text-2xl font-bold">Checkout</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-luxury-gold text-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <span>Address</span>
                </div>
                <div className="w-8 h-px bg-muted"></div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">2</div>
                  <span>Payment</span>
                </div>
                <div className="w-8 h-px bg-muted"></div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">3</div>
                  <span>Confirm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Address Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin size={20} className="text-luxury-gold" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="10-digit mobile number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={addressForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address (House No, Building, Street, Area) *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your complete address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter state" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode *</FormLabel>
                              <FormControl>
                                <Input placeholder="6-digit pincode" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code *</FormLabel>
                              <FormControl>
                                <Input placeholder="ZIP code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <FormControl>
                                <Input placeholder="Country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-luxury-gold hover:bg-luxury-gold/90">
                        Continue to Payment
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product && (
                    <div className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop" 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{product.name}</h4>
                        <p className="text-lg font-bold">${product.price}</p>
                      </div>
                    </div>
                  )}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${product?.price || 45.99}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total</span>
                      <span>${product?.price || 45.99}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Steps 2 & 3: Regular Modal
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 2 ? 'Payment Method' : 'Order Confirmation'}
          </DialogTitle>
        </DialogHeader>

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className={`cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4 text-center" onClick={() => setPaymentMethod('card')}>
                    <CreditCard size={32} className="mx-auto mb-2" />
                    <p className="font-semibold">Credit/Debit Card</p>
                  </CardContent>
                </Card>
                <Card className={`cursor-pointer ${paymentMethod === 'paypal' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4 text-center" onClick={() => setPaymentMethod('paypal')}>
                    <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PP</span>
                    </div>
                    <p className="font-semibold">PayPal</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                  <FormField
                    control={paymentForm.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={paymentForm.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={paymentForm.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name on card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Continue to Confirmation</Button>
                </form>
              </Form>
            )}

            {paymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                <Button onClick={() => setStep(3)} className="w-full">Continue with PayPal</Button>
              </div>
            )}
          </div>
        )}

        {step === 3 && !orderPlaced && (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Review Your Order</h3>
              <p className="text-muted-foreground">Please review your order details before placing</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold mb-2">Delivery Information</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck size={16} />
                  <span>Expected delivery: {getDeliveryDate()}</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Order Summary</h4>
                {product && (
                  <div className="flex justify-between items-center">
                    <span>{product.name}</span>
                    <span className="font-bold">${product.price}</span>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handlePlaceOrder} className="w-full" size="lg">
              Place Order
            </Button>
          </div>
        )}

        {orderPlaced && (
          <div className="text-center py-8">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Order Placed Successfully! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              Your order will be delivered by {getDeliveryDate()}
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation email shortly.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
