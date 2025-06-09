
import { useState, useEffect } from 'react';
import { X, Package, CheckCircle, Truck, Home, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const OrderTracker = ({ orderId, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState(1);

  const orderSteps = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      icon: CheckCircle,
      timestamp: '10:30 AM, Today',
      completed: true
    },
    {
      id: 2,
      title: 'Order Packed',
      description: 'Your order is being packed',
      icon: Package,
      timestamp: '2:15 PM, Today',
      completed: currentStatus >= 2
    },
    {
      id: 3,
      title: 'Shipped',
      description: 'Your order is on the way',
      icon: Truck,
      timestamp: currentStatus >= 3 ? '9:00 AM, Tomorrow' : 'Expected by tomorrow',
      completed: currentStatus >= 3
    },
    {
      id: 4,
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      icon: Truck,
      timestamp: currentStatus >= 4 ? '11:30 AM, Day 2' : 'Expected in 2 days',
      completed: currentStatus >= 4
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Order delivered successfully',
      icon: Home,
      timestamp: currentStatus >= 5 ? '4:45 PM, Day 2' : 'Expected in 3-5 days',
      completed: currentStatus >= 5
    }
  ];

  // Simulate order progress
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(prev => prev < 5 ? prev + 1 : prev);
    }, 5000); // Update every 5 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Track Your Order</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Expected Delivery:</span>
                <span className="text-luxury-gold font-semibold">{getDeliveryDate()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Current Status:</span>
                <span className="text-green-600 font-semibold">
                  {orderSteps.find(step => step.id === currentStatus)?.title}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.id === currentStatus;
                  const isCompleted = step.completed;
                  
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      {/* Progress Line */}
                      {index < orderSteps.length - 1 && (
                        <div className="absolute left-6 mt-8 w-0.5 h-12 bg-muted"></div>
                      )}
                      
                      {/* Icon */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center relative z-10
                        ${isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isActive 
                            ? 'bg-luxury-gold text-white animate-pulse' 
                            : 'bg-muted text-muted-foreground'
                        }
                      `}>
                        <Icon size={20} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-semibold ${isActive ? 'text-luxury-gold' : ''}`}>
                              {step.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                        </div>
                        
                        {isActive && (
                          <div className="mt-2 text-sm text-luxury-gold font-medium">
                            ● Live Update
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Customer Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Have questions about your order? Our customer support team is here to help.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" size="sm">
                  <MessageCircle size={16} className="mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Mail size={16} className="mr-2" />
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="flex-1"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                // Simulate order details download
                const orderDetails = `Order ID: ${orderId}\nStatus: ${orderSteps.find(s => s.id === currentStatus)?.title}\nExpected Delivery: ${getDeliveryDate()}`;
                navigator.clipboard.writeText(orderDetails);
              }}
              className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90"
            >
              Share Order Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OrderTracker };
