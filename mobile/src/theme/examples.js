/**
 * @fileoverview Theme Implementation Examples for Developers
 * @description Practical code examples for implementing the Migrant Health ABDM theme system
 * @author Migrant Health ABDM Development Team
 */

// =============================================================================
// THEME TOKENS USAGE EXAMPLES
// =============================================================================

// 1. IMPORTING DESIGN TOKENS
import { colors, spacing, radii, shadows } from '../theme/tokens';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// 2. BASIC COMPONENT WITH THEME TOKENS
export const HealthCard = ({ title, description, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={[styles.statusBadge, getStatusStyle(status)]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,           // ✅ White surface
    borderRadius: radii.md,                   // ✅ 12px radius
    borderWidth: 1,
    borderColor: colors.border,               // ✅ Light gray border
    padding: spacing(4),                      // ✅ 16px padding
    marginBottom: spacing(3),                 // ✅ 12px margin
    marginHorizontal: spacing(4),             // ✅ 16px horizontal margin
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),                 // ✅ 8px spacing
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,                       // ✅ Dark blue text
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.muted,                      // ✅ Muted gray text
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: spacing(2),            // ✅ 8px horizontal padding
    paddingVertical: spacing(1),              // ✅ 4px vertical padding
    borderRadius: radii.sm,                   // ✅ 6px radius
    marginLeft: spacing(2),                   // ✅ 8px left margin
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.surface,                    // ✅ White text on colored background
  },
});

// 3. STATUS COLOR HELPER FUNCTION
const getStatusStyle = (status) => {
  const statusColors = {
    'Active': { backgroundColor: colors.primary },      // Green
    'Completed': { backgroundColor: '#10B981' },        // Success green
    'Pending': { backgroundColor: '#F59E0B' },          // Warning amber
    'Expired': { backgroundColor: '#DC2626' },          // Error red
    'Draft': { backgroundColor: colors.muted },         // Muted gray
  };
  return statusColors[status] || { backgroundColor: colors.muted };
};

// =============================================================================
// BUTTON COMPONENT EXAMPLES
// =============================================================================

// 4. PRIMARY BUTTON COMPONENT
export const PrimaryButton = ({ title, onPress, disabled = false, fullWidth = true }) => {
  return (
    <TouchableOpacity
      style={[
        styles.primaryButton,
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.primaryButtonText, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,              // ✅ Green primary
    borderRadius: radii.md,                      // ✅ 12px radius
    paddingVertical: spacing(3),                 // ✅ 12px vertical padding
    paddingHorizontal: spacing(6),               // ✅ 24px horizontal padding
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,                              // Minimum touch target
  },
  fullWidth: {
    alignSelf: 'stretch',                       // Full width
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',                 // Gray when disabled
    opacity: 0.6,
  },
  primaryButtonText: {
    color: colors.surface,                      // ✅ White text
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledText: {
    color: '#6B7280',                          // Muted text when disabled
  },
});

// 5. SECONDARY BUTTON COMPONENT
export const SecondaryButton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, disabled && styles.disabledSecondaryButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.secondaryButtonText, disabled && styles.disabledSecondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const secondaryButtonStyles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,                // ✅ Green border
    borderRadius: radii.md,                     // ✅ 12px radius
    paddingVertical: spacing(3),                // ✅ 12px vertical padding
    paddingHorizontal: spacing(6),              // ✅ 24px horizontal padding
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabledSecondaryButton: {
    borderColor: '#9CA3AF',                     // Gray border when disabled
    opacity: 0.6,
  },
  secondaryButtonText: {
    color: colors.primary,                      // ✅ Green text
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledSecondaryText: {
    color: '#9CA3AF',                          // Gray text when disabled
  },
});

// =============================================================================
// SCREEN LAYOUT EXAMPLES
// =============================================================================

// 6. SCREEN CONTAINER WITH PROPER THEMING
export const HealthScreen = ({ children, showHeader = true, title }) => {
  return (
    <View style={styles.screenContainer}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,         // ✅ Light gray background
  },
  header: {
    backgroundColor: colors.surface,            // ✅ White header
    paddingHorizontal: spacing(4),             // ✅ 16px horizontal padding
    paddingVertical: spacing(3),               // ✅ 12px vertical padding
    borderBottomWidth: 1,
    borderBottomColor: colors.border,           // ✅ Light border
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,                        // ✅ Dark blue text
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: spacing(4),                       // ✅ 16px padding
  },
});

// =============================================================================
// LIST COMPONENT EXAMPLES
// =============================================================================

// 7. THEMED LIST ITEM
export const HealthRecordItem = ({ record, onPress }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.listItemContent}>
        <View style={styles.listItemHeader}>
          <Text style={styles.listItemTitle} numberOfLines={1}>
            {record.title}
          </Text>
          <Text style={styles.listItemDate}>{record.date}</Text>
        </View>
        <Text style={styles.listItemDescription} numberOfLines={2}>
          {record.description}
        </Text>
        <View style={styles.listItemFooter}>
          <Text style={styles.listItemHospital}>{record.hospital}</Text>
          <View style={[styles.listItemStatus, getStatusStyle(record.status)]}>
            <Text style={styles.listItemStatusText}>{record.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const listStyles = StyleSheet.create({
  listItem: {
    backgroundColor: colors.surface,            // ✅ White background
    borderRadius: radii.md,                    // ✅ 12px radius
    borderWidth: 1,
    borderColor: colors.border,                // ✅ Light border
    marginBottom: spacing(3),                  // ✅ 12px bottom margin
    padding: spacing(4),                       // ✅ 16px padding
  },
  listItemContent: {
    flex: 1,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing(2),                  // ✅ 8px spacing
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,                        // ✅ Dark text
    flex: 1,
    marginRight: spacing(2),                   // ✅ 8px margin
  },
  listItemDate: {
    fontSize: 12,
    color: colors.muted,                       // ✅ Muted text
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
    color: colors.muted,                       // ✅ Muted text
    lineHeight: 20,
    marginBottom: spacing(3),                  // ✅ 12px spacing
  },
  listItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemHospital: {
    fontSize: 12,
    color: colors.muted,                       // ✅ Muted text
    flex: 1,
    marginRight: spacing(2),                   // ✅ 8px margin
  },
  listItemStatus: {
    paddingHorizontal: spacing(2),             // ✅ 8px horizontal padding
    paddingVertical: spacing(1),               // ✅ 4px vertical padding
    borderRadius: radii.sm,                    // ✅ 6px radius
  },
  listItemStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.surface,                     // ✅ White text
    textTransform: 'uppercase',
  },
});

// =============================================================================
// INPUT COMPONENT EXAMPLES
// =============================================================================

// 8. THEMED TEXT INPUT
export const HealthTextInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  error = false,
  helperText 
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <TextInput
        style={[styles.textInput, error && styles.textInputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}     // ✅ Muted placeholder
      />
      {helperText && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: spacing(4),                  // ✅ 16px bottom margin
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,                        // ✅ Dark text
    marginBottom: spacing(2),                  // ✅ 8px spacing
  },
  textInput: {
    backgroundColor: colors.surface,           // ✅ White background
    borderWidth: 1,
    borderColor: colors.border,                // ✅ Light border
    borderRadius: radii.md,                    // ✅ 12px radius
    paddingHorizontal: spacing(4),             // ✅ 16px horizontal padding
    paddingVertical: spacing(3),               // ✅ 12px vertical padding
    fontSize: 16,
    color: colors.text,                        // ✅ Dark text
    minHeight: 48,                            // Minimum touch target
  },
  textInputError: {
    borderColor: '#DC2626',                   // Red border for errors
    borderWidth: 2,
  },
  helperText: {
    fontSize: 12,
    color: colors.muted,                       // ✅ Muted text
    marginTop: spacing(1),                     // ✅ 4px top margin
  },
  errorText: {
    color: '#DC2626',                         // Red text for errors
  },
});

// =============================================================================
// ICON USAGE EXAMPLES
// =============================================================================

// 9. THEMED ICON COLORS
const iconColors = {
  primary: colors.primary,                     // ✅ Green for active states
  secondary: '#6B7280',                       // Gray for inactive states
  disabled: '#9CA3AF',                        // Light gray for disabled
  error: '#DC2626',                           // Red for errors
  success: '#10B981',                         // Green for success
  warning: '#F59E0B',                         // Amber for warnings
};

// Usage in components:
// <Icon source="heart" size={24} color={iconColors.primary} />
// <Icon source="alert-circle" size={20} color={iconColors.error} />

// =============================================================================
// COMMON HELPER FUNCTIONS
// =============================================================================

// 10. RESPONSIVE SPACING HELPER
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

export const responsiveSpacing = (phoneValue, tabletValue) => {
  return isTablet ? spacing(tabletValue) : spacing(phoneValue);
};

// Usage:
// marginHorizontal: responsiveSpacing(4, 6), // 16px on phone, 24px on tablet

// 11. DARK MODE SUPPORT (Future-proofing)
const isDarkMode = false; // This would come from a theme context

export const adaptiveColors = {
  background: isDarkMode ? '#1F2937' : colors.background,
  surface: isDarkMode ? '#374151' : colors.surface,
  text: isDarkMode ? '#F9FAFB' : colors.text,
  border: isDarkMode ? '#4B5563' : colors.border,
};

// =============================================================================
// ANIMATION EXAMPLES WITH THEME
// =============================================================================

// 12. THEMED ANIMATIONS
import { Animated } from 'react-native';

export const FadeInCard = ({ children, delay = 0 }) => {
  const fadeAnim = new Animated.Value(0);
  const translateY = new Animated.Value(20);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.animatedCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const animationStyles = StyleSheet.create({
  animatedCard: {
    backgroundColor: colors.surface,           // ✅ Themed background
    borderRadius: radii.md,                   // ✅ Themed radius
    borderWidth: 1,
    borderColor: colors.border,               // ✅ Themed border
    padding: spacing(4),                      // ✅ Themed spacing
  },
});

// =============================================================================
// ACCESSIBILITY HELPERS
// =============================================================================

// 13. ACCESSIBILITY WITH THEME
export const AccessibleButton = ({ title, onPress, accessibilityHint }) => {
  return (
    <TouchableOpacity
      style={styles.accessibleButton}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: false }}
    >
      <Text style={styles.accessibleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const accessibilityStyles = StyleSheet.create({
  accessibleButton: {
    backgroundColor: colors.primary,           // ✅ High contrast background
    borderRadius: radii.md,                   // ✅ Themed radius
    padding: spacing(4),                      // ✅ Adequate touch target
    minHeight: 48,                           // Minimum 48px for accessibility
    minWidth: 48,                            // Minimum 48px for accessibility
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessibleButtonText: {
    color: colors.surface,                    // ✅ High contrast text
    fontSize: 16,                            // ✅ Readable font size
    fontWeight: '600',
  },
});

// =============================================================================
// TESTING HELPERS
// =============================================================================

// 14. THEME TESTING UTILITIES
export const themeTestUtils = {
  // Test if a color has sufficient contrast
  hasGoodContrast: (foreground, background) => {
    // Implementation would calculate contrast ratio
    // Return true if ratio >= 4.5:1 for normal text
    // Return true if ratio >= 3:1 for large text
  },
  
  // Test if spacing follows 4pt grid
  isValidSpacing: (value) => {
    return value % 4 === 0;
  },
  
  // Test if border radius is from design system
  isValidRadius: (value) => {
    const validRadii = [radii.sm, radii.md, radii.lg, radii.pill];
    return validRadii.includes(value);
  },
};

// =============================================================================
// EXPORT ALL STYLES FOR REUSE
// =============================================================================

export {
  styles,
  buttonStyles,
  secondaryButtonStyles,
  screenStyles,
  listStyles,
  inputStyles,
  animationStyles,
  accessibilityStyles,
  iconColors,
  getStatusStyle,
  responsiveSpacing,
  adaptiveColors,
};

/**
 * @example
 * // Import and use in your components:
 * import { styles, iconColors, responsiveSpacing } from './theme-examples';
 * 
 * // Use predefined styles:
 * <View style={styles.card}>
 *   <Text style={styles.cardTitle}>Title</Text>
 * </View>
 * 
 * // Use helper functions:
 * <Icon color={iconColors.primary} />
 * <View style={{ margin: responsiveSpacing(2, 4) }} />
 */