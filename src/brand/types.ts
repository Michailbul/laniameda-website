/**
 * Brand Configuration Types
 * Defines the structure for hierarchical brand guidelines
 */

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  success: string;
  warning: string;
  error: string;
}

export interface Typography {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  glow: string;
}

export interface Animation {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    default: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
}

export interface BrandVoice {
  tone: string[];
  wordsToUse: string[];
  wordsToAvoid: string[];
  personality: string;
}

export interface ContentPillar {
  id: string;
  name: string;
  role: string;
  description: string;
  examples: string[];
  color?: string;
}

export interface VisualDirection {
  do: string[];
  dont: string[];
  contentStyles: Array<{
    type: string;
    style: string;
  }>;
  references?: string[];
}

export interface BrandConfig {
  name: string;
  version: string;
  description?: string;
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  animation: Animation;
  voice: BrandVoice;
  pillars: ContentPillar[];
  visual: VisualDirection;
  // Meta fields for tracking source
  _source?: "system" | "global" | "local";
  _path?: string;
}

export type ConfigLevel = "system" | "global" | "local";

export interface ConfigSource {
  level: ConfigLevel;
  path: string;
  exists: boolean;
  config?: Partial<BrandConfig>;
}
