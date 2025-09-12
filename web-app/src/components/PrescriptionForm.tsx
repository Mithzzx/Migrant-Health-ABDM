import { useState } from "react";
import { FileText, Plus, Save, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PrescriptionFormProps {
  patient: any;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export const PrescriptionForm = ({ patient }: PrescriptionFormProps) => {
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "", duration: "" }
  ]);
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [labTests, setLabTests] = useState("");

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
  };

  const handleSavePrescription = () => {
    // In real app, this would sync with ABDM
    alert("Prescription saved and synced with ABDM successfully!");
  };

  if (!patient) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a patient to write a prescription
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Digital Prescription - {patient.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Patient Info */}
        <div className="bg-accent/50 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><strong>ABHA ID:</strong> {patient.id}</div>
            <div><strong>Age:</strong> {patient.age} years</div>
            <div><strong>Gender:</strong> {patient.gender}</div>
            <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Textarea
            id="diagnosis"
            placeholder="Enter primary and secondary diagnoses..."
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Medications</Label>
            <Button onClick={addMedication} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
          
          {medications.map((med, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
              <div>
                <Label className="text-xs">Medicine Name</Label>
                <Input
                  placeholder="e.g., Metformin"
                  value={med.name}
                  onChange={(e) => updateMedication(index, "name", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Dosage</Label>
                <Input
                  placeholder="e.g., 500mg"
                  value={med.dosage}
                  onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Frequency</Label>
                <Input
                  placeholder="e.g., Twice daily"
                  value={med.frequency}
                  onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Duration</Label>
                  <Input
                    placeholder="e.g., 30 days"
                    value={med.duration}
                    onChange={(e) => updateMedication(index, "duration", e.target.value)}
                  />
                </div>
                {medications.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-5"
                    onClick={() => removeMedication(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lab Tests */}
        <div className="space-y-2">
          <Label htmlFor="lab-tests">Recommended Lab Tests</Label>
          <Input
            id="lab-tests"
            placeholder="e.g., HbA1c, Lipid Profile, Kidney Function"
            value={labTests}
            onChange={(e) => setLabTests(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes & Instructions</Label>
          <Textarea
            id="notes"
            placeholder="Patient counseling, lifestyle recommendations, follow-up instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSavePrescription} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save & Sync with ABDM
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            Auto-synced to patient's health record
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};