import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, ArrowRight, Heart } from 'lucide-react';
import { galleryPhotos } from '../../config/photos';
import { V2Lightbox } from './V2Lightbox';
import { useAudio } from '../../hooks/useAudio';

export const V2PhotoGallery = ({ onNext }) => {
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
        className="space-y-6"
      >
        <div>
          <span className="text-xs font-handwriting font-bold text-pastel-rose2 uppercase tracking-widest block mb-1">
            page 12 • polaroid treasury ♡ ({galleryPhotos.length} photos)
          </span>
          <h2 className="text-3xl sm:text-5xl font-handwriting font-bold text-pastel-rose3">
            Anushka's Pinterest Scrapbook
          </h2>
          <p className="text-pastel-subtext font-cute text-xs sm:text-sm max-w-md mx-auto pt-1">
            Every photo is a handmade memory. Tap any polaroid to enlarge!
          </p>
        </div>

        {/* Pinterest Polaroid Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pt-2">
          {photosToShow.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
              onClick={() => handleOpenLightbox(index)}
              className="break-inside-avoid cursor-pointer"
            >
              <div className="polaroid-v2 group relative">
                <div className="washi-tape-top" />
                <div className="relative overflow-hidden rounded">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover rounded transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-pastel-rose3/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-7 h-7 text-white drop-shadow-md" />
                  </div>
                </div>
                <div className="pt-2 text-left flex items-center justify-between">
                  <span className="font-handwriting font-bold text-xs text-pastel-rose3 truncate max-w-[85%]">
                    {photo.caption} ♡
                  </span>
                  <Heart className="w-3.5 h-3.5 text-pastel-rose2 fill-pastel-pink2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          {visibleCount < galleryPhotos.length && (
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full bg-pastel-bg border-2 border-pastel-pink2 text-pastel-rose3 font-handwriting font-bold text-sm hover:bg-pastel-pink1"
            >
              LOAD MORE POLAROIDS ({galleryPhotos.length - visibleCount} REMAINING) ♡
            </button>
          )}

          <button
            onClick={onNext}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pastel-pink2 via-pastel-rose1 to-pastel-rose2 text-white font-cute font-bold text-sm shadow-v2-card hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>CONTINUE TO TIMELINE ♡</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <V2Lightbox
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
