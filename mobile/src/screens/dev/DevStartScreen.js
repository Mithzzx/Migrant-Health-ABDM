import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

// Temporary developer helper screen to jump into flows quickly.
// Remove before production OR guard with env flag.
export default function DevStartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Developer Start</Text>
      <Text style={styles.note}>Temporary screen for faster testing during hackathon.</Text>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.replace('Language')}>Full Onboarding</Button>
      <Button mode="outlined" style={styles.btn} onPress={() => navigation.replace('Home')}>Skip to Home (Mock Auth)</Button>
      <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('Profile')}>Go Profile (Mock)</Button>
      <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('Reminders')}>Go Reminders</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  btn: { marginTop: 16 },
  note: { marginTop: 8, color: '#555' }
});
