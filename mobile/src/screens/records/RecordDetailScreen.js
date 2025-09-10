import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function RecordDetailScreen({ navigation, route }) {
  const record = route?.params?.record || { id: 'demo', type: 'Prescription', date: '2025-01-15' };
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Record Detail</Text>
      <Text style={styles.meta}>Type: {record.type}</Text>
      <Text style={styles.meta}>Date: {record.date}</Text>
      <Text style={styles.paragraph}>Placeholder: Render structured data (FHIR bundle / PDF summary) fetched via ABDM consented link.</Text>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('ShareRecord', { record })}>Share</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  meta: { marginTop: 8, color: '#444' },
  paragraph: { marginTop: 16, lineHeight: 20 },
  btn: { marginTop: 24 }
});
