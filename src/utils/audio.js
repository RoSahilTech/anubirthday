/**
 * Audio Engine Utility
 * Robust audio player that automatically starts music on the very first user click/tap anywhere on the screen!
 */

class AudioManager {
  constructor() {
    this.isMuted = false;
    this.volume = 0.6;
    this.audioElement = null;
    this.audioCtx = null;
    this.isPlaying = false;
    this.initialized = false;
    this.autoStartAttached = false;

    // Attach auto-start listener so audio begins on the very first screen interaction
    this.attachAutoStart();
  }

  getAudioPath() {
    const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : './';
    const cleanBase = base.endsWith('/') ? base : base + '/';
    return `${cleanBase}audio/birthday.mp3`;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }

      const path = this.getAudioPath();
      this.audioElement = new Audio(path);
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;

      // Fallback path handlers if path needs adjustment
      this.audioElement.onerror = () => {
        if (this.audioElement.src !== './audio/birthday.mp3') {
          this.audioElement.src = './audio/birthday.mp3';
        }
      };

      this.initialized = true;
    } catch (e) {
      console.warn('Audio initialization notice:', e);
    }
  }

  attachAutoStart() {
    if (typeof window === 'undefined' || this.autoStartAttached) return;

    const handleFirstInteraction = () => {
      this.playBackgroundMusic();
      // Remove listeners once audio playback has started
      if (this.isPlaying) {
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('click', handleFirstInteraction);
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    this.autoStartAttached = true;
  }

  playBackgroundMusic() {
    this.init();
    if (this.isMuted || !this.audioElement) return;

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.isPlaying) return;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
        })
        .catch((err) => {
          console.warn('Background music playback waiting for user gesture:', err);
          this.isPlaying = false;
        });
    }
  }

  pauseBackgroundMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    if (this.isMuted) {
      this.pauseBackgroundMusic();
    } else {
      this.playBackgroundMusic();
    }
    return this.isMuted;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  playTone(freq = 523.25, type = 'sine', duration = 0.15) {
    if (this.isMuted) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.3, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore fallback tone errors quietly
    }
  }

  playSuccess() {
    this.playTone(523.25, 'sine', 0.1);
    setTimeout(() => this.playTone(659.25, 'sine', 0.1), 100);
    setTimeout(() => this.playTone(783.99, 'sine', 0.2), 200);
  }

  playClick() {
    this.playTone(440, 'sine', 0.05);
  }

  playHeartbeat() {
    this.playTone(120, 'triangle', 0.2);
    setTimeout(() => this.playTone(90, 'triangle', 0.2), 250);
  }
}

export const soundManager = new AudioManager();
