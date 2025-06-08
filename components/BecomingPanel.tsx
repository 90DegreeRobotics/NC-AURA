
import React from 'react';
import { PanelBase } from './PanelBase';
import { CONTENT, FONTS, COLORS } from '../constants';
import type { BecomingPanelProps } from '../types';

export const BecomingPanel: React.FC<BecomingPanelProps> = ({ className }) => {
  return (
    <PanelBase title={CONTENT.becoming.title} className={className}>
      <p className={`${FONTS.body} text-roseQuartz text-lg italic mb-6`}>
        {CONTENT.becoming.subtitle}
      </p>
      <ul className="space-y-3">
        {CONTENT.becoming.elements.map((item, index) => (
          <li key={index} className={`${FONTS.body} text-sm sm:text-base leading-relaxed ml-4 list-item list-disc`}>
            {item}
          </li>
        ))}
      </ul>
    </PanelBase>
  );
};
