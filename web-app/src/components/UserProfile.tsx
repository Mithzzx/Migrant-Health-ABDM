import { useState } from "react";
import { User, Settings, Shield, Bell, LogOut, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface DoctorProfile {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  experience: string;
  hospital: string;
  department: string;
  bio: string;
  consultationFee: string;
}

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<DoctorProfile>({
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@healthcenter.com", 
    phone: "+91 98765 12345",
    specialization: "General Practitioner",
    licenseNumber: "MH12345678",
    experience: "8 years",
    hospital: "Apollo Health Center", 
    department: "Internal Medicine",
    bio: "Experienced general practitioner specializing in preventive care, chronic disease management, and family medicine. Committed to providing comprehensive healthcare with a patient-centered approach.",
    consultationFee: "₹800"
  });

  const [editedProfile, setEditedProfile] = useState<DoctorProfile>(profile);
  
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    labResults: true,
    emergencyAlerts: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          Doctor Profile
        </h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.specialization}</p>
                  <Badge variant="secondary">{profile.experience} experience</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Medical License</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.licenseNumber}
                      onChange={(e) => setEditedProfile({...editedProfile, licenseNumber: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.licenseNumber}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Specialization</Label>
                  {isEditing ? (
                    <Select 
                      value={editedProfile.specialization} 
                      onValueChange={(value) => setEditedProfile({...editedProfile, specialization: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Practitioner">General Practitioner</SelectItem>
                        <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                        <SelectItem value="Endocrinologist">Endocrinologist</SelectItem>
                        <SelectItem value="Neurologist">Neurologist</SelectItem>
                        <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 text-sm">{profile.specialization}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Experience</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.experience}
                      onChange={(e) => setEditedProfile({...editedProfile, experience: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.experience}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Hospital/Clinic</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.hospital}
                      onChange={(e) => setEditedProfile({...editedProfile, hospital: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.hospital}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Department</Label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.department}
                      onChange={(e) => setEditedProfile({...editedProfile, department: e.target.value})}
                    />
                  ) : (
                    <div className="p-2 text-sm">{profile.department}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Professional Bio</Label>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="p-2 text-sm text-muted-foreground">{profile.bio}</div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {key === 'appointmentReminders' && 'Get notified about upcoming appointments'}
                        {key === 'labResults' && 'Receive alerts when lab results are ready'}
                        {key === 'emergencyAlerts' && 'Critical patient alerts and emergency notifications'}
                        {key === 'systemUpdates' && 'System maintenance and feature updates'}
                        {key === 'marketingEmails' && 'Product updates and promotional content'}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Stats & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              
              <Separator />
              
              <Button variant="destructive" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Practice Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground">Total Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">856</div>
                  <div className="text-xs text-muted-foreground">Prescriptions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">94%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">4.8</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};