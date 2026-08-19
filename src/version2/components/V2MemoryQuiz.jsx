import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, ArrowRight, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2MemoryQuiz = ({ onNext }) => {
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
        className="v2-card p-6 sm:p-8 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="flex justify-center">
          <V2Mascot state={isCompleted ? 'celebrating' : 'idle'} size="sm" />
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
                page 06 • scrapbook quiz ♡
              </span>
              <h2 className="text-2xl font-handwriting font-bold text-pastel-rose3">
                {q.question}
              </h2>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl text-left text-xs font-cute font-medium transition-all flex items-center justify-between border-2 ${
                      isSelected
                        ? 'bg-pastel-pink1 border-pastel-rose2 text-pastel-rose3 font-bold shadow-v2-soft'
                        : 'bg-pastel-bg hover:bg-pastel-pink1 border-pastel-pink2 text-pastel-text'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pastel-rose2 fill-pastel-pink2 shrink-0" />
                      {opt.text}
                    </span>
                    {isSelected && <Check className="w-5 h-5 text-pastel-rose3 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {showResponse && selectedIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="v2-card-subtle p-4 text-center space-y-3"
                >
                  <p className="text-xs font-handwriting font-bold text-pastel-rose3 text-sm">
                    "{q.options[selectedIdx].response}"
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pastel-pink2 to-pastel-rose2 text-white font-cute font-bold text-xs uppercase shadow-v2-card hover:scale-105 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>{currentQ < questions.length - 1 ? 'NEXT QUESTION ♡' : 'FINISH QUIZ ♡'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-4">
            <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3">
              QUIZ PASSED! ♡
            </h2>
            <p className="text-xs font-cute text-pastel-subtext">
              You know yourself better than anyone. Tap below to continue your scrapbook adventure!
            </p>
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <span>CONTINUE ADVENTURE ♡</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
