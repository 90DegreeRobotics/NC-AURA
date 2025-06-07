
import React from 'react';
import { PanelBase } from './PanelBase';
import { SeedOfLifeSVG } from './SeedOfLifeSVG';
import { InteractiveButton } from './InteractiveButton';
import { CONTENT, FONTS, COLORS } from '../constants';
import type { PlanPanelProps } from '../types';

export const PlanPanel: React.FC<PlanPanelProps> = ({ className, onOpenCodex }) => {
  return (
    <PanelBase title={CONTENT.plan.title} className={`${className} border-l-0 border-r-0 lg:border-l lg:border-r border-whiteAlpha10`}>
      <div className="flex flex-col flex-grow space-y-6">
        <p className={`${FONTS.body} text-roseQuartz text-lg italic mb-2 text-center`}>
          {CONTENT.plan.subtitle}
        </p>
        
        <div className="flex justify-center my-4">
          <SeedOfLifeSVG size={180} color={COLORS.electricGold} />
        </div>

        <ul className="space-y-3">
          {CONTENT.plan.elements.map((item, index) => (
            <li key={index} className={`${FONTS.body} text-sm sm:text-base leading-relaxed ml-4 list-item list-disc`}>
              {item}
            </li>
          ))}
        </ul>
        
        <div className="mt-auto flex justify-center pt-6">
          <InteractiveButton onClick={onOpenCodex}>
            {CONTENT.plan.codexButton}
          </InteractiveButton>
        </div>
      </div>
    </PanelBase>
  );
};
