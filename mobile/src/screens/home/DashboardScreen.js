import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconButton, Surface, Text } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function DashboardScreen() {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Icon source="shield-check" size={24} color="#0B6E4F" />
          <Text variant="titleMedium">{t('dashboard')}</Text>
        </View>
        <IconButton icon={(props) => <Icon {...props} source="account-circle-outline" />} onPress={() => {}} />
      </View>

      <Surface style={styles.card} elevation={2}>
        <Text variant="titleSmall">{t('hello')} 👋</Text>
        <Text style={{ marginTop: 6 }}>{t('homeWelcome')}</Text>
      </Surface>

      <Surface style={styles.card} elevation={2}>
        <View style={styles.row}><Icon source="clipboard-text-search-outline" size={20} /><Text style={styles.rowText}>Recent Health Records</Text></View>
      </Surface>

      <Surface style={styles.card} elevation={2}>
        <View style={styles.row}><Icon source="calendar-clock" size={20} /><Text style={styles.rowText}>Upcoming Appointments</Text></View>
      </Surface>

      <Surface style={styles.card} elevation={2}>
        <View style={styles.row}><Icon source="heart-pulse" size={20} /><Text style={styles.rowText}>Health Summary</Text></View>
      </Surface>

      <IconButton
        icon={(props) => <Icon {...props} source="medical-bag" />}
        mode="contained"
        size={32}
        style={styles.emergency}
        onPress={() => {}}
        accessibilityLabel="Show Emergency Info"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  card: { marginTop: 12, padding: 14, borderRadius: 16, backgroundColor: '#FFF' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowText: { color: '#0A2540' },
  emergency: { position: 'absolute', right: 16, bottom: 96, backgroundColor: '#D32F2F' },
});
