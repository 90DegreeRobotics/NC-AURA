import React, { useState } from 'react';
import { PaperAirplaneIcon } from './Icons';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading, disabled }) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading && !disabled) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={disabled ? "API Key not available or AURA not initialized." : "Character, Ability: Details..."}
        rows={2} 
        className="flex-grow p-2 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder-gray-500"
        disabled={isLoading || disabled}
      />
      <button
        type="submit"
        disabled={isLoading || !prompt.trim() || disabled}
        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-[calc(2*1.5rem+2*0.5rem+2px)] aspect-square" 
        aria-label="Submit prompt"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          <PaperAirplaneIcon className="w-4 h-4" />
        )}
      </button>
    </form>
  );
};