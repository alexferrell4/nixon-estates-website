import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import ResidentPortal from "./pages/ResidentPortal.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import NotFound from "./pages/NotFound.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import PortalLayout from "./components/portal/PortalLayout.tsx";
import Dashboard from "./pages/portal/Dashboard.tsx";
import ResidentsPage from "./pages/portal/ResidentsPage.tsx";
import UnitsPage from "./pages/portal/UnitsPage.tsx";
import MaintenancePage from "./pages/portal/MaintenancePage.tsx";
import AnnouncementsPage from "./pages/portal/AnnouncementsPage.tsx";
import PaymentsPage from "./pages/portal/PaymentsPage.tsx";
import MyUnitPage from "./pages/portal/MyUnitPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resident-portal" element={<ResidentPortal />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Portal routes - require auth */}
            <Route path="/portal/dashboard" element={<PortalLayout><Dashboard /></PortalLayout>} />
            <Route path="/portal/residents" element={<PortalLayout><ResidentsPage /></PortalLayout>} />
            <Route path="/portal/units" element={<PortalLayout><UnitsPage /></PortalLayout>} />
            <Route path="/portal/maintenance" element={<PortalLayout><MaintenancePage /></PortalLayout>} />
            <Route path="/portal/announcements" element={<PortalLayout><AnnouncementsPage /></PortalLayout>} />
            <Route path="/portal/payments" element={<PortalLayout><PaymentsPage /></PortalLayout>} />
            <Route path="/portal/my-unit" element={<PortalLayout><MyUnitPage /></PortalLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
