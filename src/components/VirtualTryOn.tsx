
import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Sparkles, X, RotateCcw, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const VirtualTryOn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState(null);
  const [productScale, setProductScale] = useState(1);
  const [productPosition, setProductPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const tryOnProducts = [
    {
      id: 1,
      name: "Celestial Pendant",
      type: "necklace",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop",
      placement: "neck"
    },
    {
      id: 2,
      name: "Rose Gold Earrings",
      type: "earrings",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop",
      placement: "ears"
    },
    {
      id: 3,
      name: "Galaxy Ring",
      type: "ring",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=200&h=200&fit=crop",
      placement: "finger"
    },
    {
      id: 4,
      name: "Pearl Necklace",
      type: "necklace",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop",
      placement: "neck"
    }
  ];

  const handleCameraStart = async () => {
    setActiveMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setActiveMode('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAIPlacement = useCallback(() => {
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // Simulate face/neck detection and product placement
      const mockPlacement = {
        detected: true,
        confidence: 0.95,
        landmarks: {
          face: { x: 640, y: 360 },
          neck: { x: 640, y: 480 },
          leftEar: { x: 580, y: 320 },
          rightEar: { x: 700, y: 320 }
        }
      };
      
      setTryOnResult(mockPlacement);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const handleTryOn = () => {
    if (selectedProduct && (activeMode === 'camera' || uploadedImage)) {
      simulateAIPlacement();
    }
  };

  const resetTryOn = () => {
    setTryOnResult(null);
    setProductScale(1);
    setProductPosition({ x: 0, y: 0 });
  };

  const adjustScale = (delta) => {
    setProductScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const getProductPlacementStyle = () => {
    if (!tryOnResult || !selectedProduct) return {};
    
    const baseStyle = {
      position: 'absolute',
      transform: `translate(${productPosition.x}px, ${productPosition.y}px) scale(${productScale})`,
      transformOrigin: 'center',
      transition: 'all 0.3s ease',
      zIndex: 10,
      pointerEvents: 'none'
    };

    // Adjust placement based on product type
    switch (selectedProduct.placement) {
      case 'neck':
        return {
          ...baseStyle,
          top: '60%',
          left: '50%',
          width: '120px',
          height: '160px'
        };
      case 'ears':
        return {
          ...baseStyle,
          top: '35%',
          left: selectedProduct.type === 'earrings' ? '30%' : '70%',
          width: '40px',
          height: '60px'
        };
      case 'finger':
        return {
          ...baseStyle,
          top: '70%',
          left: '45%',
          width: '30px',
          height: '40px'
        };
      default:
        return baseStyle;
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
            Experience our jewelry with advanced AI technology. See how earrings, necklaces, and rings look on you before purchasing.
          </p>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Sparkles className="mr-2" size={20} />
                Try Virtual Try-On
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-luxury">AI Virtual Try-On Studio</DialogTitle>
              </DialogHeader>
              
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Camera/Upload Section */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold">Choose Your Method</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className={`cursor-pointer transition-all ${activeMode === 'camera' ? 'ring-2 ring-luxury-gold' : ''}`}>
                      <CardContent className="p-6 text-center" onClick={handleCameraStart}>
                        <Camera size={32} className="mx-auto mb-2 text-luxury-gold" />
                        <h4 className="font-semibold">Live Camera</h4>
                        <p className="text-sm text-muted-foreground">Real-time try-on</p>
                      </CardContent>
                    </Card>
                    
                    <Card className={`cursor-pointer transition-all ${activeMode === 'upload' ? 'ring-2 ring-luxury-gold' : ''}`}>
                      <CardContent 
                        className="p-6 text-center" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload size={32} className="mx-auto mb-2 text-luxury-gold" />
                        <h4 className="font-semibold">Upload Photo</h4>
                        <p className="text-sm text-muted-foreground">From gallery</p>
                      </CardContent>
                    </Card>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Preview Area */}
                  <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    {activeMode === 'camera' && (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {activeMode === 'upload' && uploadedImage && (
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    )}

                    {!activeMode && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Camera size={48} className="text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500">Select camera or upload photo to begin</p>
                        </div>
                      </div>
                    )}

                    {/* AI Processing Overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p>AI detecting face landmarks...</p>
                        </div>
                      </div>
                    )}

                    {/* Product Overlay */}
                    {tryOnResult && selectedProduct && (
                      <>
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          style={getProductPlacementStyle()}
                          className="opacity-90"
                        />
                        
                        {/* Adjustment Controls */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Button size="sm" variant="secondary" onClick={() => adjustScale(0.1)}>
                            <ZoomIn size={16} />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => adjustScale(-0.1)}>
                            <ZoomOut size={16} />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={resetTryOn}>
                            <RotateCcw size={16} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleTryOn}
                      disabled={!selectedProduct || (!activeMode || isProcessing)}
                      className="flex-1"
                    >
                      {isProcessing ? 'Processing...' : 'Apply Virtual Try-On'}
                    </Button>
                    
                    {tryOnResult && (
                      <Button variant="outline" onClick={resetTryOn}>
                        Reset
                      </Button>
                    )}
                  </div>
                </div>

                {/* Product Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Select Jewelry</h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {tryOnProducts.map((product) => (
                      <Card 
                        key={product.id}
                        className={`cursor-pointer transition-all ${selectedProduct?.id === product.id ? 'ring-2 ring-luxury-gold' : ''}`}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold">{product.name}</h4>
                              <p className="text-xs text-muted-foreground capitalize">{product.type}</p>
                              <p className="text-xs text-luxury-gold">AI-compatible</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedProduct && (
                    <div className="bg-luxury-creme rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Selected: {selectedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI will detect your {selectedProduct.placement} and place the {selectedProduct.type} accurately.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        • Auto face/neck detection
                        • Realistic size scaling
                        • Adjustable positioning
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-4 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">AI Face Detection</h3>
            <p className="text-sm text-muted-foreground">Advanced algorithms detect facial landmarks for precise placement</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-rose rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Rendering</h3>
            <p className="text-sm text-muted-foreground">See jewelry overlay in real-time with accurate sizing</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-nude rounded-full flex items-center justify-center mx-auto mb-4">
              <Move size={24} className="text-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Adjustable Placement</h3>
            <p className="text-sm text-muted-foreground">Fine-tune position and size for perfect fit</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
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
