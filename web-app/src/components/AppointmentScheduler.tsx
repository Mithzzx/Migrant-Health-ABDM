import { useState } from "react";
import { Calendar, Clock, Plus, User, Phone, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  phone: string;
  date: string;
  time: string;
  type: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  notes: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "APT001",
    patientName: "Priya Sharma", 
    patientId: "ABHA001",
    phone: "+91 98765 43210",
    date: "2024-01-16",
    time: "09:00",
    type: "follow-up",
    status: "confirmed",
    notes: "Diabetes follow-up, check HbA1c results"
  },
  {
    id: "APT002",
    patientName: "Rajesh Kumar",
    patientId: "ABHA002", 
    phone: "+91 87654 32109",
    date: "2024-01-16",
    time: "10:30",
    type: "checkup",
    status: "scheduled",
    notes: "Annual physical examination"
  },
  {
    id: "APT003",
    patientName: "Anita Patel",
    patientId: "ABHA003",
    phone: "+91 76543 21098",
    date: "2024-01-16",
    time: "14:00", 
    type: "consultation",
    status: "confirmed",
    notes: "New patient consultation - respiratory symptoms"
  }
];

export const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const appointmentTypes = [
    { value: "checkup", label: "Regular Checkup" },
    { value: "follow-up", label: "Follow-up Visit" },
    { value: "consultation", label: "New Consultation" },
    { value: "emergency", label: "Emergency" },
    { value: "procedure", label: "Minor Procedure" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-warning/20 text-warning-foreground";
      case "confirmed": return "bg-primary/20 text-primary-foreground"; 
      case "completed": return "bg-success/20 text-success-foreground";
      case "cancelled": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  const handleSaveAppointment = () => {
    const appointment: Appointment = {
      id: `APT${String(appointments.length + 1).padStart(3, '0')}`,
      ...newAppointment,
      status: "scheduled"
    };
    
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      patientName: "",
      patientId: "",
      phone: "",
      date: "",
      time: "",
      type: "",
      notes: ""
    });
    setShowNewAppointment(false);
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const todayAppointments = appointments.filter(apt => apt.date === "2024-01-16");
  const upcomingAppointments = appointments.filter(apt => apt.date > "2024-01-16");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Appointment Scheduler
        </h2>
        <Button onClick={() => setShowNewAppointment(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Today - January 16, 2024</h3>
              <Badge variant="secondary">{todayAppointments.length} appointments</Badge>
            </div>
            
            {todayAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                onStatusUpdate={updateAppointmentStatus}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id} 
                  appointment={appointment} 
                  onStatusUpdate={updateAppointmentStatus}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No upcoming appointments scheduled
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Calendar view would integrate with a full calendar component
              <div className="mt-4 text-sm">
                Total Appointments This Week: {appointments.length}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Appointment Modal/Form */}
      {showNewAppointment && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient Name</Label>
                <Input
                  placeholder="Enter patient name"
                  value={newAppointment.patientName}
                  onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>ABHA ID</Label>
                <Input
                  placeholder="Patient ABHA ID"
                  value={newAppointment.patientId}
                  onChange={(e) => setNewAppointment({...newAppointment, patientId: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="Contact number"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={newAppointment.time} onValueChange={(value) => setNewAppointment({...newAppointment, time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Appointment notes or special instructions"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSaveAppointment}>Save Appointment</Button>
              <Button variant="outline" onClick={() => setShowNewAppointment(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const AppointmentCard = ({ 
  appointment, 
  onStatusUpdate 
}: { 
  appointment: Appointment;
  onStatusUpdate: (id: string, status: Appointment["status"]) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-warning/20 text-warning-foreground";
      case "confirmed": return "bg-primary/20 text-primary-foreground"; 
      case "completed": return "bg-success/20 text-success-foreground";
      case "cancelled": return "bg-muted text-muted-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{appointment.time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{appointment.patientName}</div>
                <div className="text-sm text-muted-foreground">{appointment.patientId}</div>
              </div>
            </div>
            
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusUpdate(appointment.id, "confirmed")}
              disabled={appointment.status === "completed"}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirm
            </Button>
            
            <Button
              size="sm"
              onClick={() => onStatusUpdate(appointment.id, "completed")}
              disabled={appointment.status === "completed"}
            >
              Complete
            </Button>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-3 text-sm text-muted-foreground">
            <strong>Notes:</strong> {appointment.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};