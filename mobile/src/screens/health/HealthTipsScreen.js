import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const TIPS = [
  'Drink clean water and stay hydrated in hot conditions.',
  'Wash hands before meals to prevent infections.',
  'Include green vegetables and protein (lentils) daily.',
  'Take medicines on schedule; do not skip doses.',
  'Wear protective gear (helmet, gloves) at work sites.'
];

export default function HealthTipsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text variant="titleMedium">Health Tips</Text>
      <View style={{ marginTop: 16 }}>
        {TIPS.map((t, i) => (
          <View key={i} style={styles.tip}><Text>{`• ${t}`}</Text></View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  tip: { marginBottom: 12 }
});
