import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function RecordScreens() {
  const onPress = () => Alert.alert('Hello', 'Hello, World!');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>

      <Pressable style={styles.button} onPress={onPress} android_ripple={{ color: 'rgba(255,255,255,0.2)' }}>
        <Text style={styles.buttonText}>Press Me</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0a84ff',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
