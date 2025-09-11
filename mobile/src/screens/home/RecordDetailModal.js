import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Modal, Portal, Button, Card, Icon } from 'react-native-paper';

const RecordDetailModal = ({ visible, selectedRecord, onDismiss, onOpenDocument }) => {
  if (!selectedRecord) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Icon source="file-document" size={32} color="#43A047" />
            <Text style={styles.modalTitle}>Record Details</Text>
          </View>
          
          <ScrollView style={styles.scrollContent}>
            <Card style={styles.infoCard}>
              <Card.Content>
                <Text style={styles.cardTitle}>Basic Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Title:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.title}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Type:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.type_key}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.date}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Hospital:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.hospital}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Doctor:</Text>
                  <Text style={styles.infoValue}>Dr. {selectedRecord.doctor}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Size:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.size}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Status:</Text>
                  <Text style={styles.infoValue}>{selectedRecord.status}</Text>
                </View>
              </Card.Content>
            </Card>

            {selectedRecord.description && (
              <Card style={styles.infoCard}>
                <Card.Content>
                  <Text style={styles.cardTitle}>Description</Text>
                  <Text style={styles.descriptionText}>{selectedRecord.description}</Text>
                </Card.Content>
              </Card>
            )}

            {selectedRecord.notes && (
              <Card style={styles.infoCard}>
                <Card.Content>
                  <Text style={styles.cardTitle}>Notes</Text>
                  <Text style={styles.notesText}>{selectedRecord.notes}</Text>
                </Card.Content>
              </Card>
            )}
          </ScrollView>

          <View style={styles.modalActions}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={styles.modalCancelButton}
            >
              Close
            </Button>
            <Button
              mode="contained"
              onPress={() => onOpenDocument(selectedRecord)}
              style={styles.modalConfirmButton}
              buttonColor="#43A047"
              icon="file-download"
            >
              Open Document
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0A2540',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollContent: {
    maxHeight: 400,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#0A2540',
    flex: 2,
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  modalCancelButton: {
    flex: 1,
    borderColor: '#E2E8F0',
  },
  modalConfirmButton: {
    flex: 1,
  },
});

export default RecordDetailModal;
