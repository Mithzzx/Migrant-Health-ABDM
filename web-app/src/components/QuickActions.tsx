import { 
  UserPlus, 
  FileText, 
  Calendar, 
  Bell, 
  Search, 
  Stethoscope,
  Activity,
  Download,
  Settings,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions = ({ onActionClick }: QuickActionsProps) => {
  const quickActions = [
    {
      id: "new-patient",
      title: "Add New Patient",
      description: "Register a new patient with ABHA ID",
      icon: UserPlus,
      color: "bg-primary/10 text-primary",
      urgent: false
    },
    {
      id: "emergency-prescription", 
      title: "Emergency Prescription",
      description: "Quick prescription for urgent cases",
      icon: FileText,
      color: "bg-destructive/10 text-destructive",
      urgent: true
    },
    {
      id: "schedule-appointment",
      title: "Schedule Appointment", 
      description: "Book next available slot",
      icon: Calendar,
      color: "bg-secondary/10 text-secondary",
      urgent: false
    },
    {
      id: "patient-search",
      title: "Quick Patient Search",
      description: "Find patient by ABHA ID",
      icon: Search,
      color: "bg-primary/10 text-primary", 
      urgent: false
    },
    {
      id: "vitals-entry",
      title: "Record Vitals",
      description: "Quick vitals entry for current patient",
      icon: Activity,
      color: "bg-success/10 text-success",
      urgent: false
    },
    {
      id: "health-checkup",
      title: "Start Health Checkup",
      description: "Begin comprehensive examination",
      icon: Stethoscope,
      color: "bg-secondary/10 text-secondary",
      urgent: false
    }
  ];

  const notifications = [
    {
      id: "lab-results",
      title: "Lab Results Ready",
      count: 5,
      urgent: true
    },
    {
      id: "pending-approvals",
      title: "Pending Prescriptions", 
      count: 3,
      urgent: false
    },
    {
      id: "appointments-today",
      title: "Today's Appointments",
      count: 8,
      urgent: false
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Actions */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="h-auto p-4 justify-start hover:bg-accent/50"
                    onClick={() => onActionClick(action.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{action.title}</span>
                          {action.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              URGENT
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications & Alerts */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onActionClick(notification.id)}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{notification.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={notification.urgent ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {notification.count}
                  </Badge>
                </div>
              </div>
            ))}

            <div className="border-t pt-3">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => onActionClick("view-all-notifications")}
              >
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Today's Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-xs text-muted-foreground">Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">8</div>
                <div className="text-xs text-muted-foreground">Prescriptions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">5</div>
                <div className="text-xs text-muted-foreground">Lab Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">3</div>
                <div className="text-xs text-muted-foreground">Alerts</div>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <Button 
                variant="outline" 
                className="w-full" 
                size="sm"
                onClick={() => onActionClick("download-daily-report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Daily Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};