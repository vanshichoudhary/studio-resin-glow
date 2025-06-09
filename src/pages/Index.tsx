
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import VirtualTryOn from '@/components/VirtualTryOn';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductGrid />
      <VirtualTryOn />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-luxury text-xl font-bold mb-4">CURED & CO STUDIO</h3>
              <p className="text-sm opacity-80">
                Handcrafted resin art pieces that tell unique stories. Each creation is made with love and attention to detail.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100">About Us</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Contact</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Shipping Info</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="opacity-80 hover:opacity-100">Home Decor</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Jewelry</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Functional Items</a></li>
                <li><a href="#" className="opacity-80 hover:opacity-100">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="opacity-80 hover:opacity-100">Instagram</a>
                <a href="#" className="opacity-80 hover:opacity-100">Facebook</a>
                <a href="#" className="opacity-80 hover:opacity-100">Pinterest</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-60">
              © 2024 Cured & Co Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
