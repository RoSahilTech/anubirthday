import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Eye, ArrowRight, Heart } from 'lucide-react';
import { databasePhotos } from '../../config/photos';
import { V2Lightbox } from './V2Lightbox';
import { useAudio } from '../../hooks/useAudio';

export const V2MemoryDatabase = ({ onNext }) => {
  const initialCards = databasePhotos.map((photo, index) => ({
    ...photo,
    isUnlocked: index < 2,
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
        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            scrapbook vault #022 ♡
          </span>
          <h2 className="text-3xl sm:text-4xl font-handwriting font-bold text-pastel-rose3">
            Memory Polaroid Capsules
          </h2>
          <p className="text-pastel-subtext text-xs sm:text-sm max-w-md mx-auto pt-1 font-cute">
            Tap to unclip locked polaroids. Unlock at least 3 memories to proceed!
          </p>
        </div>

        {/* Polaroid Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
          {cards.map((card, idx) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.04, rotate: idx % 2 === 0 ? 1 : -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(idx)}
              className={`relative polaroid-v2 flex flex-col items-center justify-between min-h-[170px] text-center cursor-pointer ${
                card.isUnlocked ? 'border-pastel-rose1' : 'opacity-80'
              }`}
            >
              <div className="w-full flex justify-between items-center text-[10px] font-handwriting text-pastel-rose2 font-bold">
                <span>#0{idx + 1}</span>
                {card.isUnlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3.5 h-3.5 text-pastel-rose2" />}
              </div>

              {card.isUnlocked ? (
                <div className="my-2 relative w-full h-24 rounded overflow-hidden border border-pastel-pink2">
                  <img src={card.src} alt={card.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-pastel-rose3/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </div>
              ) : (
                <div className="my-4 flex flex-col items-center gap-1">
                  <Lock className="w-6 h-6 text-pastel-rose2 animate-pulse" />
                  <span className="text-[10px] font-handwriting text-pastel-rose2 font-bold">LOCKED ♡</span>
                </div>
              )}

              <span className="text-[11px] font-handwriting font-bold text-pastel-text truncate w-full">
                {card.isUnlocked ? card.title : 'Tap to Unlock'}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            disabled={!canProceed}
            onClick={onNext}
            className={`px-8 py-3.5 rounded-full font-cute font-bold text-sm transition-all duration-300 flex items-center gap-2 mx-auto ${
              canProceed
                ? 'bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white shadow-v2-card hover:scale-105 cursor-pointer'
                : 'bg-pastel-pink1 text-pastel-subtext cursor-not-allowed opacity-60'
            }`}
          >
            <span>{canProceed ? 'NEXT SCRAPBOOK PAGE ♡' : `UNLOCK ${3 - unlockedCount} MORE POLAROID`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <V2Lightbox photo={selectedPhoto} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </motion.div>
    </div>
  );
};
