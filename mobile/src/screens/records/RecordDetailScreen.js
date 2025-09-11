import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function RecordDetailScreen({ navigation, route }) {
  const record = route?.params?.record || { id: 'demo', title: 'Sample Record' };
  
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Record Details</Text>
      <Text style={styles.paragraph}>
        Viewing details for record: {record.title || record.id}
      </Text>
      <Text style={styles.description}>
        This screen would show detailed information about the selected health record, 
        including FHIR data, document attachments, and metadata.
      </Text>
      <Button 
        mode="contained" 
        style={styles.btn} 
        onPress={() => navigation.goBack()}
      >
        Back to Records
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 28,
    backgroundColor: '#F2F5F7'
  },
  paragraph: { 
    marginTop: 12, 
    lineHeight: 20,
    fontSize: 16,
    color: '#0A2540'
  },
  description: {
    marginTop: 16,
    lineHeight: 20,
    fontSize: 14,
    color: '#6B7280'
  },
  btn: { 
    marginTop: 24,
    borderRadius: 12
  }
});
