import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AuthorityLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleLogin = () => {
    // Dummy credentials check
    if (credentials.username === "admin" && credentials.password === "admin123") {
      toast({
        title: "Login Successful",
        description: "Welcome to Authority Dashboard",
      });
      navigate('/authority-dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try admin/admin123",
        variant: "destructive"
      });
    }
  };

  const fillDemoCredentials = () => {
    setCredentials({
      username: "admin",
      password: "admin123"
    });
    toast({
      title: "Demo Credentials Filled",
      description: "You can now click Login to access the dashboard",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10"></div>
      
      <div className="relative w-full max-w-md px-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card className="card-elevated shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Authority Login
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Access the Tourist Safety Monitoring Dashboard
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="border-2 focus:border-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Password</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="border-2 focus:border-primary h-12"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleLogin}
                className="w-full btn-hero h-12 text-lg"
                disabled={!credentials.username || !credentials.password}
              >
                Login to Dashboard
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
                </div>
              </div>

              <Button 
                onClick={fillDemoCredentials}
                variant="outline"
                className="w-full h-12 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Use Demo Credentials
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Demo Credentials:</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Username: <code className="bg-muted px-1 rounded">admin</code><br />
                  Password: <code className="bg-muted px-1 rounded">admin123</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Secure access to Tourist Safety & Monitoring System
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorityLogin;