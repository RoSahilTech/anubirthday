/**
 * Image Utilities
 * Handles preloading, fallback placeholder generation, and array helpers.
 */

// Preload array of image URLs safely in background
export const preloadImages = (urls = []) => {
  if (!urls || urls.length === 0) return Promise.resolve();
  const promises = urls.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false); // Resolve gracefully on error!
    });
  });
  return Promise.all(promises);
};

// Generate an SVG data URI fallback card if image fails to render
export const getFallbackImageSvg = (label = "Anushka Memory") => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="100%" height="100%" fill="#0D1127"/>
    <circle cx="200" cy="180" r="80" fill="#141A38" stroke="#EC4899" stroke-width="2"/>
    <text x="200" y="190" font-family="Outfit, sans-serif" font-size="40" fill="#F472B6" text-anchor="middle">👑</text>
    <text x="200" y="320" font-family="Outfit, sans-serif" font-size="18" font-weight="600" fill="#F8FAFC" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Shuffle helper
export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
