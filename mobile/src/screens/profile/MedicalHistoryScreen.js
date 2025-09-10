import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function MedicalHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Medical History</Text>
      <Text style={styles.paragraph}>• Hypertension (since 2022){"\n"}• Iron deficiency anemia (treated 2023){"\n"}• Occasional seasonal allergies.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  paragraph: { marginTop: 12, lineHeight: 20 }
});
