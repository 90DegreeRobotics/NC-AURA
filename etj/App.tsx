
import React, { useState, useEffect, useCallback } from 'react';
import { Character, Ability, Interaction, ArchetypeId } from './types';
import { CHARACTERS, SENTINEL_CHARACTER_DATA, AURA_ARCHETYPE_VISUAL_STYLES, REFLECTIVE_DYNAMICS_CHECKLIST } from './constants';
import { generateCharacterResponse } from './services/geminiService';
import audioService from './services/AudioService';

// Council Components
import { PromptInput } from './components/PromptInput';
import { ResponseDisplay } from './components/ResponseDisplay';
import { InfoPanel as CouncilInfoPanel } from './components/InfoPanel';

// AURA Components
import GeometricLayout from './components/GeometricLayout';
import ArchetypeInfoPanel from './components/ArchetypeInfoPanel';
import { IconVolumeUp, IconVolumeOff, IconMicrophone, IconMicrophoneOff } from './components/Icons';
import SystemChecklistModal from './components/SystemChecklistModal';


const App: React.FC = () => {
  const [apiKeyAvailable, setApiKeyAvailable] = useState<boolean>(false);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null); // For errors in left panel
  
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<Ability | null>(null);
  const [abilityDetails, setAbilityDetails] = useState<string>('');

  const [isAudioInitialized, setIsAudioInitialized] = useState<boolean>(audioService.getIsInitialized());
  const [isMuted, setIsMuted] = useState<boolean>(audioService.getIsMuted());
  const [isMicMuted, setIsMicMuted] = useState<boolean>(true);
  const [showInitModal, setShowInitModal] = useState<boolean>(!audioService.getIsInitialized());
  const [hoveredArchetypeId, setHoveredArchetypeId] = useState<ArchetypeId | null>(null);
  const [systemStatus, setSystemStatus] = useState<string>("Click 'Enter' to begin AURA experience.");
  const [pageBgColor, setPageBgColor] = useState<string>(AURA_ARCHETYPE_VISUAL_STYLES[ArchetypeId.Sentinel].pageBackgroundColor);
  const [showChecklistModal, setShowChecklistModal] = useState<boolean>(false);


  useEffect(() => {
    const keyFromEnv = process.env.API_KEY;
    if (keyFromEnv) {
      setApiKeyAvailable(true);
    } else {
      setError("Gemini API Key (process.env.API_KEY) is not configured. AI features disabled.");
      setApiKeyAvailable(false);
    }
  }, []); 

  const handleAudioInitialization = useCallback(async () => {
    if (!isAudioInitialized) {
      await audioService.initialize();
      const initialized = audioService.getIsInitialized();
      const muted = audioService.getIsMuted();
      setIsAudioInitialized(initialized);
      setIsMuted(muted);
      setShowInitModal(!initialized);

      if (initialized && !muted) {
        audioService.playSentinelDrone(SENTINEL_CHARACTER_DATA.noteFrequency);
        setSystemStatus("AURA harmonics online. System Idle.");
      } else if (initialized && muted) {
         setSystemStatus("AURA initialized (Muted). System Idle.");
      } else {
         setSystemStatus("Audio initialization failed. Please check browser permissions.");
      }
    }
  }, [isAudioInitialized]);

  useEffect(() => {
     if (isAudioInitialized && !isMuted) {
        setSystemStatus("AURA harmonics online. System Idle.");
        if (SENTINEL_CHARACTER_DATA) {
            audioService.playSentinelDrone(SENTINEL_CHARACTER_DATA.noteFrequency);
        }
     } else if (isAudioInitialized && isMuted) {
        setSystemStatus("AURA initialized (Muted). System Idle.");
        audioService.stopSentinelDrone();
     } else if (!isAudioInitialized) {
        setSystemStatus("Click 'Enter' to begin AURA experience.");
     }
  }, [isAudioInitialized, isMuted]);

  const handleCharacterSelectFromSphere = useCallback(async (id: ArchetypeId) => {
    if (!isAudioInitialized) {
      setShowInitModal(true);
      setSystemStatus("Please initialize AURA first by clicking 'Enter'.");
      return;
    }
    
    const character = CHARACTERS.find(c => c.id === id);
    if (!character) return;

    setSelectedCharacter(character);
    setSelectedAbility(character.abilities.length > 0 ? character.abilities[0] : null);
    setAbilityDetails('');
    setLocalError(null); 
    setPageBgColor(character.visualStyle.pageBackgroundColor);

    if (!isMuted) {
        audioService.playNote(character.id, character.noteFrequency);
    }
    let statusMessage = `${character.name} selected. `;
    if (character.abilities.length > 0) {
        statusMessage += `Ability "${character.abilities[0].name}" pre-selected.`;
    } else {
        statusMessage += 'No abilities defined.';
    }
    if (isMuted) statusMessage += " (Sound Muted)";
    setSystemStatus(statusMessage);

  }, [isAudioInitialized, isMuted]);

   const handleAbilitySelect = (ability: Ability) => {
    setSelectedAbility(ability);
    setLocalError(null); 
  };

  const processGeminiRequest = useCallback(async (character: Character, ability: Ability, details: string) => {
    if (!apiKeyAvailable) {
      setLocalError("Cannot process prompt: API Key is not available.");
      setIsLoading(false);
      return;
    }
    
    const currentApiKey = process.env.API_KEY;
    if (!currentApiKey) {
      setLocalError("API Key is not configured in the environment. Cannot process request.");
      setIsLoading(false);
      const errInteraction: Interaction = {
        id: Date.now().toString() + '_cfg_err', type: 'error', characterName: character.name, abilityName: ability.name,
        content: "Configuration Error: API Key missing.", timestamp: new Date(),
      };
      setInteractions(prev => [errInteraction, ...prev].slice(0, 50));
      return;
    }

    setIsLoading(true);
    setLocalError(null);
    setError(null); 

    const newInteractionRequest: Interaction = {
      id: Date.now().toString() + '_req',
      type: 'prompt',
      characterName: character.name,
      abilityName: ability.name,
      content: details || `Invoking ${ability.name}`,
      timestamp: new Date(),
    };
    setInteractions(prev => [newInteractionRequest, ...prev].slice(0, 50));

    try {
      const populatedPromptTemplate = ability.geminiPromptTemplate.replace(/\$\{details\}/g, details);
      const systemInstruction = `You are ${character.name}, embodying the archetype of ${character.archetype}. You are using your ability: "${ability.name}". Respond in character, focused on the ability's purpose. Keep responses concise and impactful.`;
      const userPrompt = `As ${character.name}, the ${character.archetype}, using your "${ability.name}" ability, respond to: ${populatedPromptTemplate}`;
      
      const responseText = await generateCharacterResponse(systemInstruction, userPrompt, currentApiKey);
      
      const newInteractionResponse: Interaction = {
        id: Date.now().toString() + '_res',
        type: 'response',
        characterName: character.name,
        abilityName: ability.name,
        content: responseText,
        timestamp: new Date(),
      };
      setInteractions(prev => [newInteractionResponse, ...prev].slice(0, 50));
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while fetching the response.";
      setLocalError(errorMessage); 
      const newInteractionError: Interaction = {
        id: Date.now().toString() + '_err',
        type: 'error',
        characterName: character.name,
        abilityName: ability.name,
        content: `Error: ${errorMessage}`,
        timestamp: new Date(),
      };
      setInteractions(prev => [newInteractionError, ...prev].slice(0, 50));
    } finally {
      setIsLoading(false);
    }
  }, [apiKeyAvailable]);

  const handleDirectAbilityCall = useCallback(async () => {
    if (!selectedCharacter || !selectedAbility) {
        setLocalError("Please select a character and an ability.");
        return;
    }
    await processGeminiRequest(selectedCharacter, selectedAbility, abilityDetails);
  }, [selectedCharacter, selectedAbility, abilityDetails, processGeminiRequest]);

  const parseAndProcessFullCommand = useCallback(async (fullPrompt: string) => {
    setLocalError(null);
    const parts = fullPrompt.split(/,\s*|\s*:\s*/);
    if (parts.length < 2) {
      setLocalError("Invalid prompt format. Use: Character Name, Ability Name: Details (details optional).");
      return;
    }
    
    const characterName = parts[0].trim();
    const abilityName = parts[1].trim();
    const details = parts.length > 2 ? parts.slice(2).join(':').trim() : '';

    const character = CHARACTERS.find(c => c.name.toLowerCase() === characterName.toLowerCase());
    if (!character) {
      setLocalError(`Character "${characterName}" not found.`);
      return;
    }

    const ability = character.abilities.find(a => a.name.toLowerCase() === abilityName.toLowerCase());
    if (!ability) {
      setLocalError(`Ability "${abilityName}" not found for ${characterName}.`);
      return;
    }
    
    if (selectedCharacter?.id !== character.id || selectedAbility?.name !== ability.name) {
        setSelectedCharacter(character);
        setSelectedAbility(ability);
        setPageBgColor(character.visualStyle.pageBackgroundColor);
        if (!isMuted) audioService.playNote(character.id, character.noteFrequency);
    }
    setAbilityDetails(details); 

    await processGeminiRequest(character, ability, details);
  }, [processGeminiRequest, isMuted, selectedCharacter, selectedAbility]);

  const toggleMute = useCallback(async () => {
    if (!isAudioInitialized) {
      const currentMuteState = audioService.getIsMuted();
      setIsMuted(!currentMuteState);
      setSystemStatus(!currentMuteState ? "Audio Muted (AURA not yet initialized)." : "Audio Unmuted (AURA not yet initialized).");
      return; 
    }
    const muted = await audioService.toggleMute();
    setIsMuted(muted);
  }, [isAudioInitialized]);
  
  const toggleMicMute = useCallback(() => {
    setIsMicMuted(prev => {
      const newMicStatus = !prev;
      setSystemStatus(newMicStatus ? "Microphone Muted." : "Microphone Active.");
      return newMicStatus;
    });
  }, []);

  const currentHoveredCharacter = hoveredArchetypeId ? CHARACTERS.find(c => c.id === hoveredArchetypeId) : null;

  return (
    <div className={`h-screen w-screen flex flex-col text-gray-100 transition-colors duration-1000 ${pageBgColor} overflow-hidden`}>
      
      {!apiKeyAvailable && error && (
         <div className="p-2 text-xs bg-red-800 text-white text-center fixed top-0 left-0 right-0 z-[60] shadow-lg">{error}</div>
      )}

      <main className={`flex-grow flex flex-row items-stretch p-2 md:p-3 space-x-2 md:space-x-3 overflow-hidden w-full h-full ${!apiKeyAvailable && error ? 'pt-8' : 'pt-2'}`}>
        {/* Left Panel: Council Interaction */}
        <div className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 flex flex-col space-y-2 md:space-y-3 bg-slate-800/50 backdrop-blur-md rounded-lg p-2 md:p-3 shadow-xl overflow-y-auto custom-scrollbar">
          <h2 className="text-lg md:text-xl font-semibold text-indigo-300 mb-1 sticky top-0 bg-slate-800/70 backdrop-blur-sm py-1.5 z-10">Council Chamber</h2>
          {selectedCharacter && isAudioInitialized ? (
            <CouncilInfoPanel 
              selectedCharacter={selectedCharacter}
              selectedAbility={selectedAbility}
              onAbilitySelect={handleAbilitySelect}
              abilityDetails={abilityDetails}
              onAbilityDetailsChange={setAbilityDetails}
              onInvoke={handleDirectAbilityCall}
              isLoading={isLoading}
              apiKeyAvailable={apiKeyAvailable}
            />
          ) : (
            <div className="text-center text-slate-400 py-10 text-sm">
              { !isAudioInitialized ? "Initialize AURA to interact." : "Select an Archetype from the Ethers."}
            </div>
          )}
          
          <div className="pt-2">
             <h3 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-indigo-300">Full Command</h3>
             <PromptInput onSubmit={parseAndProcessFullCommand} isLoading={isLoading} disabled={!apiKeyAvailable || !isAudioInitialized} />
          </div>
          
          {localError && <div className="p-2 bg-red-700 text-white rounded-md text-xs shadow-lg" role="alert">{localError}</div>}
        </div>

        {/* Center Panel: AURA Title, Hover Info, Spheres */}
        <div className="flex-grow flex flex-col items-center justify-center overflow-hidden px-2">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold aura-title-effect mb-2 md:mb-3 select-none">
              AURA
            </h1>
            <ArchetypeInfoPanel archetype={currentHoveredCharacter} />
            {isAudioInitialized && CHARACTERS.length > 0 ? (
              <GeometricLayout
                  characters={CHARACTERS}
                  selectedCharacterId={selectedCharacter?.id || null}
                  onArchetypeClick={handleCharacterSelectFromSphere}
                  hoveredArchetypeId={hoveredArchetypeId}
                  setHoveredArchetypeId={setHoveredArchetypeId}
              />
            ) : (
              <div className="h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                 {!isAudioInitialized && <p className="text-lg text-slate-400">Initializing AURA Interface...</p>}
                 {isAudioInitialized && CHARACTERS.length === 0 && <p>No characters defined.</p>}
              </div>
            )}
        </div>

        {/* Right Panel: Council Log */}
        <div className="w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 flex flex-col bg-slate-900/40 backdrop-blur-md p-2 md:p-3 rounded-lg shadow-xl overflow-hidden">
            <h2 className="text-lg md:text-xl font-semibold text-indigo-300 mb-2 sticky top-0 bg-slate-900/60 backdrop-blur-sm py-1.5 z-10">Council Log</h2>
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
                <ResponseDisplay interactions={interactions} />
            </div>
        </div>
      </main>
      
      <div className="fixed top-3 right-3 md:top-4 md:right-4 flex flex-col space-y-2 z-50">
        <button
          onClick={toggleMute}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full shadow-lg transition-colors"
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <IconVolumeOff className="w-5 h-5 text-slate-300" /> : <IconVolumeUp className="w-5 h-5 text-slate-100" />}
        </button>
        <button
          onClick={toggleMicMute}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-full shadow-lg transition-colors"
          aria-label={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
        >
          {isMicMuted ? <IconMicrophoneOff className="w-5 h-5 text-slate-300" /> : <IconMicrophone className="w-5 h-5 text-green-400" />}
        </button>
      </div>

      {showInitModal && (
         <div className={`fixed inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm transition-opacity duration-500 ease-in-out ${showInitModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-slate-800 p-5 md:p-6 text-center border border-slate-700 transform transition-all duration-500 ease-in-out shadow-2xl
                           w-60 h-60 md:w-64 md:h-64 rounded-full 
                           flex flex-col items-center justify-center
                           ${showInitModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Welcome.
                </h2>
                <p className="mb-4 text-slate-300 text-xs md:text-sm">
                  The council awaits. Your focus shapes this realm.
                </p>
                <button
                    className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
                    onClick={handleAudioInitialization}
                >
                    Enter AURA
                </button>
            </div>
        </div>
      )}

      {showChecklistModal && (
        <SystemChecklistModal 
          checklistContent={REFLECTIVE_DYNAMICS_CHECKLIST}
          onClose={() => setShowChecklistModal(false)}
        />
      )}

      <footer className="fixed bottom-0 left-0 right-0 text-center text-[0.6rem] text-slate-600 p-0.5 bg-black/10 backdrop-blur-sm flex justify-between items-center px-2">
        <span>AURA Harmonic Council AI. Status: {systemStatus}</span>
        <button 
          onClick={() => setShowChecklistModal(true)} 
          className="text-slate-500 hover:text-slate-300 underline text-[0.6rem]"
          aria-label="Show System Checklist"
        >
          System Checklist
        </button>
      </footer>
    </div>
  );
};

export default App;