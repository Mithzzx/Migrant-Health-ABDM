import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Icon, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../i18n/i18n';

export default function RecordsScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['all']);

  // Mock records data
  const allRecords = [
    {
      id: '1',
      type: 'lab',
      title: 'Blood Test Report',
      hospital: 'City General Hospital',
      date: '2024-01-15',
      doctor: 'Dr. Smith',
      icon: 'test-tube'
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Diabetes Medication',
      hospital: 'Metro Clinic',
      date: '2024-01-12',
      doctor: 'Dr. Johnson',
      icon: 'pill'
    },
    {
      id: '3',
      type: 'diagnostic',
      title: 'X-Ray Chest',
      hospital: 'Radiology Center',
      date: '2024-01-10',
      doctor: 'Dr. Wilson',
      icon: 'file-chart'
    },
    {
      id: '4',
      type: 'discharge',
      title: 'Surgery Discharge Summary',
      hospital: 'Central Hospital',
      date: '2024-01-08',
      doctor: 'Dr. Brown',
      icon: 'file-document'
    },
    {
      id: '5',
      type: 'immunization',
      title: 'COVID-19 Vaccination',
      hospital: 'Health Center',
      date: '2024-01-05',
      doctor: 'Nurse Mary',
      icon: 'needle'
    },
    {
      id: '6',
      type: 'invoice',
      title: 'Consultation Bill',
      hospital: 'Private Clinic',
      date: '2024-01-03',
      doctor: 'Dr. Davis',
      icon: 'receipt'
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'All', icon: 'view-grid', color: '#EF4444' },
    { id: 'diagnostic', label: 'Diagnostic Report', icon: 'file-chart', color: '#10B981' },
    { id: 'discharge', label: 'Discharge Summary', icon: 'file-document', color: '#F59E0B' },
    { id: 'lab', label: 'Lab Report', icon: 'test-tube', color: '#EF4444' },
    { id: 'prescription', label: 'Prescription', icon: 'pill', color: '#8B5CF6' },
    { id: 'immunization', label: 'Immunization Records', icon: 'needle', color: '#06B6D4' },
    { id: 'consultation', label: 'OP Consultation', icon: 'stethoscope', color: '#84CC16' },
    { id: 'wellness', label: 'Wellness Record', icon: 'heart-pulse', color: '#F97316' },
    { id: 'invoice', label: 'Invoice', icon: 'receipt', color: '#8B4513' },
    { id: 'others', label: 'Others', icon: 'folder-multiple', color: '#6B7280' },
  ];

  const FilterButton = ({ item }) => {
    const isSelected = selectedFilters.includes(item.id);
    
    const handlePress = () => {
      if (item.id === 'all') {
        setSelectedFilters(['all']);
      } else {
        setSelectedFilters(prev => {
          const withoutAll = prev.filter(id => id !== 'all');
          if (prev.includes(item.id)) {
            const filtered = withoutAll.filter(id => id !== item.id);
            return filtered.length === 0 ? ['all'] : filtered;
          } else {
            return [...withoutAll, item.id];
          }
        });
      }
    };

    return (
      <Pressable
        style={styles.filterButton}
        onPress={handlePress}
      >
        <View style={[
          styles.filterIconContainer,
          { backgroundColor: item.color + '20' },
          isSelected && { backgroundColor: item.color, borderWidth: 2, borderColor: item.color }
        ]}>
          <Icon 
            source={item.icon} 
            size={20} 
            color={isSelected ? '#FFFFFF' : item.color} 
          />
        </View>
        <Text style={[
          styles.filterLabel,
          isSelected && { color: item.color, fontWeight: '600' }
        ]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  // Filter records based on selected filters and search query
  const filteredRecords = allRecords.filter(record => {
    const matchesFilter = selectedFilters.includes('all') || selectedFilters.includes(record.type);
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const RecordCard = ({ record }) => {
    const filterOption = filterOptions.find(f => f.id === record.type);
    
    return (
      <Pressable style={styles.recordCard}>
        <View style={styles.recordHeader}>
          <View style={[
            styles.recordIcon,
            { backgroundColor: filterOption?.color + '20' }
          ]}>
            <Icon 
              source={filterOption?.icon || 'file'} 
              size={20} 
              color={filterOption?.color || '#6B7280'} 
            />
          </View>
          <View style={styles.recordInfo}>
            <Text style={styles.recordTitle}>{record.title}</Text>
            <Text style={styles.recordHospital}>{record.hospital}</Text>
          </View>
          <View style={styles.recordMeta}>
            <Text style={styles.recordDate}>{new Date(record.date).toLocaleDateString()}</Text>
            <Icon source="chevron-right" size={16} color="#9CA3AF" />
          </View>
        </View>
        <View style={styles.recordFooter}>
          <Text style={styles.recordDoctor}>{record.doctor}</Text>
          <View style={[styles.recordTypeBadge, { backgroundColor: filterOption?.color + '10' }]}>
            <Text style={[styles.recordTypeText, { color: filterOption?.color }]}>
              {filterOption?.label}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Icon source="folder-heart-outline" size={64} color="#9CA3AF" />
      </View>
      <Text style={styles.emptyTitle}>No Records Found</Text>
      <Text style={styles.emptyDescription}>
        {selectedFilters.includes('all') 
          ? 'Your health records will appear here once you start using the health locker feature.'
          : `No records found for the selected filters. Try adjusting your selection or check back later.`
        }
      </Text>
      <Button
        mode="outlined"
        style={styles.emptyButton}
        labelStyle={styles.emptyButtonText}
        onPress={() => setSelectedFilters(['all'])}
      >
        {selectedFilters.includes('all') ? 'Go Back to Dashboard' : 'Show All Records'}
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search your health records..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#43A047"
          />
        </View>

        {/* Filter Grid */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filters</Text>
          <View style={styles.filterGrid}>
            {filterOptions.map((item) => (
              <FilterButton key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Records Content */}
        <View style={styles.recordsContent}>
          {filteredRecords.length > 0 ? (
            <View style={styles.recordsList}>
              <View style={styles.recordsHeader}>
                <Text style={styles.recordsTitle}>Records</Text>
                <Text style={styles.recordsSubtitle}>
                  {selectedFilters.includes('all') 
                    ? 'All Records' 
                    : selectedFilters.length === 1 
                      ? filterOptions.find(f => f.id === selectedFilters[0])?.label 
                      : `${selectedFilters.length} filters selected`
                  }
                </Text>
              </View>
              {filteredRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </View>
          ) : (
            <EmptyState />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  searchBar: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    color: '#0A2540',
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 16,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: '18%',
    marginBottom: 16,
    alignItems: 'center',
  },
  filterIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  filterLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 12,
  },
  recordsContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recordsList: {
    paddingBottom: 20,
  },
  recordsHeader: {
    marginBottom: 16,
  },
  recordsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 4,
  },
  recordsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordIcon: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 2,
  },
  recordHospital: {
    fontSize: 14,
    color: '#6B7280',
  },
  recordMeta: {
    alignItems: 'flex-end',
  },
  recordDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordDoctor: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  recordTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recordTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  emptyButton: {
    borderColor: '#43A047',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  emptyButtonText: {
    color: '#43A047',
    fontSize: 16,
    fontWeight: '600',
  },
});