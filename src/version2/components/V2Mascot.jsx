import React from 'react';
import { motion } from 'framer-motion';

/**
 * Original Cute Pink Bunny Mascot Component
 * Animation states: 'idle' | 'waving' | 'holding-heart' | 'holding-cake' | 'celebrating'
 */
export const V2Mascot = ({ state = 'idle', className = '', size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-32 h-32' : 'w-24 h-24';

  return (
    <motion.div
      animate={{
        y: state === 'celebrating' ? [0, -12, 0] : [0, -4, 0],
        rotate: state === 'waving' ? [0, 4, -4, 0] : [0, 1, -1, 0],
      }}
      transition={{
        duration: state === 'celebrating' ? 0.8 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`relative inline-block select-none ${dimensions} ${className}`}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="bunny-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="100%" stopColor="#F8DDE3" />
          </linearGradient>
          <linearGradient id="bunny-ear-inner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4C7D2" />
            <stop offset="100%" stopColor="#E9A8BA" />
          </linearGradient>
        </defs>

        {/* Left Ear */}
        <ellipse cx="42" cy="28" rx="8" ry="22" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="2.5" transform="rotate(-10 42 28)" />
        <ellipse cx="42" cy="28" rx="4" ry="14" fill="url(#bunny-ear-inner)" transform="rotate(-10 42 28)" />

        {/* Right Ear */}
        <ellipse cx="78" cy="28" rx="8" ry="22" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="2.5" transform="rotate(10 78 28)" />
        <ellipse cx="78" cy="28" rx="4" ry="14" fill="url(#bunny-ear-inner)" transform="rotate(10 78 28)" />

        {/* Body / Head */}
        <ellipse cx="60" cy="72" rx="36" ry="32" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="3" />

        {/* Blush Cheeks */}
        <circle cx="38" cy="76" r="6" fill="#F4C7D2" opacity="0.8" />
        <circle cx="82" cy="76" r="6" fill="#F4C7D2" opacity="0.8" />

        {/* Eyes */}
        {state === 'celebrating' ? (
          <>
            <path d="M 44 68 Q 48 62 52 68" stroke="#3D3035" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 68 68 Q 72 62 76 68" stroke="#3D3035" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="48" cy="66" r="3.5" fill="#3D3035" />
            <circle cx="72" cy="66" r="3.5" fill="#3D3035" />
            <circle cx="49.5" cy="64.5" r="1.2" fill="#FFFFFF" />
            <circle cx="73.5" cy="64.5" r="1.2" fill="#FFFFFF" />
          </>
        )}

        {/* Nose & Mouth */}
        <polygon points="60,73 57,71 63,71" fill="#E9A8BA" />
        <path d="M 56 75 Q 60 78 64 75" stroke="#3D3035" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Waving Arm / Hands */}
        {state === 'waving' ? (
          <ellipse cx="28" cy="74" rx="6" ry="10" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="2" transform="rotate(40 28 74)" />
        ) : (
          <ellipse cx="32" cy="82" rx="6" ry="8" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="2" />
        )}
        <ellipse cx="88" cy="82" rx="6" ry="8" fill="url(#bunny-body)" stroke="#D987A1" strokeWidth="2" />

        {/* Held Accessory: Heart or Cake */}
        {state === 'holding-heart' && (
          <path d="M 60 92 C 55 86 45 88 47 96 C 48 102 60 108 60 108 C 60 108 72 102 73 96 C 75 88 65 86 60 92 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
        )}

        {state === 'holding-cake' && (
          <g transform="translate(46, 84)">
            <rect x="0" y="8" width="28" height="14" rx="3" fill="#F4C7D2" stroke="#D987A1" strokeWidth="1.5" />
            <rect x="2" y="12" width="24" height="3" fill="#FFFFFF" />
            <rect x="12" y="2" width="4" height="6" fill="#FBBF24" />
            <circle cx="14" cy="1" r="2" fill="#EF4444" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};
