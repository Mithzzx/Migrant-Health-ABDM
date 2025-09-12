import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, TrendingUp } from "lucide-react";

export const DiseaseHeatmap = () => {
  const heatmapData = [
    { 
      region: "Ernakulam Industrial Zone", 
      riskLevel: "High", 
      cases: 1243, 
      primaryDiseases: ["Respiratory", "Skin"], 
      trend: "up",
      lat: 9.9312, 
      lng: 76.2673 
    },
    { 
      region: "Kochi Port Area", 
      riskLevel: "Medium", 
      cases: 876, 
      primaryDiseases: ["Musculoskeletal", "Injuries"], 
      trend: "stable",
      lat: 9.9558, 
      lng: 76.2603 
    },
    { 
      region: "Thrissur Construction Hub", 
      riskLevel: "High", 
      cases: 1156, 
      primaryDiseases: ["Injuries", "Heat Stroke"], 
      trend: "up",
      lat: 10.5276, 
      lng: 76.2144 
    },
    { 
      region: "Alappuzha Agricultural Zone", 
      riskLevel: "Medium", 
      cases: 645, 
      primaryDiseases: ["Pesticide Exposure", "Back Pain"], 
      trend: "down",
      lat: 9.4981, 
      lng: 76.3388 
    },
    { 
      region: "Kozhikode Service Sector", 
      riskLevel: "Low", 
      cases: 423, 
      primaryDiseases: ["Eye Strain", "Stress"], 
      trend: "stable",
      lat: 11.2588, 
      lng: 75.7804 
    },
    { 
      region: "Kannur Textile Mills", 
      riskLevel: "Medium", 
      cases: 789, 
      primaryDiseases: ["Respiratory", "Allergies"], 
      trend: "up",
      lat: 11.8745, 
      lng: 75.3704 
    }
  ];

  const alerts = [
    {
      type: "Outbreak Alert",
      location: "Ernakulam Industrial Zone",
      condition: "Respiratory Infections",
      severity: "High",
      cases: 156,
      timeframe: "Last 7 days"
    },
    {
      type: "Trend Alert", 
      location: "Thrissur Construction Hub",
      condition: "Heat-related Illness",
      severity: "Medium",
      cases: 45,
      timeframe: "Last 3 days"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-destructive" />;
      case "down": return <TrendingUp className="h-3 w-3 text-success rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-muted-foreground" />;
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-header flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Disease Risk Heatmap & Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Alerts */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Active Health Alerts</h4>
          {alerts.map((alert, index) => (
            <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{alert.type}</span>
                      <Badge variant="destructive" className="text-xs">{alert.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>{alert.condition}</strong> in {alert.location}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{alert.cases} cases</span>
                      <span>{alert.timeframe}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regional Risk Assessment */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Regional Risk Assessment</h4>
          <div className="grid gap-3">
            {heatmapData.map((region, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{region.region}</span>
                    {getTrendIcon(region.trend)}
                  </div>
                  <Badge className={getRiskColor(region.riskLevel)}>
                    {region.riskLevel} Risk
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">{region.cases}</span> total cases
                  </div>
                  <div>
                    Primary: <span className="font-medium text-foreground">
                      {region.primaryDiseases.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Map Placeholder */}
        <div className="h-48 bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Interactive Disease Heatmap</p>
            <p className="text-xs">Integration with Kerala Maps API</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};