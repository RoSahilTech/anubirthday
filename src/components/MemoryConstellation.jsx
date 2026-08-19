import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, ArrowRight } from 'lucide-react';
import { constellationPhotos } from '../config/photos';
import { birthdayConfig } from '../config/birthdayConfig';
import { Lightbox } from './Lightbox';
import { useAudio } from '../hooks/useAudio';

export const MemoryConstellation = ({ onNext }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewedCount, setViewedCount] = useState(0);
  const { playClick, playSuccess } = useAudio();

  // Positions for 10 constellation stars in relative percentage coordinates (x, y)
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
    setViewedCount((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{birthdayConfig.constellation.title}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold shimmer-text">
          "Every memory is a glowing star."
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          {birthdayConfig.constellation.subtitle}
        </p>

        {/* Constellation Map Canvas / Box */}
        <div className="relative mx-auto w-full max-w-2xl h-[340px] sm:h-[420px] rounded-3xl glass-panel border border-rose-500/30 overflow-hidden shadow-2xl p-4">
          {/* SVG Constellation Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
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
                  stroke="url(#constellation-grad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              );
            })}
            <defs>
              <linearGradient id="constellation-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
          </svg>

          {/* Interactive Star Nodes */}
          {constellationPhotos.slice(0, starCoords.length).map((photo, index) => {
            const pos = starCoords[index];
            return (
              <motion.button
                key={photo.id}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStarClick(photo)}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full glass-card hover:border-rose-400 group focus:outline-none"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="relative flex items-center justify-center">
                  <Star className="w-6 h-6 text-gold-400 fill-gold-300 animate-pulse group-hover:scale-125 transition-transform" />
                  <span className="absolute -bottom-5 text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-1.5 rounded whitespace-nowrap">
                    Memory #{index + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>PROCEED TO FINAL VAULT</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photo={selectedPhoto}
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      </motion.div>
    </div>
  );
};
