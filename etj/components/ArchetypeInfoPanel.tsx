import React from 'react';
import { Character } from '../types'; 

interface ArchetypeInfoPanelProps {
  archetype: Character | null | undefined; 
}

const ArchetypeInfoPanel: React.FC<ArchetypeInfoPanelProps> = ({ archetype }) => {
  if (!archetype) {
    return (
      <div className="w-full max-w-2xl p-3 md:p-4 h-44 bg-slate-800/50 border border-slate-700/50 rounded-xl shadow-xl text-center flex items-center justify-center mb-2 md:mb-4 transition-all duration-300 ease-in-out backdrop-blur-sm">
        <p className="text-slate-400 text-base md:text-lg">Hover over an Archetype Node to view its details.</p>
      </div>
    );
  }

  const visualStyle = archetype.visualStyle;

  return (
    <div className="w-full max-w-2xl p-3 md:p-4 h-44 bg-slate-800/70 border border-slate-700/70 rounded-xl shadow-2xl mb-2 md:mb-4 transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-md flex flex-col justify-center">
      <h3 className={`text-xl md:text-2xl font-bold mb-0.5 ${visualStyle.textClass} tracking-wide truncate`}>{archetype.name}</h3>
      <p className={`text-xs md:text-sm font-semibold mb-1 text-purple-300 italic truncate`}>{archetype.personalityType}</p>
      <p className="text-slate-300 text-xs md:text-sm mb-1.5 line-clamp-3">{archetype.auraDescription}</p>
      <p className="text-slate-400 text-xs italic opacity-80 line-clamp-1">Function: {archetype.functionality}</p>
    </div>
  );
};

export default ArchetypeInfoPanel;