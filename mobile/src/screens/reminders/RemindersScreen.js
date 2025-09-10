import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text, Chip } from 'react-native-paper';

const DATA = [
  { id: '1', type: 'Medicine', title: 'Take BP tablet', time: '08:00' },
  { id: '2', type: 'Appointment', title: 'Doctor visit', time: '2025-09-20 15:30' },
];

export default function RemindersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Reminders</Text>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text>{item.title}</Text>
              <Text style={styles.meta}>{item.time}</Text>
            </View>
            <Chip>{item.type}</Chip>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
      <Button mode="contained" style={styles.fab} onPress={() => navigation.navigate('AddReminder')}>Add</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  item: { flexDirection: 'row', alignItems: 'center' },
  meta: { color: '#555', fontSize: 12, marginTop: 2 },
  fab: { position: 'absolute', right: 16, bottom: 32, borderRadius: 28 }
});
