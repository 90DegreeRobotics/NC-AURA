import React from 'react';
import { Character, ArchetypeId } from '../types'; 

interface ArchetypeSphereProps {
  character: Character;
  isActive: boolean;
  onClick: (id: ArchetypeId) => void;
  isHovered: boolean; 
  onHoverStart: (id: ArchetypeId) => void;
  onHoverEnd: () => void;
}

const ArchetypeSphere: React.FC<ArchetypeSphereProps> = ({
  character,
  isActive,
  onClick,
  isHovered,
  onHoverStart,
  onHoverEnd
}) => {
  const sphereSize = 'w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36'; 
  const visualStyle = character.visualStyle; 
  const positionStyle = character.position; 

  const activeEffectClasses = isActive ? visualStyle.glowActiveClasses : 'shadow-lg';
  const hoverEffectClasses = isHovered && !isActive ? visualStyle.hoverRingClasses : '';

  return (
    <div
      className="absolute group cursor-pointer transition-all duration-300 ease-in-out transform-gpu focus:outline-none"
      style={{ ...positionStyle }} 
      onClick={() => onClick(character.id)}
      onMouseEnter={() => onHoverStart(character.id)}
      onMouseLeave={() => onHoverEnd()}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`Activate ${character.name}`}
      onFocus={() => onHoverStart(character.id)} 
      onBlur={() => onHoverEnd()}      
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(character.id); }}
    >
      <div
        className={`
          ${sphereSize} 
          ${visualStyle.baseClasses} 
          rounded-full 
          flex items-center justify-center 
          text-center 
          transition-all duration-300 ease-in-out
          group-hover:scale-105 group-focus:scale-105 
          active:scale-100
          ${activeEffectClasses}
          ${hoverEffectClasses}
        `}
      >
        <span 
          className={`
            text-[0.6rem] md:text-xs lg:text-sm p-1.5 md:p-2 select-none 
            drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] 
            relative z-20 
            ${visualStyle.textClass}
          `}
        >
          {character.name}
        </span>
      </div>
    </div>
  );
};

export default ArchetypeSphere;