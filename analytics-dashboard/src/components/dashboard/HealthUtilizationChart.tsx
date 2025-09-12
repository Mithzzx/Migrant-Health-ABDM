import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";

interface HealthUtilizationChartProps {
  timeframe: string;
}

export const HealthUtilizationChart = ({ timeframe }: HealthUtilizationChartProps) => {
  const utilizationData = [
    { month: "Apr", consultations: 12459, prescriptions: 9876, labTests: 5432, emergencies: 892 },
    { month: "May", consultations: 13567, prescriptions: 10234, labTests: 6123, emergencies: 967 },
    { month: "Jun", consultations: 14892, prescriptions: 11456, labTests: 6789, emergencies: 1045 },
    { month: "Jul", consultations: 15234, prescriptions: 12089, labTests: 7234, emergencies: 1123 },
    { month: "Aug", consultations: 16789, prescriptions: 13456, labTests: 7896, emergencies: 1234 },
    { month: "Sep", consultations: 15429, prescriptions: 12234, labTests: 7456, emergencies: 1089 }
  ];

  const commonConditionsData = [
    { condition: "Respiratory Issues", cases: 4567, severity: "Medium" },
    { condition: "Musculoskeletal", cases: 3456, severity: "Medium" },
    { condition: "Skin Conditions", cases: 2876, severity: "Low" },
    { condition: "Digestive Issues", cases: 2345, severity: "Low" },
    { condition: "Injuries/Accidents", cases: 1987, severity: "High" },
    { condition: "Infectious Diseases", cases: 1654, severity: "High" }
  ];

  return (
    <div className="space-y-6">
      {/* Healthcare Utilization Trends */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header">Healthcare Utilization Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="consultations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="prescriptions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Area
                  type="monotone" 
                  dataKey="consultations" 
                  stroke="hsl(var(--chart-primary))" 
                  fillOpacity={1}
                  fill="url(#consultations)"
                  name="Consultations"
                />
                <Area
                  type="monotone" 
                  dataKey="prescriptions" 
                  stroke="hsl(var(--chart-secondary))" 
                  fillOpacity={1}
                  fill="url(#prescriptions)"
                  name="Prescriptions"
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Common Health Conditions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header">Most Common Health Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonConditionsData.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    condition.severity === "High" ? "bg-destructive" :
                    condition.severity === "Medium" ? "bg-warning" : "bg-success"
                  }`} />
                  <span className="font-medium text-sm">{condition.condition}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{condition.cases.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">cases</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};