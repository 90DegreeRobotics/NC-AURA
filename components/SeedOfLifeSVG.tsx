
import React from 'react';
import type { SeedOfLifeSVGProps } from '../types';
import { COLORS } from '../constants';

export const SeedOfLifeSVG: React.FC<SeedOfLifeSVGProps> = ({ 
  size = 100, 
  color = COLORS.electricGold, 
  className = '',
  animationStyle = 'default'
}) => {
  const radius = size / 4; 
  const centerX = size / 2;
  const centerY = size / 2;

  const circles = [
    { cx: centerX, cy: centerY }, 
    { cx: centerX, cy: centerY - radius },
    { cx: centerX + radius * Math.sqrt(3)/2, cy: centerY - radius/2 },
    { cx: centerX + radius * Math.sqrt(3)/2, cy: centerY + radius/2 },
    { cx: centerX, cy: centerY + radius },
    { cx: centerX - radius * Math.sqrt(3)/2, cy: centerY + radius/2 },
    { cx: centerX - radius * Math.sqrt(3)/2, cy: centerY - radius/2 },
  ];

  let animationClass = 'animate-pulse-seed'; // from index.html keyframes
  if (animationStyle === 'gentle') {
    // Could define a 'pulse-gentle' animation in index.html if different from default
    // For now, let's assume 'default' is already gentle enough or re-use.
    // If specific, it might be: animation: pulse-seed 5s infinite ease-in-out;
    animationClass = 'animate-pulse-seed'; // Or a new class like 'animate-pulse-gentle'
  } else if (animationStyle === 'dynamic') {
    // Could define a 'pulse-dynamic' animation
    // Example: animation: pulse-seed 1.5s infinite ease-in-out;
    animationClass = 'animate-pulse-seed scale-110'; // Example: make it slightly more pronounced or faster
  }


  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={`${className} ${animationClass}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke={color} strokeWidth="1.5" style={{ filter: 'url(#glow)' }}>
        {circles.map((circle, i) => (
          <circle 
            key={i} 
            cx={circle.cx} 
            cy={circle.cy} 
            r={radius} 
            opacity={0.7}
          />
        ))}
      </g>
    </svg>
  );
};
