import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, Text, Icon, Button, FAB, Card } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import sampleRecords from '../records/recordData';

export default function RecordsScreen({ navigation }) {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorießs, setSelectedCategories] = useState(['all']); // Default to 'all' selected

  const onChangeSearch = (query) => setSearchQuery(query);

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
      abdmCompliant: true 
    });
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

  // Filter records based on selected categories
  const filteredRecords = selectedCategories.includes('all') 
    ? sampleRecords 
    : sampleRecords.filter(record => selectedCategories.includes(record.type_key));

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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar - Part of scrollable content */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder={t('searchRecords') || 'Search records...'}
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
        {filteredRecords.length > 0 ? (
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
                          <Text style={styles.recordTitle} numberOfLines={1}>{record.title}</Text>
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
        ) : (
          /* Empty State - when no records match filters */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon source="filter-outline" size={64} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyTitle}>
              No Records Found
            </Text>
            <Text style={styles.emptyDescription}>
              No records match your selected filters. Try selecting different categories or add new records.
            </Text>
          </View>
        )}

        {/* Original Empty State - only show when no records exist at all */}
        {sampleRecords.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Icon source="folder-outline" size={64} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyTitle}>
              {t('noRecordsYet') || 'No Health Records Yet'}
            </Text>
            <Text style={styles.emptyDescription}>
              {t('recordsDescription') || 'Your medical reports, prescriptions, and health documents will appear here once you link your ABHA ID or upload them.'}
            </Text>
            
            <Button
              mode="contained"
              style={styles.primaryButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={() => {
                // TODO: Navigate to ABHA linking
                console.log('Link ABHA ID');
              }}
            >
              {t('linkAbhaId') || 'Link ABHA ID'}
            </Button>
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
  searchContainer: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    paddingVertical: 40,
    minHeight: 300,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
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
    marginBottom: 32,
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
    bottom: 0,
    backgroundColor: '#43A047',
  },
});
