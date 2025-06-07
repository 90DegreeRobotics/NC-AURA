AURA: The Triumvirate Portal & Harmonic Council AI
Project Overview
AURA is a sophisticated two-part application system designed to facilitate deep personal transformation and AI-assisted insight generation. The project embodies a mystical, symbolic aesthetic while providing practical tools for self-discovery and guidance.
Architecture
Part 1: The AURA Triumvirate Portal (Main Interface)

Location: Root directory
Purpose: Primary interface featuring three transformative panels
Technology: Vanilla HTML/CSS/JavaScript with ES6 modules
Deployment: Static files with importmap for dependencies

Part 2: The AURA Harmonic Council AI (Sub-Application)

Location: etj/ folder
Purpose: Interactive AI archetype consultation system
Technology: Vite-based development with Gemini API integration
Deployment: Requires API key management for production

Features
Triumvirate Portal Features

Three Sacred Panels:

Becoming: Personal transformation and self-discovery
Plan: Strategic life planning and goal setting
Dreaming: Vision casting and imagination expansion


Codex Modal: Central knowledge repository and guidance system
Symbolic Aesthetic: Mystical design with sacred geometry and esoteric symbolism
Responsive Design: Optimized for all device sizes

Harmonic Council AI Features

AI Archetype Consultation: Interact with specialized AI personas
Gemini API Integration: Powered by Google's advanced language model
Dynamic Response Generation: Context-aware AI interactions
Immersive Interface: Mystical chat experience with thematic styling

Installation & Setup
Prerequisites

Node.js (v16 or higher)
Modern web browser with ES6 module support
Gemini API key (for Harmonic Council functionality)

Local Development Setup

Clone/Download the project files
bash# Navigate to project directory
cd aura-project

Set up the Harmonic Council AI (etj/ folder)
bashcd etj
npm install

Configure API Key

Create .env file in the etj/ directory:

VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here

Obtain your Gemini API key from Google AI Studio


Start Development Servers
bash# For Harmonic Council AI (from etj/ directory)
npm run dev

# For main portal, serve from root directory using any static server
# Example with Python:
python -m http.server 8000
# Or with Node.js http-server:
npx http-server -p 8000


Deployment to neurocognica.com
Critical Steps for Production Deployment
1. Main Portal Deployment

Upload all root directory files to your web server
Ensure the importmap CDN links are accessible
Test that ES6 modules load correctly

2. Harmonic Council AI Deployment
⚠️ IMPORTANT: API Key Security
The Harmonic Council AI requires a Gemini API key, which presents security challenges for client-side applications. Here are the recommended approaches:
Option A: Backend Proxy (Recommended)

Create a backend API endpoint on your server
Store the Gemini API key securely on the backend
Modify the Harmonic Council to call your backend instead of Gemini directly
Your backend proxies requests to Gemini API

Option B: Environment Variable Injection (Build-time)

Build the Harmonic Council for production:
bashcd etj
VITE_GEMINI_API_KEY=your_key npm run build

Upload the dist/ folder contents to your server
⚠️ Warning: API key will be visible in client-side code

Option C: Server-Side Rendering (Advanced)

Use a server-side solution to inject the API key at request time
Implement proper security measures and rate limiting

File Structure for Deployment
neurocognica.com/
├── index.html                 # Main portal entry point
├── styles.css                 # Main portal styles (Note: Main portal styles are in index.html)
├── script.js                  # Main portal logic (Note: Main portal logic is in index.tsx and component files)
├── [other root files]         # Additional portal assets (constants.ts, types.ts, components/, etc.)
└── etj/                       # Harmonic Council AI
    ├── dist/                  # Built production files (after npm run build in etj/)
    │   ├── index.html
    │   ├── assets/
    │   └── [built files]
    └── [development files]    # Source code (keep for updates, or deploy directly if not using build step for etj/)
Configuration
Customizing the Experience
Triumvirate Portal Customization

Modify panel content in constants.ts
Adjust styling in index.html and Tailwind classes in .tsx files
Add new features in App.tsx and component files

Harmonic Council AI Customization

Edit AI personas and abilities in etj/constants.ts
Modify prompts and system messages in etj/constants.ts and etj/App.tsx
Adjust UI themes and styling in etj/index.css and Tailwind classes in etj/components/

Environment Variables (etj/)
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_ENDPOINT=https://your-backend-api.com (if using backend proxy)
Security Considerations
API Key Protection

Never commit API keys to version control
Use environment variables or secure backend storage (Option A for deployment is best)
Implement rate limiting to prevent abuse
Consider user authentication for production use

Content Security Policy

Configure CSP headers to allow necessary external resources
Whitelist CDN domains used in importmap (esm.sh, cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com)
Restrict inline scripts if security is critical (note: Tailwind JIT config is inline)

Troubleshooting
Common Issues
1. Modules Not Loading

Check that your server supports ES6 modules and serves .tsx files with correct MIME type if not transpiled (though importmap loads .js from esm.sh)
Verify importmap CDN links are accessible
Ensure proper MIME types for JavaScript files

2. API Key Issues (Harmonic Council AI)

Verify API key is correctly set in .env for local dev OR correctly injected/proxied for production
Check Gemini API quotas and billing
Ensure API key has necessary permissions
Review console for "API Key not valid" or "API Key missing" errors from etj/App.tsx or etj/services/geminiService.ts

3. CORS Issues

If using backend proxy (Option A for deployment), configure CORS headers on your proxy server
Test API endpoints with browser developer tools

Development Tips

Use browser developer tools to debug module loading
Monitor network tab for failed resource loads
Check console for JavaScript errors

Vision & Philosophy
AURA represents a fusion of ancient wisdom and modern technology, creating a sacred space for:

Personal Transformation: Through the Triumvirate's three aspects
AI-Assisted Insight: Via the Harmonic Council's archetypal guidance
Mystical Aesthetics: Honoring the sacred nature of self-discovery
Technological Harmony: Blending cutting-edge AI with timeless symbolism

Contributing
When updating or expanding AURA:

Maintain the mystical aesthetic and symbolic consistency
Test both parts of the system thoroughly
Update this README with any architectural changes
Consider security implications of new features

Support
For deployment issues or questions about the AURA system:

Check browser console for error messages
Verify all dependencies are loading correctly (importmap for main, Vite/build for sub-app)
Ensure API configurations are properly set
Test in multiple browsers and devices

License
This project embodies the spirit of open wisdom and technological harmony. Use responsibly and with reverence for the transformative power of both ancient wisdom and modern AI.