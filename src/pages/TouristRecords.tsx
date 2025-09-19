import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Search, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Eye,
  Phone,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TouristRecords = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock tourist data
  const tourists = [
    {
      id: "TST-A7X9M2",
      name: "Kshitiz Sharma",
      idNumber: "ABCD1234****",
      lastLocation: "Historic Center",
      safetyScore: 92,
      status: "active",
      lastSeen: "2 mins ago",
      emergencyContact: "+91-98765-43210",
      itinerary: "3-day city tour"
    },
    {
      id: "TST-B8Y4N7",
      name: "Atishay Gupta",
      idNumber: "EFGH5678****",
      lastLocation: "Tourist District",
      safetyScore: 88,
      status: "active",
      lastSeen: "5 mins ago",
      emergencyContact: "+91-98765-43211",
      itinerary: "Heritage sites visit"
    },
    {
      id: "TST-C9Z1P5",
      name: "Manan Verma",
      idNumber: "IJKL9012****",
      lastLocation: "Market Area",
      safetyScore: 76,
      status: "warning",
      lastSeen: "15 mins ago",
      emergencyContact: "+91-98765-43212",
      itinerary: "Shopping and local cuisine"
    },
    {
      id: "TST-D3K8Q6",
      name: "Priya Singh",
      idNumber: "MNOP3456****",
      lastLocation: "Beach Front",
      safetyScore: 94,
      status: "active",
      lastSeen: "1 min ago",
      emergencyContact: "+91-98765-43213",
      itinerary: "Beach activities"
    },
    {
      id: "TST-E7L2R9",
      name: "Arjun Patel",
      idNumber: "QRST7890****",
      lastLocation: "Mountain Trail",
      safetyScore: 65,
      status: "alert",
      lastSeen: "45 mins ago",
      emergencyContact: "+91-98765-43214",
      itinerary: "Adventure trekking"
    }
  ];

  const filteredTourists = tourists.filter(tourist =>
    tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tourist.lastLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-safety";
    if (score >= 60) return "text-warning";
    return "text-alert";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'status-safe';
      case 'warning': return 'status-warning';
      case 'alert': return 'status-alert';
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
                  <h1 className="text-xl font-bold text-foreground">Tourist Records</h1>
                  <p className="text-sm text-muted-foreground">Manage and monitor all registered tourists</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary">
                {filteredTourists.length} records
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 focus:border-primary"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        {/* Tourist Records Table */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Active Tourist Records</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="space-y-4 p-6">
                {filteredTourists.map((tourist) => (
                  <div key={tourist.id} className="border border-border rounded-lg p-6 hover:bg-accent/50 transition-smooth">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Tourist Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{tourist.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{tourist.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ID Number</p>
                          <p className="font-mono text-sm">{tourist.idNumber}</p>
                        </div>
                        <Badge className={getStatusBadge(tourist.status)}>
                          {tourist.status.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Location & Safety */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Last Location</p>
                            <p className="font-medium">{tourist.lastLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Last Seen</p>
                            <p className="text-sm">{tourist.lastSeen}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Safety Score</p>
                          <p className={`text-2xl font-bold ${getScoreColor(tourist.safetyScore)}`}>
                            {tourist.safetyScore}
                          </p>
                        </div>
                      </div>

                      {/* Contact & Itinerary */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Emergency Contact</p>
                          <p className="font-mono text-sm">{tourist.emergencyContact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Itinerary</p>
                          <p className="text-sm">{tourist.itinerary}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-2 lg:items-end">
                        <Button size="sm" variant="outline" className="w-full lg:w-auto">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="w-full lg:w-auto">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline" className="w-full lg:w-auto">
                          <MapPin className="h-4 w-4 mr-2" />
                          Track Location
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-safety mb-2">
                {filteredTourists.filter(t => t.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">Active Tourists</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                {filteredTourists.filter(t => t.status === 'warning').length}
              </div>
              <p className="text-sm text-muted-foreground">Need Attention</p>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-alert mb-2">
                {filteredTourists.filter(t => t.status === 'alert').length}
              </div>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TouristRecords;