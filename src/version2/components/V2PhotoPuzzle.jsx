import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { puzzlePhoto } from '../../config/photos';
import { birthdayConfig } from '../../config/birthdayConfig';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { triggerBirthdayConfetti } from '../../components/Confetti';
import { V2Mascot } from './V2Mascot';

export const V2PhotoPuzzle = ({ onNext }) => {
  const GRID_SIZE = 3;
  const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

  const [tiles, setTiles] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playClick, playSuccess } = useAudio();

  useEffect(() => {
    shuffleTiles();
  }, []);

  const shuffleTiles = () => {
    let arr = Array.from({ length: TOTAL_TILES }, (_, i) => i);
    for (let i = 0; i < 6; i++) {
      const idx1 = Math.floor(Math.random() * TOTAL_TILES);
      const idx2 = Math.floor(Math.random() * TOTAL_TILES);
      [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
    }
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
      const updated = [...tiles];
      [updated[selectedIdx], updated[index]] = [updated[index], updated[selectedIdx]];
      setTiles(updated);
      setSelectedIdx(null);

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
        className="v2-card p-6 sm:p-8 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="flex items-center justify-center gap-2">
          <V2Mascot state={isCompleted ? 'celebrating' : 'waving'} size="sm" />
        </div>

        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 04 • photo puzzle ♡
          </span>
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3 mb-1">
            {isCompleted ? 'YOU DID IT! ♡' : 'Assemble the Polaroid'}
          </h2>
          <p className="text-pastel-subtext font-cute text-xs">
            {isCompleted ? 'Memory restored! Tap continue to move forward.' : 'Tap two tiles to swap their positions.'}
          </p>
        </div>

        {/* Puzzle Board Container styled like a scrapbook table */}
        <div className="relative mx-auto w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-2xl overflow-hidden border-4 border-pastel-pink2 shadow-v2-card bg-white p-2">
          <div className="grid grid-cols-3 gap-1 w-full h-full">
            {tiles.map((tileValue, currentIndex) => {
              const row = Math.floor(tileValue / GRID_SIZE);
              const col = tileValue % GRID_SIZE;
              const isSelected = selectedIdx === currentIndex;
              const isCorrectPos = tileValue === currentIndex;

              const bgPosX = (col / (GRID_SIZE - 1)) * 100;
              const bgPosY = (row / (GRID_SIZE - 1)) * 100;

              return (
                <button
                  key={currentIndex}
                  onClick={() => handleTileClick(currentIndex)}
                  className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-200 focus:outline-none ${
                    isSelected
                      ? 'ring-4 ring-pastel-rose2 scale-95 z-20 shadow-lg'
                      : isCorrectPos
                      ? 'border border-emerald-400'
                      : 'border border-pastel-pink1 hover:border-pastel-rose1'
                  }`}
                  style={{
                    backgroundImage: `url(${puzzlePhoto.src})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Solved Overlay */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-pastel-pink2"
            >
              <CheckCircle className="w-12 h-12 text-emerald-500 mb-2 animate-bounce" />
              <h3 className="text-2xl font-handwriting font-bold text-pastel-rose3 mb-1">YOU DID IT ♡</h3>
              <p className="text-xs font-handwriting text-pastel-rose2 font-bold">{puzzlePhoto.caption}</p>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          {!isCompleted ? (
            <button
              onClick={shuffleTiles}
              className="px-4 py-2 rounded-full bg-pastel-bg border border-pastel-pink2 hover:bg-pastel-pink1 text-pastel-text text-xs font-cute font-medium flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Shuffle Tiles
            </button>
          ) : (
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>CONTINUE ADVENTURE ♡</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
