import { useState } from "react";
import { Filter, X, Calendar, User, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface FilterOptions {
  ageRange: { min: string; max: string };
  condition: string;
  lastVisit: string;
  riskLevel: string;
  gender: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export const AdvancedFilters = ({ onFilterChange, onClearFilters }: AdvancedFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    ageRange: { min: "", max: "" },
    condition: "",
    lastVisit: "",
    riskLevel: "",
    gender: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    // Update active filters for display
    const active = Object.entries(newFilters)
      .filter(([k, v]) => {
        if (k === 'ageRange') {
          const ageRange = v as { min: string; max: string };
          return ageRange.min || ageRange.max;
        }
        return v !== "";
      })
      .map(([k]) => k);
    setActiveFilters(active);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      ageRange: { min: "", max: "" },
      condition: "",
      lastVisit: "",
      riskLevel: "",
      gender: ""
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onClearFilters();
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Filter className="h-4 w-4" />
          Advanced Filters
          {activeFilters.length > 0 && (
            <Badge variant="secondary">{activeFilters.length} active</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Age Range */}
        <div className="space-y-2">
          <Label>Age Range</Label>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Min"
              type="number"
              value={filters.ageRange.min}
              onChange={(e) => handleFilterChange("ageRange", { 
                ...filters.ageRange, 
                min: e.target.value 
              })}
              className="w-20"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              placeholder="Max"
              type="number"
              value={filters.ageRange.max}
              onChange={(e) => handleFilterChange("ageRange", { 
                ...filters.ageRange, 
                max: e.target.value 
              })}
              className="w-20"
            />
            <span className="text-muted-foreground text-sm">years</span>
          </div>
        </div>

        {/* Condition Filter */}
        <div className="space-y-2">
          <Label>Condition Type</Label>
          <Select value={filters.condition} onValueChange={(value) => handleFilterChange("condition", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diabetes">Diabetes</SelectItem>
              <SelectItem value="hypertension">Hypertension</SelectItem>
              <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
              <SelectItem value="respiratory">Respiratory</SelectItem>
              <SelectItem value="checkup">Regular Checkup</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Last Visit */}
        <div className="space-y-2">
          <Label>Last Visit</Label>
          <Select value={filters.lastVisit} onValueChange={(value) => handleFilterChange("lastVisit", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Risk Level */}
        <div className="space-y-2">
          <Label>Risk Level</Label>
          <Select value={filters.riskLevel} onValueChange={(value) => handleFilterChange("riskLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="moderate">Moderate Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={filters.gender} onValueChange={(value) => handleFilterChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="capitalize">
                  {filter.replace(/([A-Z])/g, ' $1')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
        {activeFilters.length > 0 && (
          <Button variant="outline" onClick={clearAllFilters} className="w-full">
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
};