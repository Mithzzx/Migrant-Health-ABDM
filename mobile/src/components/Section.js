import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function Section({ title, children, style }) {
  return (
    <View style={[styles.section, style]}> 
      {title && <Text variant="titleSmall" style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 20 },
  title: { marginBottom: 8 }
});
