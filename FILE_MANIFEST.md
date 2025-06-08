# AURA Project - File Manifest

This document provides a list of all files in the AURA project, including the main Triumvirate Portal and the Harmonic Council AI sub-application, along with a brief description of their purpose.

## Root Directory (Triumvirate Portal)

-   **`index.html`**: The main HTML entry point for the Triumvirate Portal. It includes the importmap for JavaScript modules, CDN links for Tailwind CSS and Google Fonts, and global inline styles.
-   **`index.tsx`**: The main TypeScript React entry point for the Triumvirate Portal. Initializes and renders the main `App` component.
-   **`App.tsx`**: The root React component for the Triumvirate Portal. Manages the layout of the three main panels (Becoming, Plan, Dreaming) and the state for modals (Codex, Temporal Walkthrough).
-   **`constants.ts`**: Contains shared constants for the Triumvirate Portal, such as color definitions, font styles, and all static text content for the panels, Codex, and Temporal Walkthrough.
-   **`types.ts`**: Defines TypeScript interfaces and types used throughout the Triumvirate Portal application (props for components, data structures).
-   **`metadata.json`**: Contains metadata for the Triumvirate Portal application, like its name, description, and requested frame permissions.
-   **`README.md`**: The main documentation file for the entire AURA project, covering architecture, setup, deployment, and other relevant information.
-   **`components/PanelBase.tsx`**: A reusable React component that provides the base structure and styling (glassmorphism) for the three main panels in the Triumvirate Portal.
-   **`components/BecomingPanel.tsx`**: React component for "The Becoming" panel (left panel), displaying content related to the past/origin.
-   **`components/PlanPanel.tsx`**: React component for "The Plan" panel (center panel), displaying content related to the present, featuring the Seed of Life SVG and access to The Codex.
-   **`components/DreamingPanel.tsx`**: React component for "The Dreaming" panel (right panel), displaying content related to the future/vision and the "Embrace The Journey" call to action.
-   **`components/SeedOfLifeSVG.tsx`**: React component that renders an animated Seed of Life SVG, used in The Plan panel and potentially the Temporal Walkthrough.
-   **`components/InteractiveButton.tsx`**: A reusable styled button component used throughout the Triumvirate Portal, with support for different variants and rendering as an anchor tag.
-   **`components/CodexModal.tsx`**: React component for "The Codex" modal, displaying system status, documentation, and project lore.
-   **`components/TemporalWalkthrough.tsx`**: React component for a multi-step modal experience, guiding the user through Past, Present, and Future themes. (Currently not actively triggered by UI after "Embrace The Journey" button was changed to a direct link).

## `etj/` Directory (Harmonic Council AI Sub-Application)

-   **`index.html`**: The main HTML entry point for the "AURA Harmonic Council AI" sub-application. Includes an importmap for its specific React and Gemini API dependencies and links to its CSS.
-   **`index.css`**: Contains global CSS styles specific to the Harmonic Council AI interface, including custom scrollbars and utility classes.
-   **`index.tsx`**: The main TypeScript React entry point for the Harmonic Council AI. Initializes and renders its `App` component.
-   **`App.tsx`**: The root React component for the Harmonic Council AI. Manages state for AI interactions, selected archetypes, abilities, audio, UI elements like modals, and communication with the Gemini API via services.
-   **`constants.ts`**: Contains constants specific to the Harmonic Council AI, including Archetype data (definitions, visual styles, positions, abilities), and checklist content.
-   **`types.ts`**: Defines TypeScript interfaces and types used within the Harmonic Council AI (e.g., `Character`, `Ability`, `Interaction`).
-   **`metadata.json`**: Contains metadata for the Harmonic Council AI application, including its name, description, and requested frame permissions (e.g., microphone).
-   **`vite.config.ts`**: Configuration file for Vite, the build tool used for local development of the Harmonic Council AI. Handles API key injection from environment variables.
-   **`package.json`**: NPM package manifest for the Harmonic Council AI, listing dependencies (React, Vite, TypeScript) and development scripts (`dev`, `build`).
-   **`tsconfig.json`**: TypeScript configuration file for the Harmonic Council AI, specifying compiler options.
-   **`SentinelDisplay.tsx`**: *This file is currently empty and appears to be an unused placeholder or remnant from previous development stages within the `etj/` directory.*
-   **`GeometricLayout.tsx`**: *This file at `etj/GeometricLayout.tsx` is currently empty and appears to be an unused placeholder or remnant. The functional component is `etj/components/GeometricLayout.tsx`.*
-   **`icons.tsx`**: *This file at `etj/icons.tsx` is currently empty and appears to be an unused placeholder or remnant. The functional icon components are located in `etj/components/Icons.tsx`.*

### `etj/services/`

-   **`AudioService.ts`**: Manages all Web Audio API interactions for the Harmonic Council AI, including playing archetype-specific notes, ambient drones, and handling mute/unmute functionality.
-   **`services/geminiService.ts`**: Contains the function to interact with the Google Gemini API, constructing prompts and sending requests to generate AI responses for the archetypes.

### `etj/components/`

-   **`ArchetypeInfoPanel.tsx`**: React component used in the Harmonic Council AI to display detailed information (name, description, function) about an Archetype when its sphere is hovered.
-   **`ArchetypeSphere.tsx`**: React component representing an individual AI Archetype as an interactive "sphere" in the Harmonic Council AI's geometric layout. Handles click and hover events.
-   **`CharacterCard.tsx`**: *This file is currently empty and appears to be an unused placeholder or remnant from previous development stages within the `etj/components/` directory.*
-   **`GeometricLayout.tsx`**: React component responsible for arranging the `ArchetypeSphere` components in a visually symbolic pattern (Seed of Life) in the Harmonic Council AI.
-   **`Header.tsx`**: *This file is currently empty and appears to be an unused placeholder or remnant from previous development stages within the `etj/components/` directory.*
-   **`Icons.tsx`**: Contains various SVG icon components (e.g., volume, microphone, sparkles, user) used throughout the Harmonic Council AI interface.
-   **`InfoPanel.tsx`**: React component in the Harmonic Council AI that displays options for a selected Archetype, including its abilities, an input field for details, and a button to invoke the AI.
-   **`PromptInput.tsx`**: A reusable input component (textarea and submit button) for users to enter "full commands" to interact with the AI archetypes in the Harmonic Council AI.
-   **`ResponseDisplay.tsx`**: React component that renders the log of interactions (prompts, AI responses, errors) within the Harmonic Council AI.
-   **`SystemChecklistModal.tsx`**: A modal component that displays a system development checklist, primarily for developer reference, within the Harmonic Council AI.

