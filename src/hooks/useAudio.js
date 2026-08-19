import { useState } from 'react';
import { soundManager } from '../utils/audio';

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const playClick = () => soundManager.playClick();
  const playSuccess = () => soundManager.playSuccess();
  const playHeartbeat = () => soundManager.playHeartbeat();
  const startMusic = () => soundManager.playBackgroundMusic();

  return {
    isMuted,
    toggleMute,
    playClick,
    playSuccess,
    playHeartbeat,
    startMusic,
  };
};
