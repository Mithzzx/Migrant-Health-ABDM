 import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Alert, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, Icon, SegmentedButtons, FAB } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useI18n } from '../i18n/i18n';

const { width } = Dimensions.get('window');

export default function QRScreen({ navigation }) {
  const { t } = useI18n();
  const [qrMode, setQrMode] = useState('share'); // 'share' or 'scan'
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrData, setQrData] = useState(null);

  // Generate QR data for health record sharing
  const generateHealthQR = async () => {
    setIsGenerating(true);
    
    // Simulate QR generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const timestamp = Date.now();
      const qrPayload = {
        type: 'ABDM_HEALTH_SHARE',
        version: '1.0',
        abdmId: '14-1234-5678-9012',
        patientId: 'PHR_USER_123456',
        shareToken: `HST_${timestamp}`,
        expiresAt: new Date(timestamp + 15 * 60 * 1000).toISOString(), // 15 minutes
        permissions: ['READ_RECORDS', 'VIEW_PROFILE'],
        hipIds: ['KIMS_TRIVANDRUM', 'MEDICAL_COLLEGE_CALICUT'],
        metadata: {
          generatedAt: new Date(timestamp).toISOString(),
          source: 'PHR_APP_MOBILE',
          platform: Platform.OS
        }
      };
      
      // Create a more compact QR string for better scanning
      const qrString = JSON.stringify(qrPayload, null, 0); // No pretty formatting for compactness
      
      setQrData({
        ...qrPayload,
        qrString: qrString
      });
    } catch (error) {
      Alert.alert(
        'QR Generation Failed',
        'Unable to generate secure QR code. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareQR = () => {
    if (qrData) {
      Alert.alert(
        'Share QR Code',
        'Choose how to share your health record QR code:',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Copy Data', 
            onPress: () => {
              // In a real app, you would use Clipboard.setString()
              Alert.alert('Copied!', 'QR code data copied to clipboard');
            }
          },
          { 
            text: 'Save Image', 
            onPress: () => {
              Alert.alert('Save QR', 'QR code image would be saved to gallery');
            }
          }
        ]
      );
    }
  };

  const handleScanQR = () => {
    Alert.alert(
      'QR Scanner',
      'QR scanner would open camera to scan ABDM QR codes from healthcare providers.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Camera', onPress: () => console.log('Open QR scanner') }
      ]
    );
  };

  useEffect(() => {
    if (qrMode === 'share' && !qrData) {
      generateHealthQR();
    }
  }, [qrMode]);

  const QRCodeDisplay = ({ data }) => (
    <View style={styles.qrContainer}>
      <View style={styles.qrCodePlaceholder}>
        {isGenerating ? (
          <View style={styles.loadingContainer}>
            <Icon source="qrcode" size={60} color="#94A3B8" />
            <Text style={styles.loadingText}>Generating Secure QR...</Text>
          </View>
        ) : data && data.qrString ? (
          <View style={styles.qrGenerated}>
            <QRCode
              value={data.qrString}
              size={220}
              backgroundColor="white"
              color="black"
              ecl="M" // Error correction level: L, M, Q, H (M = ~15% error correction)
              enableLinearGradient={false}
              quietZone={10}
            />
            <Text style={styles.qrHint}>
              Scan with any QR scanner to share health records
            </Text>
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <Icon source="qrcode-scan" size={60} color="#94A3B8" />
            <Text style={styles.loadingText}>No QR data</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector */}
        <View style={styles.modeSelector}>
          <SegmentedButtons
            value={qrMode}
            onValueChange={setQrMode}
            buttons={[
              { 
                value: 'share', 
                label: 'Share Records',
                icon: 'share-variant',
                style: qrMode === 'share' ? styles.activeSegment : styles.inactiveSegment
              },
              { 
                value: 'scan', 
                label: 'Scan QR',
                icon: 'qrcode-scan',
                style: qrMode === 'scan' ? styles.activeSegment : styles.inactiveSegment
              },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {qrMode === 'share' ? (
          <View style={styles.shareMode}>
            {/* Share Mode Header */}
            <Card style={styles.headerCard} mode="outlined">
              <Card.Content style={styles.headerContent}>
                <Icon source="shield-check" size={24} color="#43A047" />
                <View style={styles.headerText}>
                  <Text style={styles.headerTitle}>ABDM Secure Share</Text>
                  <Text style={styles.headerSubtitle}>
                    Share your health records securely with healthcare providers
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {/* QR Code Display */}
            <Card style={styles.qrCard} mode="outlined">
              <Card.Content>
                <QRCodeDisplay data={qrData} />
                
                {qrData && (
                  <View style={styles.qrInfo}>
                    <View style={styles.qrDetail}>
                      <Text style={styles.qrLabel}>ABDM ID:</Text>
                      <Text style={styles.qrValue}>{qrData.abdmId}</Text>
                    </View>
                    <View style={styles.qrDetail}>
                      <Text style={styles.qrLabel}>Share Token:</Text>
                      <Text style={styles.qrValue}>{qrData.shareToken}</Text>
                    </View>
                    <View style={styles.qrDetail}>
                      <Text style={styles.qrLabel}>Expires in:</Text>
                      <Text style={styles.qrValue}>15 minutes</Text>
                    </View>
                  </View>
                )}
              </Card.Content>
            </Card>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                style={styles.primaryButton}
                contentStyle={styles.buttonContent}
                onPress={generateHealthQR}
                loading={isGenerating}
                icon="refresh"
              >
                {isGenerating ? 'Generating...' : 'Regenerate QR'}
              </Button>

              <Button
                mode="outlined"
                style={styles.secondaryButton}
                contentStyle={styles.buttonContent}
                onPress={handleShareQR}
                icon="share"
              >
                Share QR Image
              </Button>
            </View>

            {/* Security Notice */}
            <Card style={styles.securityCard} mode="outlined">
              <Card.Content>
                <View style={styles.securityHeader}>
                  <Icon source="security" size={20} color="#F59E0B" />
                  <Text style={styles.securityTitle}>Security Notice</Text>
                </View>
                <Text style={styles.securityText}>
                  • QR code expires in 15 minutes for security{'\n'}
                  • Only share with trusted healthcare providers{'\n'}
                  • Revoke access if QR is compromised{'\n'}
                  • All sharing is logged in ABDM network
                </Text>
              </Card.Content>
            </Card>
          </View>
        ) : (
          <View style={styles.scanMode}>
            {/* Scan Mode */}
            <Card style={styles.scanCard} mode="outlined">
              <Card.Content style={styles.scanContent}>
                <View style={styles.scanIcon}>
                  <Icon source="qrcode-scan" size={80} color="#43A047" />
                </View>
                <Text style={styles.scanTitle}>Scan ABDM QR Code</Text>
                <Text style={styles.scanDescription}>
                  Scan QR codes from healthcare providers to link your ABDM account or access shared records.
                </Text>
                
                <Button
                  mode="contained"
                  style={styles.scanButton}
                  contentStyle={styles.buttonContent}
                  onPress={handleScanQR}
                  icon="camera"
                >
                  Open QR Scanner
                </Button>
              </Card.Content>
            </Card>

            {/* Scan Instructions */}
            <Card style={styles.instructionsCard} mode="outlined">
              <Card.Content>
                <Text style={styles.instructionsTitle}>What you can scan:</Text>
                <View style={styles.instructionsList}>
                  <View style={styles.instructionItem}>
                    <Icon source="hospital-building" size={16} color="#43A047" />
                    <Text style={styles.instructionText}>Hospital registration QR codes</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Icon source="account-plus" size={16} color="#43A047" />
                    <Text style={styles.instructionText}>ABDM account linking QR</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Icon source="file-document" size={16} color="#43A047" />
                    <Text style={styles.instructionText}>Shared health record access</Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Icon source="doctor" size={16} color="#43A047" />
                    <Text style={styles.instructionText}>Doctor consultation QR</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Floating Help Button */}
      <FAB
        icon="help"
        style={styles.helpFab}
        size="medium"
        onPress={() => Alert.alert('QR Help', 'QR code help and documentation would be shown here.')}
      />
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
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80, // Extra padding for tab bar
  },
  modeSelector: {
    marginBottom: 20,
  },
  segmentedButtons: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  activeSegment: {
    backgroundColor: '#43A047',
  },
  inactiveSegment: {
    backgroundColor: 'transparent',
  },
  shareMode: {
    flex: 1,
  },
  scanMode: {
    flex: 1,
  },
  headerCard: {
    marginBottom: 20,
    borderColor: '#E2E8F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  qrCard: {
    marginBottom: 20,
    borderColor: '#E2E8F0',
  },
  qrContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  qrCodePlaceholder: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  qrGenerated: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  qrHint: {
    marginTop: 12,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  qrInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  qrDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  qrLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  qrValue: {
    fontSize: 12,
    color: '#0A2540',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
  },
  secondaryButton: {
    borderColor: '#43A047',
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  securityCard: {
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  securityText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  scanCard: {
    marginBottom: 20,
    borderColor: '#E2E8F0',
  },
  scanContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  scanIcon: {
    marginBottom: 20,
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0A2540',
    marginBottom: 12,
    textAlign: 'center',
  },
  scanDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  scanButton: {
    backgroundColor: '#43A047',
    borderRadius: 12,
    minWidth: 200,
  },
  instructionsCard: {
    borderColor: '#E2E8F0',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 12,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  helpFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: Platform.OS === 'ios' ? 85 : 65, // Above tab bar
    backgroundColor: '#6366F1',
  },
});