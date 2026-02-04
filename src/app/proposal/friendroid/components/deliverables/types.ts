import * as React from "react";
import type { LucideIcon } from "lucide-react";

export type DeliverableTab = {
    id: string;
    label: string;
    eyebrow: string;
    headline: string;
    description: string;
    Icon: LucideIcon;
    ContentComponent?: React.ComponentType<{ isActive: boolean }>;
};

export type Platform = "instagram" | "tiktok" | "youtube" | "linkedin";
export type MediaType = "reel" | "carousel" | "video" | "static" | "story";
export type ContentType =
    | "educational"
    | "informative"
    | "entertaining"
    | "promotional"
    | "interactive"
    | "authentic";
export type ImpactLevel = "low" | "medium" | "high" | "critical";
export type ComplexityLevel = "simple" | "moderate" | "complex";

export interface HypothesisEntry {
    id: string;
    platform: Platform;
    mediaType: MediaType;
    successMetric: string;
    priorityRank: number;
    contentFormatExample: string;
    referenceLink?: string;
    contentType: ContentType;
    estimatedImpact: ImpactLevel;
    implementationComplexity: ComplexityLevel;
}
