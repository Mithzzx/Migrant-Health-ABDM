import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';

export function RecordItem({ record, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress?.(record)}>
      <Icon source="file-document-outline" size={24} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text>{record.type}</Text>
        <Text style={styles.meta}>{record.date}</Text>
      </View>
      <Icon source="chevron-right" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  meta: { color: '#666', fontSize: 12, marginTop: 2 }
});
