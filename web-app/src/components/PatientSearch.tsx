import { useState } from "react";
import { Search, QrCode, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface PatientSearchProps {
  onPatientSelect: (patient: any) => void;
}

const mockPatients = [
  {
    id: "ABHA001",
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    phone: "+91 98765 43210",
    lastVisit: "2024-01-15",
    condition: "Diabetes Type 2"
  },
  {
    id: "ABHA002", 
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 87654 32109",
    lastVisit: "2024-01-10",
    condition: "Hypertension"
  },
  {
    id: "ABHA003",
    name: "Anita Patel",
    age: 28,
    gender: "Female", 
    phone: "+91 76543 21098",
    lastVisit: "2024-01-12",
    condition: "Regular Checkup"
  }
];

export const PatientSearch = ({ onPatientSelect }: PatientSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockPatients);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockPatients.filter(
      patient =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.id.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by ABHA ID or patient name..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <QrCode className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {searchResults.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onPatientSelect(patient)}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {patient.id} • {patient.age}y {patient.gender}
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-muted-foreground">Last visit</div>
                <div className="font-medium">{patient.lastVisit}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};