
import { useState } from 'react';
import { ShoppingCart, Plus, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ProductGrid = () => {
  const [favorites, setFavorites] = useState(new Set());

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Ocean Wave Coaster Set",
      category: "Home Decor",
      price: 28.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      isNew: true
    },
    {
      id: 2,
      name: "Celestial Pendant Necklace",
      category: "Jewelry & Accessories",
      price: 45.99,
      originalPrice: 52.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 87,
      isNew: false
    },
    {
      id: 3,
      name: "Marble Effect Tray",
      category: "Home Decor",
      price: 32.99,
      originalPrice: 38.99,
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      isNew: true
    },
    {
      id: 4,
      name: "Galaxy Keychain",
      category: "Functional Items",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 203,
      isNew: false
    },
    {
      id: 5,
      name: "Rose Gold Earrings",
      category: "Jewelry & Accessories",
      price: 39.99,
      originalPrice: 46.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 92,
      isNew: true
    },
    {
      id: 6,
      name: "Geometric Wall Art",
      category: "Home Decor",
      price: 55.99,
      originalPrice: 65.99,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 76,
      isNew: false
    }
  ];

  // Duplicate products to reach 50-60 items
  const allProducts = Array.from({ length: 10 }, (_, i) => 
    products.map(product => ({
      ...product,
      id: product.id + (i * products.length),
      name: `${product.name} ${i > 0 ? `V${i + 1}` : ''}`.trim()
    }))
  ).flat();

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-luxury font-bold mb-4">
            Featured <span className="luxury-text-gradient">Collection</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium resin art pieces, each telling its own unique story
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-luxury-gold text-foreground text-xs px-2 py-1 rounded-full font-medium">
                        NEW
                      </span>
                    )}
                    <span className="bg-luxury-rose text-foreground text-xs px-2 py-1 rounded-full font-medium">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart 
                      size={16} 
                      className={favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                    />
                  </button>

                  {/* Quick actions */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="bg-white text-foreground hover:bg-gray-100">
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                  
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
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-foreground">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>

                  {/* Add to cart button */}
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
