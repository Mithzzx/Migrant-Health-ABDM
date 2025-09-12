import { useState } from "react";
import { BookOpen, Plus, Star, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MedicationTemplate {
  id: string;
  name: string;
  category: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  notes: string;
  popular: boolean;
}

const medicationTemplates: MedicationTemplate[] = [
  {
    id: "diabetes-basic",
    name: "Type 2 Diabetes - Initial Treatment",
    category: "diabetes",
    popular: true,
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" },
      { name: "Glipizide", dosage: "5mg", frequency: "Once daily", duration: "30 days" }
    ],
    notes: "Monitor blood glucose levels. Lifestyle modifications recommended."
  },
  {
    id: "hypertension-standard",
    name: "Hypertension - Standard Protocol",
    category: "cardiovascular",
    popular: true,
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days" }
    ],
    notes: "Monitor blood pressure regularly. Reduce sodium intake."
  },
  {
    id: "antibiotics-respiratory",
    name: "Respiratory Infection Treatment",
    category: "respiratory",
    popular: false,
    medications: [
      { name: "Azithromycin", dosage: "500mg", frequency: "Once daily", duration: "5 days" },
      { name: "Dextromethorphan", dosage: "15mg", frequency: "Every 4 hours", duration: "7 days" }
    ],
    notes: "Complete full antibiotic course. Increase fluid intake."
  },
  {
    id: "pain-management",
    name: "Chronic Pain Management",
    category: "pain",
    popular: true,
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Three times daily", duration: "14 days" },
      { name: "Gabapentin", dosage: "100mg", frequency: "Twice daily", duration: "30 days" }
    ],
    notes: "Take with food to reduce gastric irritation."
  },
  {
    id: "preventive-vitamins",
    name: "Preventive Care - Vitamins",
    category: "preventive",
    popular: false,
    medications: [
      { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "90 days" },
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Once daily", duration: "90 days" }
    ],
    notes: "Take with meals for better absorption."
  }
];

interface MedicationTemplatesProps {
  onTemplateSelect: (template: MedicationTemplate) => void;
}

export const MedicationTemplates = ({ onTemplateSelect }: MedicationTemplatesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "diabetes", label: "Diabetes" },
    { value: "cardiovascular", label: "Cardiovascular" },
    { value: "respiratory", label: "Respiratory" },
    { value: "pain", label: "Pain Management" },
    { value: "preventive", label: "Preventive Care" }
  ];

  const filteredTemplates = medicationTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.medications.some(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTemplates = filteredTemplates.filter(t => t.popular);
  const allTemplates = filteredTemplates;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Medication Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <Input
            placeholder="Search templates or medications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {allTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={onTemplateSelect} />
            ))}
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-3 mt-4">
            {popularTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onSelect={onTemplateSelect} />
            ))}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-3 mt-4">
            <div className="text-center text-muted-foreground py-8">
              Recently used templates will appear here
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const TemplateCard = ({ template, onSelect }: { template: MedicationTemplate; onSelect: (template: MedicationTemplate) => void }) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">{template.name}</h4>
            {template.popular && <Star className="h-4 w-4 text-warning fill-current" />}
          </div>
          <Badge variant="secondary" className="capitalize">
            {template.category}
          </Badge>
        </div>
        <Button onClick={() => onSelect(template)} size="sm">
          <Copy className="h-4 w-4 mr-2" />
          Use Template
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-medium text-muted-foreground">Medications: </span>
          <span>{template.medications.map(m => m.name).join(", ")}</span>
        </div>
        {template.notes && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Notes: </span>
            {template.notes}
          </div>
        )}
      </div>
    </div>
  );
};