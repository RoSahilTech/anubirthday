import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const Intro = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const { startMusic, playClick } = useAudio();

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 3000);
    const timer3 = setTimeout(() => setStep(3), 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    playClick();
    startMusic();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-2xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500/20 via-lavender-500/20 to-gold-400/20 p-1 backdrop-blur-xl border border-rose-500/30 shadow-rose-glow flex items-center justify-center animate-pulse-slow">
          <Sparkles className="w-10 h-10 text-rose-400" />
        </div>
      </motion.div>

      <div className="space-y-6 min-h-[180px] flex flex-col justify-center">
        {step >= 0 && (
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight shimmer-text"
          >
            {birthdayConfig.intro.greeting}
          </motion.h1>
        )}

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl text-slate-300 font-light"
          >
            {birthdayConfig.intro.subtitle1}
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-rose-300 font-medium italic"
          >
            {birthdayConfig.intro.subtitle2}
          </motion.p>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="pt-2"
          >
            <p className="text-xl sm:text-2xl text-gold-300 font-semibold mb-8">
              {birthdayConfig.intro.challenge}
            </p>

            <button
              onClick={handleStart}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-lavender-500 text-white font-semibold text-lg shadow-rose-glow hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-500/40"
            >
              <span>{birthdayConfig.intro.buttonText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
