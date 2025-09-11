import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export function RecordItem({ record, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress?.(record)}>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text>{record.type}</Text>
        <Text style={styles.meta}>{record.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  meta: { color: '#666', fontSize: 12, marginTop: 2 }
});
