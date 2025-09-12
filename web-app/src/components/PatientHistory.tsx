import { Calendar, FileText, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PatientHistoryProps {
  patient: any;
}

const mockVisits = [
  {
    date: "2024-01-15",
    type: "Regular Checkup",
    doctor: "Dr. Smith",
    diagnosis: "Diabetes management - stable",
    prescription: "Metformin 500mg, continue current dosage",
    vitals: { bp: "130/80", glucose: "145 mg/dL", weight: "72kg" }
  },
  {
    date: "2023-12-10",
    type: "Follow-up",
    doctor: "Dr. Smith", 
    diagnosis: "Blood sugar slightly elevated",
    prescription: "Increased Metformin to 500mg twice daily",
    vitals: { bp: "135/85", glucose: "160 mg/dL", weight: "73kg" }
  },
  {
    date: "2023-11-05",
    type: "Annual Physical",
    doctor: "Dr. Johnson",
    diagnosis: "Type 2 Diabetes diagnosed",
    prescription: "Metformin 500mg daily, lifestyle changes",
    vitals: { bp: "140/90", glucose: "180 mg/dL", weight: "75kg" }
  }
];

export const PatientHistory = ({ patient }: PatientHistoryProps) => {
  if (!patient) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a patient to view their history
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Info Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {patient.name} - Medical History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">ABHA ID</div>
              <div className="font-medium">{patient.id}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Age/Gender</div>
              <div className="font-medium">{patient.age}y {patient.gender}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <div className="font-medium">{patient.phone}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Primary Condition</div>
              <Badge variant="outline">{patient.condition}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Visits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockVisits.map((visit, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{visit.type}</Badge>
                  <span className="text-sm text-muted-foreground">{visit.doctor}</span>
                </div>
                <div className="text-sm font-medium">{visit.date}</div>
              </div>
              
              <div className="grid gap-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Diagnosis</div>
                  <div className="text-sm">{visit.diagnosis}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Prescription</div>
                  <div className="text-sm">{visit.prescription}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Vitals</div>
                  <div className="flex gap-4 text-sm">
                    <span>BP: {visit.vitals.bp}</span>
                    <span>Glucose: {visit.vitals.glucose}</span>
                    <span>Weight: {visit.vitals.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};