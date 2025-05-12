import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
  };
  progress?: {
    current: number;
    target: number;
    label: string;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  trend,
  progress,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={cn("p-3 rounded-full", iconBgColor)}>
            <div className={cn("text-xl", iconColor)}>{icon}</div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        </div>
        
        {progress && (
          <div className="mt-2">
            <div className="w-full bg-neutral-light rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${Math.min(100, (progress.current / progress.target) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress.label}: {progress.target}</p>
          </div>
        )}
        
        {trend && (
          <div className="mt-4 flex items-center text-sm">
            {trend.isPositive !== undefined && (
              <span className={cn("flex items-center", trend.isPositive ? "text-accent" : "text-destructive")}>
                <i className={cn("mr-1", trend.isPositive ? "ri-arrow-up-line" : "ri-arrow-down-line")}></i>
                {trend.value}
              </span>
            )}
            <span className="text-gray-500 ml-2">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
