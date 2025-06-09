
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative luxury-gradient min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-animation absolute top-20 left-[10%] w-16 h-16 bg-luxury-rose rounded-full opacity-60"></div>
        <div className="floating-delayed absolute top-32 right-[15%] w-12 h-12 bg-luxury-gold rounded-lg opacity-40"></div>
        <div className="floating-delayed-2 absolute bottom-32 left-[20%] w-20 h-20 bg-luxury-nude rounded-full opacity-50"></div>
        <div className="floating-animation absolute bottom-20 right-[25%] w-14 h-14 bg-luxury-creme rounded-lg opacity-60"></div>
        
        {/* Product silhouettes floating */}
        <div className="floating-delayed absolute top-1/4 left-[5%] w-24 h-32 opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-luxury-gold to-luxury-rose rounded-full"></div>
        </div>
        <div className="floating-animation absolute top-1/3 right-[8%] w-20 h-28 opacity-20">
          <div className="w-full h-full bg-gradient-to-b from-luxury-nude to-luxury-creme rounded-lg"></div>
        </div>
        <div className="floating-delayed-2 absolute bottom-1/4 right-[12%] w-28 h-24 opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-luxury-rose to-luxury-gold rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold mb-6 animate-fade-in-up">
            <span className="luxury-text-gradient">Handcrafted</span>
            <br />
            <span className="text-foreground">Resin Artistry</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Discover our collection of premium resin art pieces, jewelry, and home decor. 
            Each piece is uniquely crafted with love and attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 text-lg">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-foreground hover:bg-foreground hover:text-background">
              Virtual Try-On
            </Button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
