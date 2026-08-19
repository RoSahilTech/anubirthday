import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, CheckCircle2, User } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const IdentityCheck = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleSelect = (option) => {
    playClick();
    setSelectedOption(option.id);

    if (option.isCorrect) {
      playSuccess();
      setFeedback({ type: 'success', text: birthdayConfig.identityCheck.successMessage });
      setIsSuccess(true);
      setTimeout(() => {
        onNext();
      }, 1600);
    } else {
      setFeedback({ type: 'error', text: option.response });
    }
  };

  return (
    <div className="w-full max-w-xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl text-center space-y-6 border border-rose-500/20 shadow-2xl relative overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>{birthdayConfig.identityCheck.title}</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            {birthdayConfig.identityCheck.subtitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            {birthdayConfig.identityCheck.question}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {birthdayConfig.identityCheck.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`p-4 rounded-2xl text-left text-sm font-medium transition-all duration-300 flex items-center justify-between border ${
                  isSelected && option.isCorrect
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : isSelected && !option.isCorrect
                    ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                    : 'glass-card hover:bg-rose-500/10 hover:border-rose-500/40 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{option.label}</span>
                </div>
                {isSelected && option.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-2xl text-sm font-medium ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {feedback.text}
              {isSuccess && (
                <p className="text-xs text-slate-300 mt-1 font-normal">
                  {birthdayConfig.identityCheck.welcomeMessage}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
