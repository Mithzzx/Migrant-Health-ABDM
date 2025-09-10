import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text, Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useI18n } from '../../i18n/i18n';

export default function MedicinesScreen() {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [weekOffset, setWeekOffset] = useState(0);
  const base = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);
  const today = new Date();
  const [taken, setTaken] = useState({
    'osemiprazol-7': true,
    'indever-10': false,
    'rocal-15': false,
    'osemiprazol-17': false,
  });

  // Mock medicine data matching the detailed design specification
  const medicineSchedule = [
    {
      id: 'osemiprazol-7',
      time: '7:00AM',
      name: 'Osemiprazol',
      dosage: '1 pill (40mg)',
      stock: '19',
      type: 'medicine',
      backgroundColor: '#F3E8FF', // Light purple
      iconColor: '#8B5CF6', // Purple
      icon: 'pill'
    },
    {
      id: 'breakfast',
      time: '8:00AM',
      name: 'Breakfast',
      type: 'meal',
      backgroundColor: '#ECFDF5', // Light green
      iconColor: '#10B981', // Green
      icon: 'silverware-fork-knife'
    },
    {
      id: 'indever-10',
      time: '10:30AM',
      name: 'Indever',
      dosage: '0.5 tablet (40mg)',
      stock: '10.5',
      type: 'medicine',
      backgroundColor: '#EFF6FF', // Light blue
      iconColor: '#3B82F6', // Blue
      icon: 'pill'
    },
    {
      id: 'lunch',
      time: '12:00PM',
      name: 'Lunch',
      type: 'meal',
      backgroundColor: '#ECFDF5', // Light green
      iconColor: '#10B981', // Green
      icon: 'silverware-fork-knife'
    },
    {
      id: 'insuline',
      time: '1:00PM',
      name: 'Insuline',
      dosage: '1 injection (8ml)',
      stock: '7',
      type: 'injection',
      backgroundColor: '#FFFBEB', // Light orange
      iconColor: '#F59E0B', // Orange
      icon: 'needle'
    },
    {
      id: 'rocal-15',
      time: '3:00PM',
      name: 'Rocal D',
      dosage: '1 tablet (200mg)',
      stock: '11',
      type: 'medicine',
      backgroundColor: '#FDF2F8', // Light pink
      iconColor: '#EC4899', // Pink
      icon: 'pill'
    },
    {
      id: 'osemiprazol-17',
      time: '5:00PM',
      name: 'Osemiprazol',
      dosage: '1 pill (40mg)',
      stock: '19',
      type: 'medicine',
      backgroundColor: '#F3E8FF', // Light purple
      iconColor: '#8B5CF6', // Purple
      icon: 'pill'
    }
  ];

  const weekDays = useMemo(() => Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() - d.getDay() + i);
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

  const toggleMedicine = useCallback((id) => {
    setTaken(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const MedicineTimelineItem = ({ item, isLast }) => {
    const isTaken = taken[item.id];
    const isMedicine = item.type === 'medicine' || item.type === 'injection';
    const isMeal = item.type === 'meal';
    
    return (
      <View style={styles.timelineContainer}>
        <View style={styles.timelineLeft}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        
        <View style={styles.timelineCenter}>
          <View style={[styles.timelineDot, isTaken && styles.timelineDotTaken]} />
          {!isLast && <View style={styles.timelineLine} />}
        </View>
        
        <View style={styles.timelineRight}>
          {isMeal ? (
            // Indicator Card for Meals (Non-actionable)
            <View style={[styles.indicatorCard, { backgroundColor: item.backgroundColor }]}>
              <View style={styles.indicatorContent}>
                <View style={[styles.indicatorIcon, { backgroundColor: item.iconColor + '20' }]}>
                  <Icon source={item.icon} size={14} color={item.iconColor} />
                </View>
                <Text style={styles.indicatorName}>{item.name}</Text>
              </View>
            </View>
          ) : (
            // Medicine Card (Actionable)
            <View style={[styles.medicineCard, { backgroundColor: item.backgroundColor }]}>
              <View style={styles.medicineContent}>
                {/* Left Section - Icon */}
                <View style={[styles.medicineIcon, { backgroundColor: item.iconColor + '20' }]}>
                  <Icon source={item.icon} size={18} color={item.iconColor} />
                </View>
                
                {/* Middle Section - Medicine Info */}
                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>{item.name}</Text>
                  {item.dosage && <Text style={styles.medicineDosage}>{item.dosage}</Text>}
                </View>
                
                {/* Right Section - Stock & Action */}
                <View style={styles.medicineActions}>
                  {item.stock && (
                    <View style={styles.stockBadge}>
                      <Text style={styles.stockCount}>{item.stock}</Text>
                    </View>
                  )}
                  <Pressable
                    style={[styles.checkButton, isTaken && styles.checkButtonTaken]}
                    onPress={() => toggleMedicine(item.id)}
                    accessibilityLabel={`${isTaken ? 'Mark as not taken' : 'Mark as taken'} ${item.name}`}
                  >
                    <Icon 
                      source={isTaken ? "check" : "plus"} 
                      size={16} 
                      color={isTaken ? "#FFFFFF" : "#43A047"} 
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with date navigation */}
      <View style={styles.stripContainer}>        
        <View style={styles.combinedHeaderRow}>
          <Pressable onPress={() => setWeekOffset(o => o - 1)} style={styles.navArrow}>
            <Icon source="chevron-left" size={26} />
          </Pressable>
          <Text style={styles.headerTitle}>{headerTitleText}</Text>
          <Pressable onPress={() => setWeekOffset(o => o + 1)} style={styles.navArrow}>
            <Icon source="chevron-right" size={26} />
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekStrip}>
          {weekDays.map(d => {
            const selected = d.key === selectedIndex;
            return (
              <Pressable key={d.key} onPress={() => setSelectedIndex(d.key)} style={[styles.dayChip, selected && styles.dayChipSelected]}>
                <Text style={[styles.dayChipDow, selected && styles.dayChipDowSel]}>{d.label}</Text>
                <Text style={[styles.dayChipDate, selected && styles.dayChipDateSel]}>{d.date}</Text>
                {d.isToday && <View style={styles.todayDot} />}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Medicine Timeline */}
      <ScrollView style={styles.bodyScrollWrapper} contentContainerStyle={styles.bodyScroll}>
        <View style={styles.timelineWrapper}>
          {medicineSchedule.map((item, index) => (
            <MedicineTimelineItem 
              key={item.id} 
              item={item} 
              isLast={index === medicineSchedule.length - 1}
            />
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <Pressable style={styles.fab} accessibilityLabel="Add new medicine">
          <Icon source="plus" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  stripContainer: { 
    paddingTop: 4, 
    backgroundColor: '#FFFFFF', 
    borderBottomWidth: 1, 
    borderBottomColor: '#F5F6F7', 
    shadowColor: '#000', 
    shadowOpacity: 0.03, 
    shadowRadius: 3, 
    shadowOffset: { width: 0, height: 1 }, 
    elevation: 1 
  },
  combinedHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 12, 
    marginBottom: 0, 
    paddingBottom: 2 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#0A2540' 
  },
  navArrow: { 
    padding: 4, 
    borderRadius: 22 
  },
  weekStrip: { 
    paddingHorizontal: 8, 
    paddingBottom: 4 
  },
  dayChip: { 
    width: 54, 
    height: 72, 
    borderRadius: 28, 
    backgroundColor: '#F5F6F7', 
    marginHorizontal: 4, 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'relative' 
  },
  dayChipSelected: { 
    backgroundColor: '#0A2540' 
  },
  dayChipDow: { 
    fontSize: 12, 
    color: '#4B5563' 
  },
  dayChipDowSel: { 
    color: '#FFFFFF', 
    fontWeight: '600' 
  },
  dayChipDate: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#0A2540', 
    marginTop: 2 
  },
  dayChipDateSel: { 
    color: '#FFFFFF' 
  },
  todayDot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#43A047', 
    position: 'absolute', 
    bottom: 10 
  },
  bodyScrollWrapper: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  bodyScroll: { 
    paddingHorizontal: 0,
    paddingTop: 16
  },
  timelineWrapper: {
    flex: 1
  },
  timelineContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    minHeight: 80
  },
  timelineLeft: {
    width: 80,
    paddingTop: 8
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center'
  },
  timelineCenter: {
    width: 20,
    alignItems: 'center',
    marginHorizontal: 8
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginTop: 12
  },
  timelineDotTaken: {
    backgroundColor: '#43A047',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4
  },
  timelineRight: {
    flex: 1
  },
  // Medicine Card Styles (Actionable)
  medicineCard: {
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
    elevation: 5,
  },
  medicineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medicineIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  medicineDosage: {
    fontSize: 14,
    color: '#6B7280',
  },
  medicineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stockBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#43A047',
  },
  checkButtonTaken: {
    backgroundColor: '#43A047',
    borderColor: '#43A047',
  },
  // Indicator Card Styles (Non-actionable)
  indicatorCard: {
    width: 120,
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    opacity: 1,
  },
  indicatorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  indicatorName: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  // Floating Action Button
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
