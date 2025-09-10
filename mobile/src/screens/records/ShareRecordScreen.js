import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function ShareRecordScreen({ navigation, route }) {
  const record = route?.params?.record || { id: 'demo' };
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Share Record</Text>
      <Text style={styles.paragraph}>Generate consent artifact for record {record.id}. Placeholder: ABDM gateway call (sandbox) to create consent request and share via QR / secure link.</Text>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.goBack()}>Simulate Share</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  paragraph: { marginTop: 12, lineHeight: 20 },
  btn: { marginTop: 24 }
});
