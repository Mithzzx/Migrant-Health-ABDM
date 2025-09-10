import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, TouchableRipple, Icon } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';
import { useNavigation } from '@react-navigation/native';

function SectionCard({ title, children }) {
  return (
    <View style={styles.sectionCard}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.sectionInner}>{children}</View>
    </View>
  );
}

function RowItem({ icon, label, onPress, last }) {
  return (
    <TouchableRipple onPress={onPress} style={styles.rowRipple} rippleColor="rgba(0,0,0,0.06)">
      <View style={[styles.row, last && { borderBottomWidth: 0 }]}>        
        <Icon source={icon} size={20} color="#0A2540" />
        <Text style={styles.rowLabel}>{label}</Text>
        <Icon source="chevron-right" size={20} color="#94A3B8" />
      </View>
    </TouchableRipple>
  );
}

export default function MoreScreen() {
  const { t } = useI18n();
  const navigation = useNavigation();
  return (
  <ScrollView contentContainerStyle={styles.scroll} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
      <View style={{ height: 4 }} />
      {/* Profile Header outside cards */}
      <View style={styles.profileHeader}> 
        <Avatar.Text size={64} label="JD" style={styles.avatar} color="#FFFFFF" />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileMeta}>Member since Jan 1, 2025</Text>
        </View>
        <Icon source="chevron-right" size={28} color="#94A3B8" />
      </View>
      <SectionCard title={t('more') + ' · Account'}>
        <RowItem icon="account-circle-outline" label="Profile" onPress={() => navigation.navigate('Profile')} />
        <RowItem icon="shield-plus" label="Link / Create ABHA" onPress={() => navigation.navigate('AbhaLink')} />
        <RowItem icon="badge-account-horizontal-outline" label="ABHA / ID Details" onPress={() => {}} />
      </SectionCard>

      {/* Health Features */}
      <SectionCard title="Health & Records">
        <RowItem icon="folder" label="My Records" onPress={() => navigation.navigate('Records')} />
        <RowItem icon="heart-pulse" label="Health Tips" onPress={() => navigation.navigate('HealthTips')} />
        <RowItem icon="microphone-outline" label="Voice Assistant" onPress={() => navigation.navigate('VoiceAssistant')} />
      </SectionCard>

      {/* Reminders & Notifications */}
      <SectionCard title="Reminders & Alerts">
        <RowItem icon="alarm" label="Reminders" onPress={() => navigation.navigate('Reminders')} />
        <RowItem icon="bell-badge-outline" label="Notifications" onPress={() => {}} />
      </SectionCard>

      {/* App Settings */}
      <SectionCard title="App Settings">
        <RowItem icon="translate" label="Language" onPress={() => navigation.navigate('Language')} />
        <RowItem icon="theme-light-dark" label="Appearance" onPress={() => {}} />
        <RowItem icon="shield-lock-outline" label="Privacy & Security" onPress={() => {}} />
        <RowItem icon="file-document-alert-outline" label="Terms & Policies" onPress={() => {}} />
      </SectionCard>

      <Text style={styles.footerNote}>Version 0.1.0 • Placeholder content</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 140, backgroundColor: '#F2F5F7' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  avatar: { backgroundColor: '#0A2540' },
  profileName: { fontSize: 22, fontWeight: '700', color: '#0A2540' },
  profileMeta: { marginTop: 4, color: '#64748B' },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, paddingVertical: 4, marginBottom: 28, borderWidth: 1, borderColor: '#E2E8F0' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#0A2540', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 6 },
  sectionInner: { marginTop: 4 },
  rowRipple: { },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, gap: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rowLabel: { flex: 1, fontSize: 16, color: '#0A2540' },
  footerNote: { textAlign: 'center', marginTop: 12, color: '#94A3B8', fontSize: 12 }
});
