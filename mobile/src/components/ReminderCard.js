import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Chip, Icon } from 'react-native-paper';

export function ReminderCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon source={item.type === 'Medicine' ? 'pill' : 'calendar-clock'} size={22} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text>{item.title}</Text>
          <Text style={styles.meta}>{item.time}</Text>
        </View>
        <Chip compact>{item.type}</Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', padding: 12, borderRadius: 14 },
  meta: { color: '#666', fontSize: 12, marginTop: 2 }
});
