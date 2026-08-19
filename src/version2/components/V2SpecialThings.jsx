import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';

export const V2SpecialThings = ({ onNext }) => {
  return (
    <div className="w-full max-w-4xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 14 • reasons to celebrate you ♡
          </span>
          <h2 className="text-3xl sm:text-5xl font-handwriting font-bold text-pastel-rose3">
            Things Worth Celebrating About You
          </h2>
          <p className="text-pastel-subtext font-cute text-xs sm:text-sm max-w-md mx-auto pt-1">
            Just a few of the countless reasons why you make the world brighter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-2">
          {birthdayConfig.specialThings.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -5, rotate: idx % 2 === 0 ? 1 : -1 }}
              className="v2-card p-6 text-left space-y-2 relative overflow-hidden"
            >
              <div className="w-8 h-8 rounded-full bg-pastel-pink1 flex items-center justify-center">
                {idx % 3 === 0 ? (
                  <Heart className="w-4 h-4 text-pastel-rose2 fill-pastel-rose1" />
                ) : idx % 3 === 1 ? (
                  <Sparkles className="w-4 h-4 text-gold-400" />
                ) : (
                  <Star className="w-4 h-4 text-pastel-rose2 fill-pastel-pink2" />
                )}
              </div>

              <h3 className="font-handwriting font-bold text-xl text-pastel-rose3">
                {item.title}
              </h3>

              <p className="text-pastel-text font-cute text-xs leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>READ BIRTHDAY CARD ♡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
