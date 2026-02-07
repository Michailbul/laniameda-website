"use client";

/**
 * Brand Provider - React Context for Brand Configuration
 * 
 * Provides brand config to the entire React tree with:
 * - Automatic loading on mount
 * - Hot reload support in development
 * - SSR-safe rendering
 * 
 * Usage:
 *   import { BrandProvider } from "@/brand/react";
 *   
 *   <BrandProvider>
 *     <App />
 *   </BrandProvider>
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { BrandConfig, loadBrandConfig, brandColors, brandVoice, brandPillars } from "./index";
import type { ColorPalette } from "./types";

interface BrandContextValue {
  brand: BrandConfig;
  colors: typeof brandColors;
  voice: typeof brandVoice;
  pillars: typeof brandPillars;
  isLoaded: boolean;
  reload: () => void;
}

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

interface BrandProviderProps {
  children: ReactNode;
  /** Optional initial config for SSR */
  initialConfig?: BrandConfig;
  /** Enable hot reload in development */
  enableHotReload?: boolean;
}

export function BrandProvider({ 
  children, 
  initialConfig,
  enableHotReload = process.env.NODE_ENV === "development"
}: BrandProviderProps) {
  const [brand, setBrand] = useState<BrandConfig>(initialConfig || loadBrandConfig());
  const [isLoaded, setIsLoaded] = useState(!!initialConfig);

  const reload = () => {
    const fresh = loadBrandConfig();
    setBrand(fresh);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (!initialConfig) {
      reload();
    }
  }, [initialConfig]);

  // Hot reload in development
  useEffect(() => {
    if (!enableHotReload) return;

    const handleHotReload = () => {
      reload();
    };

    // Listen for custom hot reload events
    window.addEventListener("brand-config-reload", handleHotReload);
    
    return () => {
      window.removeEventListener("brand-config-reload", handleHotReload);
    };
  }, [enableHotReload]);

  const value: BrandContextValue = {
    brand,
    colors: brand.colors,
    voice: brand.voice,
    pillars: brand.pillars,
    isLoaded,
    reload,
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
}

/**
 * Hook to access brand configuration in components
 * 
 * Usage:
 *   function MyComponent() {
 *     const { brand, colors, voice } = useBrand();
 *     return <div style={{ color: colors.primary }}>{voice.personality}</div>;
 *   }
 */
export function useBrand(): BrandContextValue {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}

/**
 * Hook for CSS-in-JS style objects with brand colors
 * 
 * Usage:
 *   function Card() {
 *     const styles = useBrandStyles({
 *       backgroundColor: "surface",
 *       color: "text",
 *       borderColor: "primary"
 *     });
 *     return <div style={styles}>...</div>;
 *   }
 */
export function useBrandStyles(
  colorMapInput: Record<string, keyof ColorPalette>
): Record<string, string> {
  const colorMap: Record<string, keyof ColorPalette> = colorMapInput;
  const { colors } = useBrand();
  
  return Object.entries(colorMap).reduce((acc, [key, colorKey]) => {
    acc[key] = colors[colorKey];
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Higher-Order Component for brand injection
 * 
 * Usage:
 *   const BrandedButton = withBrand((props, brand) => {
 *     return <button style={{ background: brand.colors.primary }}>{props.children}</button>;
 *   });
 */
export function withBrand<P extends object>(
  Component: React.ComponentType<P & { brand: BrandContextValue }>
): React.FC<P> {
  return function WithBrandComponent(props: P) {
    const brand = useBrand();
    return <Component {...props} brand={brand} />;
  };
}
