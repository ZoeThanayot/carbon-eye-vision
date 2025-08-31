import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Satellite, Eye, TrendingUp, Shield, Globe } from "lucide-react";
import heroImage from "@/assets/hero-satellite.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Card className="p-4 bg-card/60 backdrop-blur-sm border-card-border">
          <div className="flex items-center space-x-2">
            <Satellite className="h-5 w-5 text-primary" />
            <span className="text-sm text-foreground">Live Satellite Data</span>
          </div>
        </Card>
      </div>
      
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Card className="p-4 bg-card/60 backdrop-blur-sm border-card-border">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="text-sm text-foreground">AI Analysis</span>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
          {/* Badge */}
          <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
            🛰️ Space Technology • Environmental Impact
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Carbon Credits
            </span>
            <br />
            <span className="text-foreground">From Space</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            CarbonEye uses satellite data and AI to monitor forests, calculate carbon sequestration, 
            and create verifiable carbon credits. Join the future of environmental monitoring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300 px-8 py-6 text-lg"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Live Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-card-border bg-card/60 backdrop-blur-sm hover:bg-card/80 px-8 py-6 text-lg"
            >
              <Globe className="mr-2 h-5 w-5" />
              Explore Marketplace
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-card-border shadow-card">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-muted-foreground">Satellite Monitoring</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-card-border shadow-card">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-success">AI-Powered</div>
                <div className="text-muted-foreground">Carbon Analysis</div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-card-border shadow-card">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-warning">100%</div>
                <div className="text-muted-foreground">Verifiable Credits</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;