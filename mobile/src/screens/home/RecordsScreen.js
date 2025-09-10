import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Surface, Icon } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { useI18n } from '../../i18n/i18n';

export default function RecordsScreen() {
  const { t } = useI18n();
  return (
    <ScrollView contentContainerStyle={styles.content} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      <View style={{ height: 4 }} />
      <Surface style={styles.card} elevation={0}>
        <View style={styles.row}> 
          <Icon source="folder" size={20} />
          <Text style={styles.rowText}>{t('records')}</Text>
        </View>
        <Text style={styles.muted}>Your health documents and files will appear here.</Text>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 120 },
  card: { marginTop: 12, padding: 14, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  rowText: { fontWeight: '600', color: '#0A2540' },
  muted: { color: '#64748B' }
});
