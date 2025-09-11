import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function ShareRecordScreen({ navigation, route }) {
  const record = route?.params?.record || { id: 'demo' };
  
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Share Record</Text>
      <Text style={styles.paragraph}>
        Generate consent artifact for record {record.id}. 
      </Text>
      <Text style={styles.description}>
        Placeholder: ABDM gateway call (sandbox) to create consent request and share via QR / secure link.
        This screen would handle:
        • Creating consent requests
        • Generating secure sharing links
        • QR code generation for easy sharing
        • Managing data sharing permissions
      </Text>
      <Button 
        mode="contained" 
        style={styles.btn} 
        onPress={() => navigation.goBack()}
      >
        Simulate Share
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 28,
    backgroundColor: '#F2F5F7'
  },
  paragraph: { 
    marginTop: 12, 
    lineHeight: 20,
    fontSize: 16,
    color: '#0A2540'
  },
  description: {
    marginTop: 16,
    lineHeight: 20,
    fontSize: 14,
    color: '#6B7280'
  },
  btn: { 
    marginTop: 24,
    borderRadius: 12
  }
});
