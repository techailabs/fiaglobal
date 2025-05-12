import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";

// Admin Routes
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUserManagement from "@/pages/admin/UserManagement";

// CSP Routes
import CSPDashboard from "@/pages/csp/Dashboard";
import CSPTransactions from "@/pages/csp/Transactions";

// Auditor Routes
import AuditorDashboard from "@/pages/auditor/Dashboard";
import AuditorAudits from "@/pages/auditor/Audits";

// Bank Officer Routes
import OfficerDashboard from "@/pages/officer/Dashboard";

// Customer Routes
import CustomerDashboard from "@/pages/customer/Dashboard";

function Router() {
  const [location] = useLocation();
  
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        <ProtectedRoute role="admin" component={AdminDashboard} />
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute role="admin" component={AdminUserManagement} />
      </Route>

      {/* CSP Routes */}
      <Route path="/csp/dashboard">
        <ProtectedRoute role="csp_agent" component={CSPDashboard} />
      </Route>
      <Route path="/csp/transactions">
        <ProtectedRoute role="csp_agent" component={CSPTransactions} />
      </Route>

      {/* Auditor Routes */}
      <Route path="/auditor/dashboard">
        <ProtectedRoute role="auditor" component={AuditorDashboard} />
      </Route>
      <Route path="/auditor/audits">
        <ProtectedRoute role="auditor" component={AuditorAudits} />
      </Route>

      {/* Bank Officer Routes */}
      <Route path="/officer/dashboard">
        <ProtectedRoute role="bank_officer" component={OfficerDashboard} />
      </Route>

      {/* Customer Routes */}
      <Route path="/customer/dashboard">
        <ProtectedRoute role="customer" component={CustomerDashboard} />
      </Route>

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
