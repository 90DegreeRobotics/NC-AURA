
import React, { useEffect } from 'react';
import type { CodexModalProps } from '../types';
import { InteractiveButton } from './InteractiveButton';
import { CONTENT, FONTS, COLORS } from '../constants';

export const CodexModal: React.FC<CodexModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(15,15,35,0.8)] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="codex-title"
    >
      <div 
        className={`panel-glass w-full max-w-3xl max-h-[90vh] text-silverMist rounded-lg shadow-2xl flex flex-col overflow-hidden border-2 border-electricGold`}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className={`p-6 border-b border-whiteAlpha20`}>
          <h2 id="codex-title" className={`${FONTS.heading} text-3xl text-electricGold`}>{CONTENT.codex.title}</h2>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto">
          {CONTENT.codex.sections.map((section, index) => (
            <div key={index}>
              <h3 className={`${FONTS.heading} text-xl text-roseQuartz mb-3`}>{section.heading}</h3>
              <p className={`${FONTS.body} text-sm leading-relaxed whitespace-pre-wrap space-y-1`}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className={`p-6 border-t border-whiteAlpha20 flex justify-end`}>
          <InteractiveButton onClick={onClose} variant="secondary">
            Close Codex
          </InteractiveButton>
        </div>
      </div>
    </div>
  );
};
