import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Satellite, Globe, TrendingUp, Menu, Calculator, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/", icon: Globe, isRoute: true },
    { label: "Calculator", href: "/calculator", icon: Calculator, isRoute: true },
    { label: "AI Assistant", href: "/assistant", icon: MessageSquare, isRoute: true },
    { label: "Dashboard", href: "#dashboard", icon: TrendingUp },
    { label: "Marketplace", href: "#marketplace", icon: Satellite },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-card-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Satellite className="h-8 w-8 text-primary animate-pulse-glow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CarbonEye
              </h1>
              <p className="text-xs text-muted-foreground">Satellite Carbon Credits</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.isRoute ? (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge variant="secondary" className="bg-success text-success-foreground">
              Live Monitoring
            </Badge>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-primary text-primary-foreground shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card border-card-border">
              <div className="flex flex-col space-y-6 mt-6">
                {navItems.map((item) => (
                  item.isRoute ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        navigate(item.href);
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors text-left"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-lg">{item.label}</span>
                    </button>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-lg">{item.label}</span>
                    </a>
                  )
                ))}
                <div className="pt-4 border-t border-card-border space-y-3">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                  <Button size="sm" className="w-full bg-gradient-primary text-primary-foreground">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;