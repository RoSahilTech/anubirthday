import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2IdentityCheck = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleSelect = (option) => {
    playClick();
    setSelectedOption(option.id);

    if (option.isCorrect) {
      playSuccess();
      setFeedback({ type: 'success', text: "IDENTITY CONFIRMED ♡ Welcome Anushka!" });
      setIsSuccess(true);
      setTimeout(() => {
        onNext();
      }, 1600);
    } else {
      setFeedback({ type: 'error', text: option.response });
    }
  };

  return (
    <div className="w-full max-w-lg px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="v2-card p-6 sm:p-8 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <V2Mascot state={isSuccess ? 'celebrating' : 'holding-heart'} size="md" className="mx-auto" />

        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 02 • verification ♡
          </span>
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3">
            Who is this website for?
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {birthdayConfig.identityCheck.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 rounded-2xl text-left font-cute font-medium text-sm transition-all flex items-center justify-between border-2 ${
                  isSelected && option.isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : isSelected && !option.isCorrect
                    ? 'bg-rose-50 border-rose-400 text-rose-800'
                    : 'bg-pastel-bg hover:bg-pastel-pink1 border-pastel-pink2 text-pastel-text'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pastel-rose2 fill-pastel-pink2 shrink-0" />
                  {option.label}
                </span>
                {isSelected && option.isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback message */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3.5 rounded-2xl text-xs font-cute font-bold ${
                feedback.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
