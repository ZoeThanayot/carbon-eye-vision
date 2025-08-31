import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  Brain, 
  Shield, 
  Globe, 
  TrendingUp, 
  Zap,
  Eye,
  Leaf,
  Users
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Satellite,
      title: "Satellite Monitoring",
      description: "24/7 real-time monitoring using advanced Earth observation satellites including Sentinel, Landsat, and ESA Biomass data",
      badge: "Real-time",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Machine learning algorithms process satellite imagery to accurately calculate biomass and carbon sequestration rates",
      badge: "AI/ML",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Shield,
      title: "Verified Credits",
      description: "100% transparent and traceable carbon credits that meet international standards (T-VER, Verra, VCM)",
      badge: "Certified",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: Globe,
      title: "Global Platform",
      description: "Connect with buyers and sellers worldwide through our comprehensive carbon trading marketplace",
      badge: "Global",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Advanced analytics and reporting tools to track performance, pricing trends, and market opportunities",
      badge: "Analytics",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Empower local communities and farmers with new revenue streams from sustainable forest management",
      badge: "Social Impact",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Platform Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Why Choose </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CarbonEye
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our revolutionary platform combines cutting-edge space technology with AI to create 
            the most accurate and transparent carbon credit system in the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-card-border shadow-card hover:shadow-elevated transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className={`${feature.color} text-xs`}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Satellite className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">1. Data Collection</h4>
              <p className="text-muted-foreground text-sm">
                Satellites continuously monitor forest areas and collect high-resolution imagery
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-earth p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">2. AI Analysis</h4>
              <p className="text-muted-foreground text-sm">
                Machine learning algorithms process data to calculate biomass and carbon storage
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">3. Verification</h4>
              <p className="text-muted-foreground text-sm">
                Credits are verified against international standards and blockchain-secured
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-earth p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">4. Trading</h4>
              <p className="text-muted-foreground text-sm">
                Credits are made available on our global marketplace for instant trading
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              Competitive Advantage
            </Badge>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              The Future of Carbon Credits
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Instant Verification</h4>
                  <p className="text-muted-foreground text-sm">
                    Reduce verification time from months to minutes with satellite data
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-success mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Complete Transparency</h4>
                  <p className="text-muted-foreground text-sm">
                    Every credit is traceable from satellite image to marketplace transaction
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Leaf className="h-5 w-5 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Environmental Impact</h4>
                  <p className="text-muted-foreground text-sm">
                    Support Thailand's Net Zero 2050 goals and global climate action
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-hero p-8 border-card-border shadow-elevated">
            <CardContent className="text-center">
              <div className="text-6xl font-bold text-foreground mb-4">21.6%</div>
              <p className="text-xl text-muted-foreground mb-6">
                Expected market growth (CAGR 2024-2029)
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-success">$4.13B</div>
                  <div className="text-sm text-muted-foreground">Market Value 2029</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;