import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowRight, Zap } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const FakeEnding = ({ onNext }) => {
  const [phase, setPhase] = useState('initial'); // 'initial' | 'blackout' | 'glitch'
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
            className="glass-panel p-8 sm:p-10 rounded-3xl space-y-6 border border-rose-500/20 shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/40 animate-pulse">
              <Trophy className="w-8 h-8 text-gold-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-white">
                {birthdayConfig.fakeEnding.title}
              </h2>
              <p className="text-rose-300 font-medium text-sm">
                {birthdayConfig.fakeEnding.subtitle}
              </p>
              <p className="text-slate-400 text-xs pt-2">
                {birthdayConfig.fakeEnding.text}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <span>{birthdayConfig.fakeEnding.buttonText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {phase === 'blackout' && (
          <motion.div
            key="blackout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          />
        )}

        {phase === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/50 animate-ping">
              <Zap className="w-8 h-8 text-rose-400" />
            </div>

            <motion.h1
              animate={{ opacity: [0.2, 1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.4 }}
              className="text-5xl sm:text-7xl font-serif font-extrabold text-rose-500 tracking-wider"
            >
              {birthdayConfig.fakeEnding.glitchText}
            </motion.h1>

            <p className="text-xl sm:text-2xl text-slate-200 font-medium">
              {birthdayConfig.fakeEnding.teaser1}
            </p>

            <p className="text-2xl sm:text-3xl text-gold-400 font-bold shimmer-text">
              {birthdayConfig.fakeEnding.teaser2}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
