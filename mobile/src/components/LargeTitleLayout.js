import React, { useRef, useState, useCallback } from 'react';
import { Animated, StyleSheet, View, Platform, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Collapsing large title similar to iOS UINavigationBar large titles
// Props: title (string), children (scrollable content optional), scrollEventThrottle
export function LargeTitleLayout({ title, children }) {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  const [measuredTitleH, setMeasuredTitleH] = useState(34); // fallback approx
  const HEADER_EXTRA_BOTTOM = 12; // space below large title before collapse area end
  const HEADER_TOP_PADDING_EXTRA = 4; // small breathing room below status bar
  const headerHeight = insets.top + HEADER_TOP_PADDING_EXTRA + measuredTitleH + HEADER_EXTRA_BOTTOM;
  const COLLAPSE_DISTANCE = Math.min(48, measuredTitleH + 8); // adapt to title size

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

  const onTitleLayout = useCallback((e) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && Math.abs(h - measuredTitleH) > 1) {
      setMeasuredTitleH(h);
    }
  }, [measuredTitleH]);

  return (
    <View style={styles.root}>
      {/* Header container */}
      <Animated.View style={[styles.headerContainer, { paddingTop: insets.top + HEADER_TOP_PADDING_EXTRA, height: headerHeight, transform: [{ translateY }] }]}>        
        <Animated.Text
          onLayout={onTitleLayout}
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
        contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: 32 + insets.bottom }}
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
  // dynamic height supplied inline
  justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1
  },
  largeTitle: { fontSize: 32, fontWeight: '700', color: '#0A2540', letterSpacing: 0.25, lineHeight: 38 },
  inlineContainer: { position: 'absolute', left: 20, bottom: 12 },
  inlineTitle: { color: '#0A2540', fontWeight: '600' },
  scroll: { flex: 1 },
  innerContent: { paddingHorizontal: 16 },
  bottomSpacer: { backgroundColor: 'transparent' }
});
