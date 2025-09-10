import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * Unified primary button styling across the app.
 * Props: all react-native-paper Button props + fullWidth boolean.
 */
export function AppButton({ mode = 'contained', fullWidth = true, style, contentStyle, ...rest }) {
  return (
    <Button
      mode={mode}
      style={[fullWidth && styles.fullWidth, styles.base, mode === 'contained' && styles.contained, style]}
      contentStyle={[{ height: 52 }, contentStyle]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  fullWidth: { alignSelf: 'stretch' },
  base: { borderRadius: 14 },
  contained: {},
});
