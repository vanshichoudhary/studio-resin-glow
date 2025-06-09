
import { useState } from 'react';
import { Heart, Share2, Star, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProductDetail = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const productImages = [
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=600&h=600&fit=crop"
  ];

  const similarProducts = [
    {
      id: 1,
      name: "Ocean Breeze Pendant",
      price: 42.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop",
      rating: 4.7
    },
    {
      id: 2,
      name: "Sunset Coaster Set",
      price: 31.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Galaxy Keychain",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=200&h=200&fit=crop",
      rating: 4.6
    },
    {
      id: 4,
      name: "Crystal Ring",
      price: 38.99,
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=200&h=200&fit=crop",
      rating: 4.9
    }
  ];

  const productDetails = {
    name: product?.name || "Celestial Ocean Wave Pendant",
    price: product?.price || 45.99,
    originalPrice: product?.originalPrice || 52.99,
    rating: product?.rating || 4.8,
    reviews: product?.reviews || 127,
    category: product?.category || "Jewelry & Accessories",
    description: "Handcrafted with premium resin and real ocean elements, this pendant captures the beauty of ocean waves in a stunning celestial design. Each piece is unique and tells its own story.",
    features: [
      "Premium quality resin material",
      "Hypoallergenic chain included",
      "Handcrafted with real ocean elements",
      "Water-resistant finish",
      "Gift box included"
    ],
    specifications: {
      "Material": "Premium Resin, Sterling Silver Chain",
      "Dimensions": "2.5cm x 3cm",
      "Chain Length": "45cm (adjustable)",
      "Weight": "12g",
      "Care": "Clean with soft cloth, avoid harsh chemicals"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="mb-4"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img 
                src={productImages[selectedImage]} 
                alt={productDetails.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <img 
                  key={index}
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-luxury-gold' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">{productDetails.category}</Badge>
              <h1 className="text-3xl font-luxury font-bold mb-2">{productDetails.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(productDetails.rating) ? 'fill-luxury-gold text-luxury-gold' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {productDetails.rating} ({productDetails.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-foreground">${productDetails.price}</span>
                <span className="text-lg text-muted-foreground line-through">${productDetails.originalPrice}</span>
                <Badge className="bg-luxury-rose">
                  {Math.round(((productDetails.originalPrice - productDetails.price) / productDetails.originalPrice) * 100)}% OFF
                </Badge>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{productDetails.description}</p>

              {/* Virtual Try-On Button for jewelry */}
              {product?.canTryOn && (
                <div className="mb-6">
                  <Button variant="outline" className="w-full mb-4 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-foreground">
                    Try Virtual Try-On
                  </Button>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button size="lg" className="flex-1 bg-foreground text-background hover:bg-foreground/90">
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Buy Now
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart size={20} className={`mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
                <Button variant="ghost">
                  <Share2 size={20} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                {productDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-luxury-gold rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(productDetails.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="font-medium">{key}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Similar Products */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="fill-luxury-gold text-luxury-gold" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                  <p className="font-bold">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
