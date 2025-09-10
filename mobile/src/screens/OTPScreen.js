import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, IconButton, Surface, Text, TextInput } from 'react-native-paper';
import { AppButton } from '../components/AppButton';
import { useI18n } from '../i18n/i18n';

export default function OTPScreen({ route, navigation }) {
  const { t } = useI18n();
  const identifier = route?.params?.identifier ?? '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (next.join('').length === 6) {
      // Accept any 6-digit input and route to Home
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  const handleKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <IconButton icon={(props) => <Icon {...props} source="arrow-left" />} onPress={() => navigation.goBack()} accessibilityLabel="Back" />
        <Text variant="titleLarge">{t('otpTitle')}</Text>
        <View style={{ width: 48 }} />
      </View>

  <Surface style={styles.card} elevation={0}>
        <Text style={{ marginBottom: 8 }}>{identifier}</Text>
        <Text style={{ marginBottom: 12 }}>{t('enterOtp')}</Text>
        <View style={styles.otpRow}>
          {otp.map((d, i) => (
            <TextInput
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              mode="outlined"
              value={d}
              onChangeText={(v) => handleChange(i, v)}
              onKeyPress={(e) => handleKeyPress(i, e)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpInput}
              textAlign="center"
            />
          ))}
        </View>

        <View style={styles.actionsRow}>
          <Button mode="text" onPress={() => navigation.goBack()}>{t('changeNumber')}</Button>
          <Button mode="text" onPress={() => {}}>{t('resendOtp')}</Button>
        </View>
        <AppButton style={{ marginTop: 16 }} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}>
          {t('continue')}
        </AppButton>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 48, backgroundColor: '#F2F5F7' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  card: { marginTop: 24, padding: 16, borderRadius: 16, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  otpInput: { width: 48, height: 56, fontSize: 20 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});
