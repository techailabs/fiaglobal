import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          setLocation('/admin/dashboard');
          break;
        case 'csp_agent':
          setLocation('/csp/dashboard');
          break;
        case 'auditor':
          setLocation('/auditor/dashboard');
          break;
        case 'bank_officer':
          setLocation('/officer/dashboard');
          break;
        case 'customer':
          setLocation('/customer/dashboard');
          break;
        default:
          setLocation('/');
      }
    }
  }, [isAuthenticated, user, setLocation]);

  return (
    <>
      <Helmet>
        <title>Login | Fia Global - Bank Correspondent System</title>
        <meta name="description" content="Access the Fia Global Bank Correspondent System to manage banking transactions, audits, and more." />
      </Helmet>
    
      <div className="min-h-screen w-full flex items-center justify-center bg-neutral-light">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
