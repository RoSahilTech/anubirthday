import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { galleryPhotos } from '../config/photos';
import { Lightbox } from './Lightbox';
import { useAudio } from '../hooks/useAudio';

export const Timeline = ({ onNext }) => {
  // Use 10 photos for vertical timeline sequence
  const timelineItems = galleryPhotos.slice(0, 10);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const { playClick } = useAudio();

  const labels = [
    "Chapter 01 — Golden Hour",
    "Chapter 02 — Unfiltered Joy",
    "Chapter 03 — Pure Magic",
    "Chapter 04 — Beautiful Chaos",
    "Chapter 05 — Core Memory",
    "Chapter 06 — Radiance",
    "Chapter 07 — Laughter",
    "Chapter 08 — Sunshine",
    "Chapter 09 — The Vibe",
    "Chapter 10 — Memory Milestone",
  ];

  return (
    <div className="w-full max-w-3xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Calendar className="w-4 h-4 text-rose-400" />
          <span>ANUSHKA'S JOURNEY TIMELINE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold shimmer-text">
          The Story Line
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          A vertical journey through selected favorite moments.
        </p>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l-2 border-rose-500/30 mx-auto max-w-xl pl-6 sm:pl-8 space-y-8 text-left pt-4">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Star Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-6 h-6 rounded-full bg-slate-950 border-2 border-rose-400 flex items-center justify-center group-hover:scale-125 group-hover:bg-rose-500 transition-all">
                <Sparkles className="w-3 h-3 text-gold-400" />
              </div>

              {/* Timeline Card */}
              <div
                onClick={() => {
                  playClick();
                  setSelectedPhoto(item);
                }}
                className="glass-panel p-4 rounded-2xl border border-rose-500/20 hover:border-rose-500/50 shadow-glass cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider block mb-2">
                  {labels[idx % labels.length]}
                </span>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full sm:w-36 h-36 object-cover rounded-xl border border-slate-700/60 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 italic">
                      "{item.caption}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <span>WHAT MAKES ANUSHKA SPECIAL</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photo={selectedPhoto}
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      </motion.div>
    </div>
  );
};
