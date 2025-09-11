import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Searchbar, Card, Chip, Icon } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function RecordsScreen() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  // Sample health records data
  const sampleRecords = [
    {
      id: 1,
      title: 'Blood Test Report',
      category: 'lab',
      date: '2024-09-10',
      hospital: 'City Medical Center',
      doctor: 'Dr. Sarah Johnson',
    },
    {
      id: 2,
      title: 'Chest X-Ray Report',
      category: 'diagnostic',
      date: '2024-09-08',
      hospital: 'General Hospital',
      doctor: 'Dr. Michael Brown',
    },
    {
      id: 3,
      title: 'Discharge Summary',
      category: 'discharge',
      date: '2024-09-05',
      hospital: 'Metro Hospital',
      doctor: 'Dr. Emily Davis',
    },
    {
      id: 4,
      title: 'Prescription - Antibiotics',
      category: 'prescription',
      date: '2024-09-03',
      hospital: 'Family Clinic',
      doctor: 'Dr. James Wilson',
    },
    {
      id: 5,
      title: 'COVID-19 Vaccination',
      category: 'immunization',
      date: '2024-08-15',
      hospital: 'Health Center',
      doctor: 'Nurse Mary Smith',
    },
    {
      id: 6,
      title: 'Cardiology Consultation',
      category: 'consultation',
      date: '2024-08-10',
      hospital: 'Heart Institute',
      doctor: 'Dr. Robert Lee',
    },
    {
      id: 7,
      title: 'Annual Health Checkup',
      category: 'wellness',
      date: '2024-07-20',
      hospital: 'Wellness Center',
      doctor: 'Dr. Lisa Chang',
    },
    {
      id: 8,
      title: 'Medical Bill - Surgery',
      category: 'invoice',
      date: '2024-07-15',
      hospital: 'Surgical Center',
      doctor: 'Dr. David Park',
    },
  ];

  // Health record categories with better icons (2x5 grid layout)
  const recordCategories = [
    {
      id: 'all',
      title: t('allRecords') || 'All Records',
      icon: 'folder-multiple',
      iconColor: '#43A047',
      backgroundColor: '#E8F5E8',
    },
    {
      id: 'diagnostic',
      title: t('diagnosticReport') || 'Diagnostic Report',
      icon: 'file-chart',
      iconColor: '#2196F3',
      backgroundColor: '#E3F2FD',
    },
    {
      id: 'discharge',
      title: t('dischargeSummary') || 'Discharge Summary',
      icon: 'file-document-outline',
      iconColor: '#FF9800',
      backgroundColor: '#FFF3E0',
    },
    {
      id: 'lab',
      title: t('labReport') || 'Lab Report',
      icon: 'test-tube',
      iconColor: '#9C27B0',
      backgroundColor: '#F3E5F5',
    },
    {
      id: 'prescription',
      title: t('prescription') || 'Prescription',
      icon: 'pill',
      iconColor: '#F44336',
      backgroundColor: '#FFEBEE',
    },
    {
      id: 'immunization',
      title: t('immunizationRecord') || 'Immunization',
      icon: 'needle',
      iconColor: '#4CAF50',
      backgroundColor: '#E8F5E8',
    },
    {
      id: 'consultation',
      title: t('opConsultation') || 'OP Consultation',
      icon: 'stethoscope',
      iconColor: '#00BCD4',
      backgroundColor: '#E0F7FA',
    },
    {
      id: 'wellness',
      title: t('wellnessRecord') || 'Wellness',
      icon: 'heart',
      iconColor: '#E91E63',
      backgroundColor: '#FCE4EC',
    },
    {
      id: 'invoice',
      title: t('invoice') || 'Invoice',
      icon: 'receipt',
      iconColor: '#795548',
      backgroundColor: '#EFEBE9',
    },
    {
      id: 'others',
      title: t('others') || 'Others',
      icon: 'dots-horizontal',
      iconColor: '#607D8B',
      backgroundColor: '#ECEFF1',
    },
  ];

  // Filter records based on selected categories and search query
  const filteredRecords = useMemo(() => {
    let filtered = sampleRecords;

    // Filter by category
    if (!selectedCategories.includes('all')) {
      filtered = filtered.filter(record => 
        selectedCategories.includes(record.category)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(record =>
        record.title.toLowerCase().includes(query) ||
        record.hospital.toLowerCase().includes(query) ||
        record.doctor.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategories, searchQuery]);

  const CategoryButton = ({ category, onPress }) => {
    const isSelected = selectedCategories.includes(category.id);
    
    return (
      <Pressable 
        style={[
          styles.categoryButton, 
          { backgroundColor: isSelected ? category.backgroundColor : '#F8FAFC' },
          isSelected && styles.selectedCategoryButton
        ]}
        onPress={() => onPress(category)}
        accessibilityLabel={`Filter by ${category.title}`}
      >
        <View style={[
          styles.iconContainer,
          { backgroundColor: isSelected ? category.iconColor + '20' : '#E2E8F0' }
        ]}>
          <Icon 
            source={category.icon} 
            size={20} 
            color={isSelected ? category.iconColor : '#64748B'} 
          />
        </View>
        <Text style={[
          styles.categoryLabel,
          { color: isSelected ? category.iconColor : '#64748B' }
        ]} numberOfLines={2}>
          {category.title}
        </Text>
      </Pressable>
    );
  };

  const RecordCard = ({ record }) => (
    <Card style={styles.recordCard}>
      <Card.Content style={styles.recordContent}>
        <View style={styles.recordHeader}>
          <Text style={styles.recordTitle}>{record.title}</Text>
          <Text style={styles.recordDate}>{record.date}</Text>
        </View>
        <View style={styles.recordDetails}>
          <Text style={styles.recordHospital}>{record.hospital}</Text>
          <Text style={styles.recordDoctor}>{record.doctor}</Text>
        </View>
        <View style={styles.recordFooter}>
          <Chip 
            style={[
              styles.categoryChip, 
              { backgroundColor: recordCategories.find(cat => cat.id === record.category)?.backgroundColor }
            ]}
            textStyle={styles.categoryChipText}
          >
            {recordCategories.find(cat => cat.id === record.category)?.title}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  const handleCategoryPress = (category) => {
    if (category.id === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newSelection = prev.filter(id => id !== 'all');
        
        if (newSelection.includes(category.id)) {
          // Remove if already selected
          const updated = newSelection.filter(id => id !== category.id);
          return updated.length === 0 ? ['all'] : updated;
        } else {
          // Add to selection
          return [...newSelection, category.id];
        }
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={t('searchHealthRecords') || 'Search health records...'}
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#43A047"
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Grid - 2x5 Layout */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Filter by Type</Text>
          <View style={styles.gridContainer}>
            {recordCategories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        </View>

        {/* Records List */}
        <View style={styles.recordsSection}>
          <View style={styles.recordsHeader}>
            <Text style={styles.sectionTitle}>
              Health Records ({filteredRecords.length})
            </Text>
            {selectedCategories.length > 0 && !selectedCategories.includes('all') && (
              <Pressable onPress={() => setSelectedCategories(['all'])}>
                <Text style={styles.clearFilters}>Clear Filters</Text>
              </Pressable>
            )}
          </View>
          
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon source="file-search-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No records found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your filters or search terms
              </Text>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    elevation: 0,
  },
  searchInput: {
    fontSize: 16,
    color: '#334155',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  // 2x5 Grid Layout - Action Tile / Icon Button with Label
  categoryButton: {
    width: '18%', // 5 columns (100% / 5 = 20%, minus gap)
    aspectRatio: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCategoryButton: {
    borderWidth: 2,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 12,
  },
  recordsSection: {
    paddingHorizontal: 16,
  },
  recordsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearFilters: {
    fontSize: 14,
    color: '#43A047',
    fontWeight: '500',
  },
  recordCard: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recordContent: {
    padding: 16,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  recordDate: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  recordDetails: {
    marginBottom: 12,
  },
  recordHospital: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  recordDoctor: {
    fontSize: 13,
    color: '#64748B',
  },
  recordFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChip: {
    height: 24,
    borderRadius: 12,
  },
  categoryChipText: {
    fontSize: 10,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
