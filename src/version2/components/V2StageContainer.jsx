import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import '../styles/v2Scrapbook.css';

export const V2StageContainer = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  // Floating ambient decorative items (hearts, flowers, sparkles)
  const floatingItems = [
    { type: 'heart', top: '15%', left: '8%', delay: 0 },
    { type: 'flower', top: '25%', right: '10%', delay: 1 },
    { type: 'sparkle', top: '70%', left: '6%', delay: 2 },
    { type: 'heart', top: '80%', right: '8%', delay: 1.5 },
    { type: 'flower', top: '60%', right: '12%', delay: 0.5 },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden v2-scrapbook-bg">
      {/* Decorative Floating Hearts & Flowers */}
      {!prefersReducedMotion &&
        floatingItems.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -14, 0],
              rotate: [0, 8, -8, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute pointer-events-none hidden sm:block text-pastel-rose2"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
          >
            {item.type === 'heart' && <Heart className="w-5 h-5 fill-pastel-pink2 text-pastel-rose2" />}
            {item.type === 'flower' && <Flower2 className="w-6 h-6 text-pastel-rose1" />}
            {item.type === 'sparkle' && <Sparkles className="w-5 h-5 text-gold-400" />}
          </motion.div>
        ))}

      {/* Decorative Corner Accents */}
      {/* Top-Left Bow */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 text-pastel-rose2 opacity-80 pointer-events-none select-none">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="w-8 h-8 sm:w-12 sm:h-12">
          <path d="M 50 50 C 30 20 10 40 50 50 C 70 20 90 40 50 50 Z" fill="#F4C7D2" stroke="#D987A1" strokeWidth="3" />
          <circle cx="50" cy="50" r="8" fill="#E9A8BA" />
          <path d="M 46 54 C 30 75 25 85 20 95" stroke="#D987A1" strokeWidth="4" strokeLinecap="round" />
          <path d="M 54 54 C 70 75 75 85 80 95" stroke="#D987A1" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Top-Right Flower */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 text-pastel-rose1 opacity-80 pointer-events-none select-none">
        <Flower2 className="w-6 h-6 sm:w-10 sm:h-10 text-pastel-rose2 animate-spin-slow" />
      </div>

      {/* Bottom-Left Ribbon */}
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 opacity-70 pointer-events-none select-none">
        <span className="text-xl sm:text-2xl font-handwriting text-pastel-rose3">♡ birthday journal</span>
      </div>

      {/* Bottom-Right Heart Cluster */}
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 flex items-center gap-1 opacity-80 pointer-events-none select-none">
        <Heart className="w-4 h-4 text-pastel-rose2 fill-pastel-pink2" />
        <Sparkles className="w-4 h-4 text-gold-400" />
      </div>

      {/* Main Content Card Container */}
      <main className={`relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-10 ${className}`}>
        {children}
      </main>
    </div>
  );
};
