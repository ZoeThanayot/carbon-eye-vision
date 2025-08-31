import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  TrendingUp, 
  Shield, 
  Users, 
  Leaf, 
  Building,
  TreePine,
  Factory,
  Plane,
  Store
} from "lucide-react";

const Marketplace = () => {
  const carbonCredits = [
    {
      id: 1,
      title: "Thai Primary Forest Conservation",
      location: "Chiang Mai Province",
      credits: "10,000 tCO2",
      price: "$45",
      verified: true,
      type: "Forest Conservation",
      icon: TreePine,
      progress: 85
    },
    {
      id: 2,
      title: "Mangrove Restoration Project",
      location: "Samut Prakan",
      credits: "7,500 tCO2",
      price: "$52",
      verified: true,
      type: "Restoration",
      icon: Leaf,
      progress: 92
    },
    {
      id: 3,
      title: "Sustainable Agriculture Initiative",
      location: "Khon Kaen",
      credits: "5,200 tCO2",
      price: "$38",
      verified: true,
      type: "Agriculture",
      icon: Building,
      progress: 78
    }
  ];

  const buyers = [
    { type: "Aviation", icon: Plane, demand: "High", color: "text-destructive" },
    { type: "Manufacturing", icon: Factory, demand: "Medium", color: "text-warning" },
    { type: "Retail", icon: Store, demand: "High", color: "text-success" },
    { type: "Tech", icon: Building, demand: "Very High", color: "text-primary" }
  ];

  return (
    <section id="marketplace" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Carbon Trading Platform
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Global </span>
            <span className="bg-gradient-earth bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect carbon credit sellers with buyers worldwide. Our satellite-verified credits 
            ensure transparency and trust in every transaction.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Active Credits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">2.4M</div>
              <p className="text-muted-foreground">tCO2 Available</p>
              <Badge variant="secondary" className="mt-2 bg-success/20 text-success">
                +15.2% this month
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>Market Price</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">$47.80</div>
              <p className="text-muted-foreground">Average per tCO2</p>
              <Badge variant="secondary" className="mt-2 bg-success/20 text-success">
                +3.5% today
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Users className="h-5 w-5 text-warning" />
                <span>Active Traders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">1,247</div>
              <p className="text-muted-foreground">Verified Participants</p>
              <Badge variant="secondary" className="mt-2 bg-primary/20 text-primary">
                24/7 Trading
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Available Credits */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-success" />
            Verified Carbon Credits
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {carbonCredits.map((credit) => (
              <Card key={credit.id} className="bg-gradient-card border-card-border shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <credit.icon className="h-5 w-5 text-success" />
                      <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                        {credit.verified ? "Satellite Verified" : "Pending"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{credit.price}</div>
                      <div className="text-xs text-muted-foreground">per tCO2</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{credit.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{credit.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Credits</span>
                      <span className="font-semibold text-foreground">{credit.credits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Project Type</span>
                      <span className="font-semibold text-foreground">{credit.type}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Verification Progress</span>
                        <span className="text-foreground">{credit.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-earth h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${credit.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button className="w-full" variant="success">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Purchase Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Buyer Demand */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Industry Demand</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {buyers.map((buyer) => (
              <Card key={buyer.type} className="bg-gradient-card border-card-border shadow-card text-center">
                <CardContent className="p-6">
                  <buyer.icon className={`h-8 w-8 mx-auto mb-3 ${buyer.color}`} />
                  <h4 className="font-semibold text-foreground mb-2">{buyer.type}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`${buyer.color.replace('text-', 'bg-')}/20 ${buyer.color}`}
                  >
                    {buyer.demand} Demand
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-hero p-8 border-card-border shadow-elevated max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Ready to Trade?</CardTitle>
              <CardDescription className="text-muted-foreground">
                Join thousands of verified traders on our global carbon credit marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Leaf className="mr-2 h-5 w-5" />
                  Sell Credits
                </Button>
                <Button variant="outline" size="lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Buy Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;