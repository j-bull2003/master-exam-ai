import { ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: "default" | "success" | "warning" | "error";
}

const variantConfig = {
  default: {
    icon: Info,
    iconColor: "text-muted-foreground",
  },
  success: {
    icon: CheckCircle,
    iconColor: "text-success",
  },
  warning: {
    icon: AlertCircle,
    iconColor: "text-warning",
  },
  error: {
    icon: XCircle,
    iconColor: "text-error",
  },
};

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  variant = "default" 
}: EmptyStateProps) => {
  const config = variantConfig[variant];
  const IconComponent = icon || config.icon;

  return (
    <div className="empty-state py-16 px-8 text-center">
      <div className={`w-12 h-12 mx-auto mb-4 ${config.iconColor}`}>
        {typeof IconComponent === 'function' ? (
          <IconComponent className="w-full h-full" />
        ) : (
          IconComponent
        )}
      </div>
      
      <h3 className="empty-state-title text-lg font-semibold mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="empty-state-description text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};