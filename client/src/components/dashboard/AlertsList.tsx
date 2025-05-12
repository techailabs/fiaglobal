import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

interface AlertsListProps {
  alerts: Alert[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  className?: string;
}

const AlertsList = ({
  alerts,
  title = "Recent Alerts",
  showViewAll = true,
  viewAllLink = "#",
  className,
}: AlertsListProps) => {
  return (
    <Card className={className}>
      <CardHeader className="p-4 border-b flex items-center justify-between">
        <CardTitle className="font-semibold text-gray-800">{title}</CardTitle>
        {showViewAll && (
          <a href={viewAllLink} className="text-primary text-sm hover:underline">
            View All
          </a>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div 
                key={alert.id}
                className={cn(
                  "p-3 rounded-md",
                  alert.type === 'error' ? "bg-red-50 border-l-4 border-alert" :
                  alert.type === 'warning' ? "bg-yellow-50 border-l-4 border-warning" :
                  alert.type === 'success' ? "bg-green-50 border-l-4 border-accent" :
                  "bg-blue-50 border-l-4 border-blue-500"
                )}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {alert.type === 'error' && <AlertCircle className="text-alert h-5 w-5" />}
                    {alert.type === 'warning' && <AlertTriangle className="text-warning h-5 w-5" />}
                    {alert.type === 'success' && <CheckCircle2 className="text-accent h-5 w-5" />}
                    {alert.type === 'info' && <Info className="text-blue-500 h-5 w-5" />}
                  </div>
                  <div className="ml-3">
                    <p className={cn(
                      "text-sm font-medium",
                      alert.type === 'error' ? "text-alert" :
                      alert.type === 'warning' ? "text-warning" :
                      alert.type === 'success' ? "text-accent" :
                      "text-blue-600"
                    )}>
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Info className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p>No alerts at this time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsList;
