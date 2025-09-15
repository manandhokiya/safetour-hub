import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Phone,
  Eye,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AlertsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filter, setFilter] = useState('all');

  // Mock alerts data
  const alerts = [
    {
      id: "ALT-001",
      type: "SOS",
      priority: "critical",
      tourist: "John Doe",
      touristId: "TST-A7X9M2",
      location: "Market Area",
      coordinates: "12.9716° N, 77.5946° E",
      time: "2 mins ago",
      status: "active",
      description: "Emergency SOS button activated",
      responseTeam: "Team Alpha",
      estimatedArrival: "5 mins"
    },
    {
      id: "ALT-002",
      type: "Geo-fence Breach",
      priority: "high",
      tourist: "Jane Smith",
      touristId: "TST-B8Y4N7",
      location: "Construction Zone",
      coordinates: "12.9616° N, 77.5846° E",
      time: "15 mins ago",
      status: "investigating",
      description: "Tourist entered restricted construction area",
      responseTeam: "Team Beta",
      estimatedArrival: "N/A"
    },
    {
      id: "ALT-003",
      type: "Anomaly Detection",
      priority: "medium",
      tourist: "Mike Johnson",
      touristId: "TST-C9Z1P5",
      location: "Tourist District",
      coordinates: "12.9816° N, 77.6046° E",
      time: "1 hour ago",
      status: "resolved",
      description: "Unusual movement pattern detected",
      responseTeam: "Team Gamma",
      estimatedArrival: "Completed"
    },
    {
      id: "ALT-004",
      type: "Safety Score Drop",
      priority: "medium",
      tourist: "David Brown",
      touristId: "TST-E7L2R9",
      location: "Mountain Trail",
      coordinates: "12.9516° N, 77.5746° E",
      time: "45 mins ago",
      status: "active",
      description: "Safety score dropped below threshold (65)",
      responseTeam: "Team Delta",
      estimatedArrival: "10 mins"
    },
    {
      id: "ALT-005",
      type: "Lost Connection",
      priority: "high",
      tourist: "Sarah Wilson",
      touristId: "TST-D3K8Q6",
      location: "Beach Front",
      coordinates: "12.9416° N, 77.5646° E",
      time: "30 mins ago",
      status: "investigating",
      description: "Lost GPS signal for extended period",
      responseTeam: "Team Echo",
      estimatedArrival: "15 mins"
    }
  ];

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.status === filter);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-alert';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return 'status-alert';
      case 'high': return 'status-warning';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'status-alert';
      case 'investigating': return 'status-warning';
      case 'resolved': return 'status-safe';
      default: return 'secondary';
    }
  };

  const handleResolveAlert = (alertId: string) => {
    toast({
      title: "Alert Resolved",
      description: `Alert ${alertId} has been marked as resolved`,
    });
  };

  const handleContactTourist = (tourist: string) => {
    toast({
      title: "Contacting Tourist",
      description: `Calling ${tourist}...`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/authority-dashboard')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">Safety Alerts</h1>
                  <p className="text-sm text-muted-foreground">Monitor and respond to tourist safety alerts</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-alert/10 text-alert animate-pulse">
                {alerts.filter(a => a.status === 'active').length} Active
              </Badge>
              <Badge className="bg-warning/10 text-warning">
                {alerts.filter(a => a.status === 'investigating').length} Investigating
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Filter Buttons */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>All Alerts ({alerts.length})</span>
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Active ({alerts.filter(a => a.status === 'active').length})</span>
          </Button>
          <Button
            variant={filter === 'investigating' ? 'default' : 'outline'}
            onClick={() => setFilter('investigating')}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Investigating ({alerts.filter(a => a.status === 'investigating').length})</span>
          </Button>
          <Button
            variant={filter === 'resolved' ? 'default' : 'outline'}
            onClick={() => setFilter('resolved')}
            className="flex items-center space-x-2"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Resolved ({alerts.filter(a => a.status === 'resolved').length})</span>
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert) => (
            <Card key={alert.id} className={`card-elevated ${
              alert.priority === 'critical' ? 'border-l-4 border-l-alert' :
              alert.priority === 'high' ? 'border-l-4 border-l-warning' :
              'border-l-4 border-l-primary'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Badge className={getPriorityBadge(alert.priority)}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusBadge(alert.status)}>
                        {alert.status.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">
                        {alert.id}
                      </span>
                    </div>
                    <CardTitle className={`text-xl ${getPriorityColor(alert.priority)}`}>
                      {alert.type}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Alert Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Tourist Information</h4>
                      <p className="font-medium">{alert.tourist}</p>
                      <p className="text-sm text-muted-foreground font-mono">{alert.touristId}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Location</h4>
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{alert.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">{alert.coordinates}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Response Team</h4>
                      <p className="text-sm">{alert.responseTeam}</p>
                      <p className="text-sm text-muted-foreground">ETA: {alert.estimatedArrival}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      className="flex items-center space-x-2"
                      onClick={() => handleContactTourist(alert.tourist)}
                    >
                      <Phone className="h-4 w-4" />
                      <span>Contact Tourist</span>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <MapPin className="h-4 w-4" />
                      <span>View on Map</span>
                    </Button>
                    
                    {alert.status !== 'resolved' && (
                      <Button 
                        variant="outline"
                        className="flex items-center space-x-2 border-safety text-safety hover:bg-safety hover:text-safety-foreground"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Mark Resolved</span>
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      className="flex items-center space-x-2 border-alert text-alert hover:bg-alert hover:text-alert-foreground"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Escalate</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <Card className="card-elevated">
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-safety mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {filter === 'all' ? '' : filter + ' '}alerts found
              </h3>
              <p className="text-muted-foreground">
                {filter === 'all' 
                  ? 'All systems are operating normally'
                  : `No ${filter} alerts at this time`
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;