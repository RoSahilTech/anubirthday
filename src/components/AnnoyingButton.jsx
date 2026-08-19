import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { useAudio } from '../hooks/useAudio';

export const AnnoyingButton = ({ onNext }) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playClick, playSuccess } = useAudio();

  const MAX_ATTEMPTS = 4;

  const handleEvade = () => {
    if (attempts >= MAX_ATTEMPTS) return;

    playClick();
    setAttempts((prev) => prev + 1);

    // Calculate a small random offset bounded within [-60px, 60px] to stay inside container
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 80;

    setPosition({ x: randomX, y: randomY });
  };

  const handleClick = () => {
    playSuccess();
    onNext();
  };

  const teaseText =
    attempts >= MAX_ATTEMPTS
      ? birthdayConfig.annoyingButton.teaseTexts[3]
      : birthdayConfig.annoyingButton.teaseTexts[Math.min(attempts, 2)];

  return (
    <div className="w-full max-w-md px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-rose-500/20 shadow-2xl relative overflow-hidden"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center border border-rose-500/40 animate-bounce">
          <Smile className="w-8 h-8 text-rose-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {birthdayConfig.annoyingButton.title}
          </h2>
          <p className="text-rose-300 font-medium text-sm h-6">
            {attempts > 0 ? teaseText : 'Tap the button below to proceed!'}
          </p>
        </div>

        {/* Evasive Button Area */}
        <div className="relative min-h-[100px] flex items-center justify-center pt-2">
          <motion.button
            animate={{ x: attempts < MAX_ATTEMPTS ? position.x : 0, y: attempts < MAX_ATTEMPTS ? position.y : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={attempts < MAX_ATTEMPTS ? handleEvade : undefined}
            onTouchStart={attempts < MAX_ATTEMPTS ? handleEvade : undefined}
            onClick={handleClick}
            className={`px-8 py-4 rounded-full font-bold text-base shadow-rose-glow transition-all duration-300 flex items-center gap-2 mx-auto ${
              attempts >= MAX_ATTEMPTS
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-110 hover:scale-115 cursor-pointer'
                : 'bg-gradient-to-r from-rose-500 via-pink-500 to-lavender-500 text-white hover:shadow-2xl'
            }`}
          >
            <span>{attempts >= MAX_ATTEMPTS ? 'CONTINUE NOW!' : birthdayConfig.annoyingButton.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
