import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Clock, CreditCard, FileText, Settings, LogOut, Users } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Helper function to show appropriate dashboard cards based on user role
  const getDashboardCards = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <DashboardCard 
              title="Users"
              description="Manage user accounts and permissions"
              icon={<Users className="h-12 w-12 text-primary" />}
              link="/admin/users"
            />
            <DashboardCard 
              title="Audit Logs"
              description="View system audit logs and activity"
              icon={<FileText className="h-12 w-12 text-primary" />}
              link="/admin/audits"
            />
            <DashboardCard 
              title="System Settings"
              description="Configure system parameters"
              icon={<Settings className="h-12 w-12 text-primary" />}
              link="/admin/settings"
            />
          </>
        );
      case 'csp_agent':
        return (
          <>
            <DashboardCard 
              title="Transactions"
              description="View and process customer transactions"
              icon={<CreditCard className="h-12 w-12 text-primary" />}
              link="/csp/transactions"
            />
            <DashboardCard 
              title="Customers"
              description="Manage your customer base"
              icon={<Users className="h-12 w-12 text-primary" />}
              link="/csp/customers"
            />
            <DashboardCard 
              title="Reports"
              description="Generate and view transaction reports"
              icon={<FileText className="h-12 w-12 text-primary" />}
              link="/csp/reports"
            />
          </>
        );
      case 'auditor':
        return (
          <>
            <DashboardCard 
              title="Pending Audits"
              description="View and process pending audits"
              icon={<Clock className="h-12 w-12 text-primary" />}
              link="/auditor/pending"
            />
            <DashboardCard 
              title="Completed Audits"
              description="Review previously completed audits"
              icon={<FileText className="h-12 w-12 text-primary" />}
              link="/auditor/completed"
            />
            <DashboardCard 
              title="CSP Agents"
              description="View CSP agent profiles and history"
              icon={<Users className="h-12 w-12 text-primary" />}
              link="/auditor/csp-agents"
            />
          </>
        );
      case 'bank_officer':
        return (
          <>
            <DashboardCard 
              title="Approvals"
              description="Review and approve pending transactions"
              icon={<CreditCard className="h-12 w-12 text-primary" />}
              link="/officer/approvals"
            />
            <DashboardCard 
              title="Reports"
              description="Generate and view transaction reports"
              icon={<FileText className="h-12 w-12 text-primary" />}
              link="/officer/reports"
            />
            <DashboardCard 
              title="CSP Network"
              description="View and manage CSP agent network"
              icon={<Users className="h-12 w-12 text-primary" />}
              link="/officer/csp-network"
            />
          </>
        );
      case 'customer':
      default:
        return (
          <>
            <DashboardCard 
              title="My Transactions"
              description="View your transaction history"
              icon={<CreditCard className="h-12 w-12 text-primary" />}
              link="/customer/transactions"
            />
            <DashboardCard 
              title="Find CSP"
              description="Locate nearest CSP agents"
              icon={<Users className="h-12 w-12 text-primary" />}
              link="/customer/find-csp"
            />
            <DashboardCard 
              title="Support"
              description="Get help and support"
              icon={<FileText className="h-12 w-12 text-primary" />}
              link="/customer/support"
            />
          </>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Dashboard | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Access your personalized dashboard in the Fia Global Bank Correspondent System. Manage transactions, view reports, and more." />
      </Helmet>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.full_name}</h1>
          <p className="text-gray-600 mt-1">Role: {user?.role?.replace('_', ' ')}</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Manage your activities in the Fia Global Bank Correspondent System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getDashboardCards()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link}>
      <Card className="cursor-pointer hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}