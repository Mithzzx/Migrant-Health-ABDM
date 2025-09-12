import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  description: string;
  variant?: "default" | "warning" | "success";
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  description,
  variant = "default"
}: MetricCardProps) => {
  const isPositiveTrend = trend === "up";
  
  const cardVariants = {
    default: "border-border",
    warning: "border-warning/20 bg-warning/5",
    success: "border-success/20 bg-success/5"
  };

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success"
  };

  return (
    <Card className={cn("shadow-card hover:shadow-lg transition-shadow", cardVariants[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {value}
            </p>
            <div className="flex items-center gap-1">
              {isPositiveTrend ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={cn(
                "text-xs font-medium",
                isPositiveTrend ? "text-success" : "text-destructive"
              )}>
                {change}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>
          
          <div className={cn(
            "p-3 rounded-lg",
            iconVariants[variant]
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};