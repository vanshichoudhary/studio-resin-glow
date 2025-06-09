
import { useState } from 'react';
import { Camera, Upload, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const VirtualTryOn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tryOnProducts = [
    {
      id: 1,
      name: "Celestial Pendant",
      type: "necklace",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Rose Gold Earrings",
      type: "earrings",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Galaxy Ring",
      type: "ring",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=200&h=200&fit=crop"
    }
  ];

  const handleTryOn = (mode) => {
    setActiveMode(mode);
    if (mode === 'camera') {
      // Here you would initialize camera access
      console.log('Initializing camera for virtual try-on...');
    } else if (mode === 'upload') {
      // Here you would open file picker
      console.log('Opening file picker for photo upload...');
    }
  };

  return (
    <section className="py-16 luxury-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-4">
            Virtual <span className="luxury-text-gradient">Try-On</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            See how our jewelry looks on you before you buy. Use your camera or upload a photo to try on any piece virtually.
          </p>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Sparkles className="mr-2" size={20} />
                Try Virtual Try-On
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-luxury">Virtual Try-On Studio</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Camera/Upload Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose Your Method</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className={`cursor-pointer transition-all ${activeMode === 'camera' ? 'ring-2 ring-luxury-gold' : ''}`}>
                      <CardContent className="p-6 text-center" onClick={() => handleTryOn('camera')}>
                        <Camera size={32} className="mx-auto mb-2 text-luxury-gold" />
                        <h4 className="font-semibold">Live Camera</h4>
                        <p className="text-sm text-muted-foreground">Use your device camera</p>
                      </CardContent>
                    </Card>
                    
                    <Card className={`cursor-pointer transition-all ${activeMode === 'upload' ? 'ring-2 ring-luxury-gold' : ''}`}>
                      <CardContent className="p-6 text-center" onClick={() => handleTryOn('upload')}>
                        <Upload size={32} className="mx-auto mb-2 text-luxury-gold" />
                        <h4 className="font-semibold">Upload Photo</h4>
                        <p className="text-sm text-muted-foreground">Choose from gallery</p>
                      </CardContent>
                    </Card>
                  </div>

                  {activeMode && (
                    <div className="bg-muted rounded-lg p-6">
                      {activeMode === 'camera' ? (
                        <div className="text-center">
                          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                            <Camera size={48} className="text-gray-400" />
                            <span className="ml-2 text-gray-500">Camera feed will appear here</span>
                          </div>
                          <Button>Start Camera</Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-300">
                            <div>
                              <Upload size={48} className="text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-500">Drag & drop or click to upload</p>
                            </div>
                          </div>
                          <Button>Choose Photo</Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Product to Try</h3>
                  
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {tryOnProducts.map((product) => (
                      <Card 
                        key={product.id}
                        className={`cursor-pointer transition-all ${selectedProduct?.id === product.id ? 'ring-2 ring-luxury-gold' : ''}`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardContent className="p-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                          <h4 className="text-sm font-semibold">{product.name}</h4>
                          <p className="text-xs text-muted-foreground capitalize">{product.type}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedProduct && (
                    <div className="bg-luxury-creme rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Selected: {selectedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        This {selectedProduct.type} will be virtually placed on your photo.
                      </p>
                      <Button className="w-full" disabled={!activeMode}>
                        Apply Try-On
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Preview</h3>
            <p className="text-sm text-muted-foreground">See how jewelry looks instantly with our AI technology</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-rose rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Perfect Fit</h3>
            <p className="text-sm text-muted-foreground">AI ensures accurate sizing and positioning</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-nude rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Multiple Options</h3>
            <p className="text-sm text-muted-foreground">Use live camera or upload your favorite photo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTryOn;
