import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, Linking, Platform } from 'react-native';
import { Text, Card, Button, Icon, Divider, TouchableRipple, Switch } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function EmergencyDetailsScreen({ navigation }) {
  const { t } = useI18n();
  const [isEmergencyModeEnabled, setIsEmergencyModeEnabled] = useState(false);

  // Emergency contacts
  const emergencyContacts = [
    {
      id: 'ambulance',
      name: 'Ambulance',
      number: '108',
      description: 'Emergency Medical Services',
      icon: 'ambulance',
      color: '#DC2626'
    },
    {
      id: 'police',
      name: 'Police',
      number: '100',
      description: 'Police Emergency',
      icon: 'shield-account',
      color: '#1D4ED8'
    },
    {
      id: 'fire',
      name: 'Fire Department',
      number: '101',
      description: 'Fire & Rescue Services',
      icon: 'fire-truck',
      color: '#EA580C'
    },
    {
      id: 'disaster',
      name: 'Disaster Management',
      number: '1078',
      description: 'Natural Disaster Helpline',
      icon: 'weather-hurricane',
      color: '#7C2D12'
    },
    {
      id: 'women',
      name: 'Women Helpline',
      number: '1091',
      description: 'Women Safety & Support',
      icon: 'account-group',
      color: '#BE185D'
    }
  ];

  // Medical emergency info
  const emergencyMedicalInfo = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    chronicConditions: ['Diabetes Type 2', 'Hypertension'],
    currentMedications: ['Metformin 500mg', 'Lisinopril 10mg'],
    emergencyContact: {
      name: 'John Doe (Spouse)',
      phone: '+91 98765 43210',
      relation: 'Spouse'
    },
    doctor: {
      name: 'Dr. Sarah Wilson',
      phone: '+91 98765 12345',
      hospital: 'Apollo Hospital, Bangalore'
    }
  };

  const handleEmergencyCall = (contact) => {
    Alert.alert(
      `Call ${contact.name}`,
      `Do you want to call ${contact.number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          style: 'destructive',
          onPress: () => {
            const phoneUrl = Platform.OS === 'ios' ? `telprompt:${contact.number}` : `tel:${contact.number}`;
            Linking.openURL(phoneUrl);
          }
        }
      ]
    );
  };

  const shareEmergencyInfo = () => {
    const emergencyData = `
🚨 EMERGENCY MEDICAL INFORMATION 🚨

👤 Patient: User Name
🩸 Blood Type: ${emergencyMedicalInfo.bloodType}

⚠️ ALLERGIES:
${emergencyMedicalInfo.allergies.map(allergy => `• ${allergy}`).join('\n')}

🏥 CHRONIC CONDITIONS:
${emergencyMedicalInfo.chronicConditions.map(condition => `• ${condition}`).join('\n')}

💊 CURRENT MEDICATIONS:
${emergencyMedicalInfo.currentMedications.map(med => `• ${med}`).join('\n')}

📞 EMERGENCY CONTACT:
${emergencyMedicalInfo.emergencyContact.name}
Phone: ${emergencyMedicalInfo.emergencyContact.phone}

👩‍⚕️ PRIMARY DOCTOR:
${emergencyMedicalInfo.doctor.name}
Hospital: ${emergencyMedicalInfo.doctor.hospital}
Phone: ${emergencyMedicalInfo.doctor.phone}

🏥 ABDM ID: user.name@abdm
    `.trim();

    Alert.alert(
      'Share Emergency Info',
      'This will share your medical emergency information.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Share', 
          onPress: () => {
            // In a real app, this would use the Share API
            Alert.alert('Emergency Info Shared', 'Your emergency medical information has been shared successfully.');
          }
        }
      ]
    );
  };

  const EmergencyContactCard = ({ contact }) => (
    <TouchableRipple
      onPress={() => handleEmergencyCall(contact)}
      style={styles.emergencyContactCard}
    >
      <View style={styles.emergencyContactContent}>
        <View style={[styles.emergencyContactIcon, { backgroundColor: `${contact.color}15` }]}>
          <Icon source={contact.icon} size={28} color={contact.color} />
        </View>
        <View style={styles.emergencyContactInfo}>
          <Text style={styles.emergencyContactName}>{contact.name}</Text>
          <Text style={styles.emergencyContactNumber}>{contact.number}</Text>
          <Text style={styles.emergencyContactDesc}>{contact.description}</Text>
        </View>
        <View style={styles.emergencyContactAction}>
          <Icon source="phone" size={24} color={contact.color} />
        </View>
      </View>
    </TouchableRipple>
  );

  const MedicalInfoSection = ({ title, items, icon, color = '#43A047' }) => (
    <View style={styles.medicalInfoSection}>
      <View style={styles.medicalInfoHeader}>
        <Icon source={icon} size={20} color={color} />
        <Text style={styles.medicalInfoTitle}>{title}</Text>
      </View>
      <View style={styles.medicalInfoContent}>
        {Array.isArray(items) ? (
          items.map((item, index) => (
            <Text key={index} style={styles.medicalInfoItem}>• {item}</Text>
          ))
        ) : (
          <Text style={styles.medicalInfoItem}>{items}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Emergency Mode Toggle */}
      <Card style={styles.emergencyModeCard}>
        <Card.Content>
          <View style={styles.emergencyModeHeader}>
            <View style={styles.emergencyModeInfo}>
              <Text style={styles.emergencyModeTitle}>Emergency Mode</Text>
              <Text style={styles.emergencyModeDesc}>
                Quick access to emergency contacts and medical info
              </Text>
            </View>
            <Switch
              value={isEmergencyModeEnabled}
              onValueChange={setIsEmergencyModeEnabled}
              color="#DC2626"
            />
          </View>
        </Card.Content>
      </Card>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚨 Emergency Contacts</Text>
        <Text style={styles.sectionDesc}>Tap to call emergency services</Text>
        
        {emergencyContacts.map(contact => (
          <EmergencyContactCard key={contact.id} contact={contact} />
        ))}
      </View>

      {/* Medical Emergency Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏥 Medical Emergency Information</Text>
        <Text style={styles.sectionDesc}>Critical medical details for emergency responders</Text>

        <Card style={styles.medicalInfoCard}>
          <Card.Content>
            <MedicalInfoSection
              title="Blood Type"
              items={emergencyMedicalInfo.bloodType}
              icon="water"
              color="#DC2626"
            />
            
            <Divider style={styles.divider} />
            
            <MedicalInfoSection
              title="Allergies"
              items={emergencyMedicalInfo.allergies}
              icon="alert-circle"
              color="#EA580C"
            />
            
            <Divider style={styles.divider} />
            
            <MedicalInfoSection
              title="Chronic Conditions"
              items={emergencyMedicalInfo.chronicConditions}
              icon="heart-pulse"
              color="#7C2D12"
            />
            
            <Divider style={styles.divider} />
            
            <MedicalInfoSection
              title="Current Medications"
              items={emergencyMedicalInfo.currentMedications}
              icon="pill"
              color="#9333EA"
            />
          </Card.Content>
        </Card>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Personal Emergency Contacts</Text>
        
        <Card style={styles.contactCard}>
          <Card.Content>
            <View style={styles.contactHeader}>
              <Icon source="account-heart" size={24} color="#43A047" />
              <Text style={styles.contactName}>{emergencyMedicalInfo.emergencyContact.name}</Text>
            </View>
            <Text style={styles.contactPhone}>{emergencyMedicalInfo.emergencyContact.phone}</Text>
            <Text style={styles.contactRelation}>{emergencyMedicalInfo.emergencyContact.relation}</Text>
            <Button
              mode="outlined"
              onPress={() => handleEmergencyCall({
                name: emergencyMedicalInfo.emergencyContact.name,
                number: emergencyMedicalInfo.emergencyContact.phone
              })}
              style={styles.contactButton}
              icon="phone"
            >
              Call Emergency Contact
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.contactCard}>
          <Card.Content>
            <View style={styles.contactHeader}>
              <Icon source="doctor" size={24} color="#2563EB" />
              <Text style={styles.contactName}>{emergencyMedicalInfo.doctor.name}</Text>
            </View>
            <Text style={styles.contactPhone}>{emergencyMedicalInfo.doctor.phone}</Text>
            <Text style={styles.contactHospital}>{emergencyMedicalInfo.doctor.hospital}</Text>
            <Button
              mode="outlined"
              onPress={() => handleEmergencyCall({
                name: emergencyMedicalInfo.doctor.name,
                number: emergencyMedicalInfo.doctor.phone
              })}
              style={styles.contactButton}
              icon="phone"
            >
              Call Primary Doctor
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Share Emergency Info */}
      <View style={styles.section}>
        <Card style={styles.shareCard}>
          <Card.Content>
            <View style={styles.shareHeader}>
              <Icon source="share-variant" size={28} color="#43A047" />
              <View style={styles.shareInfo}>
                <Text style={styles.shareTitle}>Share Emergency Information</Text>
                <Text style={styles.shareDesc}>
                  Quickly share your medical information with emergency responders or family
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={shareEmergencyInfo}
              style={styles.shareButton}
              icon="share"
            >
              Share Emergency Info
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
        <View style={styles.quickActions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Records')}
            style={[styles.quickActionButton, { backgroundColor: '#43A047' }]}
            icon="folder-heart"
          >
            Medical Records
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Profile')}
            style={[styles.quickActionButton, { backgroundColor: '#2563EB' }]}
            icon="account-edit"
          >
            Edit Profile
          </Button>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emergencyModeCard: {
    marginBottom: 24,
    borderRadius: 16,
    borderColor: '#DC2626',
    borderWidth: 2,
  },
  emergencyModeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emergencyModeInfo: {
    flex: 1,
    marginRight: 16,
  },
  emergencyModeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 4,
  },
  emergencyModeDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  emergencyContactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emergencyContactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  emergencyContactIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyContactInfo: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 2,
  },
  emergencyContactNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 2,
  },
  emergencyContactDesc: {
    fontSize: 13,
    color: '#6B7280',
  },
  emergencyContactAction: {
    marginLeft: 12,
  },
  medicalInfoCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  medicalInfoSection: {
    marginVertical: 8,
  },
  medicalInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  medicalInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginLeft: 8,
  },
  medicalInfoContent: {
    marginLeft: 28,
  },
  medicalInfoItem: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 2,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#E2E8F0',
  },
  contactCard: {
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginLeft: 8,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43A047',
    marginBottom: 4,
  },
  contactRelation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  contactHospital: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  contactButton: {
    borderColor: '#43A047',
    borderRadius: 12,
  },
  shareCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#43A047',
    backgroundColor: '#F0FDF4',
  },
  shareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  shareInfo: {
    flex: 1,
    marginLeft: 12,
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 4,
  },
  shareDesc: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 12,
  },
  bottomSpacing: {
    height: 40,
  },
});