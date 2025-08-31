import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Satellite, 
  TrendingUp, 
  TreePine, 
  Leaf, 
  Globe, 
  Activity,
  DollarSign,
  MapPin
} from "lucide-react";

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Real-time Monitoring
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Live Dashboard
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor forest coverage, track carbon sequestration, and manage your carbon credits 
            with real-time satellite data and AI-powered analytics.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Monitoring Areas
              </CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">2,847</div>
              <Badge variant="secondary" className="mt-2 bg-success/20 text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Carbon Credits Generated
              </CardTitle>
              <Leaf className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">156,420</div>
              <Badge variant="secondary" className="mt-2 bg-success/20 text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Revenue Generated
              </CardTitle>
              <DollarSign className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$2.4M</div>
              <Badge variant="secondary" className="mt-2 bg-warning/20 text-warning">
                <TrendingUp className="h-3 w-3 mr-1" />
                +24.1%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Satellite Coverage
              </CardTitle>
              <Satellite className="h-4 w-4 text-primary animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">98.7%</div>
              <Badge variant="secondary" className="mt-2 bg-primary/20 text-primary">
                <Activity className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="h-5 w-5 text-success" />
                <span>Forest Coverage Analysis</span>
              </CardTitle>
              <CardDescription>
                Real-time satellite monitoring of forest areas and biomass estimation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Primary Forest</span>
                  <span className="text-foreground font-medium">78.5%</span>
                </div>
                <Progress value={78.5} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Secondary Forest</span>
                  <span className="text-foreground font-medium">65.2%</span>
                </div>
                <Progress value={65.2} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reforestation Areas</span>
                  <span className="text-foreground font-medium">89.1%</span>
                </div>
                <Progress value={89.1} className="h-2" />
              </div>

              <Button variant="outline" className="w-full mt-4">
                <Globe className="mr-2 h-4 w-4" />
                View Detailed Maps
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-card-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>AI Carbon Analysis</span>
              </CardTitle>
              <CardDescription>
                Machine learning models processing satellite data for carbon estimation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Processing Status</p>
                  <p className="text-2xl font-bold text-success">Active</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Update</p>
                  <p className="text-sm font-medium">2 minutes ago</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Collection</span>
                  <Badge variant="secondary" className="bg-success/20 text-success">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Biomass Analysis</span>
                  <Badge variant="secondary" className="bg-success/20 text-success">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carbon Calculation</span>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">Processing</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Credit Generation</span>
                  <Badge variant="secondary" className="bg-muted/50 text-muted-foreground">Pending</Badge>
                </div>
              </div>

              <Button variant="hero" className="w-full mt-4">
                <TrendingUp className="mr-2 h-4 w-4" />
                View AI Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Satellite className="mr-2 h-5 w-5" />
              Access Full Dashboard
            </Button>
            <Button variant="outline" size="lg">
              <Globe className="mr-2 h-5 w-5" />
              Download Reports
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;