import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

// A compact custom large-title header (fallback if native large titles unavailable)
// Props: title (string), children (scrollable content), right (ReactNode)
export function CompactLargeHeader({ title, children, right }) {
	const insets = useSafeAreaInsets();
	const scrollY = useRef(new Animated.Value(0)).current;

	const COLLAPSE = 56; // distance to collapse

	const headerTranslate = scrollY.interpolate({
		inputRange: [0, COLLAPSE],
		outputRange: [0, -COLLAPSE],
		extrapolate: 'clamp'
	});

	const largeOpacity = scrollY.interpolate({
		inputRange: [0, COLLAPSE * 0.5, COLLAPSE],
		outputRange: [1, 0.15, 0],
		extrapolate: 'clamp'
	});

	const inlineOpacity = scrollY.interpolate({
		inputRange: [0, COLLAPSE * 0.65, COLLAPSE],
		outputRange: [0, 0, 1],
		extrapolate: 'clamp'
	});

	return (
		<View style={styles.root}>
			<Animated.View style={[styles.header, { paddingTop: insets.top, transform: [{ translateY: headerTranslate }] }]}>        
				<Animated.Text accessibilityRole="header" style={[styles.largeTitle, { opacity: largeOpacity }]}> { /* ensure inside Text */ }
					{title}
				</Animated.Text>
				<Animated.View style={[styles.inlineWrapper, { opacity: inlineOpacity }]}>          
					<Text style={styles.inlineTitle}>{title}</Text>
				</Animated.View>
				{right && <View style={styles.right}>{right}</View>}
			</Animated.View>
			<Animated.ScrollView
				contentContainerStyle={{ paddingTop: 112 + insets.top, paddingBottom: 32 + insets.bottom, paddingHorizontal: 16 }}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true }
				)}
				contentInsetAdjustmentBehavior="never"
			>
				{children}
			</Animated.ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, backgroundColor: '#F2F5F7' },
	header: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 20,
		height: 112, // includes space for large title
		justifyContent: 'flex-end',
		borderBottomWidth: 1,
		borderBottomColor: '#E2E8F0'
	},
	largeTitle: { fontSize: 30, fontWeight: '700', color: '#0A2540' },
	inlineWrapper: { position: 'absolute', bottom: 12, left: 20, right: 20, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start' },
	inlineTitle: { fontSize: 18, fontWeight: '600', color: '#0A2540' },
	right: { position: 'absolute', bottom: 8, right: 12 },
});

export default CompactLargeHeader;
