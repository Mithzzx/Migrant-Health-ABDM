import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function AbhaLinkScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Link / Create ABHA ID</Text>
      <Text style={styles.paragraph}>
        Placeholder: Integrate ABDM sandbox flow here (mobile/email OTP, demographic + Aadhaar / DL / PAN based). After success, store token & ABHA address.
      </Text>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.goBack()}>Done (Mock)</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  paragraph: { marginTop: 12, lineHeight: 18 },
  btn: { marginTop: 24 }
});
