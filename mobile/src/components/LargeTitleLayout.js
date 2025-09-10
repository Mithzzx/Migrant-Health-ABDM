import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Platform, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Collapsing large title similar to iOS UINavigationBar large titles
// Props: title (string), children (scrollable content optional), scrollEventThrottle
export function LargeTitleLayout({ title, children }) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const LARGE_HEIGHT = 96; // area including large title
  const COLLAPSE_DISTANCE = 48; // amount of scroll to collapse

  const translateY = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE],
    outputRange: [0, -COLLAPSE_DISTANCE],
    extrapolate: 'clamp'
  });

  const largeOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE * 0.5, COLLAPSE_DISTANCE],
    outputRange: [1, 0.25, 0],
    extrapolate: 'clamp'
  });

  const inlineOpacity = scrollY.interpolate({
    inputRange: [0, COLLAPSE_DISTANCE * 0.6, COLLAPSE_DISTANCE * 0.9],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  return (
    <View style={styles.root}>
      {/* Header container */}
      <Animated.View style={[styles.headerContainer, { paddingTop: insets.top, transform: [{ translateY }] }]}>        
        <Animated.Text
          style={[styles.largeTitle, { opacity: largeOpacity }]}
          accessibilityRole="header"
        >
          {title}
        </Animated.Text>
        <Animated.View style={[styles.inlineContainer, Platform.OS === 'ios' ? { left: 0, right: 0, alignItems: 'center' } : null, { opacity: inlineOpacity }]}>          
          <Text variant="titleMedium" style={[styles.inlineTitle, Platform.OS === 'ios' ? { textAlign: 'center' } : null]}>{title}</Text>
        </Animated.View>
      </Animated.View>

      {/* Scroll content */}
      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: LARGE_HEIGHT + insets.top, paddingBottom: 32 + insets.bottom }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.innerContent}>
          {children}
        </View>
      </Animated.ScrollView>
      <View style={[styles.bottomSpacer, { height: insets.bottom }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F5F7' },
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 20,
    height: 96 + 0, // updated with insets via paddingTop
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  largeTitle: { fontSize: 32, fontWeight: '700', color: '#0A2540', letterSpacing: 0.25 },
  inlineContainer: { position: 'absolute', left: 20, bottom: 12 },
  inlineTitle: { color: '#0A2540', fontWeight: '600' },
  scroll: { flex: 1 },
  innerContent: { paddingHorizontal: 16 },
  bottomSpacer: { backgroundColor: 'transparent' }
});
