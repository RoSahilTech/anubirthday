import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { puzzlePhoto } from '../config/photos';
import { birthdayConfig } from '../config/birthdayConfig';
import { CheckCircle, ArrowRight, RefreshCw, Puzzle } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { triggerBirthdayConfetti } from './Confetti';

export const PhotoPuzzle = ({ onNext }) => {
  const GRID_SIZE = 3; // 3x3 grid
  const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

  // Initialize ordered tiles [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const [tiles, setTiles] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playClick, playSuccess } = useAudio();

  // Create a solvable shuffled tile state on mount
  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    let arr = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    // Perform a few valid swaps to ensure it's not already solved but easy & fun
    for (let i = 0; i < 6; i++) {
      const idx1 = Math.floor(Math.random() * TOTAL_TILES);
      const idx2 = Math.floor(Math.random() * TOTAL_TILES);
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
    // Make sure it's not already completely solved by accident
    if (checkSolved(arr)) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    setTiles(arr);
    setSelectedIdx(null);
    setIsCompleted(false);
  };

  const checkSolved = (currentTiles) => {
    return currentTiles.every((val, index) => val === index);
  };

  const handleTileClick = (index) => {
    if (isCompleted) return;
    playClick();

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      // Swap tiles at selectedIdx and index
      const updated = [...tiles];
      [updated[selectedIdx], updated[index]] = [updated[index], updated[selectedIdx]];
      setTiles(updated);
      setSelectedIdx(null);

      // Check if puzzle is solved
      if (checkSolved(updated)) {
        setIsCompleted(true);
        playSuccess();
        triggerBirthdayConfetti();
      }
    }
  };

  return (
    <div className="w-full max-w-lg px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-rose-500/20 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Puzzle className="w-4 h-4 text-rose-400" />
          <span>{birthdayConfig.puzzle.title}</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            {isCompleted ? birthdayConfig.puzzle.completedMessage : 'Reconstruct the Memory'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            {isCompleted
              ? 'Fragment restored! Tap continue to move forward.'
              : 'Tap two tiles to swap their positions until the picture is complete.'}
          </p>
        </div>

        {/* Puzzle Board Container */}
        <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-rose-glow bg-slate-950 p-1">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {tiles.map((tileValue, currentIndex) => {
              const row = Math.floor(tileValue / GRID_SIZE);
              const col = tileValue % GRID_SIZE;
              const isSelected = selectedIdx === currentIndex;
              const isCorrectPos = tileValue === currentIndex;

              // Calculate background position percentage for each tile snippet
              const bgPosX = (col / (GRID_SIZE - 1)) * 100;
              const bgPosY = (row / (GRID_SIZE - 1)) * 100;

              return (
                <button
                  key={currentIndex}
                  onClick={() => handleTileClick(currentIndex)}
                  className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? 'ring-4 ring-rose-400 scale-95 z-20 shadow-2xl'
                      : isCorrectPos
                      ? 'border border-emerald-500/40'
                      : 'border border-slate-700 hover:border-rose-400/60'
                  }`}
                  style={{
                    backgroundImage: `url(${puzzlePhoto.src})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  }}
                >
                  {!isCompleted && isSelected && (
                    <div className="absolute inset-0 bg-rose-500/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded">
                        SELECTED
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Solved Overlay Celebration */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 rounded-2xl"
            >
              <CheckCircle className="w-14 h-14 text-emerald-400 mb-2 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-1">Memory Restored ❤️</h3>
              <p className="text-xs text-rose-300 italic">{puzzlePhoto.caption}</p>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {!isCompleted ? (
            <button
              onClick={shuffleTiles}
              className="px-4 py-2 rounded-full glass-card hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Shuffle Tiles
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{birthdayConfig.puzzle.buttonText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
