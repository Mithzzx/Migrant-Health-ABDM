import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Chip, 
  Icon,
  FAB,
  Divider,
  TouchableRipple
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radii } from '../../theme/tokens';
import { useI18n } from '../../i18n/i18n';

export default function AppointmentsListScreen({ navigation }) {
  const { t } = useI18n();
  
  // Mock appointments data
  const [appointments] = useState([
    {
      id: '1',
      date: '2025-09-15',
      time: '10:30 AM',
      doctor: 'Dr. Priya Sharma',
      specialty: 'General Medicine',
      type: 'consultation',
      status: 'confirmed',
      location: 'City General Hospital',
      symptoms: ['Fever', 'Headache'],
      urgency: 'normal'
    },
    {
      id: '2',
      date: '2025-09-18',
      time: '02:00 PM',
      doctor: 'Dr. Raj Kumar',
      specialty: 'Cardiology',
      type: 'specialist',
      status: 'pending',
      location: 'Heart Care Center',
      symptoms: ['Chest pain'],
      urgency: 'high'
    },
    {
      id: '3',
      date: '2025-09-20',
      time: '09:00 AM',
      doctor: 'Dr. Anjali Patel',
      specialty: 'Pediatrics',
      type: 'checkup',
      status: 'completed',
      location: 'Children\'s Clinic',
      symptoms: ['Routine checkup'],
      urgency: 'low'
    },
    {
      id: '4',
      date: '2025-09-22',
      time: '11:00 AM',
      doctor: 'Any Available Doctor',
      specialty: 'Vaccination',
      type: 'vaccination',
      status: 'confirmed',
      location: 'Community Health Center',
      symptoms: ['Annual flu shot'],
      urgency: 'low'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'completed': return '#6B7280';
      case 'cancelled': return '#EF4444';
      default: return colors.primary;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'low': return '#10B981';
      case 'normal': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'emergency': return '#DC2626';
      default: return colors.primary;
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'consultation': return 'stethoscope';
      case 'checkup': return 'heart-pulse';
      case 'vaccination': return 'needle';
      case 'specialist': return 'doctor';
      case 'emergency': return 'alert-circle';
      default: return 'calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const renderAppointment = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        // Navigate to appointment details
        console.log('View appointment details:', item.id);
      }}
      style={styles.appointmentRipple}
    >
      <Card style={styles.appointmentCard}>
        <Card.Content style={styles.appointmentContent}>
          {/* Header with date and status */}
          <View style={styles.appointmentHeader}>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.appointmentDate}>{formatDate(item.date)}</Text>
              <Text style={styles.appointmentTime}>{item.time}</Text>
            </View>
            <Chip
              mode="flat"
              style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}
              textStyle={[styles.statusChipText, { color: getStatusColor(item.status) }]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Chip>
          </View>

          {/* Doctor and specialty */}
          <View style={styles.doctorInfo}>
            <Icon source={getTypeIcon(item.type)} size={24} color={colors.primary} />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{item.doctor}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
            </View>
            <Chip
              mode="outlined"
              compact
              style={[styles.urgencyChip, { borderColor: getUrgencyColor(item.urgency) }]}
              textStyle={[styles.urgencyChipText, { color: getUrgencyColor(item.urgency) }]}
            >
              {item.urgency}
            </Chip>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Icon source="map-marker" size={16} color="#6B7280" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>

          {/* Symptoms */}
          {item.symptoms && item.symptoms.length > 0 && (
            <View style={styles.symptomsContainer}>
              <Text style={styles.symptomsLabel}>Symptoms:</Text>
              <View style={styles.symptomsChips}>
                {item.symptoms.slice(0, 3).map((symptom, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    compact
                    style={styles.symptomChip}
                    textStyle={styles.symptomChipText}
                  >
                    {symptom}
                  </Chip>
                ))}
                {item.symptoms.length > 3 && (
                  <Text style={styles.moreSymptoms}>+{item.symptoms.length - 3} more</Text>
                )}
              </View>
            </View>
          )}

          {/* Action buttons for pending/confirmed appointments */}
          {(item.status === 'pending' || item.status === 'confirmed') && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.appointmentActions}>
                <Button
                  mode="outlined"
                  compact
                  onPress={() => console.log('Reschedule:', item.id)}
                  style={styles.actionButton}
                  labelStyle={styles.actionButtonLabel}
                >
                  Reschedule
                </Button>
                <Button
                  mode="text"
                  compact
                  onPress={() => console.log('Cancel:', item.id)}
                  style={styles.actionButton}
                  labelStyle={[styles.actionButtonLabel, { color: '#EF4444' }]}
                >
                  Cancel
                </Button>
                {item.status === 'confirmed' && (
                  <Button
                    mode="contained"
                    compact
                    onPress={() => console.log('Join call:', item.id)}
                    style={[styles.actionButton, styles.primaryActionButton]}
                    labelStyle={styles.primaryActionButtonLabel}
                  >
                    Join Call
                  </Button>
                )}
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'confirmed' || apt.status === 'pending'
  );
  
  const pastAppointments = appointments.filter(apt => 
    apt.status === 'completed' || apt.status === 'cancelled'
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
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
          My Appointments
        </Text>
        <Text style={styles.subtitle}>
          {upcomingAppointments.length} upcoming appointments
        </Text>
      </View>

      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{upcomingAppointments.length}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{appointments.filter(a => a.status === 'pending').length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{pastAppointments.length}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Upcoming Appointments
            </Text>
            <FlatList
              data={upcomingAppointments}
              renderItem={renderAppointment}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.appointmentSeparator} />}
            />
          </View>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Past Appointments
            </Text>
            <FlatList
              data={pastAppointments}
              renderItem={renderAppointment}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.appointmentSeparator} />}
            />
          </View>
        )}

        {/* Empty state */}
        {appointments.length === 0 && (
          <View style={styles.emptyState}>
            <Icon source="calendar-blank" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No appointments yet</Text>
            <Text style={styles.emptyDescription}>
              Book your first appointment to get started with your healthcare journey.
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('DoctorSelection')}
              style={styles.emptyActionButton}
              labelStyle={styles.emptyActionButtonLabel}
            >
              Book Appointment
            </Button>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('DoctorSelection')}
        label="Book"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing(20),
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing(3),
    padding: spacing(4),
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing(4),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing(1),
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginHorizontal: spacing(4),
    marginBottom: spacing(6),
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing(3),
  },
  appointmentRipple: {
    borderRadius: radii.lg,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  appointmentContent: {
    padding: spacing(4),
  },
  appointmentSeparator: {
    height: spacing(3),
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing(3),
  },
  dateTimeContainer: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusChip: {
    marginLeft: spacing(2),
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  doctorDetails: {
    flex: 1,
    marginLeft: spacing(3),
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  urgencyChip: {
    marginLeft: spacing(2),
  },
  urgencyChipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: spacing(2),
  },
  symptomsContainer: {
    marginBottom: spacing(3),
  },
  symptomsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing(2),
  },
  symptomsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing(2),
    alignItems: 'center',
  },
  symptomChip: {
    marginRight: spacing(1),
  },
  symptomChipText: {
    fontSize: 11,
  },
  moreSymptoms: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: spacing(3),
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: spacing(2),
    justifyContent: 'flex-end',
  },
  actionButton: {
    borderRadius: radii.sm,
  },
  actionButtonLabel: {
    fontSize: 12,
  },
  primaryActionButton: {
    backgroundColor: colors.primary,
  },
  primaryActionButtonLabel: {
    color: colors.surface,
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(8),
    marginTop: spacing(8),
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing(4),
    marginBottom: spacing(2),
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing(6),
  },
  emptyActionButton: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
  },
  emptyActionButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.surface,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 16,
    backgroundColor: colors.primary,
  },
});