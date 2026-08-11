/**
 * DENARI Design System
 *
 * Palette updated to match the navy + mint reference dashboard exactly.
 * Focus: hierarchy, spacing, restraint, perceived performance
 */

import "@/global.css";

import { Platform } from "react-native";

// ============================================================================
// COLORS — Single source of truth
// ============================================================================
export const Colors = {
  light: {
    // Brand Identity (Mint — primary accent, used on balance card + CTAs)
    primary: "#7BDCA6",
    primaryHover: "#5CC994",
    primarySoft: "#E9F9F0",

    // Navy — the dark surface used for the top balance section & action buttons
    navy: "#16213D",
    navyElevated: "#232F52",
    navySoft: "rgba(255, 255, 255, 0.12)",

    // Backgrounds
    background: "#FFFFFF", // Main app background
    backgroundSubtle: "#F7F7F5", // Alternate sections
    backgroundElevated: "#FFFFFF", // Cards, modals

    // Text Hierarchy (on light backgrounds)
    text: "#1A1A1A", // Primary text
    textSecondary: "#6B7280", // Secondary text
    textTertiary: "#9CA3AF", // Tertiary text, placeholders

    // Text Hierarchy (on navy backgrounds)
    textInverse: "#FFFFFF",
    textInverseSecondary: "rgba(255, 255, 255, 0.65)",

    // Borders (Subtle, almost invisible)
    border: "#E5E7EB",
    borderLight: "#F3F4F6",

    // Semantic Colors (Income/Expense/Actions)
    income: "#10B981",
    incomeSoft: "#D1FAE5",
    expense: "#EF4444",
    expenseSoft: "#FEE2E2",

    // System States
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
  // Note: Dark mode removed - not currently used
} as const;

// ============================================================================
// TYPOGRAPHY — 6-level hierarchy (simplified from 10)
// ============================================================================
export const Typography = {
  // Display - Hero moments (32px, -0.5 tracking)
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "800" as const,
    letterSpacing: -0.5,
  },

  // Heading - Page titles (24px, -0.3 tracking)
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as const,
    letterSpacing: -0.3,
  },

  // Title - Section headers (20px)
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },

  // Body - Main content (16px)
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },

  // Caption - Metadata (14px)
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },

  // Small - Timestamps, hints (12px)
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const,
  },
} as const;

// Typography weights (use with Typography scale)
export const FontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
};

// ============================================================================
// SPACING — 8pt-based grid (4/8/12/16/20/24/32/40/48)
// ============================================================================
export const Spacing = {
  xs: 4, // Minimal gaps
  sm: 8, // Icon to text
  md: 12, // List item gaps (tighter)
  lg: 16, // Card padding (reduced from 20)
  xl: 20, // Section padding (reduced from 24)
  xxl: 24, // Between sections (reduced from 32)
  xxxl: 32, // Major sections (reduced from 48)
  huge: 40, // Hero sections
  massive: 48, // Landing pages
} as const;

// ============================================================================
// BORDER RADIUS — 4-level scale (simplified from 8)
// ============================================================================
export const Radius = {
  sm: 8, // Tags, badges, inputs
  md: 12, // Cards, buttons
  lg: 20, // Hero cards, modals
  xl: 28, // Special moments
  full: 9999, // Pills, avatars
} as const;

// ============================================================================
// ELEVATION — Subtle shadows only (soft, not floating)
// ============================================================================
export const Elevation = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Soft - Barely visible (most cards)
  soft: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  // Card - Standard cards
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  // Raised - Interactive elements on press
  raised: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  // Modal - Dialogs, sheets (highest)
  modal: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  },
} as const;

// ============================================================================
// ICON SIZES — Consistent sizing
// ============================================================================
export const IconSize = {
  sm: 16, // Inline icons
  md: 20, // Standard icons
  lg: 24, // Prominent icons
  xl: 32, // Hero icons
} as const;

// ============================================================================
// COMPONENT SIZES
// ============================================================================
export const ComponentSize = {
  // Buttons
  buttonSm: 36,
  buttonMd: 48,
  buttonLg: 56,

  // Inputs
  inputSm: 40,
  inputMd: 48,
  inputLg: 56,

  // Touch targets (minimum 44x44)
  touchTarget: 44,

  // Avatars
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 48,
  avatarXl: 64,
} as const;

// ============================================================================
// ANIMATION — Subtle, fast, purposeful
// ============================================================================
export const Animation = {
  fast: 150, // Quick feedback (press, toggle)
  base: 200, // Standard transitions
  slow: 300, // Entrances, exits
  slower: 400, // Complex transitions

  // Easing (for Reanimated)
  easeOut: [0.16, 1, 0.3, 1] as const, // Snappy
  easeInOut: [0.4, 0, 0.2, 1] as const, // Smooth
  spring: { damping: 20, stiffness: 300 }, // Bouncy
} as const;

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
export const Layout = {
  // Screen padding (horizontal)
  screenPadding: 20, // Reduced from 24 for more space
  screenPaddingLarge: 24, // For hero sections

  // Safe areas
  headerHeight: 56,
  tabBarHeight: Platform.select({
    ios: 88,
    android: 72,
    default: 72,
  }),

  // Content constraints
  maxContentWidth: 600, // Reduced from 800 for focus

  // Dividers
  dividerHeight: 1,
  dividerThick: 2,
} as const;

// ============================================================================
// Z-INDEX SCALE — Consistent layering
// ============================================================================
export const ZIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================
export type ColorToken = keyof typeof Colors.light;
export type SpacingToken = keyof typeof Spacing;
export type RadiusToken = keyof typeof Radius;

// Legacy exports (for backwards compatibility)
export const BorderRadius = Radius;
export const Shadows = Elevation;
export const IconSizes = IconSize;
export const ComponentSizes = ComponentSize;

// Fonts (keep as-is)
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

// Legacy
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = Layout.maxContentWidth;
