import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { getFallbackImageSvg } from '../utils/imageUtils';

export const Lightbox = ({ photo, isOpen, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const [imgSrc, setImgSrc] = useState(photo?.src);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (photo?.src) {
      setImgSrc(photo.src);
      setIsLiked(false);
    }
  }, [photo]);

  // Handle keyboard events (ESC, Left, Right)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500/30 text-slate-300 hover:text-white border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      {hasPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous Photo"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500/30 text-slate-300 hover:text-white border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Button */}
      {hasNext && (
        <button
          onClick={onNext}
          aria-label="Next Photo"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-rose-500/30 text-slate-300 hover:text-white border border-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Modal */}
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative polaroid-frame max-w-full max-h-[75vh] flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-2xl">
          <img
            src={imgSrc}
            alt={photo.caption || 'Anushka Photo'}
            onError={() => setImgSrc(getFallbackImageSvg(photo.title || 'Anushka Memory'))}
            className="max-h-[60vh] w-auto max-w-full object-contain rounded select-none"
          />

          <div className="w-full mt-3 flex items-center justify-between px-2 pt-2 border-t border-slate-200">
            <span className="font-serif font-bold text-slate-800 text-sm sm:text-base">
              {photo.caption || 'A special moment with Anushka'}
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-1.5 rounded-full hover:bg-rose-50 text-slate-400 transition-colors"
            >
              <Heart
                className={`w-5 h-5 transition-transform ${
                  isLiked ? 'fill-rose-500 text-rose-500 scale-125' : 'hover:text-rose-400'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
