import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const FinalLock = ({ onNext }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();

    const expected = birthdayConfig.finalLock.correctAnswer.trim().toLowerCase();
    const entered = passcode.trim().toLowerCase();

    if (entered === expected) {
      setIsUnlocked(true);
      setError(null);
      playSuccess();
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      setError(birthdayConfig.finalLock.errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-rose-500/30 shadow-2xl relative"
      >
        {/* Animated Lock Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-rose-500/20 to-lavender-500/20 p-1 flex items-center justify-center border border-rose-500/40 shadow-rose-glow">
          {isUnlocked ? (
            <Unlock className="w-10 h-10 text-emerald-400 animate-bounce" />
          ) : (
            <Lock className="w-10 h-10 text-rose-400 animate-pulse" />
          )}
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            {isUnlocked ? 'ACCESS GRANTED' : birthdayConfig.finalLock.title}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            {birthdayConfig.finalLock.subtitle}
          </p>
        </div>

        {/* Passcode Form */}
        {!isUnlocked ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="text-left space-y-1.5">
              <label className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-gold-400" />
                <span>{birthdayConfig.finalLock.clue}</span>
              </label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder={birthdayConfig.finalLock.placeholder}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white font-mono text-center uppercase tracking-widest focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/40 transition-all placeholder:text-slate-600"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-bold text-sm tracking-wider uppercase shadow-rose-glow hover:scale-102 transition-all active:scale-95 cursor-pointer"
            >
              UNLOCK FINAL VAULT
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Vault Unlocked! Preparing Birthday Reveal...</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
