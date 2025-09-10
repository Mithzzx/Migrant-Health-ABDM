import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, List } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import { useNavigation } from '@react-navigation/native';

export default function MoreScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text variant="titleMedium">{t('more')}</Text>
      <List.Section style={{ marginTop: 12 }}>
        <List.Subheader>Account & Profile</List.Subheader>
        <List.Item title="Profile" left={(p) => <List.Icon {...p} icon="account-circle-outline" />} onPress={() => navigation.navigate('Profile')} />
        <List.Item title="Link / Create ABHA" left={(p) => <List.Icon {...p} icon="shield-plus" />} onPress={() => navigation.navigate('AbhaLink')} />
      </List.Section>
      <List.Section>
        <List.Subheader>Health Records</List.Subheader>
        <List.Item title="Health Tips" left={(p) => <List.Icon {...p} icon="heart-pulse" />} onPress={() => navigation.navigate('HealthTips')} />
        <List.Item title="Voice Assistant" left={(p) => <List.Icon {...p} icon="microphone-outline" />} onPress={() => navigation.navigate('VoiceAssistant')} />
      </List.Section>
      <List.Section>
        <List.Subheader>Reminders</List.Subheader>
        <List.Item title="Reminders" left={(p) => <List.Icon {...p} icon="alarm" />} onPress={() => navigation.navigate('Reminders')} />
      </List.Section>
      <Text style={{ marginTop: 20, color: '#666' }}>Settings, language, privacy, and help will appear here.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
});
