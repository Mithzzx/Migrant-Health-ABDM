import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon } from 'react-native-paper';

export function AbhaCard({ abha = '00-0000-0000-0000', name = 'Migrant Worker' }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon source="account" size={28} color="#0B6E4F" />
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall">{name}</Text>
          <Text style={styles.muted}>ABHA: {abha}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  muted: { color: '#555', marginTop: 2 },
});
