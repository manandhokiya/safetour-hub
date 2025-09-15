import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TouristId from "./pages/TouristId";
import SafetyFeatures from "./pages/SafetyFeatures";
import AuthorityLogin from "./pages/AuthorityLogin";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import TouristRecords from "./pages/TouristRecords";
import AlertsPage from "./pages/AlertsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tourist-id" element={<TouristId />} />
          <Route path="/safety-features" element={<SafetyFeatures />} />
          <Route path="/authority-login" element={<AuthorityLogin />} />
          <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
          <Route path="/tourist-records" element={<TouristRecords />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
