import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Text, Icon, Button, FAB, Card, Dialog, Portal, ActivityIndicator } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import sampleRecords from '../records/recordData';

export default function RecordsScreen({ navigation }) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']); // Default to 'all' selected
  
  // ABDM Integration State
  const [abdmRecords, setAbdmRecords] = useState([]); // Start with 0 records
  const [isAbdmLinked, setIsAbdmLinked] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abdmId] = useState('14-1234-5678-9012'); // Demo ABDM ID

  // Update navigation title when language changes
  useEffect(() => {
    navigation.setOptions({
      title: t('records')
    });
  }, [navigation, t]);

  const onChangeSearch = (query) => setSearchQuery(query);

  // Handle record viewing with ABDM integration
  const onRecordPress = (record) => {
    // ABDM-compliant record viewing
    const abdmRecord = {
      ...record,
      abdmId: `ABDM-${record.id}-${Date.now()}`,
      hipId: record.hospital.replace(/\s+/g, '_').toUpperCase(),
      patientId: 'PHR_USER_123456',
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

    navigation.navigate('RecordDetail', { 
      record: abdmRecord,
      abdmCompliant: true,
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
        t('abdmLinkSuccess'),
        t('abdmLinkSuccessMessage', { abdmId, count: mockAbdmRecords.length }),
        [{ text: t('ok') }]
      );
    } catch (error) {
      Alert.alert(
        t('abdmLinkFailed'),
        t('abdmLinkFailedMessage'),
        [{ text: t('ok') }]
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
      t('abdmUnlinked'),
      t('abdmUnlinkedMessage'),
      [{ text: t('ok') }]
    );
  };

  const recordCategories = [
    { id: 'all', icon: 'view-grid', label_key: 'all', color: '#43A047' },
    { id: 'diagnostic', icon: 'monitor-screenshot', label_key: 'diagnosticReport', color: '#2196F3' },
    { id: 'discharge', icon: 'file-document-outline', label_key: 'dischargeSummary', color: '#FF9800' },
    { id: 'lab', icon: 'test-tube', label_key: 'labReport', color: '#E91E63' },
    { id: 'prescription', icon: 'pill', label_key: 'prescription', color: '#9C27B0' },
    { id: 'immunization', icon: 'needle', label_key: 'immunizationRecords', color: '#00BCD4' },
    { id: 'consultation', icon: 'doctor', label_key: 'opConsultation', color: '#4CAF50' },
    { id: 'wellness', icon: 'heart-pulse', label_key: 'wellnessRecord', color: '#FF5722' },
    { id: 'invoice', icon: 'receipt', label_key: 'invoice', color: '#795548' },
    { id: 'others', icon: 'dots-horizontal', label_key: 'others', color: '#607D8B' },
  ];

  const onCategoryPress = (categoryId) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      let newSelection = selectedCategories.filter(id => id !== 'all');
      
      if (newSelection.includes(categoryId)) {
        newSelection = newSelection.filter(id => id !== categoryId);
        if (newSelection.length === 0) {
          newSelection = ['all'];
        }
      } else {
        newSelection.push(categoryId);
      }
      
      setSelectedCategories(newSelection);
    }
  };

  const currentRecords = isAbdmLinked ? abdmRecords : [];
  const filteredRecords = selectedCategories.includes('all') 
    ? currentRecords 
    : currentRecords.filter(record => selectedCategories.includes(record.type_key));

  const getCategoryIcon = (category) => {
    const categoryData = recordCategories.find(cat => cat.id === category);
    return categoryData ? { icon: categoryData.icon, color: categoryData.color } : { icon: 'file', color: '#607D8B' };
  };

  const getRecordsTitle = () => {
    if (selectedCategories.includes('all')) {
      return t('allRecords', { count: filteredRecords.length });
    } else if (selectedCategories.length === 1) {
      const category = recordCategories.find(cat => cat.id === selectedCategories[0]);
      return t('categoryRecords', { category: t(category?.label_key), count: filteredRecords.length });
    } else {
      return t('filtersSelected', { count: selectedCategories.length, recordCount: filteredRecords.length });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={t('searchRecords')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#43A047"
            placeholderTextColor="#94A3B8"
            elevation={0}
          />
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>{t('filters')}</Text>
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
                    {t(category.label_key)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

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
                            {t(record.title_key)}
                          </Text>
                          {isActive && (
                            <View style={styles.activeBadge}>
                              <Text style={styles.activeBadgeText}>{t('active')}</Text>
                            </View>
                          )}
                          {isFinal && (
                            <View style={styles.finalBadge}>
                              <Text style={styles.finalBadgeText}>{t('final')}</Text>
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
                          <Text style={styles.abdmText}>{t('abdmVerified')}</Text>
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

        {!isAbdmLinked && currentRecords.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon source="shield-plus" size={64} color="#43A047" />
            </View>
            <Text style={styles.emptyTitle}>
              {t('linkYourAbdmAccount')}
            </Text>
            <Text style={styles.emptyDescription}>
              {t('connectAbdmDescription')}
            </Text>
            <Text style={styles.abdmIdText}>
              {t('demoAbdmId', { abdmId })}
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
              {isLoading ? t('linkingAbdm') : t('linkAbdmAccount')}
            </Button>

            <Text style={styles.sandboxNote}>
              {t('sandboxDemoNote')}
            </Text>
          </View>
        )}

        {isAbdmLinked && (
          <View style={styles.abdmLinkedContainer}>
            <View style={styles.abdmLinkedHeader}>
              <Icon source="shield-check" size={20} color="#10B981" />
              <Text style={styles.abdmLinkedText}>
                {t('abdmLinked', { abdmId })}
              </Text>
              <Button 
                mode="text" 
                onPress={resetAbdmLink}
                textColor="#DC2626"
                compact
              >
                {t('unlink')}
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        color="#FFFFFF"
        onPress={() => {
          console.log('Add record manually');
        }}
        mode="elevated"
      />

      <Portal>
        <Dialog visible={showLinkDialog} onDismiss={() => setShowLinkDialog(false)} style={styles.dialogContainer}>
          <Dialog.Icon icon="shield-check" />
          <Dialog.Title style={styles.dialogTitle}>{t('linkAbdmAccount')}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              {t('confirmAbdmLinkMessage')}
            </Text>
            <View style={styles.abdmIdContainer}>
              <Text style={styles.abdmIdLabel}>{t('abdmIdLabel')}</Text>
              <Text style={styles.abdmIdValue}>{abdmId}</Text>
            </View>
            <Text style={styles.dialogSubtext}>
              {t('abdmLinkSandboxNote')}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowLinkDialog(false)} textColor="#6B7280">
              {t('cancel')}
            </Button>
            <Button 
              onPress={confirmAbdmLink} 
              mode="contained" 
              style={styles.confirmButton}
              loading={isLoading}
            >
              {isLoading ? t('linking') : t('confirmLink')}
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