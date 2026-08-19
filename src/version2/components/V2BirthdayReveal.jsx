import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Flower2 } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { revealPortraitPhoto } from '../../config/photos';
import { ConfettiEffect } from '../../components/Confetti';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2BirthdayReveal = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const { playSuccess } = useAudio();

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    const t2 = setTimeout(() => setStep(2), 2400);
    const t3 = setTimeout(() => {
      setStep(3);
      playSuccess();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl px-4 text-center">
      {step >= 3 && <ConfettiEffect />}

      <div className="space-y-6 flex flex-col items-center justify-center">
        {step >= 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-xl font-handwriting text-pastel-rose2"
          >
            "okay..."
          </motion.p>
        )}

        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-handwriting text-pastel-rose3"
          >
            "no more puzzles... this one is just for you. ♡"
          </motion.p>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative polaroid-v2 max-w-xs sm:max-w-sm rounded-2xl shadow-v2-card bg-white p-4"
          >
            <div className="washi-tape-top" />
            <img
              src={revealPortraitPhoto.src}
              alt="Anushka Mehta Birthday Portrait"
              className="w-full h-80 sm:h-96 object-cover rounded-lg border border-pastel-pink2"
            />
            <div className="pt-3 text-center">
              <span className="font-handwriting font-bold text-pastel-rose3 text-lg sm:text-xl">
                Anushka Mehta • 22 🎉
              </span>
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 pt-2"
          >
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-pastel-rose2 fill-pastel-pink2 animate-bounce" />
              <V2Mascot state="celebrating" size="sm" />
              <Heart className="w-8 h-8 text-pastel-rose2 fill-pastel-pink2 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl font-handwriting font-extrabold text-pastel-rose3">
                HAPPY BIRTHDAY
              </h1>
              <h2 className="text-5xl sm:text-7xl font-handwriting font-extrabold text-pastel-rose2">
                ANUSHKA MEHTA
              </h2>
              <p className="text-3xl sm:text-4xl font-handwriting font-bold text-gold-500 pt-1">
                22 ♡
              </p>
            </div>

            <button
              onClick={onNext}
              className="mt-6 px-10 py-4 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-base shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>EXPLORE ALL MEMORIES ♡</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
