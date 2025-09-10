import React from 'react';
import { View, StyleSheet } from 'react-native';

export function ScreenContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 48, backgroundColor: '#F2F5F7' },
});
