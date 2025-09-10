import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons } from 'react-native-paper';

export default function AddReminderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Add Reminder</Text>
      <SegmentedButtons
        style={{ marginTop: 16 }}
        value={"medicine"}
        buttons={[
          { value: 'medicine', label: 'Medicine' },
          { value: 'appointment', label: 'Appointment' },
        ]}
        onValueChange={() => {}}
      />
      <TextInput label="Title" style={styles.input} mode="outlined" />
      <TextInput label="Date / Time" style={styles.input} mode="outlined" placeholder="YYYY-MM-DD HH:mm" />
      <Button mode="contained" style={styles.btn} onPress={() => navigation.goBack()}>Save (Mock)</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  input: { marginTop: 16 },
  btn: { marginTop: 24 }
});
