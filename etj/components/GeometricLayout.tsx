import React from 'react';
import { Character, ArchetypeId } from '../types';
import ArchetypeSphere from './ArchetypeSphere';

interface GeometricLayoutProps {
  characters: Character[]; 
  selectedCharacterId: ArchetypeId | null;
  onArchetypeClick: (id: ArchetypeId) => void;
  hoveredArchetypeId: ArchetypeId | null;
  setHoveredArchetypeId: (id: ArchetypeId | null) => void;
}

const GeometricLayout: React.FC<GeometricLayoutProps> = ({ 
  characters,
  selectedCharacterId, 
  onArchetypeClick, 
  hoveredArchetypeId,
  setHoveredArchetypeId
}) => {
  const centralArchetype = characters.find(a => a.id === ArchetypeId.Sentinel);
  const outerArchetypes = characters.filter(a => a.id !== ArchetypeId.Sentinel);

  return (
    <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] transition-all duration-500 mb-1 md:mb-2">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-1/2 bg-slate-800/30 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {centralArchetype && (
        <ArchetypeSphere
          key={centralArchetype.id}
          character={centralArchetype}
          isActive={selectedCharacterId === centralArchetype.id}
          onClick={onArchetypeClick}
          isHovered={hoveredArchetypeId === centralArchetype.id}
          onHoverStart={setHoveredArchetypeId}
          onHoverEnd={() => setHoveredArchetypeId(null)}
        />
      )}

      {outerArchetypes.map((character) => {
        if (!character.position) {
          console.warn(`Position not defined for outer archetype: ${character.id}`);
          return null;
        }
        return (
          <ArchetypeSphere
            key={character.id}
            character={character}
            isActive={selectedCharacterId === character.id}
            onClick={onArchetypeClick}
            isHovered={hoveredArchetypeId === character.id}
            onHoverStart={setHoveredArchetypeId}
            onHoverEnd={() => setHoveredArchetypeId(null)}
          />
        );
      })}
    </div>
  );
};

export default GeometricLayout;