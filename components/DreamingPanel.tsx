import React from 'react';
import { PanelBase } from './PanelBase';
import { InteractiveButton } from './InteractiveButton';
import { CONTENT, FONTS, COLORS } from '../constants';
import type { DreamingPanelProps } from '../types';

export const DreamingPanel: React.FC<DreamingPanelProps> = ({ className, onEmbraceJourneyClick }) => {
  return (
    <PanelBase title={CONTENT.dreaming.title} className={className}>
      <p className={`${FONTS.body} text-roseQuartz text-lg italic mb-6`}>
        {CONTENT.dreaming.subtitle}
      </p>
      <ul className="space-y-3 mb-8">
        {CONTENT.dreaming.elements.map((item, index) => (
          <li key={index} className={`${FONTS.body} text-sm sm:text-base leading-relaxed ml-4 list-item list-disc`}>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8 flex flex-col items-center space-y-6">
        <InteractiveButton 
          variant="secondary"
          href="./etj/dist/index.html" // Link to the ETJ application's build output
          // onClick={onEmbraceJourneyClick} // This was for the TemporalWalkthrough modal, now directly links
        >
          {CONTENT.dreaming.cta}
        </InteractiveButton>
      </div>
    </PanelBase>
  );
};