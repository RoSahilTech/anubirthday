import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { getFallbackImageSvg } from '../../utils/imageUtils';

export const V2Lightbox = ({ photo, isOpen, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const [imgSrc, setImgSrc] = useState(photo?.src);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (photo?.src) {
      setImgSrc(photo.src);
      setIsLiked(false);
    }
  }, [photo]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pastel-text/80 backdrop-blur-md animate-in fade-in duration-300">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white text-pastel-rose3 border border-pastel-pink2 hover:bg-pastel-pink1 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {hasPrev && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white text-pastel-rose3 border border-pastel-pink2 hover:bg-pastel-pink1 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white text-pastel-rose3 border border-pastel-pink2 hover:bg-pastel-pink1 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative polaroid-v2 max-w-full max-h-[80vh] flex flex-col items-center p-4 bg-white rounded-2xl shadow-v2-card">
          <div className="washi-tape-top" />
          <img
            src={imgSrc}
            alt={photo.caption || 'Anushka Photo'}
            onError={() => setImgSrc(getFallbackImageSvg(photo.title || 'Anushka Memory'))}
            className="max-h-[60vh] w-auto max-w-full object-contain rounded select-none"
          />

          <div className="w-full mt-3 flex items-center justify-between px-2 pt-2 border-t border-pastel-pink1">
            <span className="font-handwriting font-bold text-pastel-rose3 text-base sm:text-lg">
              {photo.caption || 'A special moment with Anushka ♡'}
            </span>
            <button onClick={() => setIsLiked(!isLiked)} className="p-1 rounded-full text-pastel-rose2">
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-pastel-rose3 text-pastel-rose3 scale-125' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
