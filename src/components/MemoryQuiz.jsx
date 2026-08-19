import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, ArrowRight, Award } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const MemoryQuiz = ({ onNext }) => {
  const questions = birthdayConfig.quiz.questions;
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const handleSelectOption = (index) => {
    if (showResponse) return;
    playClick();
    setSelectedIdx(index);
    setShowResponse(true);
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedIdx(null);
      setShowResponse(false);
    } else {
      setIsCompleted(true);
      playSuccess();
    }
  };

  const q = questions[currentQ];

  return (
    <div className="w-full max-w-lg px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-rose-500/20 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <HelpCircle className="w-4 h-4 text-rose-400" />
          <span>{birthdayConfig.quiz.title}</span>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Question {currentQ + 1} of {questions.length}</span>
              <span>{Math.round(((currentQ + 1) / questions.length) * 100)}% Completed</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {q.question}
            </h2>

            {/* Options list */}
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-rose-500/30 border-rose-400 text-rose-200 shadow-rose-glow'
                        : 'glass-card hover:bg-rose-500/10 hover:border-rose-500/40 text-slate-200'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isSelected && <Check className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Witty response */}
            <AnimatePresence mode="wait">
              {showResponse && selectedIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-rose-300 text-sm font-medium space-y-3"
                >
                  <p>"{q.options[selectedIdx].response}"</p>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>{currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Quiz Completed state */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 py-4"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
              <Award className="w-8 h-8 text-emerald-400 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-white mb-1">
                MEMORY LEVEL: UNLOCKED! 🎉
              </h2>
              <p className="text-xs text-slate-300">
                You passed the memory verification with flying colors.
              </p>
            </div>

            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <span>CONTINUE ADVENTURE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
