import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, Platform } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  TextInput, 
  Menu, 
  Divider, 
  Chip, 
  Icon,
  RadioButton,
  Checkbox,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radii } from '../../theme/tokens';
import { useI18n } from '../../i18n/i18n';

export default function AppointmentBookingScreen({ navigation, route }) {
  const { t } = useI18n();
  
  // Get passed parameters from DoctorSelection screen
  const { selectedDoctor, appointmentType: passedAppointmentType, prefilledData } = route.params || {};
  
  // Form state
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentType: prefilledData?.appointmentType || '',
    preferredDoctor: prefilledData?.preferredDoctor || '',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    urgencyLevel: 'normal',
    isFollowUp: false,
    previousVisitId: '',
    insurance: '',
    specialRequests: ''
  });

  // UI state
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showDoctorMenu, setShowDoctorMenu] = useState(false);
  const [showInsuranceMenu, setShowInsuranceMenu] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const appointmentTypes = [
    { id: 'consultation', label: 'General Consultation', icon: 'stethoscope', duration: '30 min' },
    { id: 'checkup', label: 'Health Checkup', icon: 'heart-pulse', duration: '45 min' },
    { id: 'vaccination', label: 'Vaccination', icon: 'needle', duration: '15 min' },
    { id: 'specialist', label: 'Specialist Consultation', icon: 'doctor', duration: '60 min' },
    { id: 'emergency', label: 'Emergency', icon: 'alert-circle', duration: 'Immediate' }
  ];

  const doctors = [
    { id: 'dr-sharma', name: 'Dr. Priya Sharma', specialty: 'General Medicine', rating: 4.8, available: true },
    { id: 'dr-kumar', name: 'Dr. Raj Kumar', specialty: 'Cardiology', rating: 4.9, available: true },
    { id: 'dr-patel', name: 'Dr. Anjali Patel', specialty: 'Pediatrics', rating: 4.7, available: false },
    { id: 'dr-singh', name: 'Dr. Amrit Singh', specialty: 'Orthopedics', rating: 4.6, available: true }
  ];

  const commonSymptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Fatigue', 
    'Nausea', 'Dizziness', 'Chest pain', 'Shortness of breath', 'Back pain'
  ];

  const insuranceProviders = [
    'ESIC', 'CGHS', 'Ayushman Bharat', 'Star Health', 'HDFC Ergo', 'ICICI Lombard', 'None'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  // Helper functions
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const validateForm = () => {
    const required = ['patientName', 'patientPhone', 'appointmentType', 'preferredDate', 'preferredTime'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      Alert.alert(t('error'), `Please fill in: ${missing.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        t('success'),
        'Appointment booked successfully! You will receive a confirmation SMS.',
        [
          { 
            text: 'View Appointments', 
            onPress: () => navigation.navigate('AppointmentsList')
          },
          { 
            text: t('ok'), 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    }, 2000);
  };

  const getUrgencyColor = (level) => {
    switch(level) {
      case 'low': return '#10B981';
      case 'normal': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'emergency': return '#DC2626';
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Button
            mode="text"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            labelStyle={styles.backButtonLabel}
            icon="arrow-left"
          >
            Back
          </Button>
          <Text variant="headlineMedium" style={styles.title}>
            Book Appointment
          </Text>
          <Text style={styles.subtitle}>
            Schedule your healthcare visit
          </Text>
        </View>

        {/* Selected Doctor & Appointment Type (if passed from DoctorSelection) */}
        {selectedDoctor && (
          <Card style={styles.section}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Selected Doctor & Service
              </Text>
              
              <View style={styles.selectedDoctorContainer}>
                <View style={styles.doctorInfoRow}>
                  <Icon source="doctor" size={24} color={colors.primary} />
                  <View style={styles.doctorDetails}>
                    <Text style={styles.selectedDoctorName}>{selectedDoctor.name}</Text>
                    <Text style={styles.selectedDoctorSpecialty}>{selectedDoctor.specialtyName}</Text>
                    <Text style={styles.selectedDoctorHospital}>{selectedDoctor.hospital}</Text>
                  </View>
                  <View style={styles.doctorMeta}>
                    <View style={styles.ratingRow}>
                      <Icon source="star" size={14} color="#F59E0B" />
                      <Text style={styles.ratingText}>{selectedDoctor.rating}</Text>
                    </View>
                    <Text style={styles.distanceText}>{selectedDoctor.distance}</Text>
                  </View>
                </View>
                
                {passedAppointmentType && (
                  <View style={styles.appointmentTypeRow}>
                    <Icon source="calendar-clock" size={20} color={colors.primary} />
                    <Text style={styles.appointmentTypeText}>
                      {appointmentTypes.find(t => t.id === passedAppointmentType)?.label}
                    </Text>
                    <Text style={styles.appointmentTypeFee}>
                      {selectedDoctor.fees[passedAppointmentType] || selectedDoctor.fees.consultation}
                    </Text>
                  </View>
                )}
                
                <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.changeDoctorButton}
                  labelStyle={styles.changeDoctorButtonLabel}
                  icon="arrow-left"
                  compact
                >
                  Change Doctor
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Patient Information */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Patient Information
            </Text>
            
            <TextInput
              label="Full Name *"
              value={formData.patientName}
              onChangeText={(text) => updateFormData('patientName', text)}
              style={styles.input}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
            />
            
            <TextInput
              label="Phone Number *"
              value={formData.patientPhone}
              onChangeText={(text) => updateFormData('patientPhone', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="phone-pad"
              left={<TextInput.Icon icon="phone" />}
            />
            
            <TextInput
              label="Email Address"
              value={formData.patientEmail}
              onChangeText={(text) => updateFormData('patientEmail', text)}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              left={<TextInput.Icon icon="email" />}
            />
          </Card.Content>
        </Card>

        {/* Appointment Type */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Appointment Type *
            </Text>
            
            <Menu
              visible={showTypeMenu}
              onDismiss={() => setShowTypeMenu(false)}
              anchor={
                <Surface style={styles.dropdown} elevation={0}>
                  <Button
                    mode="outlined"
                    onPress={() => setShowTypeMenu(true)}
                    contentStyle={styles.dropdownButton}
                    style={styles.dropdownButtonStyle}
                    icon="chevron-down"
                  >
                    {formData.appointmentType ? 
                      appointmentTypes.find(t => t.id === formData.appointmentType)?.label :
                      'Select appointment type'
                    }
                  </Button>
                </Surface>
              }
            >
              {appointmentTypes.map((type) => (
                <Menu.Item
                  key={type.id}
                  onPress={() => {
                    updateFormData('appointmentType', type.id);
                    setShowTypeMenu(false);
                  }}
                  title={
                    <View style={styles.menuItem}>
                      <Icon source={type.icon} size={20} color={colors.primary} />
                      <View style={styles.menuItemText}>
                        <Text style={styles.menuItemTitle}>{type.label}</Text>
                        <Text style={styles.menuItemSubtitle}>{type.duration}</Text>
                      </View>
                    </View>
                  }
                />
              ))}
            </Menu>
          </Card.Content>
        </Card>

        {/* Doctor Selection */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Preferred Doctor
            </Text>
            
            <Menu
              visible={showDoctorMenu}
              onDismiss={() => setShowDoctorMenu(false)}
              anchor={
                <Surface style={styles.dropdown} elevation={0}>
                  <Button
                    mode="outlined"
                    onPress={() => setShowDoctorMenu(true)}
                    contentStyle={styles.dropdownButton}
                    style={styles.dropdownButtonStyle}
                    icon="chevron-down"
                  >
                    {formData.preferredDoctor ? 
                      doctors.find(d => d.id === formData.preferredDoctor)?.name :
                      'Any available doctor'
                    }
                  </Button>
                </Surface>
              }
            >
              <Menu.Item
                onPress={() => {
                  updateFormData('preferredDoctor', '');
                  setShowDoctorMenu(false);
                }}
                title="Any available doctor"
              />
              <Divider />
              {doctors.map((doctor) => (
                <Menu.Item
                  key={doctor.id}
                  onPress={() => {
                    updateFormData('preferredDoctor', doctor.id);
                    setShowDoctorMenu(false);
                  }}
                  title={
                    <View style={styles.menuItem}>
                      <Icon source="doctor" size={20} color={doctor.available ? colors.primary : '#9CA3AF'} />
                      <View style={styles.menuItemText}>
                        <Text style={[styles.menuItemTitle, !doctor.available && styles.unavailableText]}>
                          {doctor.name}
                        </Text>
                        <Text style={styles.menuItemSubtitle}>
                          {doctor.specialty} • ⭐ {doctor.rating}
                          {!doctor.available && ' • Unavailable'}
                        </Text>
                      </View>
                    </View>
                  }
                  disabled={!doctor.available}
                />
              ))}
            </Menu>
          </Card.Content>
        </Card>

        {/* Date & Time Selection */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Schedule *
            </Text>
            
            <View style={styles.dateTimeRow}>
              <TextInput
                label="Preferred Date"
                value={formData.preferredDate}
                onChangeText={(text) => updateFormData('preferredDate', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                placeholder="DD/MM/YYYY"
                left={<TextInput.Icon icon="calendar" />}
              />
              
              <TextInput
                label="Preferred Time"
                value={formData.preferredTime}
                onChangeText={(text) => updateFormData('preferredTime', text)}
                style={[styles.input, styles.halfInput]}
                mode="outlined"
                placeholder="HH:MM AM/PM"
                left={<TextInput.Icon icon="clock" />}
              />
            </View>
            
            <Text style={styles.timeSlotLabel}>Available Time Slots:</Text>
            <View style={styles.timeSlots}>
              {timeSlots.map((time) => (
                <Chip
                  key={time}
                  mode={formData.preferredTime === time ? 'flat' : 'outlined'}
                  selected={formData.preferredTime === time}
                  onPress={() => updateFormData('preferredTime', time)}
                  style={styles.timeChip}
                  textStyle={styles.timeChipText}
                >
                  {time}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Symptoms & Urgency */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Symptoms & Urgency
            </Text>
            
            <Text style={styles.symptomsLabel}>Select your symptoms:</Text>
            <View style={styles.symptomsGrid}>
              {commonSymptoms.map((symptom) => (
                <Chip
                  key={symptom}
                  mode={selectedSymptoms.includes(symptom) ? 'flat' : 'outlined'}
                  selected={selectedSymptoms.includes(symptom)}
                  onPress={() => toggleSymptom(symptom)}
                  style={styles.symptomChip}
                  textStyle={styles.symptomChipText}
                >
                  {symptom}
                </Chip>
              ))}
            </View>
            
            <TextInput
              label="Additional Symptoms/Description"
              value={formData.symptoms}
              onChangeText={(text) => updateFormData('symptoms', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
            />
            
            <Text style={styles.urgencyLabel}>Urgency Level:</Text>
            <RadioButton.Group
              onValueChange={(value) => updateFormData('urgencyLevel', value)}
              value={formData.urgencyLevel}
            >
              {[
                { value: 'low', label: 'Low - Routine checkup', color: '#10B981' },
                { value: 'normal', label: 'Normal - Regular consultation', color: '#F59E0B' },
                { value: 'high', label: 'High - Need attention soon', color: '#EF4444' },
                { value: 'emergency', label: 'Emergency - Immediate care', color: '#DC2626' }
              ].map((option) => (
                <View key={option.value} style={styles.radioOption}>
                  <RadioButton value={option.value} />
                  <Text style={[styles.radioLabel, { color: option.color }]}>
                    {option.label}
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Additional Information */}
        <Card style={styles.section}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Additional Information
            </Text>
            
            <View style={styles.checkboxRow}>
              <Checkbox
                status={formData.isFollowUp ? 'checked' : 'unchecked'}
                onPress={() => updateFormData('isFollowUp', !formData.isFollowUp)}
              />
              <Text style={styles.checkboxLabel}>This is a follow-up appointment</Text>
            </View>
            
            {formData.isFollowUp && (
              <TextInput
                label="Previous Visit ID"
                value={formData.previousVisitId}
                onChangeText={(text) => updateFormData('previousVisitId', text)}
                style={styles.input}
                mode="outlined"
                placeholder="Enter previous appointment ID"
              />
            )}
            
            <Menu
              visible={showInsuranceMenu}
              onDismiss={() => setShowInsuranceMenu(false)}
              anchor={
                <Surface style={styles.dropdown} elevation={0}>
                  <Button
                    mode="outlined"
                    onPress={() => setShowInsuranceMenu(true)}
                    contentStyle={styles.dropdownButton}
                    style={styles.dropdownButtonStyle}
                    icon="chevron-down"
                  >
                    {formData.insurance || 'Select insurance provider'}
                  </Button>
                </Surface>
              }
            >
              {insuranceProviders.map((provider) => (
                <Menu.Item
                  key={provider}
                  onPress={() => {
                    updateFormData('insurance', provider);
                    setShowInsuranceMenu(false);
                  }}
                  title={provider}
                />
              ))}
            </Menu>
            
            <TextInput
              label="Special Requests"
              value={formData.specialRequests}
              onChangeText={(text) => updateFormData('specialRequests', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Any special accommodations or requests..."
            />
          </Card.Content>
        </Card>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
          >
            {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
          </Button>
          
          <Text style={styles.disclaimer}>
            * By booking this appointment, you agree to our terms and conditions. 
            You will receive a confirmation SMS with appointment details.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing(6),
  },
  header: {
    padding: spacing(4),
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing(2),
  },
  backButtonLabel: {
    color: colors.primary,
    fontSize: 16,
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing(1),
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 16,
  },
  section: {
    margin: spacing(4),
    marginTop: spacing(3),
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing(4),
  },
  input: {
    marginBottom: spacing(3),
    backgroundColor: 'transparent',
  },
  dropdown: {
    marginBottom: spacing(3),
    backgroundColor: 'transparent',
  },
  dropdownButton: {
    justifyContent: 'flex-start',
    height: 56,
  },
  dropdownButtonStyle: {
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing(1),
  },
  menuItemText: {
    marginLeft: spacing(3),
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  unavailableText: {
    color: '#9CA3AF',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: spacing(3),
  },
  halfInput: {
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing(2),
    marginTop: spacing(2),
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(2),
  },
  timeChip: {
    marginBottom: spacing(2),
  },
  timeChipText: {
    fontSize: 12,
  },
  symptomsLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing(2),
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(2),
    marginBottom: spacing(3),
  },
  symptomChip: {
    marginBottom: spacing(2),
  },
  symptomChipText: {
    fontSize: 12,
  },
  urgencyLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing(2),
    marginTop: spacing(2),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(1),
  },
  radioLabel: {
    marginLeft: spacing(2),
    fontSize: 14,
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  checkboxLabel: {
    marginLeft: spacing(2),
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  submitSection: {
    padding: spacing(4),
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    marginBottom: spacing(3),
  },
  submitButtonContent: {
    height: 56,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  disclaimer: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Selected Doctor Styles
  selectedDoctorContainer: {
    backgroundColor: '#F8FFF9',
    borderRadius: radii.md,
    padding: spacing(3),
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  doctorDetails: {
    flex: 1,
    marginLeft: spacing(3),
  },
  selectedDoctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  selectedDoctorSpecialty: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedDoctorHospital: {
    fontSize: 12,
    color: '#6B7280',
  },
  doctorMeta: {
    alignItems: 'flex-end',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
  distanceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  appointmentTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    padding: spacing(2),
    marginBottom: spacing(3),
  },
  appointmentTypeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: spacing(2),
  },
  appointmentTypeFee: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  changeDoctorButton: {
    alignSelf: 'flex-start',
    borderColor: colors.primary,
  },
  changeDoctorButtonLabel: {
    fontSize: 12,
    color: colors.primary,
  },
});