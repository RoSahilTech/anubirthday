import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2Intro = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const { startMusic, playClick } = useAudio();

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => setStep(3), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStart = () => {
    playClick();
    startMusic();
    onNext();
  };

  return (
    <div className="w-full max-w-xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="v2-card p-6 sm:p-10 text-center space-y-6 relative overflow-hidden"
      >
        {/* Top Washi Tape */}
        <div className="washi-tape-top" />

        {/* Cute Mascot Companion */}
        <div className="pt-2">
          <V2Mascot state="waving" size="lg" className="mx-auto" />
        </div>

        <div className="space-y-4 min-h-[160px] flex flex-col justify-center">
          {step >= 0 && (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-handwriting font-bold text-pastel-rose3"
            >
              Hey {birthdayConfig.shortName}... ♡
            </motion.h1>
          )}

          {step >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl font-cute font-medium text-pastel-text"
            >
              I made a cute little birthday scrapbook for you! 🎀
            </motion.p>
          )}

          {step >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm sm:text-base font-handwriting text-pastel-rose2"
            >
              But first, you have to unlock the pages... 👀
            </motion.p>
          )}

          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-4"
            >
              <button
                onClick={handleStart}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-base shadow-v2-card hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
              >
                <span>OPEN SCRAPBOOK ♡</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
