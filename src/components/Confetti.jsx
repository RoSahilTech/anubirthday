import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const triggerBirthdayConfetti = () => {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Confetti from sides
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#F472B6', '#EC4899', '#C084FC', '#FBBF24'] });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#F472B6', '#E11D48', '#E9D5FF', '#F59E0B'] });
  }, 250);
};

export const ConfettiEffect = () => {
  useEffect(() => {
    triggerBirthdayConfetti();
  }, []);

  return null;
};
