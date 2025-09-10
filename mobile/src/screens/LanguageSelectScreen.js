import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View, FlatList, TouchableOpacity, I18nManager } from 'react-native';
import { Icon, IconButton, Surface, Text } from 'react-native-paper';
import { KeralaLogo, AyushmanBharatLogo } from '../components/Logos';
import { AppButton } from '../components/AppButton';
import * as Speech from 'expo-speech';
import { useI18n } from '../i18n/i18n';

const LANG_OPTIONS = [
  { code: 'en', native: 'English', en: 'English' },
  { code: 'hi', native: 'हिंदी', en: 'Hindi' },
  { code: 'ml', native: 'മലയാളം', en: 'Malayalam' },
  { code: 'bn', native: 'বাংলা', en: 'Bengali' },
  { code: 'ta', native: 'தமிழ்', en: 'Tamil' },
  { code: 'te', native: 'తెలుగు', en: 'Telugu' },
  { code: 'kn', native: 'ಕನ್ನಡ', en: 'Kannada' },
  { code: 'or', native: 'ଓଡ଼ିଆ', en: 'Odia' },
  { code: 'mr', native: 'मराठी', en: 'Marathi' },
  { code: 'as', native: 'অসমীয়া', en: 'Assamese' },
];

export default function LanguageSelectScreen({ navigation }) {
  const { t, setLang, lang } = useI18n();
  const [selected, setSelected] = useState(lang || 'en');

  // Heuristic device locale detection
  useEffect(() => {
    try {
      const locale = Intl?.DateTimeFormat?.().resolvedOptions?.().locale || 'en';
      const lower = String(locale).toLowerCase();
      const match =
        (lower.includes('ml') && 'ml') ||
        (lower.includes('hi') && 'hi') ||
        (lower.includes('bn') && 'bn') ||
        (lower.includes('ta') && 'ta') ||
        (lower.includes('te') && 'te') ||
        (lower.includes('kn') && 'kn') ||
        (lower.includes('or') || lower.includes('od') ? 'or' : null) ||
        (lower.includes('mr') && 'mr') ||
        (lower.includes('as') && 'as') ||
        'en';
      setSelected(match);
    } catch (_) {
      setSelected('en');
    }
  }, []);

  const onContinue = () => {
    setLang(selected);
    // For RTL languages in future, we could toggle I18nManager here.
    I18nManager.allowRTL(false);
    navigation.replace('Login');
  };

  const TTS_LANGUAGE_MAP = {
    en: 'en-US',
    hi: 'hi-IN',
    ml: 'ml-IN', // Malayalam
    bn: 'bn-IN', // Bengali
    ta: 'ta-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    // Odia may be 'or-IN' or 'od-IN' depending on platform; we'll try or-IN and fallback
    or: 'or-IN',
    mr: 'mr-IN', // Marathi
    // Assamese support can vary; use 'as-IN' when available
    as: 'as-IN',
  };

  const speakName = (item) => {
    const text = `${item.native}`;
    const requested = TTS_LANGUAGE_MAP[item.code] || 'en-US';
    try {
      Speech.speak(text, { language: requested, pitch: 1.0, rate: 1.0, onError: () => {
        // Fallback chain: try English name in English
        Speech.speak(item.en, { language: 'en-US' });
      }});
    } catch (_) {
      Speech.speak(item.en, { language: 'en-US' });
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selected === item.code;
    return (
      <TouchableOpacity
        onPress={() => setSelected(item.code)}
        accessibilityRole="button"
        accessibilityLabel={`${item.native} / ${item.en}`}
        style={[styles.langCard, isSelected && styles.langCardSelected]}
        activeOpacity={0.85}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.langNative}>{item.native}</Text>
            <Text style={styles.langEnglish}>{`/ ${item.en}`}</Text>
          </View>
          <IconButton
            icon={(props) => <Icon {...props} source="volume-high" />}
            onPress={() => speakName(item)}
            accessibilityLabel={`Play ${item.en} name`}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
  <View style={styles.root}>
      {/* Subtle healthcare-themed background icons */}
      <View pointerEvents="none" style={styles.bgIcons}>
        <Icon source="stethoscope" size={48} color="#E0ECFF" />
        <Icon source="hospital-box-outline" size={48} color="#EAF3FF" />
        <Icon source="account-heart-outline" size={48} color="#E6F4EA" />
      </View>

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.logoBlock}> 
            <KeralaLogo dimension={52} style={styles.logoImg} />
            <Text variant="labelLarge" style={styles.headerText}>{t('governmentOfKerala')}</Text>
          </View>
          <View style={styles.logoBlock}>
            <AyushmanBharatLogo dimension={52} style={styles.logoImg} />
            <Text variant="labelLarge" style={styles.headerText}>{t('abdm')}</Text>
          </View>
        </View>

        <Text variant="headlineMedium" style={styles.title}>{t('appName')}</Text>
        <Text style={styles.subtitle}>{t('chooseLanguagePrompt')}</Text>

        <FlatList
          data={LANG_OPTIONS}
          keyExtractor={(item) => item.code}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 96, gap: 12 }}
        />

        <Text style={styles.footerNote}>{t('youCanChangeLanguageLater')}</Text>
      </View>

      <View style={styles.bottomBar}>
        <AppButton onPress={onContinue} style={{ flex: 1 }}>
          {t('continue')}
        </AppButton>
      </View>
    </View>
  );
}

const LOGO_SIZE = 52;
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F5F7' },
  container: { flex: 1, padding: 20, paddingTop: 48 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoBlock: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6EEF7',
  },
  logoImg: { width: LOGO_SIZE * 0.7, height: LOGO_SIZE * 0.7 },
  headerText: { marginLeft: 8, color: '#0A2540' },
  title: { marginTop: 16, color: '#0A2540', fontWeight: '600' },
  subtitle: { marginTop: 8, color: '#334155' },
  langCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
    borderColor: '#E5EEF8',
    minHeight: 84,
  },
  langCardSelected: {
    borderColor: '#43A047',
    backgroundColor: '#F0FBF6',
  },
  langNative: { fontSize: 18, color: '#0A2540', fontWeight: '600' },
  langEnglish: { marginTop: 2, color: '#475569' },
  footerNote: { marginTop: 8, color: '#475569' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'transparent' },
  bgIcons: {
    position: 'absolute',
    top: 24,
    right: 16,
    gap: 12,
  },
});
