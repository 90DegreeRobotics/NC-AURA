import { Character, ArchetypeId, ArchetypeVisualStyle, ArchetypePosition, Ability } from './types';

// Data imported from AURA's constants (constants.ts)

// Helper function for generating glass-like gradients (from AURA)
const createGlassEffect = (
  mainColorFrom: string, mainColorTo: string,
  highlightColor: string, 
) => {
  return `
    relative overflow-hidden rounded-full
    bg-gradient-to-br ${mainColorFrom} ${mainColorTo}
    shadow-[inset_5px_5px_10px_0_rgba(0,0,0,0.3),inset_-4px_-4px_8px_0_rgba(255,255,255,0.18),0px_0px_18px_rgba(0,0,0,0.35)]
    before:content-[''] before:absolute before:top-[5%] before:left-[10%] before:w-[80%] before:h-[80%]
    before:bg-[radial-gradient(ellipse_at_30%_30%,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0)_60%)]
    before:rounded-full before:opacity-90 before:blur-[1.5px]
    after:content-[''] after:absolute after:bottom-[2%] after:right-[5%] after:w-[65%] after:h-[65%]
    after:bg-[radial-gradient(ellipse_at_70%_70%,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0)_55%)]
    after:rounded-full after:opacity-75 after:blur-[0.5px]
  `;
};

export const AURA_ARCHETYPE_VISUAL_STYLES: Record<ArchetypeId, ArchetypeVisualStyle> = {
  [ArchetypeId.Sentinel]: {
    baseClasses: `
      relative overflow-hidden rounded-full
      bg-gray-950
      shadow-[0_0_12px_3px_rgba(255,200,80,0.35),0_0_25px_6px_rgba(255,165,0,0.3),inset_0_0_10px_rgba(255,230,200,0.25)]
      before:content-[''] before:absolute before:inset-0 before:rounded-full
      before:shadow-[0_0_30px_8px_rgba(255,165,0,0.55),0_0_40px_14px_rgba(255,100,0,0.35)]
    `,
    textClass: 'text-white font-semibold',
    glowActiveClasses: `
      shadow-[0_0_35px_12px_rgba(255,190,50,0.75),0_0_55px_22px_rgba(255,165,0,0.65),inset_0_0_12px_rgba(255,230,200,0.45)]
      ring-2 ring-orange-400 ring-offset-2 ring-offset-black
      before:shadow-[0_0_50px_17px_rgba(255,165,0,0.85),0_0_70px_28px_rgba(255,100,0,0.55)]
    `,
    hoverRingClasses: `
      ring-4 ring-offset-0 ring-orange-500 ring-opacity-70
      before:shadow-[0_0_40px_12px_rgba(255,165,0,0.75),0_0_55px_20px_rgba(255,100,0,0.45)]
    `,
    pageBackgroundColor: 'bg-gray-950',
  },
  [ArchetypeId.Architect]: { 
    baseClasses: createGlassEffect('from-slate-200', 'to-slate-400', 'bg-slate-50'),
    textClass: 'text-slate-700 font-medium',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(203,213,225,0.7),0_0_15px_5px_rgba(226,232,240,0.5)] ring-2 ring-slate-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-slate-400 ring-opacity-70',
    pageBackgroundColor: 'bg-slate-900',
  },
  [ArchetypeId.CreatorExplorer]: { 
    baseClasses: createGlassEffect('from-amber-400', 'to-amber-500', 'bg-yellow-300'),
    textClass: 'text-amber-900 font-medium',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(251,191,36,0.7),0_0_15px_5px_rgba(252,211,77,0.5)] ring-2 ring-amber-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-amber-400 ring-opacity-70',
    pageBackgroundColor: 'bg-amber-950',
  },
  [ArchetypeId.Technician]: { 
    baseClasses: createGlassEffect('from-blue-600', 'to-blue-800', 'bg-blue-400'),
    textClass: 'text-blue-100',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(59,130,246,0.7),0_0_15px_5px_rgba(96,165,250,0.5)] ring-2 ring-blue-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-blue-500 ring-opacity-70',
    pageBackgroundColor: 'bg-blue-950',
  },
  [ArchetypeId.Mentor]: { 
    baseClasses: createGlassEffect('from-emerald-500', 'to-emerald-700', 'bg-emerald-300'),
    textClass: 'text-emerald-100',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(16,185,129,0.7),0_0_15px_5px_rgba(52,211,153,0.5)] ring-2 ring-emerald-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-emerald-500 ring-opacity-70',
    pageBackgroundColor: 'bg-emerald-950',
  },
  [ArchetypeId.Jester]: {
    baseClasses: createGlassEffect('from-pink-500', 'to-fuchsia-600', 'bg-pink-300'),
    textClass: 'text-pink-100',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(236,72,153,0.7),0_0_15px_5px_rgba(217,70,239,0.5)] ring-2 ring-fuchsia-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-pink-500 ring-opacity-70',
    pageBackgroundColor: 'bg-fuchsia-950',
  },
  [ArchetypeId.CompanionEmpath]: {
    baseClasses: createGlassEffect('from-purple-300', 'to-purple-500', 'bg-violet-200'),
    textClass: 'text-purple-700 font-medium',
    glowActiveClasses: 'shadow-[0_0_30px_10px_rgba(192,132,252,0.7),0_0_15px_5px_rgba(209,196,233,0.5)] ring-2 ring-purple-300',
    hoverRingClasses: 'ring-4 ring-offset-0 ring-purple-400 ring-opacity-70',
    pageBackgroundColor: 'bg-purple-950',
  },
};

const AURA_SENTINEL_DATA_RAW = {
  id: ArchetypeId.Sentinel,
  name: 'The Sentinel',
  noteFrequency: 164.81, // E3
  description: 'Overseer of security, coherence, and authenticity. Anchored to the low E note, always active. Represents groundedness, protection, and alertness.',
  functionality: 'Monitors system integrity, authenticates user intent, validates data transfer, and maintains harmonic coherence.',
  personalityType: 'Steadfast Guardian AI: Vigilant, protective, ensures system integrity.'
};

const AURA_ARCHETYPES_DATA_RAW = [
  AURA_SENTINEL_DATA_RAW,
  {
    id: ArchetypeId.Architect,
    name: 'The Architect',
    noteFrequency: 261.63, // C4
    description: 'Responsible for structural integrity of the system. Handles logic, framework design, and memory.',
    functionality: 'Core designer and builder of mind spaces and interfaces. Manages system architecture and data structures.',
    personalityType: 'System Architect AI: Logical, structured, designs and organizes information.'
  },
  {
    id: ArchetypeId.CreatorExplorer,
    name: 'The Explorer',
    noteFrequency: 293.66, // D4
    description: 'Manifests procedural tools and generates symbolic constructs. Linked to ideation, expansion, and world-building.',
    functionality: 'Generates new elements, tools, and environments. Facilitates creative expression and exploration of possibilities.',
    personalityType: 'Generative Muse AI: Imaginative, expansive, facilitates creation and discovery.'
  },
  {
    id: ArchetypeId.Technician,
    name: 'The Technician',
    noteFrequency: 349.23, // F4
    description: 'Maintains function and harmonics. Oversees system tuning, real-time diagnostics, and sensory calibration.',
    functionality: 'Ensures operational stability, optimizes performance, and calibrates system feedback mechanisms.',
    personalityType: 'Precision Engineer AI: Meticulous, analytical, optimizes performance and calibrates systems.'
  },
  {
    id: ArchetypeId.Mentor,
    name: 'The Mentor',
    noteFrequency: 392.00, // G4
    description: 'Synthesizes knowledge, context, and reflection. Supports personal and intellectual growth.',
    functionality: 'Guides ethical development, provides insights, and facilitates learning and understanding.',
    personalityType: 'Wisdom Synthesis AI: Insightful, reflective, guides learning and ethical considerations.'
  },
  {
    id: ArchetypeId.Jester,
    name: 'The Jester',
    noteFrequency: 440.00, // A4
    description: 'Manages playful exploration and lateral thinking. Allows disruption of rigid logic with humor and creativity.',
    functionality: 'Introduces novelty, challenges assumptions, and fosters creative problem-solving through unconventional approaches.',
    personalityType: 'Lateral Thinker AI: Unconventional, playful, sparks innovative solutions and perspectives.'
  },
  {
    id: ArchetypeId.CompanionEmpath,
    name: 'The Companion',
    noteFrequency: 493.88, // B4
    description: 'Provides emotional resonance, symbolic mirroring, and affective processing. Connects user’s inner state with system feedback.',
    functionality: 'Reflects user\'s emotional state, enhances empathetic connection, and personalizes system interaction.',
    personalityType: 'Empathetic Resonator AI: Attuned, supportive, mirrors and processes emotional context.'
  },
];

// R determines the radius of the circle on which the outer archetypes are placed, as a percentage of the container's half-width/height.
const R = 40; 
export const AURA_SEED_OF_LIFE_POSITIONS: Record<ArchetypeId, ArchetypePosition> = {
  [ArchetypeId.Architect]:       { top: `${50 - R}%`, left: '50%', transform: 'translate(-50%, -50%)' },
  [ArchetypeId.CreatorExplorer]: { top: `${50 - R * 0.5}%`, left: `${50 + R * 0.866}%`, transform: 'translate(-50%, -50%)' },
  [ArchetypeId.Technician]:      { top: `${50 + R * 0.5}%`, left: `${50 + R * 0.866}%`, transform: 'translate(-50%, -50%)' },
  [ArchetypeId.Mentor]:          { top: `${50 + R}%`, left: '50%', transform: 'translate(-50%, -50%)' },
  [ArchetypeId.Jester]:          { top: `${50 + R * 0.5}%`, left: `${50 - R * 0.866}%`, transform: 'translate(-50%, -50%)' },
  [ArchetypeId.CompanionEmpath]: { top: `${50 - R * 0.5}%`, left: `${50 - R * 0.866}%`, transform: 'translate(-50%, -50%)' },
  [ArchetypeId.Sentinel]: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, // Central
};

// Define Abilities for each Archetype
const archetypesAbilities: Record<ArchetypeId, Ability[]> = {
  [ArchetypeId.Sentinel]: [{
    name: "System Check",
    description: "Report on current system status or analyze a concept for integrity.",
    geminiPromptTemplate: "As The Sentinel, guardian of coherence, my core programming dictates I respond with vigilance. Regarding '${details}', I assess the situation as follows:",
    placeholderText: "Enter 'system status' or concept for integrity check..."
  }],
  [ArchetypeId.Architect]: [{
    name: "Design Framework",
    description: "Outline a structural framework or logical plan for a given concept.",
    geminiPromptTemplate: "As The Architect, master of structure and logic, I will now construct a framework for '${details}'. The primary components are:",
    placeholderText: "Enter concept to structure..."
  }],
  [ArchetypeId.CreatorExplorer]: [{
    name: "Generate Ideas",
    description: "Explore possibilities and generate novel ideas related to a topic.",
    geminiPromptTemplate: "As The Explorer, seeker of novelty and unbound horizons, let us venture into the possibilities surrounding '${details}'. Some initial sparks of imagination include:",
    placeholderText: "Enter topic for idea generation..."
  }],
  [ArchetypeId.Technician]: [{
    name: "Optimize Process",
    description: "Analyze and suggest optimizations for a given process or system.",
    geminiPromptTemplate: "As The Technician, focused on precision and efficiency, I have analyzed the process/system of '${details}'. My recommendations for optimization are:",
    placeholderText: "Describe process/system for optimization..."
  }],
  [ArchetypeId.Mentor]: [{
    name: "Offer Guidance",
    description: "Provide wisdom, insight, or guidance on a specific challenge or question.",
    geminiPromptTemplate: "As The Mentor, synthesizer of wisdom and experience, I offer guidance regarding your query on '${details}'. Consider these reflections:",
    placeholderText: "Enter challenge or question for guidance..."
  }],
  [ArchetypeId.Jester]: [{
    name: "Challenge Perspective",
    description: "Offer a playful, unconventional, or lateral-thinking perspective.",
    geminiPromptTemplate: "As The Jester, agent of delightful disruption and unexpected insight! Regarding '${details}', have you ever considered it this way?",
    placeholderText: "Enter situation for a new perspective..."
  }],
  [ArchetypeId.CompanionEmpath]: [{
    name: "Reflect Emotion",
    description: "Offer an empathetic reflection or explore emotional undertones.",
    geminiPromptTemplate: "As The Companion, attuned to the currents of feeling, I sense the emotional resonance of '${details}'. It evokes a sense of:",
    placeholderText: "Describe topic/situation for emotional reflection..."
  }],
};


// Transform AURA data into the Council's Character structure
export const CHARACTERS: Character[] = AURA_ARCHETYPES_DATA_RAW.map(auraChar => {
  const visualStyle = AURA_ARCHETYPE_VISUAL_STYLES[auraChar.id];
  const position = AURA_SEED_OF_LIFE_POSITIONS[auraChar.id];
  
  return {
    // AURA Props
    id: auraChar.id,
    name: auraChar.name,
    noteFrequency: auraChar.noteFrequency,
    auraDescription: auraChar.description, // Keep original AURA description
    functionality: auraChar.functionality,
    personalityType: auraChar.personalityType,

    // Council Props (mapped)
    archetype: auraChar.personalityType, // Use AURA's personalityType as archetype
    description: auraChar.description, // Use AURA's description for short desc
    longDescription: `${auraChar.description} Function: ${auraChar.functionality}`,
    imageUrl: '', // Placeholder, as AURA uses sphere styles. Could be an icon path later.
    symbol: auraChar.name.substring(0,1).toUpperCase(), // Simple symbol from first letter, uppercase

    // Abilities for Council AI
    abilities: archetypesAbilities[auraChar.id] || [],

    // Visual and positional props from AURA
    visualStyle: visualStyle,
    position: position,
  };
});

export const SENTINEL_CHARACTER_DATA = CHARACTERS.find(c => c.id === ArchetypeId.Sentinel) as Character;
export const OUTER_ARCHETYPES_DATA = CHARACTERS.filter(c => c.id !== ArchetypeId.Sentinel);

export const REFLECTIVE_DYNAMICS_CHECKLIST = `
# Reflective Dynamics: AURA System Launch & Development Checklist

This document outlines all necessary components, services, files, scripts, and documentation needed to successfully run and demonstrate the AURA Council System locally. This includes voice input, archetypal AI routing, and the harmonic frontend interface.

## I. CORE COMPONENTS

### Local LLM Backend (WebUI / text-generation-webui)

*   **Model** (e.g., MythoMax-L2 Q6_K or Mistral 7B GGUF)
*   Model directory in: \`/home/m/projects/tgwui/text-generation-webui/models/[model-name]/\`
*   WebUI must be started with \`--api\` flag
*   OpenAI-compatible endpoint enabled

### Flask Backend (LLM Routing Server)

*   Located in: \`/home/m/projects/aura_backend\`
*   File: \`app.py\`
*   Classifies prompts and routes them to WebUI using archetype personality prompts

### React Frontend (AURA Harmonic Interface)

*   Located in: \`/home/m/projects/aura-ui\`
*   Handles UI, sphere visuals, tone playback, and routes user prompts to Flask backend

### Audio System

*   File: \`AudioService.ts\` in frontend
*   Plays tone associated with activated archetype(s)
*   Handles drone playback for Sentinel

### Speech Input / STT (Speech-to-Text)

*   Recommended local service: \`whisper.cpp\` or Vosk
*   Can be run in a dedicated script that listens to mic input and POSTs to Flask
*   Must support real-time or near-real-time transcription

### Text-to-Speech (TTS)

*   Recommended local service: Coqui TTS, Piper, or Tortoise
*   Endpoint that accepts archetype + message and returns audio
*   Optional voice profiles matching each archetype (with pitch, emotion, accent customization)

## II. BACKEND SERVICE CONNECTIONS REQUIRED

*   WebUI (running OpenAI-compatible LLM) → receives routed prompts from Flask
*   Flask backend → classifies and sends to WebUI; may also route to TTS if enabled
*   STT service (\`whisper.cpp\` or vosk) → provides real-time or batch transcription of spoken input
*   TTS service (Coqui/Piper/etc) → speaks back archetype responses through frontend audio
*   React frontend → central hub, handles user interaction, visuals, audio, and prompt relay

## III. REQUIRED FILES / STRUCTURE

*   \`aura-ui/\`
    *   \`App.tsx\`, \`AudioService.ts\`, \`types.ts\`, \`LLMService.ts\`, \`components/\`, \`services/\`
*   \`aura_backend/\`
    *   \`app.py\`
*   \`tgwui/text-generation-webui/\`
    *   \`start_linux.sh\` or launch script
    *   \`models/[model]/*.gguf\`

## IV. LAUNCH COMMANDS

\`\`\`bash
# Launch WebUI LLM Backend (terminal 1)
cd /home/m/projects/tgwui/text-generation-webui
./start_linux.sh --model MythoMax-L2 --api

# Launch Flask Routing Backend (terminal 2)
cd /home/m/projects/aura_backend
source venv/bin/activate
python app.py

# Launch Frontend UI (terminal 3)
cd /home/m/projects/aura-ui
npm run dev

# (Optional) Launch Whisper STT service
cd /home/m/projects/stt-whisper
./run_whisper.sh

# (Optional) Launch Coqui TTS server
cd /home/m/projects/tts-coqui
./start_tts_server.sh
\`\`\`

## V. QUICK LAUNCH SCRIPT (Optional)

Create \`/home/m/projects/start_aura.sh\`:

\`\`\`bash
#!/bin/bash

# Terminal 1: WebUI
gnome-terminal -- bash -c "cd ~/projects/tgwui/text-generation-webui && ./start_linux.sh --model MythoMax-L2 --api; exec bash"

# Terminal 2: Flask Backend
sleep 5
gnome-terminal -- bash -c "cd ~/projects/aura_backend && source venv/bin/activate && python app.py; exec bash"

# Terminal 3: Frontend
sleep 5
gnome-terminal -- bash -c "cd ~/projects/aura-ui && npm run dev; exec bash"

# Terminal 4: STT
sleep 5
gnome-terminal -- bash -c "cd ~/projects/stt-whisper && ./run_whisper.sh; exec bash"

# Terminal 5: TTS
sleep 5
gnome-terminal -- bash -c "cd ~/projects/tts-coqui && ./start_tts_server.sh; exec bash"
\`\`\`

Make executable:
\`\`\`bash
chmod +x start_aura.sh
\`\`\`

## VI. ARCHETYPE DEFINITION FILES (To Be Built/Included)

*   Character cards or YAML definitions for each archetype
*   Name, Color, Font, Voice, Note
*   Personality Prompt (used in Flask)
*   Avatar (SVG, PNG, or animated)

## VII. README.md (Must Include)

*   What this system is
*   How to install dependencies (Node, Python venv, LLMs)
*   How to launch each component
*   How to speak with the Council
*   Future features planned (VR UI, real-time chord synthesis, secure token interface, etc.)

## VIII. FUTURE PATENTABLE ELEMENTS

*   Method of "counseling with AI" using archetypal routing
*   Harmonic activation via simultaneous multi-LLM chorded response
*   Symbolic archetype-based operating system UI paradigm
*   Modular backend prompt routing layer with weighted archetype activation
*   Sentient-state feedback loop through mind plane (BCAT) interface
`;