import { getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const color = getStatusColor(status);
  
  const badgeClass = 
    color === "green" 
      ? "status-badge-green" 
      : color === "yellow" 
        ? "status-badge-yellow" 
        : color === "red" 
          ? "status-badge-red" 
          : "status-badge-blue";
  
  return (
    <span className={`${badgeClass} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
