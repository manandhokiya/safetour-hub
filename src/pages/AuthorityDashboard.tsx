import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin, 
  TrendingUp,
  Clock,
  Eye,
  FileText,
  LogOut,
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import dashboardImage from "@/assets/dashboard-preview.jpg";

const AuthorityDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalTourists: 1247,
    activeTourists: 892,
    safetyAlerts: 3,
    avgSafetyScore: 84
  };

  const recentAlerts = [
    { id: 1, type: "SOS", tourist: "Kshitiz Sharma", location: "Market Area", time: "2 mins ago", status: "active" },
    { id: 2, type: "Geo-fence", tourist: "Atishay Gupta", location: "Construction Zone", time: "15 mins ago", status: "resolved" },
    { id: 3, type: "Anomaly", tourist: "Manan Verma", location: "Tourist District", time: "1 hour ago", status: "investigating" }
  ];


  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const getAlertBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'status-alert';
      case 'resolved': return 'status-safe';
      case 'investigating': return 'status-warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">Authority Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Tourist Safety Monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary">
                <Clock className="h-3 w-3 mr-1" />
                Live
              </Badge>
              <Button 
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex space-x-6 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-2 font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => navigate('/tourist-records')}
            className="pb-4 px-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Tourist Records
          </button>
          <button
            onClick={() => navigate('/alerts')}
            className="pb-4 px-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Alerts
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tourists</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalTourists}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2">
                <Badge className="status-safe text-xs">+12% from yesterday</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currently Active</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeTourists}</p>
                </div>
                <Eye className="h-8 w-8 text-safety" />
              </div>
              <div className="mt-2">
                <Badge className="status-safe text-xs">Live tracking</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Safety Alerts</p>
                  <p className="text-2xl font-bold text-foreground">{stats.safetyAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-alert" />
              </div>
              <div className="mt-2">
                <Badge className="status-warning text-xs">3 active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Safety Score</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgSafetyScore}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-safety" />
              </div>
              <div className="mt-2">
                <Badge className="status-safe text-xs">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8">
          {/* Recent Alerts */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-alert" />
                  <span>Recent Alerts</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/alerts')}
                >
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getAlertBadgeVariant(alert.status)}>
                          {alert.type}
                        </Badge>
                        <span className="font-medium">{alert.tourist}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          alert.status === 'active' ? 'border-alert text-alert' :
                          alert.status === 'resolved' ? 'border-safety text-safety' :
                          'border-warning text-warning'
                        }`}
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/tourist-records')}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Tourist Records</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/alerts')}
                >
                  <AlertTriangle className="h-6 w-6" />
                  <span className="text-sm">Manage Alerts</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Generate Report</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col space-y-2"
                  onClick={() => navigate('/safety-features')}
                >
                  <Eye className="h-6 w-6" />
                  <span className="text-sm">Tourist View</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;