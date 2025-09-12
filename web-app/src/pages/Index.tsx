import { useState } from "react";
import { Stethoscope, Users, FileText, TrendingUp, Menu, Settings, User, Calendar, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientSearch } from "@/components/PatientSearch";
import { PatientHistory } from "@/components/PatientHistory";
import { PrescriptionForm } from "@/components/PrescriptionForm";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { AdvancedFilters } from "@/components/AdvancedFilters";
import { MedicationTemplates } from "@/components/MedicationTemplates";
import { DrugInteractionChecker } from "@/components/DrugInteractionChecker";
import { DosageCalculator } from "@/components/DosageCalculator";
import { AppointmentScheduler } from "@/components/AppointmentScheduler";
import { QuickActions } from "@/components/QuickActions";
import { UserProfile } from "@/components/UserProfile";
import { SystemSettings } from "@/components/SystemSettings";

const Index = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">HealthCare Provider Portal</h1>
                <p className="text-sm text-muted-foreground">Digital Health Records & ABDM Integration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">Dr. Sarah Wilson</div>
                <div className="text-sm text-muted-foreground">General Practitioner</div>
              </div>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Today's Appointments</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Prescriptions Synced</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">High Risk Alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="search">Patients</TabsTrigger>
            <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <QuickActions onActionClick={(action) => {
              // Handle quick actions
              if (action === "patient-search") setActiveTab("search");
              if (action === "schedule-appointment") setActiveTab("appointments");
              if (action === "emergency-prescription") setActiveTab("prescription");
            }} />
          </TabsContent>
          
          <TabsContent value="search" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Find Patient</h2>
                <PatientSearch onPatientSelect={setSelectedPatient} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Advanced Filters</h2>
                <AdvancedFilters onFilterChange={() => {}} onClearFilters={() => {}} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Patient Overview</h2>
                {selectedPatient ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">{selectedPatient.name}</h3>
                          <p className="text-muted-foreground">ABHA ID: {selectedPatient.id}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Age:</span> {selectedPatient.age} years
                          </div>
                          <div>
                            <span className="text-muted-foreground">Gender:</span> {selectedPatient.gender}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span> {selectedPatient.phone}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Condition:</span> {selectedPatient.condition}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setActiveTab("history")}
                            variant="default"
                            size="sm"
                          >
                            View History
                          </Button>
                          <Button 
                            onClick={() => setActiveTab("prescription")}
                            variant="outline"
                            size="sm"
                          >
                            New Prescription
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      Search and select a patient using ABHA ID or name
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <PatientHistory patient={selectedPatient} />
          </TabsContent>
          
          <TabsContent value="prescription">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PrescriptionForm patient={selectedPatient} />
                <div className="mt-6">
                  <DrugInteractionChecker medications={[]} />
                </div>
              </div>
              <div className="space-y-6">
                <MedicationTemplates onTemplateSelect={() => {}} />
                <DosageCalculator />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentScheduler />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsDashboard patient={selectedPatient} />
          </TabsContent>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;