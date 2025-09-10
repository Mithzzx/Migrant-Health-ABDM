import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { useI18n } from '../i18n/i18n';

const LanguageToggle = () => {
  const { lang, setLang, t } = useI18n();
  const buttons = [
    { value: 'hi', label: t('hindi') },
    { value: 'bn', label: t('bengali') },
    { value: 'mr', label: t('marathi') },
    { value: 'te', label: t('telugu') },
    { value: 'ta', label: t('tamil') },
    { value: 'gu', label: t('gujarati') },
    { value: 'ur', label: t('urdu') },
    { value: 'kn', label: t('kannada') },
    { value: 'ml', label: t('malayalam') },
    { value: 'or', label: t('odia') },
    { value: 'en', label: t('english') },
  ];

  return (
    <View style={styles.container} accessible accessibilityLabel="Language toggle">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        <SegmentedButtons value={lang} onValueChange={setLang} buttons={buttons} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 8 },
});

export default LanguageToggle;
