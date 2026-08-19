import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const SpecialThings = ({ onNext }) => {
  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>REASONS TO CELEBRATE YOU</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold shimmer-text">
          Things Worth Celebrating About You
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Just a few of the countless reasons why you make the world brighter.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-4">
          {birthdayConfig.specialThings.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-6 rounded-3xl text-left border border-rose-500/20 hover:border-rose-500/50 shadow-glass space-y-3 relative overflow-hidden group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-lavender-500/20 flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform">
                {idx % 3 === 0 ? (
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                ) : idx % 3 === 1 ? (
                  <Sparkles className="w-5 h-5 text-gold-400" />
                ) : (
                  <Star className="w-5 h-5 text-lavender-400 fill-lavender-400/30" />
                )}
              </div>

              <h3 className="font-serif font-bold text-lg text-white group-hover:text-rose-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>READ FINAL BIRTHDAY LETTER</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
