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

      {/* Main 2-Column Grid Section */}
      <View style={styles.mainGridSection}>
        <View style={styles.gridContainer}>
          {/* Left Column - Large Health Records Card */}
          <View style={styles.leftColumn}>
            <View style={styles.largeCard}>
              <View style={styles.largeCardHeader}>
                <Icon source="folder-heart" size={28} color="#43A047" />
                <Text style={styles.largeCardTitle}>{t('healthLocker')}</Text>
              </View>
              <Text style={styles.largeCardDescription}>
                {t('securelyAccessRecords')}
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Records</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Categories</Text>
                </View>
              </View>
              <View style={styles.abdmBadge}>
                <Icon source="shield-check" size={16} color="#10B981" />
                <Text style={styles.abdmBadgeText}>ABDM Verified</Text>
              </View>
              <Button
                mode="contained"
                style={styles.largeCardButton}
                labelStyle={styles.largeCardButtonText}
                onPress={navigateToRecords}
                icon="arrow-right"
                contentStyle={styles.buttonContent}
              >
                {t('myRecords')}
              </Button>
            </View>
          </View>

          {/* Right Column - Two Stacked Cards */}
          <View style={styles.rightColumn}>
            {/* Top Card - ABHA */}
            <View style={styles.smallCard}>
              <Icon source="card-account-details" size={24} color="#43A047" style={styles.smallCardIcon} />
              <Text style={styles.smallCardTitle}>{t('abhaCard')}</Text>
              <Text style={styles.smallCardDescription}>
                {t('verifyAbhaDetails')}
              </Text>
              <Button
                mode="outlined"
                style={styles.smallCardButton}
                labelStyle={styles.smallCardButtonText}
                onPress={() => {}}
              >
                {t('myAbha')}
              </Button>
            </View>

            {/* Bottom Card - Emergency Info */}
            <View style={[styles.smallCard, styles.emergencyCard]}>
              <Icon source="alert-circle" size={24} color="#DC2626" style={styles.smallCardIcon} />
              <Text style={[styles.smallCardTitle, styles.emergencyTitle]}>{t('emergencyDetails')}</Text>
              <Text style={styles.smallCardDescription}>
                {t('quickAccessEmergency')}
              </Text>
              <Button
                mode="contained"
                style={styles.emergencyButton}
                labelStyle={styles.emergencyButtonText}
                onPress={() => {}}
                icon="share"
              >
                Share Info
              </Button>
            </View>
          </View>
        </View>
      </View>

      {/* Redesigned Appointment Booking Card */}
      <View style={styles.appointmentSection}>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <View style={styles.appointmentIconContainer}>
              <Icon source="calendar-heart" size={32} color="#43A047" />
            </View>
            <View style={styles.appointmentHeaderText}>
              <Text style={styles.appointmentTitle}>{t('bookAppointment')}</Text>
              <Text style={styles.appointmentSubtitle}>{t('findDoctorsNearby')}</Text>
            </View>
            <Pressable onPress={() => {}} style={styles.historyButton}>
              <Icon source="history" size={20} color="#6B7280" />
              <Text style={styles.historyText}>{t('history')}</Text>
            </Pressable>
          </View>
          
          <View style={styles.appointmentServices}>
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Icon source="video" size={20} color="#43A047" />
              </View>
              <Text style={styles.serviceText}>Video Call</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Icon source="hospital-building" size={20} color="#43A047" />
              </View>
              <Text style={styles.serviceText}>In-person</Text>
            </View>
            <View style={styles.serviceItem}>
              <View style={styles.serviceIcon}>
                <Icon source="test-tube" size={20} color="#43A047" />
              </View>
              <Text style={styles.serviceText}>Lab Tests</Text>
            </View>
          </View>

          <View style={styles.appointmentActions}>
            <Button
              mode="contained"
              style={styles.bookButton}
              labelStyle={styles.bookButtonText}
              onPress={() => {}}
              icon="calendar-plus"
              contentStyle={styles.bookButtonContent}
            >
              {t('bookNow')}
            </Button>
            <Button
              mode="outlined"
              style={styles.emergencyCallButton}
              labelStyle={styles.emergencyCallButtonText}
              onPress={() => {}}
              icon="phone"
            >
              Emergency
            </Button>
          </View>
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
  // New 2-Column Grid Layout Styles
  mainGridSection: {
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    height: 280, // Fixed height for the grid
  },
  leftColumn: {
    flex: 1, // Equal width with right column
  },
  rightColumn: {
    flex: 1, // Equal width with left column
    gap: 12,
  },
  largeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: '100%',
  },
  largeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  largeCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A2540',
    marginLeft: 10,
    flex: 1,
  },
  largeCardDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43A047',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  abdmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  abdmBadgeText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 4,
  },
  largeCardButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    marginTop: 'auto',
  },
  largeCardButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
  smallCard: {
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
    flex: 1,
    justifyContent: 'space-between',
  },
  smallCardIcon: {
    marginBottom: 8,
  },
  smallCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 6,
    lineHeight: 18,
  },
  smallCardDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 12,
    flex: 1,
  },
  smallCardButton: {
    borderColor: '#43A047',
    borderRadius: 8,
  },
  smallCardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#43A047',
  },
  // Emergency Card Styles
  emergencyCard: {
    borderColor: '#DC2626',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  emergencyTitle: {
    color: '#DC2626',
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    borderRadius: 8,
  },
  emergencyButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  // Redesigned Appointment Card Styles
  appointmentSection: {
    marginBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#43A047',
  },
  appointmentHeaderText: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 2,
  },
  appointmentSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  historyButton: {
    alignItems: 'center',
    padding: 8,
  },
  historyText: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  appointmentServices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  serviceItem: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#43A047',
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bookButtonContent: {
    flexDirection: 'row-reverse',
  },
  emergencyCallButton: {
    flex: 1,
    borderColor: '#DC2626',
    borderRadius: 12,
  },
  emergencyCallButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  bottomSpacing: {
    height: 120,
  },
});
