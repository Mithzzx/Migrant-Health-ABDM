import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Info, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DrugInteraction {
  drug1: string;
  drug2: string;
  severity: "minor" | "moderate" | "major";
  description: string;
  recommendation: string;
}

const knownInteractions: DrugInteraction[] = [
  {
    drug1: "metformin",
    drug2: "lisinopril",
    severity: "minor",
    description: "May slightly increase risk of lactic acidosis in patients with kidney problems",
    recommendation: "Monitor kidney function regularly"
  },
  {
    drug1: "metformin",
    drug2: "ibuprofen",
    severity: "moderate",
    description: "NSAIDs may reduce kidney function, increasing metformin levels",
    recommendation: "Consider alternative pain management or closer monitoring"
  },
  {
    drug1: "lisinopril",
    drug2: "ibuprofen",
    severity: "moderate",
    description: "NSAIDs may reduce the effectiveness of ACE inhibitors",
    recommendation: "Monitor blood pressure more frequently"
  },
  {
    drug1: "azithromycin",
    drug2: "gabapentin",
    severity: "minor",
    description: "Potential for increased CNS side effects",
    recommendation: "Monitor for dizziness or drowsiness"
  }
];

interface DrugInteractionCheckerProps {
  medications: Array<{ name: string; dosage: string; frequency: string; duration: string }>;
}

export const DrugInteractionChecker = ({ medications }: DrugInteractionCheckerProps) => {
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    checkInteractions();
  }, [medications]);

  const checkInteractions = () => {
    const foundInteractions: DrugInteraction[] = [];
    
    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const drug1 = medications[i].name.toLowerCase();
        const drug2 = medications[j].name.toLowerCase();
        
        const interaction = knownInteractions.find(
          inter => 
            (inter.drug1 === drug1 && inter.drug2 === drug2) ||
            (inter.drug1 === drug2 && inter.drug2 === drug1)
        );
        
        if (interaction) {
          foundInteractions.push(interaction);
        }
      }
    }
    
    setInteractions(foundInteractions);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor": return "bg-success/20 text-success-foreground border-success/20";
      case "moderate": return "bg-warning/20 text-warning-foreground border-warning/20";
      case "major": return "bg-destructive/20 text-destructive-foreground border-destructive/20";
      default: return "bg-muted";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "minor": return <Info className="h-4 w-4" />;
      case "moderate": return <AlertTriangle className="h-4 w-4" />;
      case "major": return <X className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  if (medications.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" />
            Drug Interaction Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-4">
            Add at least 2 medications to check for interactions
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="h-4 w-4" />
          Drug Interaction Checker
          {interactions.length > 0 && (
            <Badge variant="destructive">{interactions.length} found</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {interactions.length === 0 ? (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              No known drug interactions found between the prescribed medications.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {interactions.length} potential drug interaction(s) detected. Please review carefully.
              </AlertDescription>
            </Alert>
            
            {interactions.map((interaction, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(interaction.severity)}
                    <Badge className={getSeverityColor(interaction.severity)}>
                      {interaction.severity.toUpperCase()} Interaction
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">
                    {interaction.drug1.charAt(0).toUpperCase() + interaction.drug1.slice(1)} + {" "}
                    {interaction.drug2.charAt(0).toUpperCase() + interaction.drug2.slice(1)}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Interaction:</strong> {interaction.description}
                  </div>
                  
                  <div className="text-sm">
                    <strong className="text-primary">Recommendation:</strong> {interaction.recommendation}
                  </div>
                </div>
              </div>
            ))}
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This checker uses a basic database of known interactions. Always consult comprehensive drug interaction databases and clinical judgment for patient safety.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};