import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export const AudioControl = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="p-3 rounded-full glass-card hover:bg-rose-500/20 text-slate-200 hover:text-rose-400 transition-all duration-300 shadow-glass focus:outline-none focus:ring-2 focus:ring-rose-400 group"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-slate-400 group-hover:text-rose-400 transition-colors" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};
