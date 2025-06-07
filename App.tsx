
import React, { useState, useEffect } from 'react';
import { BecomingPanel } from './components/BecomingPanel';
import { PlanPanel } from './components/PlanPanel';
import { DreamingPanel } from './components/DreamingPanel';
import { CodexModal } from './components/CodexModal';
import { TemporalWalkthrough } from './components/TemporalWalkthrough'; // Import new component
import { FONTS, COLORS } from './constants';

const App: React.FC = () => {
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isTemporalWalkthroughOpen, setIsTemporalWalkthroughOpen] = useState(false); // New state

  useEffect(() => {
    document.body.classList.add('animate-aura-breathe', 'bg-obsidianBlack', FONTS.body.replace('font-', '')); // Use actual class names
    return () => {
      document.body.classList.remove('animate-aura-breathe', 'bg-obsidianBlack', FONTS.body.replace('font-', ''));
    };
  }, []);

  const handleOpenTemporalWalkthrough = () => {
    setIsTemporalWalkthroughOpen(true);
  };

  const handleCloseTemporalWalkthrough = () => {
    setIsTemporalWalkthroughOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full text-silverMist bg-obsidianBlack"> {/* Ensure bg-obsidianBlack is effective */}
      <BecomingPanel className="lg:w-1/3" />
      <PlanPanel className="lg:w-1/3" onOpenCodex={() => setIsCodexOpen(true)} />
      <DreamingPanel className="lg:w-1/3" onEmbraceJourneyClick={handleOpenTemporalWalkthrough} /> {/* Pass handler */}
      <CodexModal isOpen={isCodexOpen} onClose={() => setIsCodexOpen(false)} />
      <TemporalWalkthrough isOpen={isTemporalWalkthroughOpen} onClose={handleCloseTemporalWalkthrough} /> {/* Render new component */}
    </div>
  );
};

export default App;
