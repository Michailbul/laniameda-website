'use client';

import React from 'react';

interface BlurTextEffectProps {
  children: string;
  className?: string;
}

export const BlurTextEffect: React.FC<BlurTextEffectProps> = ({ children, className = '' }) => {
  return (
    <span className={`inline-block ${className}`}>
      {children.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="char inline-block animate-blur-in"
          style={{
            whiteSpace: 'pre',
            animationDelay: `${i * 15}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <style jsx>{`
        @keyframes blur-in {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .animate-blur-in {
          animation: blur-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </span>
  );
};
