
import { useState } from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductDetail from './ProductDetail';

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    // Home Decor - Coasters
    {
      id: 1,
      name: "Ocean Wave Coaster Set",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Home Decor",
      subcategory: "Coasters",
      rating: 4.8,
      reviews: 127,
      badge: "15% OFF"
    },
    {
      id: 2,
      name: "Marble Gold Coasters",
      price: 32.99,
      originalPrice: 38.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      category: "Home Decor",
      subcategory: "Coasters",
      rating: 4.9,
      reviews: 89,
      badge: "Best Seller"
    },
    // Home Decor - Trays
    {
      id: 3,
      name: "Celestial Serving Tray",
      price: 45.99,
      originalPrice: 52.99,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      category: "Home Decor",
      subcategory: "Trays",
      rating: 4.7,
      reviews: 156,
      badge: "13% OFF"
    },
    // Jewelry & Accessories - Pendants
    {
      id: 4,
      name: "Celestial Ocean Wave Pendant",
      price: 45.99,
      originalPrice: 52.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Jewelry & Accessories",
      subcategory: "Pendants",
      rating: 4.8,
      reviews: 127,
      badge: "15% OFF",
      canTryOn: true
    },
    {
      id: 5,
      name: "Rose Gold Flower Pendant",
      price: 38.99,
      originalPrice: 45.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      category: "Jewelry & Accessories",
      subcategory: "Pendants",
      rating: 4.6,
      reviews: 94,
      badge: "Popular",
      canTryOn: true
    },
    // Jewelry & Accessories - Earrings
    {
      id: 6,
      name: "Galaxy Drop Earrings",
      price: 29.99,
      originalPrice: 34.99,
      image: "https://i.ibb.co/N5xWwKs/Screenshot-2025-06-08-222750.png",
      category: "Jewelry & Accessories",
      subcategory: "Earrings",
      rating: 4.9,
      reviews: 203,
      badge: "14% OFF",
      canTryOn: true
    },
    {
      id: 7,
      name: "Ocean Pearl Earrings",
      price: 35.99,
      originalPrice: 42.99,
      image: "https://i.ibb.co/yFdVCPpr/Screenshot-2025-06-08-222614.png",
      category: "Jewelry & Accessories",
      subcategory: "Earrings",
      rating: 4.8,
      reviews: 167,
      badge: "16% OFF",
      canTryOn: true
    },
    // Jewelry & Accessories - Rings
    {
      id: 8,
      name: "Starlight Crystal Ring",
      price: 42.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=400&fit=crop",
      category: "Jewelry & Accessories",
      subcategory: "Rings",
      rating: 4.7,
      reviews: 134,
      badge: "14% OFF"
    },
    // Functional Items - Keychains
    {
      id: 9,
      name: "Cosmic Keychain",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=400&fit=crop",
      category: "Functional Items",
      subcategory: "Keychains",
      rating: 4.6,
      reviews: 78,
      badge: "19% OFF"
    },
    {
      id: 10,
      name: "Ocean Wave Keychain",
      price: 14.99,
      originalPrice: 17.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Functional Items",
      subcategory: "Keychains",
      rating: 4.8,
      reviews: 92,
      badge: "17% OFF"
    },
    // Wedding & Special Items
    {
      id: 11,
      name: "Custom Wedding Nameplate",
      price: 89.99,
      originalPrice: 105.99,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      category: "Wedding",
      subcategory: "Nameplates",
      rating: 5.0,
      reviews: 45,
      badge: "15% OFF"
    },
    {
      id: 12,
      name: "Couple Heart Keychains",
      price: 24.99,
      originalPrice: 28.99,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=400&fit=crop",
      category: "Couple Items",
      subcategory: "Keychains",
      rating: 4.9,
      reviews: 156,
      badge: "14% OFF"
    },
    // Birthstone & Baby Items
    {
      id: 13,
      name: "Birthstone Crystal Pendant",
      price: 52.99,
      originalPrice: 62.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      category: "Birthstone",
      subcategory: "Jewelry",
      rating: 4.8,
      reviews: 234,
      badge: "16% OFF",
      canTryOn: true
    },
    {
      id: 14,
      name: "Baby Announcement Frame",
      price: 67.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
      category: "Baby Items",
      subcategory: "Frames",
      rating: 4.9,
      reviews: 78,
      badge: "15% OFF"
    },
    {
      id: 15,
      name: "Resin Memory Photo Frame",
      price: 34.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop",
      category: "Photo Frames",
      subcategory: "Resin Frames",
      rating: 4.7,
      reviews: 145,
      badge: "13% OFF"
    }
  ];

  // Add more products to reach 50-60 items
  const extendedProducts = [
    ...products,
    ...products.map(product => ({
      ...product,
      id: product.id + 15,
      name: `Premium ${product.name}`,
      price: product.price + 10
    })),
    ...products.map(product => ({
      ...product,
      id: product.id + 30,
      name: `Deluxe ${product.name}`,
      price: product.price + 20
    })),
    ...products.slice(0, 15).map(product => ({
      ...product,
      id: product.id + 45,
      name: `Limited ${product.name}`,
      price: product.price + 15
    }))
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onClose={handleCloseDetail} />;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-4">
            Our <span className="luxury-text-gradient">Collection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted resin art pieces, each telling a unique story through premium materials and artistic design.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {extendedProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.badge && (
                    <Badge 
                      className={`absolute top-2 left-2 ${
                        product.badge.includes('OFF') ? 'bg-luxury-rose' : 
                        product.badge === 'Best Seller' ? 'bg-luxury-gold' : 'bg-luxury-nude'
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  {product.canTryOn && (
                    <Badge className="absolute top-2 right-2 bg-foreground text-background">
                      Try-On Available
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart size={16} />
                  </Button>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-1">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < Math.floor(product.rating) ? 'fill-luxury-gold text-luxury-gold' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    size="sm" 
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to cart:', product.name);
                    }}
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
