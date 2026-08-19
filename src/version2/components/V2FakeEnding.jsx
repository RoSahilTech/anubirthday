import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2FakeEnding = ({ onNext }) => {
  const [phase, setPhase] = useState('initial');
  const { playClick, playHeartbeat } = useAudio();

  const handleFinish = () => {
    playClick();
    setPhase('blackout');

    setTimeout(() => {
      playHeartbeat();
      setPhase('glitch');
    }, 1500);

    setTimeout(() => {
      onNext();
    }, 4500);
  };

  return (
    <div className="w-full max-w-md px-4 text-center">
      <AnimatePresence mode="wait">
        {phase === 'initial' && (
          <motion.div
            key="initial"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="v2-card p-8 sm:p-10 space-y-6 relative overflow-hidden"
          >
            <div className="washi-tape-top" />

            <div className="flex justify-center">
              <V2Mascot state="holding-cake" size="md" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block">
                page 10 • scrapbook complete ♡
              </span>
              <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3">
                {birthdayConfig.fakeEnding.title}
              </h2>
              <p className="text-pastel-subtext font-cute text-xs">
                {birthdayConfig.fakeEnding.subtitle}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>FINISH SCRAPBOOK ♡</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {phase === 'blackout' && (
          <motion.div
            key="blackout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pastel-bg flex items-center justify-center"
          />
        )}

        {phase === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pastel-bg flex flex-col items-center justify-center p-6 text-center space-y-6"
          >
            <V2Mascot state="celebrating" size="lg" />

            <motion.h1
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-5xl sm:text-7xl font-handwriting font-extrabold text-pastel-rose3"
            >
              WAIT... ♡
            </motion.h1>

            <p className="text-xl sm:text-2xl font-cute text-pastel-text">
              Did you really think that was the surprise?
            </p>

            <p className="text-2xl sm:text-3xl font-handwriting font-bold text-pastel-rose2">
              Not even close. 😈
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
