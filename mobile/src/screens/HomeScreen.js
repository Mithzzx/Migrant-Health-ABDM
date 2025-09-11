import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
  const items = Array.from({ length: 40 }, (_, i) => `Item ${i + 1}`);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scroll} contentContainerStyle={styles.content}>
      {items.map((it) => (
        <View key={it} style={styles.row}>
          <Text style={styles.text}>{it}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F2F5F7' },
  content: { padding: 16, paddingTop: 8, paddingBottom: 48 },
  row: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  text: { fontSize: 16, color: '#0A2540' }
});
