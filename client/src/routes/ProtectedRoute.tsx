import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  component: React.ComponentType;
  role?: string;
}

const ProtectedRoute = ({ component: Component, role }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // If still loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  // If role is specified, check if user has the required role
  if (role && user?.role !== role) {
    // Redirect to appropriate dashboard based on user role
    switch (user?.role) {
      case "admin":
        setLocation("/admin/dashboard");
        break;
      case "csp_agent":
        setLocation("/csp/dashboard");
        break;
      case "auditor":
        setLocation("/auditor/dashboard");
        break;
      case "bank_officer":
        setLocation("/officer/dashboard");
        break;
      case "customer":
        setLocation("/customer/dashboard");
        break;
      default:
        setLocation("/login");
    }
    return null;
  }

  // If authenticated and has the required role, render the component
  return <Component />;
};

export default ProtectedRoute;
