import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, HelperText, Icon, IconButton, Surface, Text, TextInput } from 'react-native-paper';
import { AppButton } from '../components/AppButton';
import { KeralaLogo, AyushmanBharatLogo } from '../components/Logos';
import { useI18n } from '../i18n/i18n';

const LOGO_SIZE = 48;

const isValidAbhaOrPhone = (v) => {
  const trimmed = (v || '').replace(/\s+/g, '');
  // Simplified validation: 14-digit ABHA (with/without spaces) or 10-digit phone
  return /^(\d{10}|\d{14})$/.test(trimmed);
};

export default function LoginScreen({ navigation }) {
  const { t } = useI18n();
  const [value, setValue] = useState('');
  const [attempted, setAttempted] = useState(false);

  const error = attempted && !isValidAbhaOrPhone(value);

  const onGetOtp = () => {
    setAttempted(true);
    if (!isValidAbhaOrPhone(value)) return;
    navigation.navigate('OTP', { identifier: value });
  };

  const header = useMemo(() => (
    <View style={styles.headerRow}>
      <View style={styles.logoRow}>
        <KeralaLogo dimension={48} style={styles.logoImg} />
        <Text variant="labelLarge" style={styles.gokText}>{t('governmentOfKerala')}</Text>
      </View>
      <View style={styles.logoRow}>
        <AyushmanBharatLogo dimension={48} style={styles.logoImg} />
        <Text variant="labelLarge" style={styles.abdmText}>{t('abdm')}</Text>
      </View>
    </View>
  ), [t]);

  return (
  <View style={{ flex: 1, backgroundColor: '#F2F5F7' }}>

      <View style={styles.container}>
        {header}
  <Text variant="headlineMedium" style={styles.appName}>{t('appName')}</Text>

  <Surface style={styles.card} elevation={0}>
          <TextInput
            mode="outlined"
            label={t('enterAbhaOrMobile')}
            value={value}
            onChangeText={setValue}
            keyboardType="number-pad"
            left={<TextInput.Icon icon={() => <Icon source="badge-account-horizontal-outline" size={24} />} />}
            style={styles.input}
            accessibilityLabel={t('enterAbhaOrMobile')}
          />
          {error && (
            <HelperText type="error" visible>
              {t('enterAbhaOrMobile')}
            </HelperText>
          )}
          <AppButton onPress={onGetOtp} style={styles.cta} icon={(props) => <Icon {...props} source="message-text-lock-outline" />}> 
            {t('getOtp')}
          </AppButton>

          <View style={styles.linksRow}>
            <Text>{t('dontHaveAbha')}</Text>
            <Button mode="text" onPress={() => {}} textColor="#0D47A1">
              {t('createAbha')}
            </Button>
          </View>

          <AppButton mode="outlined" onPress={() => {}} style={styles.voiceBtn} contentStyle={{ height: 48 }} icon={(props) => <Icon {...props} source="microphone-outline" />}> 
            {t('voiceLogin')}
          </AppButton>

          <View style={styles.trustRow} accessibilityRole="text">
            <Icon source="lock-outline" size={18} color="#0B6E4F" />
            <Text style={styles.trustText}>{t('securePrivate')}</Text>
          </View>
        </Surface>

        <View style={styles.illustration}>
          <Icon source="stethoscope" size={28} color="#0D47A1" />
          <Icon source="heart-pulse" size={28} color="#0B6E4F" />
          <Icon source="waveform" size={28} color="#FF8F00" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
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
  gokText: { marginLeft: 8, color: '#0A2540' },
  abdmText: { marginLeft: 8, color: '#0A2540' },
  appName: { marginTop: 16, color: '#0A2540', fontWeight: '600' },
  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginTop: 8,
  },
  cta: { marginTop: 16 },
  linksRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  voiceBtn: { marginTop: 8 },
  trustRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  trustText: { color: '#0B6E4F' },
  illustration: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
