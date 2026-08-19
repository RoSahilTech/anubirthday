import React, { useState } from 'react';
import { TOTAL_STAGES } from '../hooks/useProgress';
import { Sparkles, RotateCcw, Compass } from 'lucide-react';

export const ProgressIndicator = ({ currentStage, maxUnlockedStage, goToStage, resetProgress }) => {
  const [showSettings, setShowSettings] = useState(false);
  const progressPercent = Math.round((currentStage / TOTAL_STAGES) * 100);

  return (
    <header className="fixed top-4 left-4 z-50 flex items-center gap-2 sm:gap-3">
      {/* Level badge */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="glass-card px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-300 hover:text-white hover:bg-rose-500/20 transition-all border border-rose-500/30"
        title="Quest Progress & Settings"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin-slow" />
        <span>STAGE {currentStage}/{TOTAL_STAGES}</span>
      </button>

      {/* Mini Progress Bar */}
      <div className="hidden sm:block w-24 sm:w-36 h-2 bg-midnight-800/80 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-lavender-400 to-gold-400 transition-all duration-500 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Settings / Stage Select Dropdown */}
      {showSettings && (
        <div className="absolute top-12 left-0 glass-panel p-4 rounded-2xl w-64 shadow-2xl z-50 border border-slate-700/60 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-rose-400" />
              Quest Navigation
            </span>
            <button
              onClick={() => setShowSettings(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1 max-h-48 overflow-y-auto pr-1 mb-3">
            {Array.from({ length: TOTAL_STAGES }).map((_, idx) => {
              const stageNum = idx + 1;
              const isUnlocked = stageNum <= maxUnlockedStage;
              const isCurrent = stageNum === currentStage;

              return (
                <button
                  key={stageNum}
                  disabled={!isUnlocked}
                  onClick={() => {
                    goToStage(stageNum);
                    setShowSettings(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-rose-500/30 text-rose-300 font-bold border border-rose-500/50'
                      : isUnlocked
                      ? 'hover:bg-slate-800/60 text-slate-200'
                      : 'opacity-40 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Stage {stageNum}</span>
                  {isCurrent && <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full">Current</span>}
                  {!isUnlocked && <span className="text-[10px]">🔒</span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all Quest progress and start from Stage 1?')) {
                resetProgress();
                setShowSettings(false);
              }
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-600/30 text-rose-300 hover:text-white text-xs font-medium transition-all flex items-center justify-center gap-1.5 border border-rose-500/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Quest
          </button>
        </div>
      )}
    </header>
  );
};
