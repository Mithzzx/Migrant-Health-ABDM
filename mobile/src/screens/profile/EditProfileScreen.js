import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function EditProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Edit Profile</Text>
      <TextInput label="Name" value="Migrant Worker" style={styles.input} mode="outlined" />
      <TextInput label="Age" value="30" style={styles.input} mode="outlined" />
      <TextInput label="Occupation" value="Construction" style={styles.input} mode="outlined" />
      <TextInput label="State of Origin" value="Kerala" style={styles.input} mode="outlined" />
      <Button mode="contained" style={styles.btn} onPress={() => navigation.goBack()}>Save (Mock)</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  input: { marginTop: 16 },
  btn: { marginTop: 24 }
});
