import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, Icon, Chip, Divider } from 'react-native-paper';

export default function RecordDetailScreen({ route, navigation }) {
  const { record, abdmCompliant, selectedLanguage = 'en' } = route.params;
  const [sharing, setSharing] = useState(false);

  // Demo Translation Service (same as RecordsScreen)
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
      // Medical Terms
      'Record Details': {
        hi: 'रिकॉर्ड विवरण',
        ml: 'റെക്കോർഡ് വിശദാംശങ്ങൾ',
        ta: 'பதிவு விவரங்கள்',
        te: 'రికార్డ్ వివరాలు',
        kn: 'ದಾಖಲೆ ವಿವರಗಳು',
        bn: 'রেকর্ডের বিবরণ',
        gu: 'રેકોર્ડ વિગતો',
        mr: 'रेकॉर्ड तपशील',
        pa: 'ਰਿਕਾਰਡ ਵੇਰਵੇ'
      },
      'Test Results': {
        hi: 'परीक्षण परिणाम',
        ml: 'പരിശോധന ഫലങ്ങൾ',
        ta: 'சோதனை முடிவுகள்',
        te: 'పరీక్ష ఫలితాలు',
        kn: 'ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶಗಳು',
        bn: 'পরীক্ষার ফলাফল',
        gu: 'પરીક્ષણ પરિણામો',
        mr: 'चाचणी परिणाम',
        pa: 'ਟੈਸਟ ਦੇ ਨਤੀਜੇ'
      },
      'Medications': {
        hi: 'दवाएं',
        ml: 'മരുന്നുകൾ',
        ta: 'மருந்துகள்',
        te: 'మందులు',
        kn: 'ಔಷಧಿಗಳು',
        bn: 'ওষুধ',
        gu: 'દવાઓ',
        mr: 'औषधे',
        pa: 'ਦਵਾਈਆਂ'
      },
      'Normal': {
        hi: 'सामान्य',
        ml: 'സാധാരണ',
        ta: 'சாதாரண',
        te: 'సాధారణ',
        kn: 'ಸಾಮಾನ್ಯ',
        bn: 'স্বাভাবিক',
        gu: 'સામાન્ય',
        mr: 'सामान्य',
        pa: 'ਆਮ'
      }
      // Add more translations as needed
    };

    if (targetLang === 'en' || !translations[text] || !translations[text][targetLang]) {
      return text;
    }
    return translations[text][targetLang];
  };

  const getCategoryColor = (type) => {
    const colors = {
      lab: '#E91E63',
      diagnostic: '#2196F3',
      prescription: '#9C27B0',
      discharge: '#FF9800',
      immunization: '#00BCD4',
      consultation: '#4CAF50',
      wellness: '#FF5722',
      invoice: '#795548'
    };
    return colors[type] || '#607D8B';
  };

  const handleShare = async () => {
    setSharing(true);
    // Simulate ABDM sharing process
    setTimeout(() => {
      setSharing(false);
      Alert.alert(
        'ABDM Sharing',
        'Record shared securely via ABDM network. Healthcare provider will receive encrypted access link.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  const handleDownload = () => {
    Alert.alert(
      'Download Record',
      'This will download the ABDM-verified document to your device.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => console.log('Download started') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* ABDM Header */}
        <Card style={styles.abdmCard} mode="outlined">
          <Card.Content style={styles.abdmHeader}>
            <View style={styles.abdmBadge}>
              <Icon source="shield-check" size={16} color="#FFFFFF" />
              <Text style={styles.abdmBadgeText}>ABDM Verified</Text>
            </View>
            <Text style={styles.abdmId}>ID: {record.abdmId}</Text>
          </Card.Content>
        </Card>

        {/* Record Header */}
        <Card style={styles.headerCard} mode="outlined">
          <Card.Content>
            <View style={styles.recordHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(record.type_key) }]}>
                <Icon source="file-document" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.headerInfo}>
                <Text style={styles.recordTitle}>{translateText(record.title, selectedLanguage)}</Text>
                <Text style={styles.recordMeta}>{record.date} • {record.hospital}</Text>
                <Text style={styles.recordDoctor}>{record.doctor}</Text>
              </View>
            </View>
            
            <View style={styles.statusContainer}>
              <Chip 
                icon="check-circle" 
                mode="outlined" 
                textStyle={styles.statusText}
                style={[styles.statusChip, { borderColor: getCategoryColor(record.type_key) }]}
              >
                {record.status}
              </Chip>
              <Text style={styles.fileSize}>{record.size}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Record Details */}
        <Card style={styles.detailCard} mode="outlined">
          <Card.Content>
            <Text style={styles.sectionTitle}>{translateText('Record Details', selectedLanguage)}</Text>
            <Divider style={styles.divider} />
            
            {record.description && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailValue}>{record.description}</Text>
              </View>
            )}

            {/* Lab Results */}
            {record.results && (
              <View>
                <Text style={styles.subSectionTitle}>{translateText('Test Results', selectedLanguage)}</Text>
                {record.results.map((result, index) => (
                  <View key={index} style={styles.resultRow}>
                    <Text style={styles.testName}>{result.test}</Text>
                    <Text style={styles.testValue}>{result.value}</Text>
                    <Text style={styles.testRange}>({result.range})</Text>
                    <Chip 
                      mode="flat" 
                      compact 
                      style={[styles.statusIndicator, { backgroundColor: result.status === 'Normal' ? '#E8F5E8' : '#FEF2F2' }]}
                      textStyle={{ color: result.status === 'Normal' ? '#059669' : '#DC2626', fontSize: 10 }}
                    >
                      {translateText(result.status, selectedLanguage)}
                    </Chip>
                  </View>
                ))}
              </View>
            )}

            {/* Medications */}
            {record.medications && (
              <View>
                <Text style={styles.subSectionTitle}>{translateText('Medications', selectedLanguage)}</Text>
                {record.medications.map((med, index) => (
                  <View key={index} style={styles.medicationRow}>
                    <Text style={styles.medicationName}>{med.name}</Text>
                    <Text style={styles.medicationDosage}>{med.dosage}</Text>
                    <Text style={styles.medicationDuration}>Duration: {med.duration}</Text>
                    <Text style={styles.medicationInstructions}>{med.instructions}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Findings */}
            {record.findings && (
              <View>
                <Text style={styles.subSectionTitle}>Findings</Text>
                {record.findings.map((finding, index) => (
                  <Text key={index} style={styles.findingItem}>• {finding}</Text>
                ))}
              </View>
            )}

            {record.notes && (
              <View style={styles.notesSection}>
                <Text style={styles.detailLabel}>Notes:</Text>
                <Text style={styles.notesText}>{record.notes}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* ABDM Metadata */}
        <Card style={styles.metadataCard} mode="outlined">
          <Card.Content>
            <Text style={styles.sectionTitle}>ABDM Information</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>HIP ID:</Text>
              <Text style={styles.metadataValue}>{record.hipId}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Care Context:</Text>
              <Text style={styles.metadataValue}>{record.careContext?.referenceNumber}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Encryption:</Text>
              <Text style={styles.metadataValue}>{record.metadata?.encryption}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Version:</Text>
              <Text style={styles.metadataValue}>{record.metadata?.version}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            mode="contained"
            style={[styles.actionButton, styles.shareButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            onPress={handleShare}
            loading={sharing}
            icon="share-variant"
          >
            {sharing ? 'Sharing via ABDM...' : 'Share via ABDM'}
          </Button>

          <Button
            mode="outlined"
            style={[styles.actionButton, styles.downloadButton]}
            contentStyle={styles.buttonContent}
            labelStyle={styles.downloadButtonLabel}
            onPress={handleDownload}
            icon="download"
          >
            Download PDF
          </Button>
        </View>
      </ScrollView>
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
    padding: 16,
  },
  abdmCard: {
    marginBottom: 12,
    borderColor: '#10B981',
    borderWidth: 1,
  },
  abdmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abdmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  abdmBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  abdmId: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  headerCard: {
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  recordMeta: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  recordDoctor: {
    fontSize: 14,
    color: '#94A3B8',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748B',
  },
  detailCard: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginTop: 16,
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  testName: {
    flex: 2,
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  testValue: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0A2540',
    textAlign: 'center',
  },
  testRange: {
    flex: 1,
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
  statusIndicator: {
    marginLeft: 8,
  },
  medicationRow: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 2,
  },
  medicationDuration: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  medicationInstructions: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  findingItem: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
    lineHeight: 20,
  },
  notesSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  notesText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  metadataCard: {
    marginBottom: 16,
    borderColor: '#E5E7EB',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metadataLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionContainer: {
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 12,
  },
  shareButton: {
    backgroundColor: '#43A047',
  },
  downloadButton: {
    borderColor: '#43A047',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  downloadButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#43A047',
  },
});
