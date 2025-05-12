import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";

// Public Pages
import PublicHomePage from "@/pages/public/HomePage";
import HowItWorksPage from "@/pages/public/HowItWorksPage";
import BecomeCspPage from "@/pages/public/BecomeCspPage";
import SupportPage from "@/pages/public/SupportPage";
import CsrImpactPage from "@/pages/public/CsrImpactPage";
import { LoginForm } from "./components/auth/LoginForm";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/" component={PublicHomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;