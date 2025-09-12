import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface DosageCalculation {
  medication: string;
  patientWeight: number;
  dosagePerKg: number;
  calculatedDose: number;
  unit: string;
  frequency: string;
  maxDailyDose?: number;
}

const medicationDosages = {
  "paracetamol": {
    dosagePerKg: 10,
    unit: "mg",
    maxDailyDose: 4000,
    frequency: "Every 6 hours"
  },
  "ibuprofen": {
    dosagePerKg: 5,
    unit: "mg", 
    maxDailyDose: 2400,
    frequency: "Every 8 hours"
  },
  "amoxicillin": {
    dosagePerKg: 25,
    unit: "mg",
    maxDailyDose: 3000,
    frequency: "Every 8 hours"
  },
  "prednisolone": {
    dosagePerKg: 1,
    unit: "mg",
    maxDailyDose: 60,
    frequency: "Once daily"
  },
  "insulin": {
    dosagePerKg: 0.5,
    unit: "units",
    maxDailyDose: 100,
    frequency: "Per meal/as needed"
  }
};

export const DosageCalculator = () => {
  const [selectedMedication, setSelectedMedication] = useState("");
  const [patientWeight, setPatientWeight] = useState("");
  const [calculation, setCalculation] = useState<DosageCalculation | null>(null);
  const [customDosagePerKg, setCustomDosagePerKg] = useState("");

  const calculateDosage = () => {
    if (!selectedMedication || !patientWeight) return;
    
    const medicationData = medicationDosages[selectedMedication as keyof typeof medicationDosages];
    if (!medicationData) return;

    const weight = parseFloat(patientWeight);
    const dosagePerKg = customDosagePerKg ? parseFloat(customDosagePerKg) : medicationData.dosagePerKg;
    const calculatedDose = weight * dosagePerKg;
    
    setCalculation({
      medication: selectedMedication,
      patientWeight: weight,
      dosagePerKg,
      calculatedDose,
      unit: medicationData.unit,
      frequency: medicationData.frequency,
      maxDailyDose: medicationData.maxDailyDose
    });
  };

  const isOverMaxDose = calculation && calculation.maxDailyDose && 
    calculation.calculatedDose > calculation.maxDailyDose;

  const clearCalculation = () => {
    setCalculation(null);
    setPatientWeight("");
    setSelectedMedication("");
    setCustomDosagePerKg("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Pediatric Dosage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Medication Selection */}
        <div className="space-y-2">
          <Label htmlFor="medication">Select Medication</Label>
          <Select value={selectedMedication} onValueChange={setSelectedMedication}>
            <SelectTrigger>
              <SelectValue placeholder="Choose medication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paracetamol">Paracetamol</SelectItem>
              <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
              <SelectItem value="amoxicillin">Amoxicillin</SelectItem>
              <SelectItem value="prednisolone">Prednisolone</SelectItem>
              <SelectItem value="insulin">Insulin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Patient Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight">Patient Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter weight in kg"
            value={patientWeight}
            onChange={(e) => setPatientWeight(e.target.value)}
          />
        </div>

        {/* Custom Dosage Override */}
        {selectedMedication && (
          <div className="space-y-2">
            <Label htmlFor="custom-dosage">
              Custom Dosage per kg (optional)
              <span className="text-muted-foreground ml-1">
                Default: {medicationDosages[selectedMedication as keyof typeof medicationDosages]?.dosagePerKg} 
                {medicationDosages[selectedMedication as keyof typeof medicationDosages]?.unit}/kg
              </span>
            </Label>
            <Input
              id="custom-dosage"
              type="number"
              placeholder="Custom dosage per kg"
              value={customDosagePerKg}
              onChange={(e) => setCustomDosagePerKg(e.target.value)}
            />
          </div>
        )}

        {/* Calculate Button */}
        <div className="flex gap-2">
          <Button onClick={calculateDosage} disabled={!selectedMedication || !patientWeight}>
            Calculate Dosage
          </Button>
          {calculation && (
            <Button variant="outline" onClick={clearCalculation}>
              Clear
            </Button>
          )}
        </div>

        {/* Calculation Result */}
        {calculation && (
          <div className="space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Medication</Label>
                <div className="font-medium capitalize">{calculation.medication}</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Patient Weight</Label>
                <div className="font-medium">{calculation.patientWeight} kg</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Dosage per kg</Label>
                <div className="font-medium">{calculation.dosagePerKg} {calculation.unit}/kg</div>
              </div>
              <div className="space-y-1">
                <Label className="text-sm text-muted-foreground">Frequency</Label>
                <div className="font-medium">{calculation.frequency}</div>
              </div>
            </div>

            <Alert className={isOverMaxDose ? "border-destructive" : "border-primary"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Calculated Dose:</span>
                    <Badge variant={isOverMaxDose ? "destructive" : "default"} className="text-lg px-3 py-1">
                      {calculation.calculatedDose.toFixed(1)} {calculation.unit}
                    </Badge>
                  </div>
                  
                  {calculation.maxDailyDose && (
                    <div className="text-sm">
                      Maximum daily dose: {calculation.maxDailyDose} {calculation.unit}
                      {isOverMaxDose && (
                        <span className="text-destructive font-medium ml-2">
                          ⚠ Calculated dose exceeds maximum!
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>

            {isOverMaxDose && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Warning:</strong> The calculated dose exceeds the maximum recommended daily dose. 
                  Please review the calculation and consider adjusting the dosage or consulting additional resources.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            This calculator provides estimates based on standard pediatric dosing guidelines. 
            Always verify with current prescribing information and clinical judgment before prescribing.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};