import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/animated-table";
import { cn } from "@/lib/utils";
import {
    ComplexityLevel,
    HypothesisEntry,
    ImpactLevel,
    MediaType,
    Platform,
} from "./types";
import {
    useHoverPreview,
    HoverLink,
    PreviewCard,
    hoverPreviewStyles,
} from "@/components/ui/hover-preview";

const sampleHypotheses: HypothesisEntry[] = [
    {
        id: "1",
        platform: "instagram",
        mediaType: "carousel",
        successMetric: "Save rate > 5%",
        priorityRank: 1,
        contentFormatExample: "Cross Always New Scarce",
        referenceLink: "https://example.com/ref1",
        contentType: "educational",
        estimatedImpact: "high",
        implementationComplexity: "moderate",
    },
    {
        id: "2",
        platform: "tiktok",
        mediaType: "reel",
        successMetric: "Watch time > 80%",
        priorityRank: 2,
        contentFormatExample: "Hook-Story-CTA",
        referenceLink: "https://example.com/ref2",
        contentType: "entertaining",
        estimatedImpact: "critical",
        implementationComplexity: "simple",
    },
    {
        id: "3",
        platform: "linkedin",
        mediaType: "carousel",
        successMetric: "Engagement > 3%",
        priorityRank: 3,
        contentFormatExample: "Thought Leadership Thread",
        contentType: "informative",
        estimatedImpact: "medium",
        implementationComplexity: "simple",
    },
    {
        id: "4",
        platform: "youtube",
        mediaType: "video",
        successMetric: "CTR > 6%",
        priorityRank: 4,
        contentFormatExample: "Tutorial Walkthrough",
        contentType: "educational",
        estimatedImpact: "high",
        implementationComplexity: "complex",
    },
    {
        id: "5",
        platform: "instagram",
        mediaType: "reel",
        successMetric: "Shares > 1K",
        priorityRank: 5,
        contentFormatExample: "Trending Audio Remix",
        contentType: "entertaining",
        estimatedImpact: "medium",
        implementationComplexity: "simple",
    },
    {
        id: "6",
        platform: "tiktok",
        mediaType: "carousel",
        successMetric: "Completion > 70%",
        priorityRank: 6,
        contentFormatExample: "Before/After Comparison",
        contentType: "educational",
        estimatedImpact: "high",
        implementationComplexity: "moderate",
    },
    {
        id: "7",
        platform: "linkedin",
        mediaType: "static",
        successMetric: "Comments > 50",
        priorityRank: 7,
        contentFormatExample: "Poll Engagement Post",
        contentType: "interactive",
        estimatedImpact: "medium",
        implementationComplexity: "simple",
    },
    {
        id: "8",
        platform: "youtube",
        mediaType: "video",
        successMetric: "Retention > 50%",
        priorityRank: 8,
        contentFormatExample: "Behind The Scenes",
        contentType: "authentic",
        estimatedImpact: "low",
        implementationComplexity: "simple",
    },
    {
        id: "9",
        platform: "instagram",
        mediaType: "story",
        successMetric: "Replies > 100",
        priorityRank: 9,
        contentFormatExample: "Q&A Sticker Series",
        contentType: "interactive",
        estimatedImpact: "medium",
        implementationComplexity: "simple",
    },   
];

const platformIcons: Record<Platform, string> = {
    instagram: "📸",
    tiktok: "🎵",
    youtube: "▶️",
    linkedin: "💼",
};

const mediaTypeLabels: Record<MediaType, string> = {
    reel: "Reel",
    carousel: "Carousel",
    video: "Video",
    static: "Static",
    story: "Story",
};

const impactColors: Record<ImpactLevel, string> = {
    critical: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    high: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    low: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const complexityColors: Record<ComplexityLevel, string> = {
    simple: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    moderate: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    complex: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export function HypothesesLibraryCard({ isActive }: { isActive: boolean }) {
    const {
        activePreview,
        position,
        isVisible,
        cardRef,
        handleHoverStart,
        handleHoverMove,
        handleHoverEnd,
    } = useHoverPreview();

    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            <style>{hoverPreviewStyles}</style>
            
            {/* Problem Section */}
            <div className="mb-3">
                <p className="text-[11px] font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                    Problem
                </p>
                <p className="text-xl font-medium text-white/90">
                    &ldquo;We don&apos;t know what to post.&rdquo;
                </p>
            </div>

            {/* Divider */}
            <div className="mb-3">
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* Animated Notion-style Table */}
            <div
                className={cn(
                    "rounded-xl border overflow-hidden transition-colors duration-500",
                    isActive ? "border-white/15" : "border-white/10"
                )}
            >
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-white/10 bg-white/[0.04] hover:bg-white/[0.04]">
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Platform
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Media
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Success Metric
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center whitespace-nowrap">
                                Priority
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Format Example
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider text-center whitespace-nowrap">
                                <HoverLink
                                    previewKey="midjourney"
                                    onHoverStart={handleHoverStart}
                                    onHoverMove={handleHoverMove}
                                    onHoverEnd={handleHoverEnd}
                                    className="hover:text-white transition-colors"
                                >
                                    Ref
                                </HoverLink>
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Type
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Impact
                            </TableHead>
                            <TableHead className="h-10 px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
                                Complexity
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sampleHypotheses.map((entry, index) => {
                            const isVisible = index === 0;
                            const blurLevel =
                                index === 1 ? "light" : index >= 2 ? "heavy" : "none";

                            return (
                                <motion.tr
                                    key={entry.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={cn(
                                        "border-b border-white/5 transition-colors",
                                        isVisible &&
                                        "bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer",
                                        blurLevel === "light" &&
                                        "opacity-50 blur-[2px] pointer-events-none select-none",
                                        blurLevel === "heavy" &&
                                        "opacity-25 blur-[4px] pointer-events-none select-none"
                                    )}
                                >
                                    <TableCell className="px-3 py-3">
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            <span className="text-base">
                                                {platformIcons[entry.platform]}
                                            </span>
                                            <span className="text-zinc-300 capitalize text-xs">
                                                {entry.platform}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 text-xs whitespace-nowrap">
                                            {mediaTypeLabels[entry.mediaType]}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span className="text-zinc-300 text-xs whitespace-nowrap">
                                            {entry.successMetric}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3 text-center">
                                        <span
                                            className={cn(
                                                "inline-flex w-6 h-6 rounded-md items-center justify-center text-xs font-bold",
                                                entry.priorityRank === 1 &&
                                                "bg-rose-500/20 text-rose-300",
                                                entry.priorityRank === 2 &&
                                                "bg-amber-500/20 text-amber-300",
                                                entry.priorityRank >= 3 && "bg-zinc-500/20 text-zinc-400"
                                            )}
                                        >
                                            {entry.priorityRank}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span className="text-zinc-300 text-xs whitespace-nowrap">
                                            {entry.contentFormatExample}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3 text-center">
                                        {entry.referenceLink && (
                                            <a
                                                href={entry.referenceLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-zinc-400 hover:text-white transition-colors inline-flex"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span className="text-zinc-400 text-xs capitalize whitespace-nowrap">
                                            {entry.contentType}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span
                                            className={cn(
                                                "px-1.5 py-0.5 rounded border text-[10px] font-medium capitalize whitespace-nowrap",
                                                impactColors[entry.estimatedImpact]
                                            )}
                                        >
                                            {entry.estimatedImpact}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-3 py-3">
                                        <span
                                            className={cn(
                                                "px-1.5 py-0.5 rounded border text-[10px] font-medium capitalize whitespace-nowrap",
                                                complexityColors[entry.implementationComplexity]
                                            )}
                                        >
                                            {entry.implementationComplexity}
                                        </span>
                                    </TableCell>
                                </motion.tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>    
            <PreviewCard
                data={activePreview}
                position={position}
                isVisible={isVisible}
                cardRef={cardRef}
            />
        </div>
    );
}
