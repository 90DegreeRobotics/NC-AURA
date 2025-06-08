export enum ArchetypeId {
  Sentinel = 'sentinel',
  Architect = 'architect',
  CreatorExplorer = 'creatorExplorer', // Matches AURA's naming
  Technician = 'technician',
  Mentor = 'mentor',
  Jester = 'jester',
  CompanionEmpath = 'companionEmpath', // Matches AURA's naming
}

export interface Ability {
  name: string;
  description: string;
  geminiPromptTemplate: string; // e.g., "Analyze this: ${details}"
  placeholderText?: string;
}

export interface ArchetypeVisualStyle {
  baseClasses: string;
  textClass: string;
  glowActiveClasses: string;
  hoverRingClasses: string;
  pageBackgroundColor: string;
}

export interface ArchetypePosition {
  top: string;
  left: string;
  transform: string;
}

// This is the main Character type for the application, combining Council and AURA concepts
export interface Character {
  // From AURA Archetype
  id: ArchetypeId;
  name: string;
  noteFrequency: number;
  auraDescription: string; // Original AURA description
  functionality: string;
  personalityType: string;
  
  // Council properties / Mapped from AURA
  archetype: string; // Can be same as personalityType or a simplified version
  description: string; // Short description for quick view (can be same as AURA's description)
  longDescription: string; // Detailed description (can combine AURA's desc + func)
  imageUrl: string; // For Council's CharacterCard if ever used, or new visual elements. For now, spheres are the visual.
                      // We can assign a placeholder or derive from visualStyle if needed.
  symbol?: string; // e.g. an emoji or simple icon idea

  // Specific to Council AI interaction
  abilities: Ability[];

  // For AURA layout and styling
  visualStyle: ArchetypeVisualStyle;
  position?: ArchetypePosition; // Optional as Sentinel might not use SEED_OF_LIFE_POSITIONS directly
}

export interface Interaction {
  id: string;
  type: 'prompt' | 'response' | 'error' | 'system';
  characterName?: string;
  abilityName?: string;
  content: string;
  timestamp: Date;
}