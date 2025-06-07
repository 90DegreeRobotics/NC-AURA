
import React, { useState, useEffect } from 'react';
import type { TemporalWalkthroughProps } from '../types';
import { InteractiveButton } from './InteractiveButton';
import { SeedOfLifeSVG } from './SeedOfLifeSVG';
import { CONTENT, FONTS, COLORS } from '../constants';

const TotalSteps = CONTENT.temporalWalkthrough.steps.length;

export const TemporalWalkthrough: React.FC<TemporalWalkthroughProps> = ({ isOpen, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0); // Reset to first step when opened
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      if (!isOpen) document.body.style.overflow = 'auto'; // Ensure scroll is restored if closed by other means
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStepData = CONTENT.temporalWalkthrough.steps[currentStepIndex];
  const isFinalStepWithOptions = currentStepIndex >= TotalSteps;

  const handleNext = () => {
    if (currentStepIndex < TotalSteps) { // Check if we can go to final options or next step
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const getActionLink = (action: string) => {
    switch (action) {
      case 'subscribe':
        return `mailto:${CONTENT.codex.sections.find(s => s.heading.includes("Contact & Presence"))?.content.match(/Email: (.*)/)?.[1] || 'admin@neurocognica.com'}?subject=Subscribe to AURA Updates`;
      case 'download':
        return '#download-alpha'; // Placeholder
      case 'contribute':
        return CONTENT.codex.sections.find(s => s.heading.includes("Contact & Presence"))?.content.match(/GitHub: (.*)/)?.[1] || 'https://github.com/90DegreeRobotics/NC-AURA';
      default:
        return '#';
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[rgba(15,15,35,0.9)] backdrop-blur-md animate-fadeIn"
      onClick={onClose} // Optional: close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="temporal-walkthrough-title"
    >
      <div
        className="panel-glass w-full max-w-2xl max-h-[90vh] text-silverMist rounded-lg shadow-2xl flex flex-col overflow-hidden border-2 border-electricGold"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-whiteAlpha20">
          <h2 id="temporal-walkthrough-title" className={`${FONTS.heading} text-3xl text-electricGold text-center`}>
            {isFinalStepWithOptions ? CONTENT.temporalWalkthrough.finalOptions.heading : CONTENT.temporalWalkthrough.title}
          </h2>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto flex-grow flex flex-col items-center justify-center text-center">
          {!isFinalStepWithOptions && currentStepData && (
            <>
              {currentStepData.id === 'past' && <SeedOfLifeSVG size={120} color={COLORS.roseQuartz} animationStyle="gentle" className="mb-6" />}
              <h3 className={`${FONTS.heading} text-2xl text-roseQuartz mb-4`}>{currentStepData.heading}</h3>
              <p className={`${FONTS.body} text-lg leading-relaxed mb-6`}>{currentStepData.text}</p>
              {currentStepData.id === 'present' && currentStepData.interactiveButtonText && (
                <InteractiveButton onClick={() => console.log("Presence Acknowledged")} className="my-4">
                  {currentStepData.interactiveButtonText}
                </InteractiveButton>
              )}
              {currentStepData.id === 'future' && <SeedOfLifeSVG size={150} color={COLORS.electricGold} animationStyle="dynamic" className="my-6" />}
            </>
          )}

          {isFinalStepWithOptions && (
            <>
              <p className={`${FONTS.body} text-lg leading-relaxed mb-8`}>{CONTENT.temporalWalkthrough.finalOptions.text}</p>
              <div className="space-y-4 w-full max-w-xs">
                {CONTENT.temporalWalkthrough.finalOptions.options.map((opt) => (
                  <InteractiveButton
                    key={opt.action}
                    variant="secondary"
                    className="w-full"
                    href={getActionLink(opt.action)}
                    onClick={() => console.log(`Action: ${opt.action}`)}
                  >
                    {opt.text}
                  </InteractiveButton>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-whiteAlpha20 flex justify-between items-center">
          <InteractiveButton onClick={handlePrevious} variant="secondary" disabled={currentStepIndex === 0}>
            Previous
          </InteractiveButton>
          
          {!isFinalStepWithOptions && (
            <InteractiveButton onClick={handleNext} variant="primary">
              {currentStepData?.actionText || "Next"}
            </InteractiveButton>
          )}
          {isFinalStepWithOptions && (
             <InteractiveButton onClick={onClose} variant="primary">
              {CONTENT.temporalWalkthrough.closeButton}
            </InteractiveButton>
          )}
        </div>
      </div>
       {/* Global close button for accessibility, could be styled more prominently or differently */}
        <button
            onClick={onClose}
            className={`absolute top-4 right-4 text-silverMist hover:text-electricGold transition-colors ${FONTS.body} text-2xl z-[70]`}
            aria-label="Close Temporal Walkthrough"
        >
            &times;
        </button>
    </div>
  );
};
