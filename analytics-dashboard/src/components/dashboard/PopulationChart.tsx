import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

interface PopulationChartProps {
  timeframe: string;
}

export const PopulationChart = ({ timeframe }: PopulationChartProps) => {
  const sectorData = [
    { sector: "Construction", workers: 89423, percentage: 36.1 },
    { sector: "Agriculture", workers: 67234, percentage: 27.1 },
    { sector: "Manufacturing", workers: 45678, percentage: 18.4 },
    { sector: "Services", workers: 28934, percentage: 11.7 },
    { sector: "Others", workers: 16563, percentage: 6.7 }
  ];

  const districtData = [
    { district: "Ernakulam", workers: 34567, growth: 12.3 },
    { district: "Thrissur", workers: 28934, growth: 8.7 },
    { district: "Kottayam", workers: 23456, growth: 15.2 },
    { district: "Alappuzha", workers: 21234, growth: 6.8 },
    { district: "Kozhikode", workers: 19876, growth: 9.4 },
    { district: "Others", workers: 119765, growth: 11.2 }
  ];

  const COLORS = ["hsl(var(--chart-primary))", "hsl(var(--chart-secondary))", "hsl(var(--chart-accent))", "hsl(var(--chart-warning))", "hsl(var(--chart-danger))"];

  return (
    <div className="space-y-6">
      {/* Worker Distribution by Sector */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header">Worker Distribution by Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="workers"
                  label={({ sector, percentage }) => `${sector} (${percentage}%)`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* District-wise Distribution */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-header">District-wise Worker Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="district" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Bar 
                  dataKey="workers" 
                  fill="hsl(var(--chart-primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};