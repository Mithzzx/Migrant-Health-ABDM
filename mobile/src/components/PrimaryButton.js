import React from 'react';
import { Button } from 'react-native-paper';

export function PrimaryButton({ style, contentStyle, children, ...rest }) {
  return (
    <Button
      mode="contained"
      style={[{ borderRadius: 14, marginTop: 8 }, style]}
      contentStyle={[{ height: 52 }, contentStyle]}
      buttonColor="#0B6E4F"
      textColor="#FFFFFF"
      {...rest}
    >
      {children}
    </Button>
  );
}
