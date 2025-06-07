import { ArchetypeId } from '../types';

interface OscillatorMap {
  [key: string]: OscillatorNode | null;
}
interface GainNodeMap {
  [key: string]: GainNode | null;
}

class AudioService {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorMap = {};
  private oscillatorGains: GainNodeMap = {}; // For individual note fading
  
  // For Sentinel Chord
  private sentinelChordOscillators: OscillatorNode[] = [];
  private sentinelChordGainNode: GainNode | null = null;
  
  private isMuted: boolean = true; // Start muted, user interaction will unmute.
  private isInitialized: boolean = false;

  private async ensureAudioContext(): Promise<void> {
    if (!this.isInitialized || (this.audioContext && this.audioContext.state === 'suspended')) {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.audioContext.currentTime);
      }
      
      if (this.audioContext.state === 'suspended') {
        try {
          await this.audioContext.resume();
        } catch (e) {
          console.error("Error resuming audio context:", e);
          return;
        }
      }
      if (this.audioContext.state === 'running') {
        this.isInitialized = true;
        if (this.masterGain) {
            this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.audioContext.currentTime);
        }
      }
    }
  }
  
  public async initialize(): Promise<void> {
    if (this.isInitialized && this.audioContext && this.audioContext.state === 'running') return;
    await this.ensureAudioContext();
  }

  public async playNote(archetypeId: ArchetypeId, frequency: number): Promise<void> {
    await this.ensureAudioContext();
    if (!this.audioContext || !this.masterGain || !this.isInitialized || this.isMuted) return;

    if (this.oscillators[archetypeId as string]) {
      await this.stopNote(archetypeId, 0.05); 
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    // Softer attack: Target gain 0.35, Attack 0.1s
    gainNode.gain.linearRampToValueAtTime(0.35, this.audioContext.currentTime + 0.1); 

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    oscillator.start();
    
    this.oscillators[archetypeId as string] = oscillator;
    this.oscillatorGains[archetypeId as string] = gainNode;

    oscillator.onended = () => {
        if (this.oscillators[archetypeId as string] === oscillator) {
            this.oscillators[archetypeId as string] = null;
            this.oscillatorGains[archetypeId as string] = null;
        }
        try { gainNode.disconnect(); } catch(e) {/*ignore*/}
    };
    
    // Longer hold (1.2s) before auto-fade with gentler fade-out (0.8s)
    setTimeout(() => {
      if (this.oscillators[archetypeId as string] === oscillator) {
        this.stopNote(archetypeId, 0.8); 
      }
    }, 1200); 
  }

  public async stopNote(archetypeId: ArchetypeId, fadeOutDuration: number = 0.1): Promise<void> {
    if (!this.audioContext) return;

    const oscKey = archetypeId as string;
    const oscillator = this.oscillators[oscKey];
    const gainNode = this.oscillatorGains[oscKey];

    if (oscillator && gainNode) {
      try {
        gainNode.gain.setValueAtTime(gainNode.gain.value, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.0001, this.audioContext.currentTime + fadeOutDuration);
        oscillator.stop(this.audioContext.currentTime + fadeOutDuration + 0.01); 
      } catch (e) {
        console.warn(`Error stopping note ${String(archetypeId)}:`, e);
        try { oscillator.stop(this.audioContext.currentTime); } catch (e2) { /* ignore */ }
      }
    } else if (oscillator) { 
        try { oscillator.stop(this.audioContext.currentTime + fadeOutDuration); } catch (e) { /* ignore */ }
    }
    
    this.oscillators[oscKey] = null; 
    this.oscillatorGains[oscKey] = null;
  }

  public async playSentinelDrone(baseFrequency: number): Promise<void> {
    await this.ensureAudioContext();
    if (!this.audioContext || !this.masterGain || !this.isInitialized || this.sentinelChordOscillators.length > 0 || this.isMuted) return;

    // Frequencies for E Root, Perfect Fifth, Octave (E3, B3, E4)
    const frequencies = [
      baseFrequency,                         // E3 (Root)
      baseFrequency * Math.pow(2, 7/12),   // B3 (Perfect Fifth)
      baseFrequency * 2                      // E4 (Octave)
    ];

    if (!this.sentinelChordGainNode) {
      this.sentinelChordGainNode = this.audioContext.createGain();
      this.sentinelChordGainNode.connect(this.masterGain);
    }
    
    this.sentinelChordGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    // Lower gain (0.06), longer fade-in (3.0s)
    this.sentinelChordGainNode.gain.linearRampToValueAtTime(0.06, this.audioContext.currentTime + 3.0); 

    this.sentinelChordOscillators = frequencies.map(freq => {
      const osc = this.audioContext!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioContext!.currentTime);
      osc.connect(this.sentinelChordGainNode!);
      osc.start();
      return osc;
    });
  }

  public async stopSentinelDrone(): Promise<void> {
    if (!this.audioContext || !this.sentinelChordGainNode || this.sentinelChordOscillators.length === 0) return;

    const fadeOutTime = 3.0; // Longer fade-out (3.0s)
    try {
      this.sentinelChordGainNode.gain.setValueAtTime(this.sentinelChordGainNode.gain.value, this.audioContext.currentTime);
      this.sentinelChordGainNode.gain.linearRampToValueAtTime(0.0001, this.audioContext.currentTime + fadeOutTime);
    } catch(e) { console.warn("Error setting sentinel gain for fade out", e); }


    this.sentinelChordOscillators.forEach(osc => {
      try {
        osc.stop(this.audioContext!.currentTime + fadeOutTime + 0.01);
      } catch (e) {
        // console.error("Error stopping sentinel chord oscillator:", e);
      }
    });
    
    setTimeout(() => {
        this.sentinelChordOscillators.forEach(osc => { try { osc.disconnect(); } catch(e) {/*ignore*/} });
        this.sentinelChordOscillators = [];
    }, (fadeOutTime + 0.1) * 1000);
  }

  public async toggleMute(): Promise<boolean> {
    await this.ensureAudioContext(); 
    if (!this.audioContext || !this.masterGain) { 
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
    if (!this.isInitialized) { 
        this.isMuted = !this.isMuted;
        if(this.masterGain) this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.audioContext.currentTime);
        return this.isMuted;
    }


    this.isMuted = !this.isMuted;
    const masterTargetVolume = this.isMuted ? 0 : 0.7;
    this.masterGain.gain.linearRampToValueAtTime(masterTargetVolume, this.audioContext.currentTime + 0.1);
    
    return this.isMuted;
  }
  
  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsInitialized(): boolean {
    return this.isInitialized && this.audioContext?.state === 'running';
  }
}

const audioService = new AudioService();
export default audioService;