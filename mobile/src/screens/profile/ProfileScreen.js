import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Avatar } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Avatar.Text size={64} label="MW" />
        <View style={{ marginLeft: 16 }}>
          <Text variant="titleMedium">Migrant Worker</Text>
          <Text style={styles.muted}>ABHA: 00-0000-0000-0000</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text variant="titleSmall">Basic Details</Text>
        <Text style={styles.muted}>Age: 30 | Occupation: Construction | State: Kerala</Text>
      </View>
      <View style={styles.section}>
        <Text variant="titleSmall">Medical Summary</Text>
        <Text style={styles.muted}>Hypertension (since 2022), Iron deficiency.</Text>
      </View>
      <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('VaccinationRecords')}>Vaccination Records</Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('MedicalHistory')}>Medical History</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  header: { flexDirection: 'row', alignItems: 'center' },
  muted: { color: '#555', marginTop: 4 },
  section: { marginTop: 20 },
  btn: { marginTop: 16 }
});
