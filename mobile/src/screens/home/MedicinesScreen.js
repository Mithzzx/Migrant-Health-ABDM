import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../../i18n/i18n';
// Removed external timeline dependency; using custom implementation

export default function MedicinesScreen() {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const base = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);
  const today = new Date();
  const [taken, setTaken] = useState({}); // key: hour index -> boolean

  const weekDays = useMemo(() => Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - d.getDay() + i); // start Sunday
    return {
      key: i,
      label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0,1),
      date: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
      isSelected: false,
      dateObj: d
    };
  }), [base, today]);
  const [selectedIndex, setSelectedIndex] = useState(weekDays.find(d=>d.isToday)?.key || 0);

  const selectedDay = weekDays[selectedIndex];
  function formatHeaderDate(d) {
    if (!d) return '';
    const dayDiff = Math.floor((d.dateObj.setHours(0,0,0,0) - today.setHours(0,0,0,0)) / 86400000);
    if (dayDiff === 0) return t('today');
    if (dayDiff === 1) return t('tomorrow');
    if (dayDiff === -1) return t('yesterday');
    return d.dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }
  const headerTitleText = formatHeaderDate(selectedDay);

  const hours = [7,8,9,10,11,12,13,14,15,16,17];

  const toggleHour = useCallback((h) => {
    setTaken(prev => ({ ...prev, [h]: !prev[h] }));
  }, []);

  const HourRow = ({ hour }) => {
    const labelHour = (hour <= 12 ? hour : hour - 12);
    const ampm = hour < 12 ? t('am') : t('pm');
    const display = `${labelHour} ${ampm}`;
    const isTaken = !!taken[hour];
    return (
      <View style={styles.hourRow}>
        <View style={[styles.timePill, isTaken && styles.timePillActive]}>
          <Text style={[styles.timePillText, isTaken && styles.timePillTextActive]}>{display}</Text>
        </View>
        <Pressable
          style={[styles.timeActionBtn, isTaken && styles.timeActionBtnActive]}
          onPress={() => toggleHour(hour)}
          accessibilityLabel={`${isTaken ? t('taken') : t('addMedicine')} ${display}`}
        >
          <Icon source={isTaken ? 'check' : 'plus'} size={18} color={isTaken ? '#FFFFFF' : '#0A2540'} />
          <Text style={[styles.timeActionText, isTaken && styles.timeActionTextActive]}>{isTaken ? t('taken') : t('addMedicine')}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Combined strip with navigation */}
  <View style={styles.stripContainer}>        
        <View style={styles.combinedHeaderRow}>
          <Pressable onPress={() => setWeekOffset(o => o - 1)} style={styles.navArrow} accessibilityLabel={t('previousWeek')}><Icon source="chevron-left" size={26} /></Pressable>
          <Text style={styles.headerTitle}>{headerTitleText}</Text>
          <Pressable onPress={() => setWeekOffset(o => o + 1)} style={styles.navArrow} accessibilityLabel={t('nextWeek')}><Icon source="chevron-right" size={26} /></Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekStrip}>
          {weekDays.map(d => {
            const selected = d.key === selectedIndex;
            return (
              <Pressable key={d.key} onPress={() => setSelectedIndex(d.key)} style={[styles.dayChip, selected && styles.dayChipSelected]} accessibilityLabel={`Select ${d.date} ${d.label}`}>
                <Text style={[styles.dayChipDow, selected && styles.dayChipDowSel]}>{d.label}</Text>
                <Text style={[styles.dayChipDate, selected && styles.dayChipDateSel]}>{d.date}</Text>
                {d.isToday && <View style={styles.todayDot} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
  <ScrollView style={styles.bodyScrollWrapper} contentContainerStyle={styles.bodyScroll} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
        <View style={{ height: 4 }} />
        <View style={styles.timelineList}>{hours.map(h => <HourRow key={h} hour={h} />)}</View>
        <View style={{ height: 160 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5F7' },
  stripContainer: { paddingTop: 4, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F5F6F7', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 1 },
  combinedHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 0, paddingBottom: 2 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#0A2540' },
  navArrow: { padding: 4, borderRadius: 22 },
  weekStrip: { paddingHorizontal: 8, paddingBottom: 4 },
  dayChip: { width: 46, height: 68, borderRadius: 28, backgroundColor: '#F5F6F7', marginHorizontal: 4, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dayChipSelected: { backgroundColor: '#0A2540' },
  dayChipDow: { fontSize: 12, color: '#4B5563' },
  dayChipDowSel: { color: '#FFFFFF', fontWeight: '600' },
  dayChipDate: { fontSize: 18, fontWeight: '600', color: '#0A2540', marginTop: 2 },
  dayChipDateSel: { color: '#FFFFFF' },
  todayDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#43A047', position: 'absolute', bottom: 10 },
  bodyScrollWrapper: { flex: 1, backgroundColor: '#F2F5F7' },
  bodyScroll: { paddingHorizontal: 16 },
  timelineList: { marginTop: 8 },
  hourRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  timePill: { minWidth: 78, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#E2E8F0', borderRadius: 24, alignItems: 'center' },
  timePillActive: { backgroundColor: '#0A2540' },
  timePillText: { fontSize: 14, fontWeight: '600', color: '#0A2540' },
  timePillTextActive: { color: '#FFFFFF' },
  timeActionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#CBD5E1', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 22, marginLeft: 14 },
  timeActionBtnActive: { backgroundColor: '#0A2540' },
  timeActionText: { marginLeft: 6, fontSize: 13, fontWeight: '600', color: '#0A2540' },
  timeActionTextActive: { color: '#FFFFFF' },
  // removed FAB styles
});
