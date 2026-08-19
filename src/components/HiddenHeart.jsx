import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { hiddenHeartPhoto } from '../config/photos';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';
import { triggerBirthdayConfetti } from './Confetti';

export const HiddenHeart = ({ onNext }) => {
  const [feedback, setFeedback] = useState(null);
  const [isFound, setIsFound] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { playClick, playSuccess } = useAudio();

  // Define hidden heart coordinates (in percentages: top: 38%, left: 68%)
  const heartTop = 38;
  const heartLeft = 68;

  const handleSceneClick = (e) => {
    if (isFound) return;
    playClick();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Add click ripple feedback
    setRipples((prev) => [...prev.slice(-3), { id: Date.now(), x, y }]);

    // Calculate distance to heart
    const dist = Math.sqrt(Math.pow(x - heartLeft, 2) + Math.pow(y - heartTop, 2));

    if (dist < 12) {
      // Correct!
      setIsFound(true);
      playSuccess();
      setFeedback(birthdayConfig.hiddenHeart.successMessage);
      triggerBirthdayConfetti();
    } else if (dist < 25) {
      setFeedback(birthdayConfig.hiddenHeart.wrongFeedback[1]); // Getting warmer
    } else if (dist < 40) {
      setFeedback(birthdayConfig.hiddenHeart.wrongFeedback[2]); // Almost
    } else {
      setFeedback(birthdayConfig.hiddenHeart.wrongFeedback[0]); // Not there
    }
  };

  return (
    <div className="w-full max-w-lg px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-rose-500/20 shadow-2xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Search className="w-4 h-4 text-rose-400" />
          <span>{birthdayConfig.hiddenHeart.title}</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
            {isFound ? 'Heart Discovered! ❤️' : 'Find the Hidden Heart'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            {birthdayConfig.hiddenHeart.instructions}
          </p>
        </div>

        {/* Interactive Photo Scene */}
        <div
          onClick={handleSceneClick}
          className="relative mx-auto w-full max-w-[340px] h-[340px] rounded-2xl overflow-hidden cursor-crosshair border-2 border-rose-500/30 shadow-2xl group select-none"
        >
          <img
            src={hiddenHeartPhoto.src}
            alt="Hidden Heart Scene"
            className="w-full h-full object-cover filter contrast-[1.05]"
          />

          {/* Click Ripples */}
          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute w-8 h-8 rounded-full border-2 border-rose-400/80 animate-ping -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
            />
          ))}

          {/* Hidden Heart target */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isFound) {
                setIsFound(true);
                playSuccess();
                setFeedback(birthdayConfig.hiddenHeart.successMessage);
                triggerBirthdayConfetti();
              }
            }}
            aria-label="Hidden Heart"
            className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-500 focus:outline-none ${
              isFound
                ? 'scale-150 bg-rose-500/80 shadow-rose-glow ring-4 ring-rose-400 z-30'
                : 'opacity-40 hover:opacity-100 hover:scale-125'
            }`}
            style={{ left: `${heartLeft}%`, top: `${heartTop}%` }}
          >
            <Heart className={`w-5 h-5 ${isFound ? 'fill-white text-white animate-bounce' : 'fill-rose-400 text-rose-300 animate-pulse'}`} />
          </button>

          {/* Solved Banner */}
          {isFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-md p-3 text-center border-t border-rose-500/40"
            >
              <p className="text-xs font-bold text-rose-300 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{birthdayConfig.hiddenHeart.successMessage}</span>
              </p>
            </motion.div>
          )}
        </div>

        {/* Feedback hint bar */}
        <AnimatePresence mode="wait">
          {feedback && !isFound && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-medium text-rose-300"
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {isFound && (
          <div className="pt-2">
            <button
              onClick={onNext}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <span>CONTINUE QUEST</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
