import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Icon, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../i18n/i18n';

export default function DashboardScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();

  const navigateToRecords = () => {
    // Navigate to the Records screen directly
    navigation.navigate('Records');
  };

  // Mock user data - replace with actual user data from context/API
  const userData = {
    name: 'User Name',
    abhaId: 'user.name@abdm',
    isVerified: true
  };

  const UserProfileCard = () => (
    <View style={styles.profileCard}>
      <View style={styles.profileLeft}>
        <View style={styles.avatarContainer}>
          <Icon source="account" size={24} color="#43A047" />
        </View>
      </View>
      <View style={styles.profileCenter}>
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileId}>{userData.abhaId}</Text>
      </View>
      <View style={styles.profileRight}>
        {userData.isVerified && (
          <View style={styles.verifiedBadge}>
            <Icon source="check" size={16} color="#FFFFFF" />
          </View>
        )}
      </View>
    </View>
  );

  const FeatureCard = ({ icon, title, description, buttonText, onPress, disabled = false }) => (
    <View style={[styles.featureCard, disabled && styles.disabledCard]}>
      <View style={styles.cardContent}>
        <Icon source={icon} size={28} color={disabled ? '#9CA3AF' : '#43A047'} style={styles.cardIcon} />
        <Text style={[styles.cardTitle, disabled && styles.disabledText]}>{title}</Text>
        <Text style={[styles.cardDescription, disabled && styles.disabledText]}>{description}</Text>
      </View>
      <Button
        mode="contained"
        style={[styles.cardButton, disabled && styles.disabledButton]}
        labelStyle={styles.cardButtonText}
        onPress={onPress}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </View>
  );

  const AppointmentCard = () => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentTitle}>{t('bookAppointment')}</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.historyLink}>{t('history')}</Text>
        </Pressable>
      </View>
      <Text style={styles.appointmentDescription}>{t('findDoctorsNearby')}</Text>
      <Button
        mode="contained"
        style={styles.appointmentButton}
        labelStyle={styles.appointmentButtonText}
        onPress={() => {}}
      >
        {t('bookNow')}
      </Button>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent} 
      contentInsetAdjustmentBehavior="automatic" 
      automaticallyAdjustContentInsets
      showsVerticalScrollIndicator={false}
    >
      {/* User Profile Card */}
      <View style={styles.profileSection}>
        <UserProfileCard />
      </View>

      {/* Section 1: Health Features Grid */}
      <View style={styles.section}>
        <View style={styles.gridRow}>
          <FeatureCard
            icon="folder-heart"
            title={t('healthLocker')}
            description={t('securelyAccessRecords')}
            buttonText={t('myRecords')}
            onPress={navigateToRecords}
          />
          <FeatureCard
            icon="card-account-details"
            title={t('abhaCard')}
            description={t('verifyAbhaDetails')}
            buttonText={t('myAbha')}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Section 2: Appointment Booking */}
      <View style={styles.section}>
        <AppointmentCard />
      </View>

      {/* Section 3: Additional Health Options */}
      <View style={styles.section}>
        <View style={styles.gridRow}>
          <FeatureCard
            icon="heart-pulse"
            title={t('myHealth')}
            description={t('trackVitalsAndHealth')}
            buttonText={t('manageHealth')}
            onPress={() => {}}
          />
          <FeatureCard
            icon="alert-circle"
            title={t('emergencyDetails')}
            description={t('quickAccessEmergency')}
            buttonText={t('comingSoon')}
            onPress={() => {}}
            disabled={true}
          />
        </View>
      </View>

      {/* Bottom spacing for tab bar */}
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
    padding: 16,  // Increased from 16 to 20 for more breathing room
  },
  profileSection: {
    marginBottom: 20,  // Increased space below profile card
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#43A047',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  profileLeft: {
    marginRight: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#43A047',
  },
  profileCenter: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 2,
  },
  profileId: {
    fontSize: 13,
    color: '#6B7280',
  },
  profileRight: {
    marginLeft: 12,
  },
  verifiedBadge: {
    width: 28,
    height: 28,
    backgroundColor: '#43A047',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 12,  // Increased from 24 to 32 for more separation
  },
  gridRow: {
    flexDirection: 'row',
    gap: 8,  // Increased from 12 to 16 for more space between cards
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 160,
  },
  disabledCard: {
    backgroundColor: '#F8F9FA',
    shadowOpacity: 0.02,
    elevation: 1,
  },
  cardContent: {
    flex: 1,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 6,
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  disabledText: {
    color: '#9CA3AF',
  },
  cardButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    marginTop: 'auto',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  cardButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A2540',
  },
  historyLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#43A047',
  },
  appointmentDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  appointmentButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
  },
  appointmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 120,
  },
});
