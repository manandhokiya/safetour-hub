import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, QrCode, Download, ArrowLeft, User, MapPin, Phone, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TouristId = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerated, setIsGenerated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    itinerary: "",
    emergencyContact: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateId = () => {
    if (!formData.name || !formData.idNumber || !formData.emergencyContact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerated(true);
    toast({
      title: "Tourist ID Generated!",
      description: "Your digital tourist ID has been created successfully",
    });
  };

  const downloadId = () => {
    toast({
      title: "Download Started",
      description: "Your Tourist ID is being downloaded...",
    });
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
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold text-foreground">Digital Tourist ID</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/safety-features')}
              className="bg-primary text-primary-foreground"
            >
              Continue to Safety Features
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Generate Your Digital Tourist ID
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your secure digital identity for safe tourism
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>Full Name *</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Aadhaar/Passport Number *</span>
                  </Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    className="border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Emergency Contact *</span>
                  </Label>
                  <Input
                    id="emergencyContact"
                    placeholder="Emergency contact number"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="itinerary" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Trip Itinerary</span>
                  </Label>
                  <Textarea
                    id="itinerary"
                    placeholder="Describe your travel plans..."
                    value={formData.itinerary}
                    onChange={(e) => handleInputChange('itinerary', e.target.value)}
                    className="border-2 focus:border-primary min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={generateId}
                  className="w-full btn-hero"
                  size="lg"
                  disabled={isGenerated}
                >
                  {isGenerated ? "ID Generated" : "Generate Tourist ID"}
                </Button>
              </CardContent>
            </Card>

            {/* ID Card Preview */}
            <Card className={`card-elevated ${isGenerated ? 'animate-fade-in' : 'opacity-50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <QrCode className="h-5 w-5 text-primary" />
                  <span>Digital Tourist ID</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isGenerated ? (
                  <div className="space-y-6">
                    {/* ID Card */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground p-6 rounded-xl shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">SMART TOURIST ID</h3>
                          <p className="text-sm opacity-90">Digital Identity Card</p>
                        </div>
                        <Shield className="h-8 w-8" />
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm opacity-90">Name</p>
                          <p className="font-semibold">{formData.name || "Tourist Name"}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">ID Number</p>
                          <p className="font-mono">{formData.idNumber || "XXXX-XXXX-XXXX"}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Tourist ID</p>
                          <p className="font-mono">TST-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-end mt-6">
                        <div>
                          <Badge className="bg-white/20 text-white">VERIFIED</Badge>
                        </div>
                        <div className="bg-white/20 p-2 rounded">
                          <QrCode className="h-12 w-12" />
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-4">
                      <div className="p-4 bg-safety/10 border border-safety rounded-lg">
                        <h4 className="font-semibold text-safety-foreground mb-2">Emergency Contact</h4>
                        <p className="text-sm">{formData.emergencyContact || "Not provided"}</p>
                      </div>
                      
                      {formData.itinerary && (
                        <div className="p-4 bg-accent rounded-lg">
                          <h4 className="font-semibold text-accent-foreground mb-2">Travel Itinerary</h4>
                          <p className="text-sm text-muted-foreground">{formData.itinerary}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        onClick={downloadId}
                        className="flex-1"
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download ID
                      </Button>
                      <Button 
                        onClick={() => navigate('/safety-features')}
                        className="flex-1 btn-hero"
                      >
                        Continue to Safety Features
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <QrCode className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Fill in your information to generate your digital tourist ID
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristId;