import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Hospital, Clock, Users, Star } from "lucide-react";

export const FacilityPerformance = () => {
  const facilities = [
    {
      name: "Government Medical College, Kochi",
      type: "Government",
      patients: 2456,
      avgWaitTime: "45 min",
      satisfaction: 4.2,
      compliance: 96,
      services: ["Emergency", "General", "Specialist"]
    },
    {
      name: "KIMS Hospital, Trivandrum", 
      type: "Private",
      patients: 1876,
      avgWaitTime: "25 min",
      satisfaction: 4.6,
      compliance: 98,
      services: ["Emergency", "General", "Surgery"]
    },
    {
      name: "District Hospital, Thrissur",
      type: "Government", 
      patients: 1234,
      avgWaitTime: "65 min",
      satisfaction: 3.8,
      compliance: 89,
      services: ["General", "Maternity"]
    },
    {
      name: "Primary Health Centre, Alappuzha",
      type: "Government",
      patients: 876,
      avgWaitTime: "30 min", 
      satisfaction: 4.1,
      compliance: 92,
      services: ["General", "Vaccination"]
    }
  ];

  const performanceMetrics = [
    {
      metric: "Average Consultation Time",
      value: "18 min",
      target: "15 min",
      progress: 85,
      status: "good"
    },
    {
      metric: "Patient Satisfaction",
      value: "4.2/5",
      target: "4.5/5", 
      progress: 93,
      status: "excellent"
    },
    {
      metric: "ABDM Integration Rate",
      value: "94%",
      target: "95%",
      progress: 99,
      status: "excellent"
    },
    {
      metric: "Record Digitization",
      value: "89%",
      target: "100%",
      progress: 89,
      status: "good"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "needs-improvement": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Government" ? "bg-primary/10 text-primary" : "bg-secondary/50 text-secondary-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header flex items-center gap-2">
            <Hospital className="h-5 w-5" />
            System Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{metric.metric}</span>
                <span className={getStatusColor(metric.status)}>
                  {metric.value}
                </span>
              </div>
              <Progress value={metric.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: {metric.target}</span>
                <span>{metric.progress}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Performing Facilities */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header">Facility Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {facilities.map((facility, index) => (
            <div key={index} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{facility.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeColor(facility.type)} variant="secondary">
                      {facility.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {facility.satisfaction}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-success">
                    {facility.compliance}%
                  </div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span>{facility.patients} patients</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{facility.avgWaitTime}</span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground">
                    {facility.services.length} services
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {facility.services.map((service, serviceIndex) => (
                  <Badge key={serviceIndex} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};