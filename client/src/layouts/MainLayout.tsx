import { ReactNode, useState, useEffect } from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileHeader from "@/components/shared/MobileHeader";
import { useAuth } from "@/hooks/useAuth";
import { useOfflineSync } from "@/hooks/useOfflineSync";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout } = useAuth();
  const { isOnline, pendingSyncCount, performSync, isSyncing } = useOfflineSync();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when screen resizes above lg breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader 
        onToggleSidebar={toggleSidebar} 
        userName={user.full_name} 
        userRole={user.role}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        userRole={user.role}
        userName={user.full_name}
        onLogout={logout}
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="container px-4 sm:px-6 lg:px-8 py-8">
          {!isOnline && (
            <Alert variant="destructive" className="mb-4 bg-yellow-50 border-yellow-200">
              <WifiOff className="h-4 w-4 mr-2" />
              <AlertDescription className="flex justify-between items-center">
                <span>You are currently offline. Changes will be synced when you reconnect.</span>
                {pendingSyncCount > 0 && (
                  <span className="text-sm font-medium">
                    {pendingSyncCount} {pendingSyncCount === 1 ? 'item' : 'items'} pending
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          {isOnline && pendingSyncCount > 0 && (
            <Alert className="mb-4 bg-blue-50 border-blue-200">
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              <AlertDescription className="flex justify-between items-center">
                <span>
                  You have {pendingSyncCount} unsynchronized {pendingSyncCount === 1 ? 'change' : 'changes'}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={performSync}
                  disabled={isSyncing}
                >
                  {isSyncing ? 'Syncing...' : 'Sync Now'}
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
