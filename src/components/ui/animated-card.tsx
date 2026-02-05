"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// --- PROPS INTERFACE ---
export interface AnimatedCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
  variant?: "cyan" | "pink" | "yellow" | "purple" | "blue";
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

// --- BORDER & ACCENT VARIANT STYLES ---
const variantClasses = {
  cyan: {
    border: "border-t-cyan-500",
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/20 border-cyan-500/30",
    glow: "group-hover:shadow-cyan-500/20",
  },
  pink: {
    border: "border-t-pink-500",
    icon: "text-pink-400",
    iconBg: "bg-pink-500/20 border-pink-500/30",
    glow: "group-hover:shadow-pink-500/20",
  },
  yellow: {
    border: "border-t-yellow-500",
    icon: "text-yellow-400",
    iconBg: "bg-yellow-500/20 border-yellow-500/30",
    glow: "group-hover:shadow-yellow-500/20",
  },
  purple: {
    border: "border-t-purple-500",
    icon: "text-purple-400",
    iconBg: "bg-purple-500/20 border-purple-500/30",
    glow: "group-hover:shadow-purple-500/20",
  },
  blue: {
    border: "border-t-blue-500",
    icon: "text-blue-400",
    iconBg: "bg-blue-500/20 border-blue-500/30",
    glow: "group-hover:shadow-blue-500/20",
  },
};

/**
 * A responsive, theme-adaptive card with a 3D tilt effect on hover.
 * Adapted for deliverables/features showcase.
 */
export const AnimatedCard = ({
  icon: Icon,
  title,
  description,
  tags,
  variant = "cyan",
  className,
  onClick,
  isActive,
}: AnimatedCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const styles = variantClasses[variant];

  return (
    <motion.div
      layout
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative w-full transform-gpu cursor-pointer overflow-hidden rounded-xl",
        "bg-zinc-900 p-5",
        "shadow-lg transition-shadow duration-300 hover:shadow-2xl",
        "border border-white/10 border-t-4",
        styles.border,
        styles.glow,
        isActive && "ring-1 ring-white/20",
        className
      )}
      aria-label={`Feature: ${title}`}
      tabIndex={0}
    >
      <div style={{ transform: "translateZ(20px)" }} className="space-y-3">
        {/* Header with Icon */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border",
            styles.iconBg
          )}>
            <Icon className={cn("w-5 h-5", styles.icon)} />
          </div>
          <h3 className="text-base font-medium text-white">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed pl-[52px]">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 pl-[52px]">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
