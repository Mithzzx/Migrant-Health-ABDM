import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Surface, Icon, Avatar, Button } from 'react-native-paper';
import { useI18n } from '../../i18n/i18n';

export default function MedicinesScreen() {
  const { t } = useI18n();
  const today = new Date();
  const [taken, setTaken] = useState({}); // key: hour index -> boolean

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i); // week starting Sunday
    return {
      key: i,
      label: d.toLocaleDateString(undefined, { weekday: 'short' }).charAt(0),
      date: d.getDate(),
      isToday: d.toDateString() === today.toDateString()
    };
  });

  const goals = [
    { key: 'P', label: 'P', total: 109, current: 0 },
    { key: 'F', label: 'F', total: 93, current: 0 },
    { key: 'C', label: 'C', total: 381, current: 0 },
  ];

  const hours = [7,8,9,10,11,12,13,14,15,16,17];

  function toggleHour(h) {
    setTaken(prev => ({ ...prev, [h]: !prev[h] }));
  }

  function HourRow({ hour }) {
    const display = (hour <= 12 ? hour : hour - 12) + (hour < 12 ? ' AM' : ' PM');
    const isTaken = !!taken[hour];
    return (
      <View style={styles.hourRow}>
        <View style={[styles.timePill, isTaken && styles.timePillActive]}>
          <Text style={[styles.timePillText, isTaken && styles.timePillTextActive]}>{display}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => toggleHour(hour)} accessibilityLabel={`Add medicine at ${display}`}>
          <Icon source={isTaken ? 'check' : 'plus'} size={18} color={isTaken ? '#0A2540' : '#111827'} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>      
      <ScrollView contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic" automaticallyAdjustContentInsets>
        <View style={{ height: 4 }} />
        {/* Week strip */}
        <View style={styles.weekRow}>
          {weekDays.map(d => (
            <View key={d.key} style={[styles.dayItem, d.isToday && styles.dayToday]}>              
              <Text style={[styles.dayDow, d.isToday && styles.dayDowToday]}>{d.label}</Text>
              <Text style={[styles.dayDate, d.isToday && styles.dayDateToday]}>{d.date}</Text>
            </View>
          ))}
        </View>
        {/* Goals / progress (placeholder macros -> could adapt to adherence) */}
        <View style={styles.goalRow}>          
          {goals.map(g => (
            <View key={g.key} style={styles.goalItem}>
              <Text style={styles.goalLabel}>{g.label} {g.current} / {g.total}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${(g.current / g.total) * 100}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {hours.map(h => <HourRow key={h} hour={h} />)}
        </View>

        <View style={{ height: 140 }} />
      </ScrollView>
      {/* Bottom Add/Search bar */}
      <View style={styles.bottomBar}>        
        <View style={styles.searchBox}>
          <Icon source="magnify" size={20} color="#0A2540" />
          <Text style={styles.searchPlaceholder}>Search medicines</Text>
          <Icon source="barcode-scan" size={20} color="#0A2540" />
        </View>
        <Pressable style={styles.fab} onPress={() => {}} accessibilityLabel="Add medicine">
          <Icon source="plus" size={28} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 16 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  dayItem: { width: 44, height: 70, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F6F7' },
  dayToday: { backgroundColor: '#E5E7EB' },
  dayDow: { fontSize: 12, color: '#4B5563' },
  dayDowToday: { fontWeight: '600', color: '#0A2540' },
  dayDate: { fontSize: 18, fontWeight: '600', color: '#0A2540', marginTop: 2 },
  dayDateToday: { color: '#0A2540' },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  goalItem: { flex: 1, marginHorizontal: 4 },
  goalLabel: { fontSize: 12, color: '#0A2540', marginBottom: 4 },
  progressTrack: { height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: '#0A2540' },
  timeline: { marginTop: 20 },
  hourRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  timePill: { minWidth: 72, paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#F3F4F6', borderRadius: 24, alignItems: 'center' },
  timePillActive: { backgroundColor: '#0A2540' },
  timePillText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  timePillTextActive: { color: '#FFFFFF' },
  addButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginLeft: 16 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEEEEE', paddingHorizontal: 14, height: 52, borderRadius: 30, gap: 12 },
  searchPlaceholder: { flex: 1, color: '#374151' },
  fab: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#0A2540', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
});
