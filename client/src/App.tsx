import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

// Public Pages
import PublicHomePage from "./pages/public/PublicHomePage";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import BecomeCspPage from "./pages/public/BecomeCspPage";
import SupportPage from "./pages/public/SupportPage";
import CsrImpactPage from "./pages/public/CsrImpactPage";

function Router() {
  return (
    <Switch>
      {/* Auth Routes */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Public Routes */}
      <Route path="/" component={PublicHomePage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/become-csp" component={BecomeCspPage} />
      <Route path="/support" component={SupportPage} />
      <Route path="/csr-impact" component={CsrImpactPage} />

      {/* Protected Routes */}
      <ProtectedRoute path="/dashboard" component={HomePage} />
      
      {/* Admin Routes - These will be implemented as we build them */}
      <ProtectedRoute path="/admin/users" component={HomePage} requiredRoles={["admin"]} />
      <ProtectedRoute path="/admin/audits" component={HomePage} requiredRoles={["admin"]} />
      <ProtectedRoute path="/admin/settings" component={HomePage} requiredRoles={["admin"]} />
      
      {/* CSP Agent Routes */}
      <ProtectedRoute path="/csp/transactions" component={HomePage} requiredRoles={["csp_agent"]} />
      <ProtectedRoute path="/csp/customers" component={HomePage} requiredRoles={["csp_agent"]} />
      <ProtectedRoute path="/csp/reports" component={HomePage} requiredRoles={["csp_agent"]} />
      
      {/* Auditor Routes */}
      <ProtectedRoute path="/auditor/pending" component={HomePage} requiredRoles={["auditor"]} />
      <ProtectedRoute path="/auditor/completed" component={HomePage} requiredRoles={["auditor"]} />
      <ProtectedRoute path="/auditor/csp-agents" component={HomePage} requiredRoles={["auditor"]} />
      
      {/* Bank Officer Routes */}
      <ProtectedRoute path="/officer/approvals" component={HomePage} requiredRoles={["bank_officer"]} />
      <ProtectedRoute path="/officer/reports" component={HomePage} requiredRoles={["bank_officer"]} />
      <ProtectedRoute path="/officer/csp-network" component={HomePage} requiredRoles={["bank_officer"]} />
      
      {/* Customer Routes */}
      <ProtectedRoute path="/customer/transactions" component={HomePage} requiredRoles={["customer"]} />
      <ProtectedRoute path="/customer/find-csp" component={HomePage} requiredRoles={["customer"]} />
      <ProtectedRoute path="/customer/support" component={HomePage} requiredRoles={["customer"]} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
