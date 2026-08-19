import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { revealPortraitPhoto } from '../../config/photos';
import { ConfettiEffect } from '../../components/Confetti';
import { V2Mascot } from './V2Mascot';

export const V2FinalMessage = ({ resetProgress }) => {
  return (
    <div className="w-full max-w-2xl px-4 text-center">
      <ConfettiEffect />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="v2-card p-6 sm:p-10 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full p-1 border-4 border-pastel-pink2 shadow-v2-card">
          <img src={revealPortraitPhoto.src} alt="Anushka Mehta" className="w-full h-full object-cover rounded-full" />
        </div>

        <V2Mascot state="celebrating" size="sm" className="mx-auto" />

        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3">
            {birthdayConfig.finalMessage.header}
          </h2>

          <div className="space-y-2 text-pastel-text text-sm sm:text-base font-handwriting leading-relaxed">
            {birthdayConfig.finalMessage.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Digital Birthday Card Container */}
        <div className="p-6 rounded-3xl bg-pastel-bg border-2 border-dashed border-pastel-rose1 space-y-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-handwriting font-extrabold text-pastel-rose3">
            HAPPY BIRTHDAY ANUSHKA ♡
          </h1>
          <p className="text-2xl font-handwriting font-bold text-pastel-rose2">
            CHAPTER 22 • MADE WITH LOTS OF MEMORIES
          </p>
          <p className="text-xs font-cute text-pastel-subtext pt-2">
            {birthdayConfig.finalMessage.closing}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={resetProgress}
            className="px-8 py-3.5 rounded-full bg-pastel-pink1 hover:bg-pastel-pink2 text-pastel-rose3 font-handwriting font-bold text-sm transition-all border border-pastel-pink2 flex items-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY SCRAPBOOK ♡</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
