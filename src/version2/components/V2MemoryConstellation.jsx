import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Flower2 } from 'lucide-react';
import { constellationPhotos } from '../../config/photos';
import { birthdayConfig } from '../../config/birthdayConfig';
import { V2Lightbox } from './V2Lightbox';
import { useAudio } from '../../hooks/useAudio';

export const V2MemoryConstellation = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { playClick } = useAudio();

  const starCoords = [
    { x: 20, y: 25 },
    { x: 40, y: 15 },
    { x: 65, y: 20 },
    { x: 80, y: 35 },
    { x: 30, y: 50 },
    { x: 55, y: 48 },
    { x: 75, y: 62 },
    { x: 15, y: 72 },
    { x: 42, y: 78 },
    { x: 85, y: 80 },
  ];

  const handleStarClick = (photo) => {
    playClick();
    setSelectedPhoto(photo);
  };

  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 08 • memory constellation ♡
          </span>
          <h2 className="text-3xl sm:text-4xl font-handwriting font-bold text-pastel-rose3">
            "Every memory is a glowing star."
          </h2>
          <p className="text-pastel-subtext font-cute text-xs sm:text-sm max-w-md mx-auto pt-1">
            Tap each flower star in the sky to reveal a polaroid memory!
          </p>
        </div>

        {/* Constellation Canvas Box */}
        <div className="relative mx-auto w-full max-w-2xl h-[340px] sm:h-[400px] rounded-3xl v2-card border-2 border-pastel-pink2 overflow-hidden shadow-v2-card p-4 bg-white/70">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
            {starCoords.map((pt, i) => {
              if (i === starCoords.length - 1) return null;
              const nextPt = starCoords[i + 1];
              return (
                <line
                  key={i}
                  x1={`${pt.x}%`}
                  y1={`${pt.y}%`}
                  x2={`${nextPt.x}%`}
                  y2={`${nextPt.y}%`}
                  stroke="#E9A8BA"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>

          {constellationPhotos.slice(0, starCoords.length).map((photo, index) => {
            const pos = starCoords[index];
            return (
              <motion.button
                key={photo.id}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStarClick(photo)}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white border border-pastel-pink2 shadow-md group focus:outline-none"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-pastel-rose2 fill-pastel-pink1 animate-pulse" />
                  <span className="absolute -bottom-5 text-[10px] font-handwriting text-pastel-rose3 font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1.5 rounded border border-pastel-pink2 whitespace-nowrap">
                    Memory #{index + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="pt-2">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>PROCEED TO SECRET LOCK ♡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <V2Lightbox photo={selectedPhoto} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </motion.div>
    </div>
  );
};
