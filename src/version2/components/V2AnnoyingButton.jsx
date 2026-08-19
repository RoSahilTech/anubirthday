import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2AnnoyingButton = ({ onNext }) => {
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { playClick, playSuccess } = useAudio();

  const MAX_ATTEMPTS = 4;

  const handleEvade = () => {
    if (attempts >= MAX_ATTEMPTS) return;

    playClick();
    setAttempts((prev) => prev + 1);

    const randomX = (Math.random() - 0.5) * 110;
    const randomY = (Math.random() - 0.5) * 70;

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
        className="v2-card p-8 sm:p-10 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="flex justify-center">
          <V2Mascot state={attempts >= MAX_ATTEMPTS ? 'celebrating' : 'waving'} size="sm" />
        </div>

        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 07 • sneaky button ♡
          </span>
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3 mb-1">
            Ready for the next page?
          </h2>
          <p className="text-pastel-rose3 font-handwriting font-bold text-sm h-6">
            {attempts > 0 ? teaseText : 'Tap the button below to proceed!'}
          </p>
        </div>

        <div className="relative min-h-[90px] flex items-center justify-center pt-2">
          <motion.button
            animate={{ x: attempts < MAX_ATTEMPTS ? position.x : 0, y: attempts < MAX_ATTEMPTS ? position.y : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseEnter={attempts < MAX_ATTEMPTS ? handleEvade : undefined}
            onTouchStart={attempts < MAX_ATTEMPTS ? handleEvade : undefined}
            onClick={handleClick}
            className={`px-8 py-4 rounded-full font-cute font-bold text-base shadow-v2-card transition-all duration-300 flex items-center gap-2 mx-auto ${
              attempts >= MAX_ATTEMPTS
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white scale-105 hover:scale-110 cursor-pointer'
                : 'bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white'
            }`}
          >
            <span>{attempts >= MAX_ATTEMPTS ? 'CONTINUE NOW ♡' : 'continue ♡'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
