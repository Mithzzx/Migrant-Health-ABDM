import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function RecordsScreen() {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{t('records')}</Text>
      <Text style={{ marginTop: 8 }}>Your health documents and files will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 28 },
});
