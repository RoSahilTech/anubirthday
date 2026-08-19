import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { revealPortraitPhoto } from '../config/photos';
import { ConfettiEffect } from './Confetti';
import { useAudio } from '../hooks/useAudio';

export const BirthdayReveal = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const { playSuccess } = useAudio();

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2500);
    const t3 = setTimeout(() => {
      setStep(3);
      playSuccess();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 text-center">
      {step >= 3 && <ConfettiEffect />}

      <div className="space-y-8 flex flex-col items-center justify-center">
        {step >= 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl text-slate-400 font-serif italic"
          >
            "Okay..."
          </motion.p>
        )}

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl text-rose-300 font-light"
          >
            "I'll stop making you work."
          </motion.p>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative polaroid-frame mx-auto max-w-xs sm:max-w-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-rose-400/60"
          >
            <img
              src={revealPortraitPhoto.src}
              alt="Anushka Mehta Birthday Portrait"
              className="w-full h-80 sm:h-96 object-cover rounded-lg"
            />
            <div className="pt-3 text-center">
              <span className="font-serif font-bold text-slate-800 text-base sm:text-lg">
                Anushka Mehta • 22 🎉
              </span>
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="space-y-6 pt-2"
          >
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
              <Sparkles className="w-8 h-8 text-gold-400 animate-spin-slow" />
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-bounce" />
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold shimmer-text tracking-tight">
              {birthdayConfig.reveal.header}
            </h1>

            <p className="text-2xl sm:text-3xl text-gold-300 font-semibold">
              {birthdayConfig.reveal.subHeader}
            </p>

            <button
              onClick={onNext}
              className="mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-lavender-500 text-white font-bold text-lg shadow-rose-glow hover:scale-105 transition-all flex items-center gap-3 mx-auto cursor-pointer"
            >
              <span>EXPLORE ALL MEMORIES</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
