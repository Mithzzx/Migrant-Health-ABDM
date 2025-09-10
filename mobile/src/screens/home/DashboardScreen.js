import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, IconButton, Surface, Text } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

import { ScrollView } from 'react-native';

export default function DashboardScreen() {
  const { t } = useI18n();
  return (
  <ScrollView contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
  {/* Removed greeting card to avoid duplicate header appearance with native large title */}
      <Surface style={styles.card} elevation={0}>
        <View style={styles.row}><Icon source="clipboard-text-search-outline" size={20} /><Text style={styles.rowText}>Recent Health Records</Text></View>
      </Surface>
      <Surface style={styles.card} elevation={0}>
        <View style={styles.row}><Icon source="calendar-clock" size={20} /><Text style={styles.rowText}>Upcoming Appointments</Text></View>
      </Surface>
      <Surface style={styles.card} elevation={0}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 },
  card: { marginTop: 12, padding: 14, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowText: { color: '#0A2540' },
  emergency: { position: 'absolute', right: 16, bottom: 96, backgroundColor: '#D32F2F' },
});
