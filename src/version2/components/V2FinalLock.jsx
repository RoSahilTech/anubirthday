import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Delete } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { useAudio } from '../../hooks/useAudio';
import { V2Mascot } from './V2Mascot';

export const V2FinalLock = ({ onNext }) => {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { playClick, playSuccess } = useAudio();

  const wrongMessages = [
    "hehe... nope ♡",
    "Nice try 👀",
    "you know this... think again 😭",
    "almost... try once more! ♡",
  ];

  const handleKeyClick = (key) => {
    playClick();
    if (isUnlocked) return;
    setErrorMsg(null);

    if (key === 'DEL') {
      setInputVal((prev) => prev.slice(0, -1));
    } else if (key === 'CLEAR') {
      setInputVal('');
    } else {
      if (inputVal.length < 12) {
        setInputVal((prev) => prev + key);
      }
    }
  };

  const handleCheckPassword = () => {
    playClick();
    const expected = birthdayConfig.finalLock.correctAnswer.trim().toLowerCase();
    const entered = inputVal.trim().toLowerCase();

    // Check if passcode is correct ("4505" or "anushka" or "22")
    if (entered === '4505' || entered === expected || entered === 'anushka' || entered === '22') {
      setIsUnlocked(true);
      setErrorMsg(null);
      playSuccess();
      setTimeout(() => {
        onNext();
      }, 2000);
    } else {
      setIsShaking(true);
      const randomErr = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      setErrorMsg(randomErr);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const keypadKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['✦', '0', '♡'],
  ];

  return (
    <div className="w-full max-w-md px-4 text-center">
      <motion.div
        animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="v2-card p-6 sm:p-8 space-y-6 relative overflow-hidden"
      >
        <div className="washi-tape-top" />

        <div className="flex justify-center">
          <V2Mascot state={isUnlocked ? 'celebrating' : 'holding-heart'} size="md" />
        </div>

        <div>
          <span className="text-sm font-handwriting font-bold text-pastel-rose2 block mb-1">
            our little secret ♡
          </span>
          <h2 className="text-3xl font-handwriting font-bold text-pastel-rose3 mb-1">
            {isUnlocked ? 'ACCESS GRANTED ♡' : 'enter the password'}
          </h2>
          <p className="text-pastel-subtext font-cute text-xs">
            Enter the last 4 digits of your phone number:
          </p>
        </div>

        {/* Password Display Dots/Text */}
        <div className="py-2 flex items-center justify-center gap-3">
          {inputVal.length === 0 ? (
            <span className="text-2xl font-handwriting text-pastel-pink2">○ ○ ○ ○</span>
          ) : (
            <div className="flex items-center gap-2 font-mono text-2xl font-bold text-pastel-rose3 tracking-widest">
              {inputVal.split('').map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="px-2 py-0.5 rounded-lg bg-pastel-pink1 border border-pastel-pink2"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Display Error Message */}
        <AnimatePresence mode="wait">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-handwriting font-bold"
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cute Circular Keypad */}
        {!isUnlocked && (
          <div className="space-y-3 pt-2 max-w-[260px] mx-auto">
            {keypadKeys.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-between items-center gap-2">
                {row.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      if (k === '♡') {
                        handleCheckPassword();
                      } else if (k === '✦') {
                        handleKeyClick('4505');
                      } else {
                        handleKeyClick(k);
                      }
                    }}
                    className="v2-keypad-btn flex items-center justify-center focus:outline-none"
                  >
                    {k}
                  </button>
                ))}
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleKeyClick('DEL')}
                className="px-4 py-2 rounded-full bg-pastel-bg border border-pastel-pink2 text-pastel-rose3 font-handwriting font-bold text-xs flex items-center gap-1 hover:bg-pastel-pink1"
              >
                <Delete className="w-3.5 h-3.5" />
                delete
              </button>

              <button
                onClick={handleCheckPassword}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-xs shadow-v2-card hover:scale-105"
              >
                UNLOCK ♡
              </button>
            </div>
          </div>
        )}

        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-handwriting font-bold text-sm"
          >
            okay... let's see what I made for you ♡
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
