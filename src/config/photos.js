/**
 * ANUSHKA — THE BIRTHDAY QUEST
 * Photo Manifest & Auto-Discovery Helper
 * 
 * Automatically discovers all photos in /public/images/
 * Handles 10 photos, 50 photos, or 120+ photos gracefully!
 */

// Auto-discover images using Vite's import.meta.glob or fallback filenames
const imageModules = import.meta.glob('/public/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

// Convert imported map to array of relative URLs usable by <img> tags
const autoDiscoveredUrls = Object.keys(imageModules).map((path) => {
  return path.replace(/^\/public/, '');
});

// Fallback list of known filenames in case Vite glob in static build needs explicit list
const fallbackFilenames = [
  '1.jpg', '2.JPG', '3.jpg', '4.JPG', '5.jpg', '6.jpg', '7.JPG', '8.JPG', '9.JPG', '10.JPG',
  '11.JPG', '12.JPG', '13.JPG', '14.JPG', '15.JPG', '16.JPG', '17.JPG', '18.JPG', '19.JPG', '20.JPG',
  '21.JPG', '22.JPG', '23.jpg', '24.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg',
  '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg',
  '41.jpg', '42.jpg', '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg',
  '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg', '59.jpg', '60.jpg',
  '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg', '67.jpg', '68.jpg', '69.jpg', '70.jpg',
  '71.jpg', '72.jpg', '73.jpg', '74.jpg', '75.jpg', '76.jpg', '77.jpg', '78.jpg', '79.jpg', '80.jpg',
  '81.jpg', '82.jpg', '83.jpg', '84.jpg', '85.jpg', '86.jpg', '87.jpg', '88.jpg', '89.jpg', '90.jpg',
  '91.jpg', '92.jpg', '93.jpg', '94.jpg', '95.jpg', '96.jpg', '97.jpg', '98.jpg', '99.jpg', '100.jpg',
  '101.jpg', '102.jpg', '103.jpg', '104.jpg', '105.jpg', '106.jpg', '107.jpg', '108.jpg', '109.jpg', '110.jpg',
  '111.jpg', '112.jpg', '113.jpg', '114.jpg', '115.jpg', '116.jpg', '117.jpg', '118.jpg', '119.jpg', '120.jpg',
  '121.jpg', '122.jpg', '123.jpg', '124.jpg', '125.jpg', '126.jpg'
];

// Helper to get base path for public assets
const getAssetUrl = (relativePath) => {
  // Clean path
  const cleaned = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
  return `./${cleaned}`;
};

// Combine and deduplicate discovered photos
const rawPhotoUrls = autoDiscoveredUrls.length > 0
  ? autoDiscoveredUrls
  : fallbackFilenames.map(f => `/images/${f}`);

// Natural sort for photo order (1.jpg, 2.jpg ... 10.jpg, 100.jpg)
const sortedPhotoUrls = [...rawPhotoUrls].sort((a, b) => {
  const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
  const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
  return numA - numB;
});

// Captions bank to distribute across photos
const captionBank = [
  "Core memory unlocked ✨",
  "That contagious laughter!",
  "Main character vibes always 🌟",
  "One of my favorite pictures ever.",
  "Pure unadulterated happiness.",
  "Radiant energy captured in time.",
  "Looking effortlessly iconic.",
  "A priceless moment in your journey.",
  "Unforgettable memories with you ❤️",
  "Sunshine in photo form.",
  "Keep smiling like this forever!",
  "A golden moment from your story.",
  "Making ordinary days feel magical.",
  "Chapter 22 is going to be amazing!",
];

// Map all discovered photos into structured photo objects
export const allPhotos = sortedPhotoUrls.map((path, idx) => {
  const caption = captionBank[idx % captionBank.length];
  return {
    id: `photo-${idx + 1}`,
    src: getAssetUrl(path),
    rawPath: path,
    caption: caption,
    title: `Memory #${idx + 1}`,
    tag: idx % 3 === 0 ? "Highlight" : idx % 3 === 1 ? "Favorite" : "Special",
  };
});

/**
 * Helper utilities to retrieve unique, non-overlapping photos for interactive quest stages
 */

// Selected photos for Database Vault (Stage 3): Indexes 0-4
export const databasePhotos = allPhotos.slice(0, 5);

// Selected photo for the Jigsaw Puzzle (Stage 4): Index 5
export const puzzlePhoto = allPhotos[5] || allPhotos[0];

// Selected photo for Hidden Heart (Stage 5): Index 6
export const hiddenHeartPhoto = allPhotos[6] || allPhotos[1];

// Photos used for Quiz options (Stage 6): Indexes 7-10
export const quizPhotos = allPhotos.slice(7, 11);

// Photos used in Constellation map (Stage 8): Indexes 11-20 (10 unique star photos!)
export const constellationPhotos = allPhotos.slice(11, 21);

// Photos used for Reveal climax (Stage 11) and Final Message (Stage 15): Index 21
export const revealPortraitPhoto = allPhotos[21] || allPhotos[0];
export const revealHighlightPhotos = allPhotos.slice(22, 30);

// Photos used for Vertical Story Timeline (Stage 13): Indexes 30-39 (10 unique timeline photos!)
export const timelinePhotos = allPhotos.slice(30, 40);

// Full gallery photos (Stage 12)
export const galleryPhotos = allPhotos;
