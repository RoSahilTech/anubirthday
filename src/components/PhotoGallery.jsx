import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, ArrowRight, Heart } from 'lucide-react';
import { galleryPhotos } from '../config/photos';
import { Lightbox } from './Lightbox';
import { useAudio } from '../hooks/useAudio';
import { getFallbackImageSvg } from '../utils/imageUtils';

export const PhotoGallery = ({ onNext }) => {
  const PAGE_SIZE = 16;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { playClick } = useAudio();

  const photosToShow = galleryPhotos.slice(0, visibleCount);

  const handleOpenLightbox = (index) => {
    playClick();
    setSelectedIndex(index);
  };

  const handleLoadMore = () => {
    playClick();
    setVisibleCount((prev) => Math.min(galleryPhotos.length, prev + PAGE_SIZE));
  };

  return (
    <div className="w-full max-w-6xl px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-rose-300">
          <Camera className="w-4 h-4 text-rose-400" />
          <span>HER MEMORY VAULT • {galleryPhotos.length} PHOTOGRAPHS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold shimmer-text">
          Anushka's Polaroid Treasury
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Every photo tells a story. Click or tap any memory to view it in high resolution.
        </p>

        {/* Masonry / Grid Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pt-4">
          {photosToShow.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
              onClick={() => handleOpenLightbox(index)}
              className="break-inside-avoid cursor-pointer"
            >
              <div className="polaroid-frame group relative transition-transform duration-300 hover:-translate-y-2 hover:rotate-1">
                <div className="relative overflow-hidden rounded">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = getFallbackImageSvg(`Memory #${index + 1}`);
                    }}
                    className="w-full h-auto object-cover rounded transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="pt-3 px-1 text-left flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-slate-800 truncate max-w-[80%]">
                    {photo.caption}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:fill-rose-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More & Next Stage Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {visibleCount < galleryPhotos.length && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full glass-card hover:bg-slate-800 text-rose-300 hover:text-white font-semibold text-sm transition-all border border-rose-500/30"
            >
              LOAD MORE MEMORIES ({galleryPhotos.length - visibleCount} REMAINING)
            </button>
          )}

          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-lavender-500 text-white font-semibold text-base shadow-rose-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>CONTINUE TO STORY TIMELINE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photo={selectedIndex !== null ? galleryPhotos[selectedIndex] : null}
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          onPrev={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setSelectedIndex((prev) => Math.min(galleryPhotos.length - 1, prev + 1))}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < galleryPhotos.length - 1}
        />
      </motion.div>
    </div>
  );
};
