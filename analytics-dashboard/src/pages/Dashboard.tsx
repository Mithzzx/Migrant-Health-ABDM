import { useState } from "react";
import { 
  Users, 
  Activity, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Hospital,
  MapPin,
  FileText,
  Calendar,
  Settings
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PopulationChart } from "@/components/dashboard/PopulationChart";
import { HealthUtilizationChart } from "@/components/dashboard/HealthUtilizationChart";
import { DiseaseHeatmap } from "@/components/dashboard/DiseaseHeatmap";
import { FacilityPerformance } from "@/components/dashboard/FacilityPerformance";
import { ComplianceMetrics } from "@/components/dashboard/ComplianceMetrics";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  const metrics = [
    {
      title: "Total Migrant Workers",
      value: "2,47,832", 
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      description: "Registered across Kerala"
    },
    {
      title: "ABHA ID Coverage",
      value: "89.7%",
      change: "+5.2%", 
      trend: "up" as const,
      icon: Shield,
      description: "Workers with ABHA ID"
    },
    {
      title: "Active Consultations",
      value: "15,429",
      change: "+8.3%",
      trend: "up" as const,
      icon: Activity,
      description: "This month"
    },
    {
      title: "High Risk Cases",
      value: "3,847",
      change: "+15.7%",
      trend: "up" as const,
      icon: AlertTriangle,
      description: "Requiring immediate attention",
      variant: "warning" as const
    },
    {
      title: "Healthcare Facilities",
      value: "1,247",
      change: "+3.1%",
      trend: "up" as const,
      icon: Hospital,
      description: "ABDM integrated"
    },
    {
      title: "FHIR Compliance",
      value: "94.2%",
      change: "+2.8%",
      trend: "up" as const,
      icon: FileText,
      description: "Records in FHIR format"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dashboard-header">
              Migrant Health Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time insights into migrant worker health across Kerala
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedTimeframe === "7d" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeframe("7d")}
            >
              7 Days
            </Button>
            <Button 
              variant={selectedTimeframe === "30d" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeframe("30d")}
            >
              30 Days
            </Button>
            <Button 
              variant={selectedTimeframe === "3m" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedTimeframe("3m")}
            >
              3 Months
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PopulationChart timeframe={selectedTimeframe} />
          <HealthUtilizationChart timeframe={selectedTimeframe} />
        </div>

        {/* Disease Monitoring & Facility Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DiseaseHeatmap />
          </div>
          <div>
            <FacilityPerformance />
          </div>
        </div>

        {/* Compliance & System Health */}
        <ComplianceMetrics />
      </main>
    </div>
  );
};

export default Dashboard;