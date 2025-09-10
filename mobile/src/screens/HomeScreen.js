import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import { useI18n } from '../i18n/i18n';

export default function HomeScreen({ navigation }) {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>{t('homeTitle')}</Text>
      <Surface style={styles.card} elevation={2}>
        <View style={styles.row}>
          <Icon source="account-heart-outline" size={24} color="#0B6E4F" />
          <Text style={styles.rowText}>{t('homeWelcome')}</Text>
        </View>
        <View style={styles.row}>
          <Icon source="shield-lock-outline" size={24} color="#0D47A1" />
          <Text style={styles.rowText}>{t('securePrivate')}</Text>
        </View>
        <Button mode="outlined" style={{ marginTop: 12 }} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Language' }] })}>
          {t('logout')}
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 48 },
  title: { color: '#0A2540', fontWeight: '600' },
  card: { marginTop: 16, padding: 16, borderRadius: 16, backgroundColor: '#FFF' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  rowText: { color: '#0A2540' },
});
