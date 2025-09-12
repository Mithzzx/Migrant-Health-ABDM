import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Platform } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  TextInput, 
  Chip, 
  Icon,
  Avatar,
  TouchableRipple,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, radii } from '../../theme/tokens';
import { useI18n } from '../../i18n/i18n';

export default function DoctorSelectionScreen({ navigation }) {
  const { t } = useI18n();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for specialties
  const specialties = [
    { id: 'all', name: 'All Doctors', icon: 'doctor', color: '#43A047', description: 'Browse all available doctors' },
    { id: 'general', name: 'General Medicine', icon: 'stethoscope', color: '#2563EB', description: 'Primary care & consultation' },
    { id: 'dental', name: 'Dental Care', icon: 'tooth', color: '#DC2626', description: 'Oral health & dental treatment' },
    { id: 'cardiology', name: 'Cardiology', icon: 'heart', color: '#EF4444', description: 'Heart & cardiovascular care' },
    { id: 'pediatrics', name: 'Pediatrics', icon: 'baby-face', color: '#F59E0B', description: 'Children\'s health & wellness' },
    { id: 'orthopedics', name: 'Orthopedics', icon: 'bone', color: '#8B5CF6', description: 'Bone, joint & muscle care' },
    { id: 'gynecology', name: 'Gynecology', icon: 'human-female', color: '#EC4899', description: 'Women\'s health & care' },
    { id: 'dermatology', name: 'Dermatology', icon: 'face-woman', color: '#10B981', description: 'Skin, hair & nail treatment' },
    { id: 'ophthalmology', name: 'Eye Care', icon: 'eye', color: '#06B6D4', description: 'Vision & eye health' },
    { id: 'psychiatry', name: 'Mental Health', icon: 'brain', color: '#6366F1', description: 'Mental wellness & therapy' }
  ];

  // Mock data for appointment types - removed as per requirement

  // Mock data for video blogs
  const videoBlogs = [
    {
      id: 'video-1',
      title: 'Understanding ABDM: Your Digital Health Journey',
      description: 'Learn how ABDM helps you manage your health records digitally and securely.',
      duration: '5:32',
      category: 'ABDM Guide',
      thumbnail: 'play-circle',
      views: '12.5K',
      isNew: true,
      bgColor: '#4F46E5'
    },
    {
      id: 'video-2',
      title: 'How to Link Your Health Records with ABHA ID',
      description: 'Step-by-step guide to connect your medical records with your ABHA ID.',
      duration: '7:45',
      category: 'ABHA Setup',
      thumbnail: 'account-link',
      views: '8.2K',
      isNew: false,
      bgColor: '#059669'
    },
    {
      id: 'video-3',
      title: 'Managing Chronic Conditions with Digital Health',
      description: 'Tips for using digital tools to monitor and manage chronic health conditions.',
      duration: '9:18',
      category: 'Health Tips',
      thumbnail: 'heart-pulse',
      views: '15.3K',
      isNew: false,
      bgColor: '#DC2626'
    },
    {
      id: 'video-4',
      title: 'Telemedicine: Getting Started Guide',
      description: 'Everything you need to know about virtual consultations and online appointments.',
      duration: '6:22',
      category: 'Telemedicine',
      thumbnail: 'video',
      views: '9.8K',
      isNew: true,
      bgColor: '#7C3AED'
    },
    {
      id: 'video-5',
      title: 'Vaccination Records in ABDM Ecosystem',
      description: 'How to maintain and share your vaccination certificates digitally.',
      duration: '4:55',
      category: 'Vaccination',
      thumbnail: 'needle',
      views: '6.7K',
      isNew: false,
      bgColor: '#EA580C'
    },
    {
      id: 'video-6',
      title: 'Data Privacy and Security in Digital Health',
      description: 'Understanding how your health data is protected in the ABDM system.',
      duration: '8:12',
      category: 'Privacy & Security',
      thumbnail: 'shield-check',
      views: '11.1K',
      isNew: false,
      bgColor: '#0891B2'
    }
  ];

  // Mock data for doctors
  const mockDoctors = [
    {
      id: 'dr-1',
      name: 'Dr. Priya Sharma',
      specialty: 'general',
      specialtyName: 'General Medicine',
      rating: 4.8,
      reviews: 245,
      experience: '12 years',
      distance: '0.8 km',
      hospital: 'City General Hospital',
      fees: { consultation: '₹500', checkup: '₹800', emergency: '₹1500' },
      available: true,
      nextSlot: 'Today 2:30 PM',
      languages: ['English', 'Hindi', 'Malayalam'],
      image: null,
      verified: true,
      acceptsInsurance: ['ESIC', 'CGHS', 'Ayushman Bharat']
    },
    {
      id: 'dr-2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'dental',
      specialtyName: 'Dental Care',
      rating: 4.9,
      reviews: 189,
      experience: '15 years',
      distance: '1.2 km',
      hospital: 'Smile Dental Clinic',
      fees: { consultation: '₹600', checkup: '₹1000', emergency: '₹2000' },
      available: true,
      nextSlot: 'Tomorrow 10:00 AM',
      languages: ['English', 'Hindi', 'Tamil'],
      image: null,
      verified: true,
      acceptsInsurance: ['Star Health', 'HDFC Ergo']
    },
    {
      id: 'dr-3',
      name: 'Dr. Anjali Patel',
      specialty: 'pediatrics',
      specialtyName: 'Pediatrics',
      rating: 4.7,
      reviews: 156,
      experience: '8 years',
      distance: '2.1 km',
      hospital: 'Children\'s Care Center',
      fees: { consultation: '₹450', checkup: '₹700', vaccination: '₹300' },
      available: false,
      nextSlot: 'Monday 9:00 AM',
      languages: ['English', 'Gujarati', 'Hindi'],
      image: null,
      verified: true,
      acceptsInsurance: ['ICICI Lombard', 'Ayushman Bharat']
    },
    {
      id: 'dr-4',
      name: 'Dr. Arun Singh',
      specialty: 'cardiology',
      specialtyName: 'Cardiology',
      rating: 4.9,
      reviews: 312,
      experience: '20 years',
      distance: '1.8 km',
      hospital: 'Heart Care Institute',
      fees: { consultation: '₹1000', checkup: '₹1500', emergency: '₹3000' },
      available: true,
      nextSlot: 'Today 4:00 PM',
      languages: ['English', 'Hindi', 'Punjabi'],
      image: null,
      verified: true,
      acceptsInsurance: ['All Major Insurance']
    },
    {
      id: 'dr-5',
      name: 'Dr. Meera Reddy',
      specialty: 'dermatology',
      specialtyName: 'Dermatology',
      rating: 4.6,
      reviews: 98,
      experience: '10 years',
      distance: '3.2 km',
      hospital: 'Skin & Hair Clinic',
      fees: { consultation: '₹700', checkup: '₹1200' },
      available: true,
      nextSlot: 'Tomorrow 11:30 AM',
      languages: ['English', 'Telugu', 'Hindi'],
      image: null,
      verified: true,
      acceptsInsurance: ['CGHS', 'Star Health']
    },
    {
      id: 'dr-6',
      name: 'Dr. Suresh Gupta',
      specialty: 'orthopedics',
      specialtyName: 'Orthopedics',
      rating: 4.8,
      reviews: 267,
      experience: '18 years',
      distance: '2.5 km',
      hospital: 'Bone & Joint Hospital',
      fees: { consultation: '₹800', checkup: '₹1300', emergency: '₹2500' },
      available: true,
      nextSlot: 'Today 5:30 PM',
      languages: ['English', 'Hindi', 'Bengali'],
      image: null,
      verified: true,
      acceptsInsurance: ['ESIC', 'HDFC Ergo', 'ICICI Lombard']
    }
  ];

  // Filter doctors based on search and specialty
  useEffect(() => {
    let filtered = mockDoctors;

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialtyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'rating':
          return b.rating - a.rating;
        case 'fees':
          return parseFloat(a.fees.consultation.replace('₹', '')) - parseFloat(b.fees.consultation.replace('₹', ''));
        case 'availability':
          return b.available - a.available;
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
    setIsLoading(false);
  }, [searchQuery, selectedSpecialty, sortBy]);

  const handleSelectDoctor = (doctor) => {
    // Navigate to appointment booking with selected doctor
    navigation.navigate('AppointmentBooking', {
      selectedDoctor: doctor,
      prefilledData: {
        preferredDoctor: doctor.id
      }
    });
  };

  const renderSpecialtyCard = ({ item }) => (
    <TouchableRipple
      onPress={() => setSelectedSpecialty(item.id)}
      style={styles.specialtyCardRipple}
    >
      <View style={[
        styles.specialtyCard,
        selectedSpecialty === item.id && styles.selectedSpecialtyCard,
        { borderColor: item.color }
      ]}>
        <View style={[styles.specialtyIconContainer, { backgroundColor: item.color }]}>
          <Icon source={item.icon} size={24} color="#FFFFFF" />
        </View>
        <View style={styles.specialtyContent}>
          <Text 
            style={[
              styles.specialtyTitle,
              selectedSpecialty === item.id && { color: item.color }
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text 
            style={styles.specialtyDescription}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
          {selectedSpecialty === item.id && (
            <View style={styles.selectedIndicator}>
              <Icon source="check-circle" size={12} color={item.color} />
              <Text style={[styles.selectedText, { color: item.color }]}>Selected</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableRipple>
  );

  const renderDoctorCard = ({ item: doctor }) => (
    <TouchableRipple
      onPress={() => handleSelectDoctor(doctor)}
      style={styles.doctorCardRipple}
      disabled={!doctor.available}
    >
      <Card style={[
        styles.doctorCard,
        !doctor.available && styles.unavailableDoctorCard
      ]}>
        <Card.Content style={styles.doctorCardContent}>
          {/* Doctor Header */}
          <View style={styles.doctorHeader}>
            <View style={styles.doctorAvatarContainer}>
              <Avatar.Text 
                size={50} 
                label={doctor.name.split(' ').map(n => n[0]).join('')}
                style={[
                  styles.doctorAvatar,
                  { backgroundColor: specialties.find(s => s.id === doctor.specialty)?.color || colors.primary }
                ]}
              />
              {doctor.verified && (
                <View style={styles.verifiedBadge}>
                  <Icon source="check" size={12} color="#FFFFFF" />
                </View>
              )}
            </View>
            
            <View style={styles.doctorInfo}>
              <Text style={[styles.doctorName, !doctor.available && styles.unavailableText]}>
                {doctor.name}
              </Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialtyName}</Text>
              <Text style={styles.doctorExperience}>{doctor.experience} experience</Text>
            </View>

            <View style={styles.doctorMeta}>
              <View style={styles.ratingContainer}>
                <Icon source="star" size={14} color="#F59E0B" />
                <Text style={styles.rating}>{doctor.rating}</Text>
                <Text style={styles.reviews}>({doctor.reviews})</Text>
              </View>
              <Text style={styles.distance}>{doctor.distance} away</Text>
            </View>
          </View>

          {/* Hospital and Availability */}
          <View style={styles.hospitalContainer}>
            <Icon source="hospital-building" size={16} color="#6B7280" />
            <Text style={styles.hospitalName}>{doctor.hospital}</Text>
          </View>

          <View style={styles.availabilityContainer}>
            <Icon 
              source={doctor.available ? "clock-check" : "clock-alert"} 
              size={16} 
              color={doctor.available ? "#10B981" : "#EF4444"} 
            />
            <Text style={[
              styles.availabilityText,
              { color: doctor.available ? "#10B981" : "#EF4444" }
            ]}>
              {doctor.available ? `Available: ${doctor.nextSlot}` : `Next: ${doctor.nextSlot}`}
            </Text>
          </View>

          {/* Fees and Languages */}
          <View style={styles.detailsRow}>
            <View style={styles.feesContainer}>
              <Text style={styles.feesLabel}>Consultation</Text>
              <Text style={styles.feesAmount}>{doctor.fees.consultation}</Text>
            </View>
            <View style={styles.languagesContainer}>
              <Text style={styles.languagesLabel}>Languages:</Text>
              <Text style={styles.languagesText}>
                {doctor.languages.slice(0, 2).join(', ')}
                {doctor.languages.length > 2 && ` +${doctor.languages.length - 2}`}
              </Text>
            </View>
          </View>

          {/* Insurance */}
          <View style={styles.insuranceContainer}>
            <Icon source="shield-check" size={14} color="#10B981" />
            <Text style={styles.insuranceText}>
              Accepts: {doctor.acceptsInsurance.slice(0, 2).join(', ')}
              {doctor.acceptsInsurance.length > 2 && ` +${doctor.acceptsInsurance.length - 2} more`}
            </Text>
          </View>

          {/* Action Button */}
          <Button
            mode={doctor.available ? "contained" : "outlined"}
            onPress={() => handleSelectDoctor(doctor)}
            disabled={!doctor.available}
            style={[
              styles.selectButton,
              !doctor.available && styles.unavailableButton
            ]}
            labelStyle={styles.selectButtonLabel}
          >
            {doctor.available 
              ? 'Book Appointment' 
              : 'View Profile'
            }
          </Button>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );

  const renderVideoBlogCard = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        // Handle video blog tap - could open video player or external link
        console.log('Opening video:', item.title);
        // You could navigate to a video player screen or open external URL
        // navigation.navigate('VideoPlayer', { video: item });
      }}
      style={styles.videoBlogCardRipple}
    >
      <View style={[styles.videoBlogCard, { backgroundColor: item.bgColor }]}>
        {/* Thumbnail and Play Button */}
        <View style={styles.videoThumbnailContainer}>
          <View style={styles.videoThumbnail}>
            <Icon source={item.thumbnail} size={32} color="#FFFFFF" />
          </View>
          <View style={styles.playButtonOverlay}>
            <Icon source="play" size={20} color="#FFFFFF" />
          </View>
          {item.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>

        {/* Video Info */}
        <View style={styles.videoInfo}>
          <View style={styles.videoCategoryContainer}>
            <Text style={styles.videoCategory}>{item.category}</Text>
            <Text style={styles.videoDuration}>{item.duration}</Text>
          </View>
          <Text style={styles.videoTitle} numberOfLines={2} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.videoDescription} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>
          <View style={styles.videoStatsContainer}>
            <Icon source="eye" size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.videoViews}>{item.views} views</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Inline Native Header */}
        <View style={styles.inlineHeader}>
          <View style={styles.headerRow}>
            <TouchableRipple
              onPress={() => navigation.goBack()}
              style={styles.backButtonRipple}
              borderless
            >
              <View style={styles.backButton}>
                <Icon source="chevron-left" size={28} color="#007AFF" />
              </View>
            </TouchableRipple>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.largeTitle}>Find Doctor</Text>
              <Text style={styles.subtitle}>{filteredDoctors.length} doctors nearby</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <TextInput
            placeholder="Search doctors, hospitals, or specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            mode="outlined"
            left={<TextInput.Icon icon="magnify" />}
            right={searchQuery ? <TextInput.Icon icon="close" onPress={() => setSearchQuery('')} /> : null}
          />
        </View>

        {/* Specialty Filter Cards */}
        <View style={styles.specialtySection}>
          <Text style={styles.sectionTitle}>Select Medical Specialty</Text>
          <FlatList
            data={specialties}
            renderItem={renderSpecialtyCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.specialtyScrollContainer}
            ItemSeparatorComponent={() => <View style={styles.specialtyCardSeparator} />}
          />
        </View>

        {/* Sort Options */}
        <View style={styles.sortSection}>
          <Text style={styles.sortTitle}>Sort by:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.sortOptions}>
              {[
                { id: 'distance', label: 'Distance' },
                { id: 'rating', label: 'Rating' },
                { id: 'fees', label: 'Fees' },
                { id: 'availability', label: 'Availability' }
              ].map((option) => (
                <Chip
                  key={option.id}
                  mode={sortBy === option.id ? 'flat' : 'outlined'}
                  selected={sortBy === option.id}
                  onPress={() => setSortBy(option.id)}
                  style={styles.sortChip}
                  textStyle={styles.sortChipText}
                >
                  {option.label}
                </Chip>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Doctors List */}
        <View style={styles.doctorsSection}>
          <FlatList
            data={filteredDoctors}
            renderItem={renderDoctorCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.doctorSeparator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Icon source="doctor" size={64} color="#9CA3AF" />
                <Text style={styles.emptyTitle}>No doctors found</Text>
                <Text style={styles.emptyDescription}>
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            )}
          />
        </View>

        {/* Video Blogs Section */}
        <View style={styles.videoBlogsSection}>
          <Text style={styles.sectionTitle}>Health & ABDM Video Guides</Text>
          <FlatList
            data={videoBlogs}
            renderItem={renderVideoBlogCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.videoBlogsScrollContainer}
            ItemSeparatorComponent={() => <View style={styles.videoBlogCardSeparator} />}
          />
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
  inlineHeader: {
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? spacing(2) : spacing(4),
    paddingBottom: spacing(3),
    paddingHorizontal: spacing(4),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing(1),
  },
  backButtonRipple: {
    borderRadius: 20,
    marginTop: spacing(1),
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: spacing(2),
  },
  largeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0A2540',
    letterSpacing: -0.5,
    marginBottom: spacing(1),
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  searchSection: {
    paddingHorizontal: spacing(4),
    marginBottom: spacing(4),
  },
  searchInput: {
    backgroundColor: colors.surface,
  },
  specialtySection: {
    marginBottom: spacing(6),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing(4),
    paddingHorizontal: spacing(4),
  },
  specialtyScrollContainer: {
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
  },
  specialtyCardSeparator: {
    width: spacing(3),
  },
  specialtyCardRipple: {
    borderRadius: radii.lg,
  },
  specialtyCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing(3),
    width: 180,
    height: 140,
  },
  selectedSpecialtyCard: {
    borderWidth: 2,
    backgroundColor: '#F8FFF9',
  },
  specialtyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing(2),
  },
  specialtyContent: {
    flex: 1,
  },
  specialtyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing(1),
    numberOfLines: 1,
  },
  specialtyDescription: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 14,
    marginBottom: spacing(1),
    numberOfLines: 2,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  selectedText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: spacing(1),
  },
  sortSection: {
    marginBottom: spacing(4),
    paddingHorizontal: spacing(4),
  },
  sortTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing(2),
  },
  sortOptions: {
    flexDirection: 'row',
    gap: spacing(2),
  },
  sortChip: {
    marginRight: spacing(2),
  },
  sortChipText: {
    fontSize: 12,
  },
  doctorsSection: {
    paddingHorizontal: spacing(4),
  },
  doctorCardRipple: {
    borderRadius: radii.lg,
  },
  doctorCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unavailableDoctorCard: {
    opacity: 0.7,
  },
  doctorCardContent: {
    padding: spacing(4),
  },
  doctorSeparator: {
    height: spacing(3),
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: spacing(3),
  },
  doctorAvatarContainer: {
    position: 'relative',
  },
  doctorAvatar: {
    marginRight: spacing(3),
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: spacing(3) - 2,
    backgroundColor: '#10B981',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  unavailableText: {
    color: '#9CA3AF',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  doctorExperience: {
    fontSize: 12,
    color: '#6B7280',
  },
  doctorMeta: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
  reviews: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  distance: {
    fontSize: 12,
    color: '#6B7280',
  },
  hospitalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(2),
  },
  hospitalName: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: spacing(2),
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: spacing(2),
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing(2),
  },
  feesContainer: {
    flex: 1,
  },
  feesLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  feesAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  languagesContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  languagesLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  languagesText: {
    fontSize: 12,
    color: colors.text,
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing(3),
  },
  insuranceText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: spacing(1),
  },
  selectButton: {
    borderRadius: radii.md,
  },
  unavailableButton: {
    borderColor: '#9CA3AF',
  },
  selectButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(8),
    marginTop: spacing(4),
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing(3),
    marginBottom: spacing(2),
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  videoBlogsSection: {
    marginTop: spacing(6),
    marginBottom: spacing(4),
  },
  videoBlogsScrollContainer: {
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
  },
  videoBlogCardSeparator: {
    width: spacing(3),
  },
  videoBlogCardRipple: {
    borderRadius: radii.lg,
  },
  videoBlogCard: {
    width: 280,
    height: 180,
    borderRadius: radii.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  videoThumbnailContainer: {
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1),
    borderRadius: radii.sm,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  videoInfo: {
    flex: 1,
    padding: spacing(3),
  },
  videoCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(1),
  },
  videoCategory: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  videoDuration: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing(1),
    lineHeight: 18,
  },
  videoDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    lineHeight: 14,
    marginBottom: spacing(2),
  },
  videoStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  videoViews: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginLeft: spacing(1),
  },
});