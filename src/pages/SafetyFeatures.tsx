import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Phone, 
  Users, 
  ArrowLeft,
  Map,
  Zap,
  Eye,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import KazirangaMap from "@/components/KazirangaMap";

const SafetyFeatures = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [locationSharing, setLocationSharing] = useState(false);
  const [safetyScore] = useState(87); // Mock safety score

  // Kaziranga National Park geo-fencing zones
  const zones = [
    { name: "Central Range", status: "safe", visitors: 45 },
    { name: "Western Range", status: "safe", visitors: 32 },
    { name: "Eastern Range", status: "safe", visitors: 28 },
    { name: "Burapahar Range", status: "warning", visitors: 15 },
    { name: "Buffer Zone", status: "restricted", visitors: 3 },
    { name: "Core Wilderness Area", status: "restricted", visitors: 1 }
  ];

  const handleSOS = () => {
    toast({
      title: "🚨 SOS ALERT ACTIVATED",
      description: "Emergency services have been notified. Help is on the way!",
      variant: "destructive",
    });
  };

  const toggleLocationSharing = () => {
    setLocationSharing(!locationSharing);
    toast({
      title: locationSharing ? "Location Sharing Disabled" : "Location Sharing Enabled",
      description: locationSharing 
        ? "Your location is no longer being shared with family members"
        : "Your family members can now track your live location",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-safety";
    if (score >= 60) return "text-warning";
    return "text-alert";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Caution Required";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/tourist-id')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold text-foreground">Safety Dashboard</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
            >
              Exit to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Your Safety Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time safety monitoring and emergency features
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Safety Score */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Safety Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${getScoreColor(safetyScore)}`}>
                    {safetyScore}
                  </div>
                  <Progress value={safetyScore} className="h-3" />
                  <Badge 
                    className={
                      safetyScore >= 80 ? "status-safe" : 
                      safetyScore >= 60 ? "status-warning" : "status-alert"
                    }
                  >
                    {getScoreStatus(safetyScore)}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Based on location, time, and local conditions
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SOS Button */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-alert" />
                  <span>Emergency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <Button 
                    onClick={handleSOS}
                    className="btn-sos w-32 h-32 rounded-full animate-alert-pulse"
                    size="lg"
                  >
                    SOS
                  </Button>
                  <div className="space-y-2">
                    <p className="font-semibold text-alert">Emergency Button</p>
                    <p className="text-sm text-muted-foreground">
                      Press and hold for 3 seconds to alert authorities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Sharing */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Family Tracking</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Live Location</p>
                      <p className="text-sm text-muted-foreground">Share with family</p>
                    </div>
                    <Switch 
                      checked={locationSharing}
                      onCheckedChange={toggleLocationSharing}
                    />
                  </div>
                  
                  {locationSharing && (
                    <div className="p-4 bg-safety/10 border border-safety rounded-lg animate-fade-in">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-4 w-4 text-safety" />
                        <span className="text-sm font-semibold text-safety-foreground">Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        2 family members are tracking your location
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Current: Central Range, Kaziranga</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Zones */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Kaziranga National Park Map */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5 text-primary" />
                  <span>Kaziranga National Park Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <KazirangaMap className="w-full" />
                
                <div className="flex justify-between mt-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-safety rounded-full"></div>
                    <span>Safe</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span>Caution</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-alert rounded-full"></div>
                    <span>Restricted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>You</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Details */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Zone Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {zones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          zone.status === 'safe' ? 'bg-safety' :
                          zone.status === 'warning' ? 'bg-warning' : 'bg-alert'
                        }`}></div>
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{zone.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{zone.visitors}</p>
                        <p className="text-xs text-muted-foreground">visitors</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">Last Updated</span>
                  </div>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">Call Help</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm">Share Location</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Find Tourist Group</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col space-y-2"
                    onClick={() => navigate('/authority-dashboard')}
                  >
                    <Eye className="h-6 w-6" />
                    <span className="text-sm">View Authority Dashboard</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyFeatures;