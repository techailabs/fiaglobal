import { Link, useLocation } from "wouter";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  userName: string;
  onLogout: () => void;
}

const Sidebar = ({ isOpen, onClose, userRole, userName, onLogout }: SidebarProps) => {
  const [location] = useLocation();

  const navLinks = {
    admin: [
      { href: "/admin/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
      { href: "/admin/users", icon: "ri-user-settings-line", label: "User Management" },
      { href: "/admin/transactions", icon: "ri-exchange-funds-line", label: "Transactions" },
      { href: "/admin/audits", icon: "ri-file-search-line", label: "Audit Trail" },
      { href: "/admin/settings", icon: "ri-settings-4-line", label: "System Settings" },
      { href: "/admin/reports", icon: "ri-bar-chart-box-line", label: "Reports" },
    ],
    csp_agent: [
      { href: "/csp/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
      { href: "/csp/transactions", icon: "ri-exchange-funds-line", label: "Transactions" },
      { href: "/csp/customers", icon: "ri-user-3-line", label: "Customers" },
      { href: "/csp/face-check", icon: "ri-face-recognition-line", label: "Face Verification" },
      { href: "/csp/complaints", icon: "ri-message-2-line", label: "Complaints" },
    ],
    auditor: [
      { href: "/auditor/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
      { href: "/auditor/planned", icon: "ri-calendar-check-line", label: "Planned Audits" },
      { href: "/auditor/completed", icon: "ri-checkbox-circle-line", label: "Completed Audits" },
      { href: "/auditor/reports", icon: "ri-file-list-3-line", label: "Reports" },
    ],
    bank_officer: [
      { href: "/officer/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
      { href: "/officer/agents", icon: "ri-user-star-line", label: "CSP Agents" },
      { href: "/officer/transactions", icon: "ri-exchange-funds-line", label: "Transactions" },
      { href: "/officer/relief", icon: "ri-hand-heart-line", label: "Relief Claims" },
      { href: "/officer/reports", icon: "ri-bar-chart-2-line", label: "Reports" },
    ],
    customer: [
      { href: "/customer/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
      { href: "/customer/transactions", icon: "ri-exchange-funds-line", label: "My Transactions" },
      { href: "/customer/complaints", icon: "ri-message-2-line", label: "Complaints" },
      { href: "/customer/profile", icon: "ri-user-settings-line", label: "Profile" },
    ]
  };

  const roleLinks = navLinks[userRole as keyof typeof navLinks] || [];
  const roleName = userRole.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0" // Always visible on large screens
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and close button */}
          <div className="p-5 border-b flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary font-heading">Fia Global</h1>
              <p className="text-sm text-gray-600">Bank Correspondent System</p>
            </div>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation links */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              {roleName}
            </div>
            
            <nav>
              {roleLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => {
                    if (isOpen) onClose();
                  }}
                >
                  <a 
                    className={cn(
                      "sidebar-link",
                      location === link.href && "active"
                    )}
                  >
                    <i className={link.icon}></i> {link.label}
                  </a>
                </Link>
              ))}
            </nav>
          </div>

          {/* User profile and logout */}
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="ri-user-line text-gray-600"></i>
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-gray-500">{roleName}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-sm text-gray-700"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
