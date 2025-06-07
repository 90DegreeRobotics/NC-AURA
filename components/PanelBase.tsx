
import React from 'react';
import type { PanelBaseProps } from '../types';
import { FONTS, COLORS } from '../constants';

export const PanelBase: React.FC<PanelBaseProps> = ({ title, children, className }) => {
  return (
    <div 
      className={`panel-glass flex flex-col p-6 sm:p-8 md:p-10 min-h-screen lg:h-screen overflow-y-auto ${className}`}
    >
      <h1 className={`${FONTS.heading} text-3xl sm:text-4xl lg:text-5xl text-electricGold mb-6 sm:mb-8 leading-tight`}>
        {title}
      </h1>
      <div className={`${FONTS.body} text-base sm:text-lg text-silverMist space-y-4 leading-relaxed`}>
        {children}
      </div>
    </div>
  );
};
