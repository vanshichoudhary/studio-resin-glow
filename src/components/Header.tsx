
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = {
    'Home Decor': ['Coasters', 'Trays', 'Wall Art'],
    'Jewelry & Accessories': ['Pendants', 'Earrings', 'Rings', 'Hair Clips'],
    'Functional Items': ['Keychains', 'Bookmarks', 'Phone Grips', 'Candle Holders'],
    'Wedding Collection': ['Wedding Nameplates', 'Couple Keychains'],
    'Custom Items': ['Birthstone Jewelry', 'Baby Announcement Frames', 'Resin Photo Frames']
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top promotional banner */}
      <div className="bg-luxury-rose text-center py-2 px-4">
        <span className="text-sm font-medium text-foreground">
          🎉 UP TO 15% OFF - ORDER NOW! 🎉
        </span>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl md:text-3xl font-luxury luxury-text-gradient font-bold">
              CURED & CO STUDIO
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div 
                key={category}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center space-x-1 text-foreground hover:text-luxury-gold transition-colors">
                  <span>{category}</span>
                  <ChevronDown size={16} />
                </button>
                
                {/* Dropdown */}
                <div className={`absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border transition-all duration-200 ${
                  activeCategory === category ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <div className="py-2">
                    {subcategories.map((item) => (
                      <a 
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-luxury-creme transition-colors"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-muted rounded-full px-4 py-2">
              <Search size={20} className="text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="border-0 bg-transparent focus-visible:ring-0 text-sm"
              />
            </div>
            
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-luxury-rose text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="flex items-center space-x-2 bg-muted rounded-full px-4 py-2">
            <Search size={20} className="text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="border-0 bg-transparent focus-visible:ring-0 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            {Object.entries(categories).map(([category, subcategories]) => (
              <div key={category} className="mb-4">
                <h3 className="font-semibold text-foreground mb-2">{category}</h3>
                <div className="pl-4 space-y-1">
                  {subcategories.map((item) => (
                    <a 
                      key={item}
                      href="#"
                      className="block text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
