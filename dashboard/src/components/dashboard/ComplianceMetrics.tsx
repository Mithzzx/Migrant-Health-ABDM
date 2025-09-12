import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, Users, Database, AlertCircle, CheckCircle } from "lucide-react";

export const ComplianceMetrics = () => {
  const complianceData = [
    {
      category: "FHIR Standards",
      score: 94,
      status: "Excellent",
      issues: 2,
      details: {
        total: 247832,
        compliant: 233042,
        nonCompliant: 14790
      }
    },
    {
      category: "Data Privacy (GDPR)",
      score: 96,
      status: "Excellent", 
      issues: 1,
      details: {
        total: 1247,
        compliant: 1197,
        nonCompliant: 50
      }
    },
    {
      category: "ABDM Integration",
      score: 89,
      status: "Good",
      issues: 8,
      details: {
        total: 1247,
        compliant: 1110,
        nonCompliant: 137
      }
    },
    {
      category: "Consent Management",
      score: 97,
      status: "Excellent",
      issues: 3,
      details: {
        total: 45672,
        compliant: 44301,
        nonCompliant: 1371
      }
    }
  ];

  const recentAudits = [
    {
      date: "2024-01-15",
      type: "ABDM Compliance",
      facility: "Government Medical College, Kochi",
      result: "Passed",
      score: 96,
      issues: ["Minor API timeout issues", "Documentation update needed"]
    },
    {
      date: "2024-01-12", 
      type: "Data Privacy",
      facility: "KIMS Hospital, Trivandrum",
      result: "Passed",
      score: 98,
      issues: []
    },
    {
      date: "2024-01-10",
      type: "FHIR Standards",
      facility: "District Hospital, Thrissur", 
      result: "Warning",
      score: 82,
      issues: ["Incomplete patient records", "Missing required fields", "Format inconsistencies"]
    }
  ];

  const systemHealth = [
    {
      component: "Database Sync",
      status: "Healthy",
      uptime: "99.8%",
      lastCheck: "2 min ago"
    },
    {
      component: "ABDM API",
      status: "Healthy", 
      uptime: "99.2%",
      lastCheck: "5 min ago"
    },
    {
      component: "Consent Service",
      status: "Warning",
      uptime: "97.1%", 
      lastCheck: "1 min ago"
    },
    {
      component: "Backup System",
      status: "Healthy",
      uptime: "100%",
      lastCheck: "10 min ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent":
      case "healthy": 
      case "passed": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-primary/10 text-primary border-primary/20";
      case "warning": return "bg-warning/10 text-warning border-warning/20";
      case "critical":
      case "failed": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ABDM Compliance Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header flex items-center gap-2">
            <Shield className="h-5 w-5" />
            ABDM Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceData.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{item.category}</span>
                  {item.issues > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {item.issues} issues
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${getStatusColor(item.status)}`}>
                    {item.score}%
                  </span>
                  <Badge className={getStatusBadge(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              <Progress value={item.score} className="h-2" />
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>Total: {item.details.total.toLocaleString()}</div>
                <div className="text-success">
                  Compliant: {item.details.compliant.toLocaleString()}
                </div>
                <div className="text-destructive">
                  Issues: {item.details.nonCompliant.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Health */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Health Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemHealth.map((system, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                {system.status === "Healthy" ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-warning" />
                )}
                <div>
                  <div className="font-medium text-sm">{system.component}</div>
                  <div className="text-xs text-muted-foreground">
                    Last check: {system.lastCheck}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusBadge(system.status)}>
                  {system.status}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {system.uptime} uptime
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Audit Results */}
      <Card className="shadow-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-dashboard-header flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Compliance Audits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAudits.map((audit, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{audit.type}</span>
                      <Badge className={getStatusBadge(audit.result)}>
                        {audit.result}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{audit.facility}</p>
                    <p className="text-xs text-muted-foreground">{audit.date}</p>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-sm ${getStatusColor(audit.result)}`}>
                      {audit.score}%
                    </div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
                
                {audit.issues.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Issues Found:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {audit.issues.map((issue, issueIndex) => (
                        <li key={issueIndex} className="flex items-center gap-2">
                          <AlertCircle className="h-3 w-3 text-warning" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};