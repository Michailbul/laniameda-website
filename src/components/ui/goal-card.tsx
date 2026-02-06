'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GoalCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export function GoalCard({ className, children, ...props }: GoalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'relative p-3 w-full rounded-xl overflow-hidden',
        'bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700',
        'shadow-md shadow-orange-500/20',
        className
      )}
      {...props}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10">
        <span className="inline-block px-1.5 py-0.5 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-1">
          Goal
        </span>
        <p className="text-white text-[14px] font-medium leading-snug">
          {children}
        </p>
      </div>
    </motion.div>
  );
}
