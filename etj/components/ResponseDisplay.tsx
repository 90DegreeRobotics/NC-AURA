import React from 'react';
import { Interaction } from '../types';
import { UserIcon, SparklesIcon, ExclamationTriangleIcon } from './Icons';

export const ResponseDisplay: React.FC<{ interactions: Interaction[] }> = ({ interactions }) => {
  if (interactions.length === 0) {
    return <p className="text-gray-400 italic text-center py-4 text-xs">The council log is clear...</p>;
  }

  const getIconAndColor = (type: Interaction['type']) => {
    switch (type) {
      case 'prompt':
        return { icon: <UserIcon className="w-3.5 h-3.5 text-blue-400" />, bgColor: 'bg-gray-750/50', borderColor: 'border-blue-500' };
      case 'response':
        return { icon: <SparklesIcon className="w-3.5 h-3.5 text-green-400" />, bgColor: 'bg-gray-700/50', borderColor: 'border-green-500' };
      case 'error':
        return { icon: <ExclamationTriangleIcon className="w-3.5 h-3.5 text-red-400" />, bgColor: 'bg-red-900/50', borderColor: 'border-red-500' };
      default:
        return { icon: null, bgColor: 'bg-gray-700/50', borderColor: 'border-gray-600' };
    }
  };

  return (
    <div className="space-y-2">
      {interactions.map((interaction) => {
        const { icon, bgColor, borderColor } = getIconAndColor(interaction.type);
        return (
          <div 
            key={interaction.id} 
            className={`p-2 rounded-md shadow border-l-4 ${borderColor} ${bgColor}`}
          >
            <div className="flex items-start space-x-1.5">
              {icon && <div className="flex-shrink-0 pt-0.5">{icon}</div>}
              <div className="flex-grow min-w-0"> 
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-semibold text-xs truncate">
                    {interaction.type === 'prompt' ? 'Your Query' : `${interaction.characterName} (${interaction.abilityName})`}
                  </span>
                  <span className="text-[0.65rem] text-gray-400 flex-shrink-0 ml-1">
                    {new Date(interaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-gray-200 whitespace-pre-wrap text-[0.7rem] break-words">
                  {interaction.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};