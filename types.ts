
import React from 'react';

export interface PanelBaseProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface InteractiveButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  href?: string; // If provided, renders an <a> tag
  type?: 'button' | 'submit' | 'reset'; // Standard button types
  disabled?: boolean;
}

export interface SeedOfLifeSVGProps {
  size?: number;
  color?: string;
  className?: string;
  animationStyle?: 'gentle' | 'dynamic' | 'default';
}

export interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TemporalWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BecomingPanelProps {
  className?: string;
}

export interface PlanPanelProps {
  className?: string;
  onOpenCodex: () => void;
}

export interface DreamingPanelProps {
  className?: string;
  onEmbraceJourneyClick?: () => void; // Made optional
}