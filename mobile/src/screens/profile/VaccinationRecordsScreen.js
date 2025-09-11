import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, Chip } from 'react-native-paper';

const DATA = [
  { id: '1', name: 'Tetanus Booster', date: '2024-05-10' },
  { id: '2', name: 'Hepatitis B', date: '2023-11-02' },
  { id: '3', name: 'COVID-19 (Booster)', date: '2023-08-15' },
];

export default function VaccinationRecordsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Vaccination Records</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}> 
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Chip>{item.date}</Chip>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  item: { flexDirection: 'row', alignItems: 'center' },
  sep: { height: 12 }
});
