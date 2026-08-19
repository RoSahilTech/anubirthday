import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { revealPortraitPhoto } from '../config/photos';
import { ConfettiEffect } from './Confetti';

export const FinalMessage = ({ resetProgress }) => {
  return (
    <div className="w-full max-w-2xl px-4 text-center">
      <ConfettiEffect />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-10 rounded-3xl space-y-8 border border-rose-500/30 shadow-2xl relative overflow-hidden"
      >
        {/* Top Centered Photo */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-500 to-gold-400 shadow-rose-glow">
          <img
            src={revealPortraitPhoto.src}
            alt="Anushka Mehta"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Letter Body */}
        <div className="space-y-4 max-w-lg mx-auto text-center sm:text-left">
          <h2 className="text-2xl font-serif font-bold text-rose-300 text-center">
            {birthdayConfig.finalMessage.header}
          </h2>

          <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed font-serif">
            {birthdayConfig.finalMessage.paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Grand Birthday Footer Banner */}
        <div className="pt-6 border-t border-slate-700/60 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-gold-400 animate-spin-slow" />
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold shimmer-text">
              HAPPY BIRTHDAY ANUSHKA!
            </h1>
            <Sparkles className="w-6 h-6 text-gold-400 animate-spin-slow" />
          </div>

          <p className="text-rose-300 font-semibold text-lg">
            {birthdayConfig.finalMessage.closing}
          </p>

          <div className="pt-4">
            <button
              onClick={resetProgress}
              className="px-8 py-3.5 rounded-full bg-slate-900/90 hover:bg-rose-500/20 text-rose-300 hover:text-white font-semibold text-sm transition-all border border-rose-500/40 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{birthdayConfig.finalMessage.replayButton}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
