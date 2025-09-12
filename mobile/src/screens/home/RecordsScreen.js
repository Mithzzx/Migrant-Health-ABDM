import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Text, Icon, Button, FAB, Card, Dialog, Portal, ActivityIndicator, IconButton, Menu } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import sampleRecords from '../records/recordData';

export default function RecordsScreen({ navigation, route }) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']); // Default to 'all' selected
  
  // Get selected language from navigation params or default to English
  const selectedLanguage = route?.params?.selectedLanguage || 'en';
  
  // ABDM Integration State
  const [abdmRecords, setAbdmRecords] = useState([]); // Start with 0 records
  const [isAbdmLinked, setIsAbdmLinked] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abdmId, setAbdmId] = useState('14-1234-5678-9012'); // Demo ABDM ID

  const onChangeSearch = (query) => setSearchQuery(query);

  // Supported Languages
  const supportedLanguages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  // Demo Translation Service
  const translateText = (text, targetLang) => {
    const translations = {
      // Medical Record Titles
      'Blood Test Report': {
        hi: 'रक्त जांच रिपोर्ट',
        ml: 'രക്ത പരിശോധന റിപ്പോർട്ട്',
        ta: 'இரத்த பரிசோதனை அறிக்கை',
        te: 'రక్త పరీక్ష నివేదిక',
        kn: 'ರಕ್ತ ಪರೀಕ್ಷೆ ವರದಿ',
        bn: 'রক্ত পরীক্ষার রিপোর্ট',
        gu: 'લોહી પરીક્ષણ રિપોર્ટ',
        mr: 'रक्त तपासणी अहवाल',
        pa: 'ਖੂਨ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ'
      },
      'Prescription - Antibiotics': {
        hi: 'नुस्खा - एंटीबायोटिक्स',
        ml: 'കുറിപ്പടി - ആൻറിബയോട്ടിക്സ്',
        ta: 'மருந்து பரிந்துரை - நுண்ணுயிர் எதிர்ப்பிகள்',
        te: 'ప్రిస్క్రిప్షన్ - యాంటీబయాటిక్స్',
        kn: 'ಔಷಧಿ ಸೂಚನೆ - ಆಂಟಿಬಯಾಟಿಕ್ಸ್',
        bn: 'প্রেসক্রিপশন - অ্যান্টিবায়োটিক',
        gu: 'પ્રિસ્ક્રિપ્શન - એન્ટિબાયોટિક્સ',
        mr: 'प्रिस्क्रिप्शन - प्रतिजैविक',
        pa: 'ਨੁਸਖਾ - ਐਂਟੀਬਾਇਓਟਿਕਸ'
      },
      'Chest X-Ray Report': {
        hi: 'छाती एक्स-रे रिपोर्ट',
        ml: 'നെഞ്ച് എക്സ്-റേ റിപ്പോർട്ട്',
        ta: 'மார்பு எக்ஸ்-ரே அறிக்கை',
        te: 'ఛాతీ ఎక్స్-రే నివేదిక',
        kn: 'ಎದೆಯ ಎಕ್ಸ್-ರೇ ವರದಿ',
        bn: 'বুকের এক্স-রে রিপোর্ট',
        gu: 'છાતીના એક્સ-રે રિપોર્ટ',
        mr: 'छाती एक्स-रे अहवाल',
        pa: 'ਛਾਤੀ ਦਾ ਐਕਸ-ਰੇ ਰਿਪੋਰਟ'
      },
      'Ayushman Bharat Coverage Card': {
        hi: 'आयुष्मान भारत कवरेज कार्ड',
        ml: 'ആയുഷ്മാൻ ഭാരത് കവറേജ് കാർഡ്',
        ta: 'ஆயுஷ்மான் பாரத் கவரேஜ் கார்டு',
        te: 'ఆయుష్మాన్ భారత్ కవరేజ్ కార్డ్',
        kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಕವರೇಜ್ ಕಾರ್ಡ್',
        bn: 'আয়ুষ্মান ভারত কভারেজ কার্ড',
        gu: 'આયુષ્માન ભારત કવરેજ કાર્ડ',
        mr: 'आयुष्मान भारत कव्हरेज कार्ड',
        pa: 'ਆਯੁਸ਼ਮਾਨ ਭਾਰਤ ਕਵਰੇਜ ਕਾਰਡ'
      },
      'ESI Medical Coverage': {
        hi: 'ईएसआई चिकित्सा कवरेज',
        ml: 'ഇഎസ്ഐ മെഡിക്കൽ കവറേജ്',
        ta: 'ஈஎஸ்ஐ மருத்துவ கவரேஜ்',
        te: 'ఈఎస్ఐ వైద్య కవరేజ్',
        kn: 'ಇಎಸ್ಐ ವೈದ್ಯಕೀಯ ಕವರೇಜ್',
        bn: 'ইএসআই চিকিৎসা কভারেজ',
        gu: 'ઇએસઆઇ મેડિકલ કવરેજ',
        mr: 'ईएसआय वैद्यकीय कव्हरेज',
        pa: 'ਈਐਸਆਈ ਮੈਡੀਕਲ ਕਵਰੇਜ'
      },
      'State Health Insurance Claim': {
        hi: 'राज्य स्वास्थ्य बीमा दावा',
        ml: 'സംസ്ഥാന ആരോഗ്യ ഇൻഷുറൻസ് ക്ലെയിം',
        ta: 'மாநில சுகாதார காப்பீடு கோரிக்கை',
        te: 'రాష్ట్ర ఆరోగ్య బీమా దావా',
        kn: 'ರಾಜ್ಯ ಆರೋಗ್ಯ ವಿಮೆ ಹಕ್ಕು',
        bn: 'রাজ্য স্বাস্থ্য বীমা দাবি',
        gu: 'રાજ્ય આરોગ્ય વીમા દાવો',
        mr: 'राज्य आरोग्य विमा दावा',
        pa: 'ਰਾਜ ਸਿਹਤ ਬੀਮਾ ਦਾਅਵਾ'
      },
      'RSBY Portability Certificate': {
        hi: 'आरएसबीवाई पोर्टेबिलिटी प्रमाणपत्र',
        ml: 'ആർഎസ്ബിവൈ പോർട്ടബിലിറ്റി സർട്ടിഫിക്കറ്റ്',
        ta: 'ஆர்எஸ்பிவை போர்டபிலிட்டி சான்றிதழ்',
        te: 'ఆర్ఎస్బివై పోర్టబిలిటీ సర్టిఫికేట్',
        kn: 'ಆರ್ಎಸ್ಬಿವೈ ಪೋರ್ಟಬಿಲಿಟಿ ಪ್ರಮಾಣಪತ್ರ',
        bn: 'আরএসবিওয়াই পোর্টেবিলিটি সার্টিফিকেট',
        gu: 'આરએસબીવાય પોર્ટેબિલિટી સર્ટિફિકેટ',
        mr: 'आरएसबीवाय पोर्टेबिलिटी प्रमाणपत्र',
        pa: 'ਆਰਐਸਬੀਵਾਈ ਪੋਰਟੇਬਿਲਟੀ ਸਰਟੀਫਿਕੇਟ'
      },
      'Private Health Insurance Policy': {
        hi: 'निजी स्वास्थ्य बीमा पॉलिसी',
        ml: 'സ്വകാര്യ ആരോഗ്യ ഇൻഷുറൻസ് പോളിസി',
        ta: 'தனியார் சுகாதார காப்பீடு கொள்கை',
        te: 'ప్రైవేట్ హెల్త్ ఇన్‌షురెన్స్ పాలసీ',
        kn: 'ಖಾಸಗಿ ಆರೋಗ್ಯ ವಿಮಾ ನೀತಿ',
        bn: 'ব্যক্তিগত স্বাস্থ্য বীমা নীতি',
        gu: 'ખાનગી આરોગ્ય વીમા પોલિસી',
        mr: 'खाजगी आरोग्य विमा पॉलिसी',
        pa: 'ਪ੍ਰਾਈਵੇਟ ਹੈਲਥ ਇੰਸ਼ੋਰੈਂਸ ਪਾਲਿਸੀ'
      }
      // Add more translations as needed
    };

    if (targetLang === 'en' || !translations[text] || !translations[text][targetLang]) {
      return text;
    }
    return translations[text][targetLang];
  };

  // Handle Language Selection
  const handleLanguageSelect = async (langCode) => {
    if (langCode === selectedLanguage) return;
    
    setIsTranslating(true);
    setShowLanguageMenu(false);
    
    // Simulate translation delay
    setTimeout(() => {
      setSelectedLanguage(langCode);
      setIsTranslating(false);
      
      const selectedLang = supportedLanguages.find(lang => lang.code === langCode);
      Alert.alert(
        'Language Changed',
        `Records are now displayed in ${selectedLang.nativeName}. This is a demo translation.`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  // Handle record viewing with ABDM integration
  const onRecordPress = (record) => {
    // ABDM-compliant record viewing
    const abdmRecord = {
      ...record,
      abdmId: `ABDM-${record.id}-${Date.now()}`, // ABDM unique identifier
      hipId: record.hospital.replace(/\s+/g, '_').toUpperCase(), // Health Information Provider ID
      patientId: 'PHR_USER_123456', // Patient Health Record ID (would come from ABHA)
      careContext: {
        referenceNumber: `CC-${record.id}`,
        display: record.title
      },
      metadata: {
        version: '1.0',
        timestamp: new Date().toISOString(),
        source: 'PHR_APP',
        encryption: 'AES-256'
      }
    };

    // Navigate to ABDM-compliant record detail screen
    navigation.navigate('RecordDetail', { 
      record: abdmRecord,
      abdmCompliant: true,
      selectedLanguage: selectedLanguage 
    });
  };

  // ABDM Sandbox Integration Functions
  const simulateAbdmFetch = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Simulate ABDM sandbox response
      const mockAbdmRecords = sampleRecords.map(record => ({
        ...record,
        id: `ABDM_${record.id}`,
        abdmId: `${abdmId}-${record.id}`,
        hipId: record.hospital.replace(/\s+/g, '_').toUpperCase(),
        patientId: abdmId,
        careContext: {
          referenceNumber: `CC-${abdmId}-${record.id}`,
          display: record.title
        },
        metadata: {
          version: '1.0',
          timestamp: new Date().toISOString(),
          source: 'ABDM_SANDBOX',
          encryption: 'AES-256',
          consent: 'GRANTED',
          dataRange: {
            from: '2023-01-01',
            to: new Date().toISOString().split('T')[0]
          }
        },
        verified: true,
        sandbox: true
      }));
      
      setAbdmRecords(mockAbdmRecords);
      setIsAbdmLinked(true);
      
      Alert.alert(
        'ABDM Link Success',
        `Successfully linked ABDM ID: ${abdmId}\nFetched ${mockAbdmRecords.length} health records from ABDM sandbox.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'ABDM Link Failed',
        'Failed to fetch records from ABDM sandbox. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
      setShowLinkDialog(false);
    }
  };

  const handleAbdmLink = () => {
    setShowLinkDialog(true);
  };

  const confirmAbdmLink = () => {
    simulateAbdmFetch();
  };

  const resetAbdmLink = () => {
    setAbdmRecords([]);
    setIsAbdmLinked(false);
    Alert.alert(
      'ABDM Unlinked',
      'ABDM account has been unlinked. Records cleared.',
      [{ text: 'OK' }]
    );
  };

  const recordCategories = [
    { id: 'all', icon: 'view-grid', label: 'All', color: '#43A047' },
    { id: 'diagnostic', icon: 'monitor-screenshot', label: 'Diagnostic Report', color: '#2196F3' },
    { id: 'discharge', icon: 'file-document-outline', label: 'Discharge Summary', color: '#FF9800' },
    { id: 'lab', icon: 'test-tube', label: 'Lab Report', color: '#E91E63' },
    { id: 'prescription', icon: 'pill', label: 'Prescription', color: '#9C27B0' },
    { id: 'immunization', icon: 'needle', label: 'Immunization Records', color: '#00BCD4' },
    { id: 'consultation', icon: 'doctor', label: 'OP Consultation', color: '#4CAF50' },
    { id: 'wellness', icon: 'heart-pulse', label: 'Wellness Record', color: '#FF5722' },
    { id: 'invoice', icon: 'receipt', label: 'Invoice', color: '#795548' },
    { id: 'others', icon: 'dots-horizontal', label: 'Others', color: '#607D8B' },
  ];

  const onCategoryPress = (categoryId) => {
    if (categoryId === 'all') {
      // If 'All' is selected, clear other selections and select only 'All'
      setSelectedCategories(['all']);
    } else {
      // Remove 'All' from selection when other categories are selected
      let newSelection = selectedCategories.filter(id => id !== 'all');
      
      if (newSelection.includes(categoryId)) {
        // Remove if already selected
        newSelection = newSelection.filter(id => id !== categoryId);
        // If no categories selected, default back to 'All'
        if (newSelection.length === 0) {
          newSelection = ['all'];
        }
      } else {
        // Add to selection
        newSelection.push(categoryId);
      }
      
      setSelectedCategories(newSelection);
    }
    
    console.log('Selected categories:', categoryId, selectedCategories);
    // TODO: Filter records by selected categories
  };

  // Filter records based on selected categories - use ABDM records when linked
  const currentRecords = isAbdmLinked ? abdmRecords : [];
  const filteredRecords = selectedCategories.includes('all') 
    ? currentRecords 
    : currentRecords.filter(record => selectedCategories.includes(record.type_key));

  const getCategoryIcon = (category) => {
    const categoryData = recordCategories.find(cat => cat.id === category);
    return categoryData ? { icon: categoryData.icon, color: categoryData.color } : { icon: 'file', color: '#607D8B' };
  };

  // Get display title for records section
  const getRecordsTitle = () => {
    if (selectedCategories.includes('all')) {
      return `All Records (${filteredRecords.length})`;
    } else if (selectedCategories.length === 1) {
      const category = recordCategories.find(cat => cat.id === selectedCategories[0]);
      return `${category?.label} (${filteredRecords.length})`;
    } else {
      return `${selectedCategories.length} Filters Selected (${filteredRecords.length})`;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar - Part of scrollable content */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={t('Search Records') || 'Search records...'}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#43A047"
            placeholderTextColor="#94A3B8"
            elevation={0}
          />
        </View>

        {/* Category Grid */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>{t('Filters') || 'Filters'}</Text>
          <View style={styles.categoryGrid}>
            {recordCategories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <View 
                  key={category.id}
                  style={styles.categoryItem}
                  onTouchEnd={() => onCategoryPress(category.id)}
                >
                  <View style={[
                    styles.categoryIcon, 
                    { backgroundColor: isSelected ? category.color : `${category.color}15` }
                  ]}>
                    <Icon 
                      source={category.icon} 
                      size={24} 
                      color={isSelected ? '#FFFFFF' : category.color} 
                    />
                  </View>
                  <Text style={styles.categoryLabel} numberOfLines={1} ellipsizeMode="tail">
                    {category.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Filtered Records List */}
        {filteredRecords.length > 0 && (
          <View style={styles.recordsSection}>
            <Text style={styles.recordsTitle}>
              {getRecordsTitle()}
            </Text>
            {filteredRecords.map((record) => {
              const categoryData = getCategoryIcon(record.type_key);
              const isActive = record.status === 'Active';
              const isFinal = record.status === 'Final';
              const isCompleted = record.status === 'Completed';
              
              return (
                <TouchableOpacity 
                  key={record.id} 
                  onPress={() => onRecordPress(record)}
                  activeOpacity={0.7}
                >
                  <Card style={styles.recordCard} mode="outlined">
                    <Card.Content style={styles.recordContent}>
                      <View style={[styles.recordIcon, { backgroundColor: `${categoryData.color}10` }]}>
                        <Icon source={categoryData.icon} size={24} color={categoryData.color} />
                      </View>
                      <View style={styles.recordInfo}>
                        <View style={styles.recordHeader}>
                          <Text style={styles.recordTitle} numberOfLines={1}>
                            {translateText(record.title, selectedLanguage)}
                          </Text>
                          {isActive && (
                            <View style={styles.activeBadge}>
                              <Text style={styles.activeBadgeText}>Active</Text>
                            </View>
                          )}
                          {isFinal && (
                            <View style={styles.finalBadge}>
                              <Text style={styles.finalBadgeText}>Final</Text>
                            </View>
                          )}
                          {isCompleted && (
                            <View style={styles.completedBadge}>
                              <Text style={styles.completedBadgeText}>✓</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.recordMeta}>{record.date} • {record.hospital}</Text>
                        <Text style={styles.recordDoctor}>{record.doctor}</Text>
                        <View style={styles.abdmIndicator}>
                          <Icon source="shield-check" size={12} color="#10B981" />
                          <Text style={styles.abdmText}>ABDM Verified</Text>
                        </View>
                      </View>
                      <View style={styles.recordActions}>
                        <Text style={styles.recordSize}>{record.size}</Text>
                        <Icon source="eye" size={18} color="#43A047" />
                        <Icon source="chevron-right" size={20} color="#94A3B8" />
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* ABDM Empty State - show when not linked */}
        {!isAbdmLinked && currentRecords.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon source="shield-plus" size={64} color="#43A047" />
            </View>
            <Text style={styles.emptyTitle}>
              Link Your ABDM Account
            </Text>
            <Text style={styles.emptyDescription}>
              Connect your Ayushman Bharat Digital Mission (ABDM) account to securely access your health records from across India.
            </Text>
            <Text style={styles.abdmIdText}>
              Demo ABDM ID: {abdmId}
            </Text>
            
            <Button
              mode="contained"
              style={styles.primaryButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={handleAbdmLink}
              icon="shield-check"
              loading={isLoading}
            >
              {isLoading ? 'Linking ABDM...' : 'Link ABDM Account'}
            </Button>

            <Text style={styles.sandboxNote}>
              * This is a sandbox demo using sample ABDM data
            </Text>
          </View>
        )}

        {/* Show records count when ABDM is linked */}
        {isAbdmLinked && (
          <View style={styles.abdmLinkedContainer}>
            <View style={styles.abdmLinkedHeader}>
              <Icon source="shield-check" size={20} color="#10B981" />
              <Text style={styles.abdmLinkedText}>
                ABDM Linked: {abdmId}
              </Text>
              <Button 
                mode="text" 
                onPress={resetAbdmLink}
                textColor="#DC2626"
                compact
              >
                Unlink
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button - No Label */}
      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => {
          // TODO: Navigate to manual upload/add record
          console.log('Add record manually');
        }}
        mode="elevated"
      />

      {/* ABDM Link Confirmation Dialog */}
      <Portal>
        <Dialog visible={showLinkDialog} onDismiss={() => setShowLinkDialog(false)} style={styles.dialogContainer}>
          <Dialog.Icon icon="shield-check" />
          <Dialog.Title style={styles.dialogTitle}>Link ABDM Account</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Do you want to link your ABDM account to access your health records?
            </Text>
            <View style={styles.abdmIdContainer}>
              <Text style={styles.abdmIdLabel}>ABDM ID:</Text>
              <Text style={styles.abdmIdValue}>{abdmId}</Text>
            </View>
            <Text style={styles.dialogSubtext}>
              This will securely fetch your health records from the ABDM network using sandbox demo data.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowLinkDialog(false)} textColor="#6B7280">
              Cancel
            </Button>
            <Button 
              onPress={confirmAbdmLink} 
              mode="contained" 
              style={styles.confirmButton}
              loading={isLoading}
            >
              {isLoading ? 'Linking...' : 'Confirm Link'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80, // Extra padding for tab bar
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchBar: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    height: 50,
  },
  searchInput: {
    fontSize: 14,
    color: '#0A2540',
    minHeight: 0,
  },
  categorySection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '20%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 2,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0A2540',
    textAlign: 'center',
    lineHeight: 12,
  },
  recordsSection: {
    paddingHorizontal: 16,
  },
  recordsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 16,
  },
  recordCard: {
    borderRadius: 16,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  recordContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  recordInfo: {
    flex: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    flex: 1,
    marginRight: 8,
  },
  activeBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  finalBadge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  finalBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  completedBadge: {
    backgroundColor: '#059669',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recordMeta: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  recordDoctor: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },
  abdmIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  abdmText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 4,
  },
  recordDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  recordActions: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  recordSize: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
    minHeight: 250,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0A2540',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    width: '100%',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.OS === 'ios' ? 85 : 65, // Above tab bar
    backgroundColor: '#43A047',
  },
  // ABDM Styles
  abdmIdText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: '600',
  },
  sandboxNote: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  abdmLinkedContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  abdmLinkedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  abdmLinkedText: {
    flex: 1,
    fontSize: 14,
    color: '#065F46',
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  // Dialog Styles
  dialogContainer: {
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  dialogTitle: {
    textAlign: 'center',
    color: '#43A047',
    fontWeight: '700',
    fontSize: 20,
  },
  dialogText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
     lineHeight: 22,
  },
  dialogSubtext: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  abdmIdContainer: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#43A047',
    shadowColor: '#43A047',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  abdmIdLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  abdmIdValue: {
    fontSize: 16,
    color: '#0A2540',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  confirmButton: {
    backgroundColor: '#43A047',
  },
});
