
import React from 'react';
import type { InteractiveButtonProps } from '../types';
import { FONTS, COLORS } from '../constants';

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ 
  onClick, 
  children, 
  className = '',
  variant = 'primary',
  href,
  type = 'button',
  disabled = false,
}) => {
  const baseStyle = `${FONTS.heading} font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-obsidianBlack`;
  
  const primaryStyle = `bg-electricGold text-obsidianBlack hover:bg-yellow-500 hover:shadow-[0_0_15px_2px_rgba(251,191,36,0.7)] focus:ring-electricGold`;
  const secondaryStyle = `bg-transparent border-2 border-electricGold text-electricGold hover:bg-electricGold hover:text-obsidianBlack hover:shadow-[0_0_15px_2px_rgba(251,191,36,0.7)] focus:ring-electricGold`;
  const disabledStyle = `opacity-50 cursor-not-allowed`;

  const variantStyle = variant === 'primary' ? primaryStyle : secondaryStyle;
  const combinedClassName = `${baseStyle} ${variantStyle} ${disabled ? disabledStyle : ''} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClassName}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        role="button" // For accessibility if it acts like a button
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
