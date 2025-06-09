
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, MapPin, CreditCard, CheckCircle, Truck, Smartphone, Wallet, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { OrderTracker } from './OrderTracker';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
});

const CheckoutModal = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showTracker, setShowTracker] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const validatePincode = (pincode) => {
    // Mock validation - in real app, call delivery API
    const availablePincodes = ['110001', '400001', '560001', '600001', '700001'];
    return availablePincodes.includes(pincode);
  };

  const applyCoupon = () => {
    const validCoupons = {
      'SAVE10': 10,
      'FIRST20': 20,
      'WELCOME15': 15
    };
    
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
    } else {
      setDiscount(0);
    }
  };

  const onAddressSubmit = (data) => {
    if (!validatePincode(data.pincode)) {
      addressForm.setError('pincode', { message: 'Delivery not available in this area' });
      return;
    }
    
    // Set delivery charge based on pincode
    setDeliveryCharge(data.pincode.startsWith('1') ? 0 : 49);
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const newOrderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);
    setOrderPlaced(true);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 5) + 3);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTotalAmount = () => {
    const basePrice = product?.price || 45.99;
    const discountAmount = (basePrice * discount) / 100;
    return basePrice - discountAmount + deliveryCharge;
  };

  if (!isOpen) return null;

  if (showTracker) {
    return <OrderTracker orderId={orderId} onClose={() => { setShowTracker(false); onClose(); }} />;
  }

  // Step 1: Full Page Address Collection
  if (step === 1) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X size={20} />
                </Button>
                <h1 className="text-2xl font-bold">Delivery Address</h1>
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

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
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
                              <FormLabel>Mobile Number *</FormLabel>
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

                      <div className="grid md:grid-cols-2 gap-4">
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

                      <Button type="submit" className="w-full bg-luxury-gold hover:bg-luxury-gold/90">
                        Proceed to Payment
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

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
                      <span>Delivery</span>
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

  // Step 2: Payment Options
  if (step === 2) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Options</DialogTitle>
          </DialogHeader>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Choose Payment Method</h3>
                
                {/* UPI Options */}
                <Card className={`cursor-pointer ${paymentMethod === 'upi' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4" onClick={() => setPaymentMethod('upi')}>
                    <div className="flex items-center gap-3">
                      <Smartphone size={24} className="text-luxury-gold" />
                      <div>
                        <h4 className="font-semibold">UPI</h4>
                        <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card Payment */}
                <Card className={`cursor-pointer ${paymentMethod === 'card' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4" onClick={() => setPaymentMethod('card')}>
                    <div className="flex items-center gap-3">
                      <CreditCard size={24} className="text-luxury-gold" />
                      <div>
                        <h4 className="font-semibold">Credit/Debit Card</h4>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Net Banking */}
                <Card className={`cursor-pointer ${paymentMethod === 'netbanking' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4" onClick={() => setPaymentMethod('netbanking')}>
                    <div className="flex items-center gap-3">
                      <Building size={24} className="text-luxury-gold" />
                      <div>
                        <h4 className="font-semibold">Net Banking</h4>
                        <p className="text-sm text-muted-foreground">All major banks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Wallets */}
                <Card className={`cursor-pointer ${paymentMethod === 'wallet' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4" onClick={() => setPaymentMethod('wallet')}>
                    <div className="flex items-center gap-3">
                      <Wallet size={24} className="text-luxury-gold" />
                      <div>
                        <h4 className="font-semibold">Wallets</h4>
                        <p className="text-sm text-muted-foreground">Paytm Wallet, MobiKwik</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash on Delivery */}
                <Card className={`cursor-pointer ${paymentMethod === 'cod' ? 'ring-2 ring-luxury-gold' : ''}`}>
                  <CardContent className="p-4" onClick={() => setPaymentMethod('cod')}>
                    <div className="flex items-center gap-3">
                      <DollarSign size={24} className="text-luxury-gold" />
                      <div>
                        <h4 className="font-semibold">Cash on Delivery</h4>
                        <p className="text-sm text-muted-foreground">Pay when you receive</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coupon Section */}
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">Apply Coupon</h4>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon} variant="outline">Apply</Button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 text-sm mt-2">Coupon applied! You saved ${((product?.price || 45.99) * discount / 100).toFixed(2)}</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product && (
                    <div className="flex gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=60&h=60&fit=crop" 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{product.name}</h4>
                        <p className="text-sm">${product.price}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${product?.price || 45.99}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${((product?.price || 45.99) * discount / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>{deliveryCharge === 0 ? 'FREE' : `$${deliveryCharge}`}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                  <Button onClick={handlePlaceOrder} className="w-full bg-luxury-gold hover:bg-luxury-gold/90">
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Step 3: Order Confirmation
  if (step === 3) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-6">
            <CheckCircle size={64} className="mx-auto text-green-500" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Order Placed Successfully! 🎉</h3>
              <p className="text-muted-foreground">
                Your order has been confirmed and is being processed.
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Estimated Delivery:</span>
                <span>{getDeliveryDate()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => setShowTracker(true)} 
                className="w-full bg-luxury-gold hover:bg-luxury-gold/90"
              >
                Track Your Order
              </Button>
              <Button 
                onClick={() => {
                  onClose();
                  setStep(1);
                  setOrderPlaced(false);
                }} 
                variant="outline" 
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};

export default CheckoutModal;
