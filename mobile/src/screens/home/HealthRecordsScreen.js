import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Icon, ActivityIndicator, Button } from 'react-native-paper';
import RecordDetailModal from './RecordDetailModal';

// Temporary mock records – replace later with API / context data
const MOCK_RECORDS = [
  {
    id: '1',
    title: 'Blood Test Report',
    type_key: 'Lab Report',
    date: '2025-08-21',
    hospital: 'City Health Lab',
    doctor: 'Smith',
    size: '245 KB',
    status: 'Verified',
    description: 'Comprehensive blood analysis including CBC and lipid profile.',
    notes: 'Follow up in 6 months.'
  },
  {
    id: '2',
    title: 'X-Ray Chest',
    type_key: 'Imaging',
    date: '2025-07-10',
    hospital: 'Metro Hospital',
    doctor: 'Lee',
    size: '1.2 MB',
    status: 'Available',
    description: 'PA view chest x-ray. No acute findings.',
    notes: null
  }
];

export default function HealthRecordsScreen() {
  const [records] = useState(MOCK_RECORDS);
  const [loading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openRecord = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const openDocument = (record) => {
    // Placeholder: integrate file viewer / download logic later
    console.log('Open document for record', record.id);
    closeModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openRecord(item)} activeOpacity={0.7}>
      <Card style={styles.recordCard} mode="outlined">
        <Card.Content style={styles.cardContent}>        
          <View style={styles.iconWrap}> 
            <Icon source="file-document" size={28} color="#43A047" />
          </View>
          <View style={styles.infoWrap}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.type_key} • {item.date}</Text>
            <Text style={styles.subMeta}>{item.hospital}</Text>
          </View>
          <View style={styles.statusWrap}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.size}>{item.size}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderWrap}><ActivityIndicator /></View>
      )}
      {!loading && records.length === 0 && (
        <View style={styles.emptyWrap}>
          <Icon source="folder-outline" size={48} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No Records Yet</Text>
          <Text style={styles.emptyDesc}>Your health documents will appear here once added.</Text>
          <Button mode="contained" style={styles.ctaButton} onPress={() => {}}>
            Link ABHA / Fetch
          </Button>
        </View>
      )}
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={records.length === 0 ? null : styles.listContent}
      />
      <RecordDetailModal
        visible={modalVisible}
        selectedRecord={selectedRecord}
        onDismiss={closeModal}
        onOpenDocument={openDocument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5F7', padding: 16 },
  loaderWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { paddingBottom: 32 },
  recordCard: { marginBottom: 12, borderRadius: 16, borderColor: '#E2E8F0' },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E8F5E8', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: '#43A047' },
  infoWrap: { flex: 1 },
  title: { fontSize: 15, fontWeight: '600', color: '#0A2540', marginBottom: 2 },
  meta: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  subMeta: { fontSize: 12, color: '#94A3B8' },
  statusWrap: { alignItems: 'flex-end', justifyContent: 'center', marginLeft: 12 },
  status: { fontSize: 12, fontWeight: '600', color: '#43A047', marginBottom: 4 },
  size: { fontSize: 11, color: '#64748B' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#0A2540', marginTop: 16 },
  emptyDesc: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  ctaButton: { marginTop: 16, backgroundColor: '#43A047', borderRadius: 12 },
});
