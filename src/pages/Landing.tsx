import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, AlertTriangle, Users, Eye, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-safety.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Real-time Safety Monitoring",
      description: "Advanced algorithms track tourist safety scores and provide instant alerts"
    },
    {
      icon: MapPin,
      title: "Smart Geo-fencing",
      description: "Intelligent zone mapping with automatic risk assessment and notifications"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Response",
      description: "Instant SOS alerts with precise location sharing to authorities"
    },
    {
      icon: Users,
      title: "Family Tracking",
      description: "Share live location with family members for peace of mind"
    },
    {
      icon: Eye,
      title: "Authority Dashboard",
      description: "Comprehensive monitoring tools for tourist safety management"
    },
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "End-to-end encrypted data protection with blockchain technology"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Smart Tourist Safety</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/authority-login')}
                className="text-muted-foreground hover:text-primary"
              >
                Authority Login
              </Button>
              <Button 
                onClick={() => navigate('/tourist-id')}
                className="btn-hero"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-foreground leading-tight">
                  Smart Tourist Safety & 
                  <span className="text-primary block">Monitoring System</span>
                </h1>
                <p className="text-2xl text-primary font-semibold tracking-wide">
                  Smart Safety. Smart Tourism.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Advanced AI-powered safety monitoring system ensuring secure and enjoyable travel experiences 
                  with real-time tracking, emergency response, and comprehensive authority oversight.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/tourist-id')}
                  className="btn-hero text-lg px-8 py-6"
                >
                  Get Your Tourist ID
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/safety-features')}
                  className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  Explore Safety Features
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <img 
                src={heroImage} 
                alt="Smart Tourist Safety System"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Safety Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology to ensure tourist safety with real-time monitoring and intelligent response systems
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated hover:shadow-2xl transition-smooth group">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-smooth">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Travel Safely?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of tourists who trust our smart safety monitoring system for secure and memorable travel experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/tourist-id')}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg"
              >
                Start Your Journey
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/authority-login')}
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                Authority Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Smart Tourist Safety</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 Smart Tourist Safety & Monitoring System. Built for Smart India Hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;