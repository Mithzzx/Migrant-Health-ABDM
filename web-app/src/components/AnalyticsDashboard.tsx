import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AnalyticsDashboardProps {
  patient: any;
}

const vitalsData = [
  { month: "Aug", glucose: 180, bp_systolic: 140, weight: 75 },
  { month: "Sep", glucose: 165, bp_systolic: 138, weight: 74 },
  { month: "Oct", glucose: 155, bp_systolic: 135, weight: 73 },
  { month: "Nov", glucose: 148, bp_systolic: 132, weight: 72 },
  { month: "Dec", glucose: 145, bp_systolic: 130, weight: 72 },
  { month: "Jan", glucose: 142, bp_systolic: 128, weight: 71 },
];

const riskFactors = [
  {
    condition: "Diabetes Progression",
    risk: "Moderate",
    trend: "improving",
    percentage: 65,
    color: "warning"
  },
  {
    condition: "Cardiovascular Risk",
    risk: "Low-Moderate", 
    trend: "stable",
    percentage: 45,
    color: "success"
  },
  {
    condition: "Kidney Function",
    risk: "Low",
    trend: "stable",
    percentage: 25,
    color: "success"
  }
];

export const AnalyticsDashboard = ({ patient }: AnalyticsDashboardProps) => {
  if (!patient) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a patient to view analytics
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Latest Glucose</p>
                <p className="text-2xl font-bold">142 mg/dL</p>
              </div>
              <div className="flex items-center text-success">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blood Pressure</p>
                <p className="text-2xl font-bold">128/82</p>
              </div>
              <div className="flex items-center text-success">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="text-2xl font-bold">71 kg</p>
              </div>
              <div className="flex items-center text-success">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-sm">-4kg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            6-Month Vitals Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="glucose" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Glucose (mg/dL)"
                />
                <Line 
                  type="monotone" 
                  dataKey="bp_systolic" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Systolic BP (mmHg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            AI-Powered Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskFactors.map((risk, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{risk.condition}</h4>
                  <Badge 
                    variant={risk.color === 'success' ? 'default' : 'secondary'}
                    className={risk.color === 'warning' ? 'bg-warning/20 text-warning-foreground' : ''}
                  >
                    {risk.risk} Risk
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  {risk.trend === 'improving' ? (
                    <TrendingDown className="h-4 w-4 mr-1 text-success" />
                  ) : (
                    <Activity className="h-4 w-4 mr-1" />
                  )}
                  {risk.trend}
                </div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    risk.color === 'success' ? 'bg-success' : 'bg-warning'
                  }`}
                  style={{ width: `${risk.percentage}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Risk Score: {risk.percentage}%
              </div>
            </div>
          ))}
          
          <div className="bg-accent/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">🤖 AI Recommendations</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Continue current diabetes medication - showing good progress</li>
              <li>• Consider increasing physical activity to 150min/week</li>
              <li>• Schedule HbA1c test in 3 months to monitor long-term control</li>
              <li>• Blood pressure well controlled - maintain current lifestyle</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};