# 🎨 Migrant Health ABDM - Theme & Design System Guide

> **For Fellow Developers**: Complete guide to the theme architecture, design tokens, and styling patterns used across the Migrant Health ABDM application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Mobile Theme Architecture](#mobile-theme-architecture)
3. [Web Theme Architecture](#web-theme-architecture)
4. [Color System](#color-system)
5. [Typography Scale](#typography-scale)
6. [Spacing & Layout](#spacing--layout)
7. [Component Patterns](#component-patterns)
8. [Implementation Guidelines](#implementation-guidelines)
9. [Best Practices](#best-practices)
10. [Cross-Platform Consistency](#cross-platform-consistency)

---

## 🌟 Overview

The Migrant Health ABDM app uses a **healthcare-focused design system** with:

- **Primary Brand**: Healthcare green (`#43A047`) for trust and wellness
- **Clean Medical Aesthetic**: Light backgrounds, minimal shadows, clear typography
- **Accessibility First**: High contrast ratios, readable text sizes
- **Multi-language Support**: Optimized for 10+ Indian languages
- **Cross-platform Consistency**: Unified experience across mobile and web

### Design Philosophy
```
🏥 Medical-grade clarity + 🌿 Wellness-focused colors + ♿ Universal accessibility
```

---

## 📱 Mobile Theme Architecture

### Core Design Tokens (`mobile/src/theme/tokens.js`)

```javascript
// Central design tokens - USE THESE EVERYWHERE
export const colors = {
  background: '#F2F5F7',    // App background (light warm gray)
  surface: '#FFFFFF',       // Cards, modals, elevated content
  primary: '#0B6E4F',       // Brand green (darker variant)
  border: '#E2E8F0',        // Subtle borders and dividers
  text: '#0A2540',          // Primary text (dark blue)
  muted: '#555',            // Secondary/muted text
};

// 4-point spacing grid system
export const spacing = (n) => n * 4; // spacing(1) = 4px, spacing(4) = 16px

// Border radius scale
export const radii = {
  sm: 6,        // Small buttons, chips
  md: 12,       // Standard cards, inputs
  lg: 16,       // Large containers
  pill: 999,    // Fully rounded elements
};

// Minimal shadow approach
export const shadows = {
  none: {},     // Prefer borders over shadows
};
```

### React Native Paper Theme (`App.js`)

```javascript
const brandTheme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: '#43A047',       // Main interactive color
    secondary: '#43A047',     // Secondary actions
    tertiary: '#43A047',      // Tertiary elements
    background: '#F2F5F7',    // App background
    surface: '#FFFFFF',       // Card/modal background
  },
  roundness: 12,              // Global border radius
};
```

### Navigation Theme

```javascript
const navTheme = {
  ...NavDefaultTheme,
  colors: {
    primary: '#43A047',       // Active tab, links
    background: '#F2F5F7',    // Screen background
    card: '#FFFFFF',          // Header, tab bar background
    text: '#0A2540',          // Navigation text
    border: '#E3E8EF',        // Tab bar borders
  },
};
```

---

## 🌐 Web Theme Architecture

### CSS Custom Properties (`web-app/src/index.css`)

```css
:root {
  /* Light Mode Colors */
  --background: 210 20% 98%;
  --foreground: 215 25% 15%;
  --primary: 217 91% 60%;          /* Medical blue */
  --secondary: 158 64% 52%;        /* Medical green */
  
  /* Status Colors */
  --destructive: 0 84% 60%;        /* Medical red */
  --warning: 43 89% 58%;           /* Medical amber */
  --success: 158 64% 52%;          /* Medical green */
  
  /* Surface Colors */
  --card: 0 0% 100%;
  --muted: 210 20% 96%;
  --border: 214 20% 90%;
  
  /* Spacing & Effects */
  --radius: 0.5rem;
  --shadow-medical: 0 10px 30px -10px hsl(var(--primary) / 0.2);
}

.dark {
  /* Dark mode variants */
  --background: 215 28% 8%;
  --foreground: 210 20% 95%;
  /* ... additional dark theme colors */
}
```

### Tailwind Configuration (`web-app/tailwind.config.ts`)

```typescript
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // HSL-based color system
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Medical-specific colors
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
      },
    },
  },
}
```

---

## 🎨 Color System

### Primary Palette

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Primary Green** | `#43A047` | Main actions, active states | Buttons, tabs, icons |
| **Dark Green** | `#0B6E4F` | Alternative primary | Secondary buttons |
| **Success Green** | `#10B981` | Success states | Verification badges |

### Background System

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **App Background** | `#F2F5F7` | Main screen background | Screen container |
| **Surface** | `#FFFFFF` | Cards, modals | Card backgrounds |
| **Border** | `#E2E8F0` | Dividers, outlines | Card borders |

### Typography Colors

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Primary Text** | `#0A2540` | Headlines, important text | Screen titles |
| **Secondary Text** | `#6B7280` | Body text, descriptions | Card descriptions |
| **Muted Text** | `#64748B` | Metadata, timestamps | Date labels |

### Status Colors

| Color | Hex | Usage | Example |
|-------|-----|-------|---------|
| **Error** | `#DC2626` | Errors, alerts | Emergency cards |
| **Warning** | `#F59E0B` | Warnings, cautions | Alert messages |
| **Info** | `#3B82F6` | Information | Info badges |

### Code Examples

```javascript
// ✅ DO: Use design tokens
import { colors, spacing, radii } from '../theme/tokens';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(4),
    margin: spacing(3),
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
```

```javascript
// ❌ DON'T: Use hardcoded colors
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',    // Use colors.surface
    borderRadius: 12,             // Use radii.md
    padding: 16,                  // Use spacing(4)
  },
});
```

---

## 📝 Typography Scale

### Mobile Typography

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Large Title** | 32px | 700 | Screen headers |
| **Title Medium** | 20px | 600 | Section headers |
| **Body** | 16px | 400 | Standard text |
| **Caption** | 14px | 400 | Metadata |
| **Small** | 12px | 400 | Timestamps |

### Web Typography

Uses Tailwind's typography scale with medical-specific customizations:

```css
.medical-title {
  @apply text-3xl font-bold text-primary;
}

.medical-body {
  @apply text-base leading-7 text-foreground;
}

.medical-caption {
  @apply text-sm text-muted-foreground;
}
```

---

## 📐 Spacing & Layout

### 4-Point Grid System

```javascript
// Mobile: Use spacing function
padding: spacing(1),    // 4px
margin: spacing(2),     // 8px
gap: spacing(3),        // 12px
marginVertical: spacing(4), // 16px
paddingHorizontal: spacing(5), // 20px
```

```css
/* Web: Use Tailwind spacing */
.p-1 { padding: 0.25rem; }    /* 4px */
.p-2 { padding: 0.5rem; }     /* 8px */
.p-3 { padding: 0.75rem; }    /* 12px */
.p-4 { padding: 1rem; }       /* 16px */
.p-5 { padding: 1.25rem; }    /* 20px */
```

### Common Spacing Patterns

| Pattern | Mobile | Web | Usage |
|---------|--------|-----|-------|
| **Component padding** | `spacing(4)` | `p-4` | Card inner padding |
| **Section spacing** | `spacing(6)` | `space-y-6` | Between sections |
| **Element gap** | `spacing(3)` | `gap-3` | Between related items |
| **Screen margins** | `spacing(4)` | `mx-4` | Screen edge margins |

---

## 🧩 Component Patterns

### Card Component

```javascript
// Mobile Card Pattern
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(4),
    marginBottom: spacing(3),
    // Avoid heavy shadows - use borders instead
  },
});
```

```css
/* Web Card Pattern */
.medical-card {
  @apply bg-card border border-border rounded-lg p-4 mb-3;
  @apply shadow-sm hover:shadow-md transition-shadow;
}
```

### Button Patterns

```javascript
// Primary Button (Mobile)
const primaryButton = {
  backgroundColor: colors.primary,  // #43A047
  borderRadius: radii.md,          // 12px
  paddingVertical: spacing(3),     // 12px
  paddingHorizontal: spacing(6),   // 24px
};

// Secondary Button (Mobile)
const secondaryButton = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: radii.md,
};
```

### Icon Patterns

```javascript
// Icon Color States
const iconColors = {
  active: colors.primary,     // #43A047
  inactive: '#9CA3AF',        // Gray
  error: '#DC2626',          // Red
  success: '#10B981',        // Green
};
```

---

## 🛠️ Implementation Guidelines

### Setting Up Theme Context

```javascript
// 1. Import design tokens
import { colors, spacing, radii } from '../theme/tokens';

// 2. Use React Native Paper theme
import { Provider as PaperProvider } from 'react-native-paper';

// 3. Apply theme to your app
<PaperProvider theme={brandTheme}>
  <App />
</PaperProvider>
```

### Component Development

```javascript
// ✅ Theme-aware component
import { colors, spacing, radii } from '../theme/tokens';

export function HealthCard({ title, description, status }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={[
        styles.statusBadge,
        { backgroundColor: getStatusColor(status) }
      ]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing(4),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing(2),
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
});

function getStatusColor(status) {
  const statusColors = {
    active: colors.primary,
    completed: '#10B981',
    pending: '#F59E0B',
    error: '#DC2626',
  };
  return statusColors[status] || colors.muted;
}
```

### Responsive Design

```javascript
// Mobile: Use Platform and Dimensions
import { Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width > 768;

const styles = StyleSheet.create({
  container: {
    padding: isTablet ? spacing(6) : spacing(4),
    maxWidth: isTablet ? 600 : '100%',
  },
});
```

---

## ✅ Best Practices

### DO's ✅

1. **Use Design Tokens**
   ```javascript
   // ✅ Good
   backgroundColor: colors.surface,
   padding: spacing(4),
   borderRadius: radii.md,
   ```

2. **Follow Color Hierarchy**
   ```javascript
   // ✅ Good: Clear visual hierarchy
   titleColor: colors.text,        // Dark, high contrast
   bodyColor: colors.muted,        // Medium contrast
   captionColor: '#94A3B8',        // Light, low contrast
   ```

3. **Consistent Spacing**
   ```javascript
   // ✅ Good: 4pt grid system
   marginTop: spacing(3),          // 12px
   paddingHorizontal: spacing(4),  // 16px
   ```

4. **Accessible Colors**
   ```javascript
   // ✅ Good: High contrast ratios
   text: colors.text,              // #0A2540 on #FFFFFF = 12.6:1
   ```

### DON'Ts ❌

1. **Hardcoded Values**
   ```javascript
   // ❌ Bad
   backgroundColor: '#FFFFFF',     // Use colors.surface
   padding: 16,                   // Use spacing(4)
   borderRadius: 12,              // Use radii.md
   ```

2. **Inconsistent Colors**
   ```javascript
   // ❌ Bad: Random color choices
   primaryButton: '#00FF00',       // Use colors.primary
   errorText: '#FF0000',          // Use standardized error color
   ```

3. **Poor Contrast**
   ```javascript
   // ❌ Bad: Low contrast
   lightText: '#CCCCCC',          // Hard to read
   ```

4. **Mixed Spacing**
   ```javascript
   // ❌ Bad: Off-grid spacing
   margin: 13,                    // Use spacing multiples
   padding: 17,                   // Breaks grid system
   ```

---

## 🔄 Cross-Platform Consistency

### Color Mapping

| Concept | Mobile | Web | Notes |
|---------|--------|-----|-------|
| **Primary** | `#43A047` | `hsl(var(--primary))` | Brand green |
| **Background** | `#F2F5F7` | `hsl(var(--background))` | Light warm gray |
| **Surface** | `#FFFFFF` | `hsl(var(--card))` | White cards |
| **Text** | `#0A2540` | `hsl(var(--foreground))` | Dark blue |

### Component Equivalents

| Mobile | Web | Purpose |
|--------|-----|---------|
| `<Card />` (Paper) | `.medical-card` | Content containers |
| `<Button />` (Paper) | `.btn-primary` | Primary actions |
| `<Text />` (Paper) | `.text-base` | Typography |

### Responsive Breakpoints

```javascript
// Mobile: React Native dimensions
const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

// Web: Tailwind breakpoints
const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
```

---

## 🚀 Quick Start Checklist

### For New Components

- [ ] Import design tokens: `import { colors, spacing, radii } from '../theme/tokens'`
- [ ] Use spacing function: `padding: spacing(4)` instead of `padding: 16`
- [ ] Use color constants: `color: colors.text` instead of `color: '#0A2540'`
- [ ] Follow border radius scale: `borderRadius: radii.md`
- [ ] Test in multiple languages for text overflow
- [ ] Verify color contrast ratios (aim for 4.5:1 minimum)
- [ ] Test on both light backgrounds and surface colors

### For New Screens

- [ ] Set background: `backgroundColor: colors.background`
- [ ] Use consistent margins: `margin: spacing(4)`
- [ ] Implement proper navigation theming
- [ ] Add language selector if needed
- [ ] Test with sample content in multiple languages
- [ ] Verify accessibility with screen readers

---

## 📚 Resources

### Design Tokens Reference
- **File**: `mobile/src/theme/tokens.js`
- **Colors**: 6 core colors + status colors
- **Spacing**: 4pt grid system
- **Radii**: 4-scale border radius system

### Color Accessibility
- **Primary text**: #0A2540 (contrast ratio: 12.6:1 on white)
- **Secondary text**: #6B7280 (contrast ratio: 5.1:1 on white)
- **Interactive elements**: #43A047 (contrast ratio: 4.7:1 on white)

### External Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [HSL Color Picker](https://hslpicker.com/)
- [Material Design Color Tool](https://material.io/design/color/)

---

**Happy coding! 🎨✨**

> For questions about the theme system, reach out to the design system team or check the implementation examples in existing components.