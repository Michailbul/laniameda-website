'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
	// Animation customization
	gradients?: string[];
	animationDuration?: number;
	animationDelay?: number;

	// Layout customization
	enableCenterContent?: boolean;

	// Visual customization
	overlay?: boolean;
	overlayOpacity?: number;
};

const Default_Gradients = [
    "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    "linear-gradient(135deg, #0f3460 0%, #e94560 100%)",
    "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
  ]

export function GradientBackground({
	children,
	className = '',
	gradients = Default_Gradients,
	animationDuration = 8,
	animationDelay = 0.5,
	overlay = false,
	overlayOpacity = 0.3,
}: GradientBackgroundProps) {
	return (
		<div className={cn('relative', className)}>
			{/* Animated gradient background - fixed to viewport */}
			<motion.div
				className="fixed inset-0 -z-10"
				style={{ background: gradients[0] }}
				animate={{ background: gradients }}
				transition={{
					delay: animationDelay,
					duration: animationDuration,
					repeat: Number.POSITIVE_INFINITY,
					ease: 'easeInOut',
				}}
			/>

			{/* Optional overlay */}
			{overlay && (
				<div
					className="fixed inset-0 -z-10 bg-black"
					style={{ opacity: overlayOpacity }}
				/>
			)}

			{/* Content */}
			{children}
		</div>
	);
}
