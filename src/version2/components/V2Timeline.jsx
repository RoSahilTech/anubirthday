import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { timelinePhotos } from '../../config/photos';
import { V2Lightbox } from './V2Lightbox';
import { useAudio } from '../../hooks/useAudio';

export const V2Timeline = ({ onNext }) => {
  const timelineItems = timelinePhotos;
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { playClick } = useAudio();

  const labels = [
    "Chapter 01 — Golden Hour ♡",
    "Chapter 02 — Unfiltered Laughter ♡",
    "Chapter 03 — Pure Magic ♡",
    "Chapter 04 — Beautiful Chaos ♡",
    "Chapter 05 — Core Memory ♡",
    "Chapter 06 — Radiance ♡",
    "Chapter 07 — Laughter Therapy ♡",
    "Chapter 08 — Sunshine Vibe ♡",
    "Chapter 09 — Iconic Moments ♡",
    "Chapter 10 — Milestone 22 ♡",
  ];

  return (
    <div className="w-full max-w-3xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 13 • memory journal timeline ♡
          </span>
          <h2 className="text-3xl sm:text-5xl font-handwriting font-bold text-pastel-rose3">
            Handmade Story Chapters
          </h2>
          <p className="text-pastel-subtext font-cute text-xs sm:text-sm max-w-md mx-auto pt-1">
            A vertical journey through selected favorite chapters of your story.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-dashed border-pastel-rose1 mx-auto max-w-xl pl-6 sm:pl-8 space-y-6 text-left pt-2">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full bg-white border-2 border-pastel-rose2 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-gold-400" />
              </div>

              <div
                onClick={() => {
                  playClick();
                  setSelectedPhoto(item);
                }}
                className="v2-card p-4 hover:border-pastel-rose2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <span className="text-xs font-handwriting text-pastel-rose2 font-bold block mb-1">
                  {labels[idx % labels.length]}
                </span>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <img src={item.src} alt={item.caption} className="w-full sm:w-32 h-32 object-cover rounded-lg border border-pastel-pink2 shrink-0" />
                  <div className="space-y-1">
                    <h3 className="font-handwriting font-bold text-lg text-pastel-rose3">
                      {item.title}
                    </h3>
                    <p className="text-xs font-handwriting text-pastel-text italic">
                      "{item.caption} ♡"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>THINGS TO CELEBRATE ♡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <V2Lightbox photo={selectedPhoto} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      </motion.div>
    </div>
  );
};
