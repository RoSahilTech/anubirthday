import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { hiddenHeartPhoto } from '../../config/photos';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { triggerBirthdayConfetti } from '../../components/Confetti';
import { V2Mascot } from './V2Mascot';

export const V2HiddenHeart = ({ onNext }) => {
  const [feedback, setFeedback] = useState(null);
  const [isFound, setIsFound] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { playClick, playSuccess } = useAudio();

  const heartTop = 38;
  const heartLeft = 68;

  const handleSceneClick = (e) => {
    if (isFound) return;
    playClick();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRipples((prev) => [...prev.slice(-3), { id: Date.now(), x, y }]);
    const dist = Math.sqrt(Math.pow(x - heartLeft, 2) + Math.pow(y - heartTop, 2));

    if (dist < 12) {
      setIsFound(true);
      playSuccess();
      setFeedback("you found me ♡");
      triggerBirthdayConfetti();
    } else if (dist < 25) {
      setFeedback("Getting warmer... ♡");
    } else {
      setFeedback("Not there 👀 look closer!");
    }
  };

  return (
    <div className="w-full max-w-lg px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="v2-card p-6 sm:p-8 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="flex justify-center">
          <V2Mascot state={isFound ? 'celebrating' : 'holding-heart'} size="sm" />
        </div>

        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 05 • hidden heart sticker ♡
          </span>
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3 mb-1">
            {isFound ? 'You Found Me! ♡' : 'Find the Secret Heart'}
          </h2>
          <p className="text-pastel-subtext font-cute text-xs">
            There is a tiny heart sticker hidden in this polaroid photo. Tap around to find it!
          </p>
        </div>

        {/* Scene */}
        <div
          onClick={handleSceneClick}
          className="relative mx-auto w-full max-w-[340px] h-[340px] rounded-2xl overflow-hidden cursor-crosshair border-4 border-pastel-pink2 shadow-v2-card group select-none bg-white p-2"
        >
          <img src={hiddenHeartPhoto.src} alt="Hidden Heart Scene" className="w-full h-full object-cover rounded-xl" />

          {ripples.map((r) => (
            <span
              key={r.id}
              className="absolute w-8 h-8 rounded-full border-2 border-pastel-rose1 animate-ping -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
            />
          ))}

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isFound) {
                setIsFound(true);
                playSuccess();
                setFeedback("you found me ♡");
                triggerBirthdayConfetti();
              }
            }}
            className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all ${
              isFound ? 'scale-150 bg-pastel-pink2 ring-4 ring-pastel-rose1 z-30' : 'opacity-50 hover:opacity-100'
            }`}
            style={{ left: `${heartLeft}%`, top: `${heartTop}%` }}
          >
            <Heart className={`w-5 h-5 ${isFound ? 'fill-pastel-rose3 text-pastel-rose3 animate-bounce' : 'fill-pastel-rose1 text-pastel-rose2 animate-pulse'}`} />
          </button>
        </div>

        {feedback && (
          <div className="p-3 rounded-2xl bg-pastel-bg border border-pastel-pink2 text-xs font-handwriting font-bold text-pastel-rose3">
            {feedback}
          </div>
        )}

        {isFound && (
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>CONTINUE QUEST ♡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </div>
  );
};
