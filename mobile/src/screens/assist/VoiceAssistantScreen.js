import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function VoiceAssistantScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Voice Assistant</Text>
      <Text style={styles.paragraph}>Placeholder: Use speech-to-text (expo-speech + external STT) for navigation and answering basic health FAQs in multiple languages.</Text>
      <Button mode="contained" style={styles.btn} onPress={() => {}}>Start Listening (Mock)</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  paragraph: { marginTop: 12, lineHeight: 20 },
  btn: { marginTop: 24 }
});
