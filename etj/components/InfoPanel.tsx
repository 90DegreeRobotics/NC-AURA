import React from 'react';
import { Character, Ability } from '../types';

interface InfoPanelProps {
  selectedCharacter: Character | null;
  selectedAbility: Ability | null;
  onAbilitySelect: (ability: Ability) => void;
  abilityDetails: string;
  onAbilityDetailsChange: (details: string) => void;
  onInvoke: () => void;
  isLoading: boolean;
  apiKeyAvailable: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ 
  selectedCharacter, 
  selectedAbility, 
  onAbilitySelect,
  abilityDetails,
  onAbilityDetailsChange,
  onInvoke,
  isLoading,
  apiKeyAvailable 
}) => {
  if (!selectedCharacter) {
    return null; 
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm p-2 md:p-2.5 rounded-lg shadow-lg border border-slate-700/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1.5 md:mb-2">
        <div>
          <h2 className="text-md md:text-lg font-bold text-indigo-300 flex items-center">
            {selectedCharacter.name}
            <span className="ml-1.5 text-xs font-normal text-purple-400">({selectedCharacter.archetype})</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{selectedCharacter.longDescription}</p>
        </div>
      </div>
      
      <div className="space-y-1.5 md:space-y-2">
        <div>
          <label htmlFor="ability-select" className="block text-xs font-medium text-gray-300 mb-0.5">Select Ability:</label>
          <select
            id="ability-select"
            value={selectedAbility?.name || ''}
            onChange={(e) => {
              const ability = selectedCharacter.abilities.find(a => a.name === e.target.value);
              if (ability) onAbilitySelect(ability);
            }}
            className="w-full p-1.5 text-xs bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            disabled={selectedCharacter.abilities.length === 0}
          >
            <option value="" disabled>-- Select --</option>
            {selectedCharacter.abilities.map(ability => (
              <option key={ability.name} value={ability.name}>{ability.name}</option>
            ))}
          </select>
        </div>

        {selectedAbility && (
          <div>
            <label htmlFor="ability-details" className="block text-xs font-medium text-gray-300 mb-0.5">
              Details for "{selectedAbility.name}":
            </label>
            <textarea
              id="ability-details"
              rows={2} 
              value={abilityDetails}
              onChange={(e) => onAbilityDetailsChange(e.target.value)}
              placeholder={selectedAbility.placeholderText || "Details..."}
              className="w-full p-1.5 text-xs bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-0.5">{selectedAbility.description}</p>
          </div>
        )}

        <button
          onClick={onInvoke}
          disabled={isLoading || !selectedAbility || !apiKeyAvailable}
          className="w-full px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Consulting...' : `Invoke ${selectedAbility?.name || 'Ability'}`}
        </button>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-700/50">
        <h4 className="text-xs font-medium text-gray-400 mb-1">Character Artwork</h4>
        <div className="h-24 bg-slate-700/40 rounded-md border border-dashed border-slate-600 flex items-center justify-center">
          <p className="text-xs text-slate-500">Artwork Placeholder</p>
        </div>
      </div>

    </div>
  );
};