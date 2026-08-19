import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { allPhotos } from '../config/photos';
import { Lightbox } from './Lightbox';
import { useAudio } from '../hooks/useAudio';

export const MemoryDatabase = ({ onNext }) => {
  // Use first 5 photos for this stage
  const initialCards = allPhotos.slice(0, 5).map((photo, index) => ({
    ...photo,
    isUnlocked: index < 2, // First 2 unlocked by default, rest unlock on tap!
  }));

  const [cards, setCards] = useState(initialCards);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { playClick, playSuccess } = useAudio();

  const handleCardClick = (index) => {
    playClick();
    const updated = [...cards];
    if (!updated[index].isUnlocked) {
      updated[index].isUnlocked = true;
      setCards(updated);
      playSuccess();
    }
    setSelectedPhoto(updated[index]);
  };

  const unlockedCount = cards.filter(c => c.isUnlocked).length;
  const canProceed = unlockedCount >= 3;

  return (
    <div className="w-full max-w-3xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>MEMORY DATABASE DECRYPTION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold shimmer-text">
          Archive Vault #022
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
          Tap the floating memory capsules below to decrypt hidden moments. Unlock at least 3 memories to continue.
        </p>

        {/* Memory Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4">
          {cards.map((card, idx) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(idx)}
              className={`relative p-3 rounded-2xl flex flex-col items-center justify-between min-h-[160px] text-center transition-all duration-300 border ${
                card.isUnlocked
                  ? 'glass-card border-rose-500/50 shadow-rose-glow cursor-pointer'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 cursor-pointer hover:border-slate-700'
              }`}
            >
              <div className="w-full flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">#0{idx + 1}</span>
                {card.isUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-rose-400" />
                )}
              </div>

              {card.isUnlocked ? (
                <div className="my-2 relative w-full h-24 rounded-lg overflow-hidden border border-slate-700/50">
                  <img
                    src={card.src}
                    alt={card.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 hover:bg-transparent transition-colors flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white drop-shadow-md opacity-80" />
                  </div>
                </div>
              ) : (
                <div className="my-4 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-rose-400" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-rose-300">LOCKED</span>
                </div>
              )}

              <span className="text-[11px] font-medium text-slate-300 truncate w-full">
                {card.isUnlocked ? card.title : 'Tap to Unlock'}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <button
            disabled={!canProceed}
            onClick={onNext}
            className={`px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 flex items-center gap-2 mx-auto ${
              canProceed
                ? 'bg-gradient-to-r from-rose-500 to-lavender-500 text-white shadow-rose-glow hover:scale-105 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50'
            }`}
          >
            <span>{canProceed ? 'CONTINUE ADVENTURE' : `UNLOCK ${3 - unlockedCount} MORE MEMORY`}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox for inspecting selected memory */}
        <Lightbox
          photo={selectedPhoto}
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      </motion.div>
    </div>
  );
};
