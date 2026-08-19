import { useState, useEffect } from 'react';
import { getStorageData, saveStorageData, clearStorageData } from '../utils/storage';

export const TOTAL_STAGES = 15;

export const useProgress = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);
  const [unlockedMemories, setUnlockedMemories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getStorageData();
    if (data) {
      if (data.currentStage) setCurrentStage(data.currentStage);
      if (data.maxUnlockedStage) setMaxUnlockedStage(data.maxUnlockedStage);
      if (data.unlockedMemories) setUnlockedMemories(data.unlockedMemories);
    }
    setIsLoaded(true);
  }, []);

  const goToStage = (stageNum) => {
    const nextStage = Math.max(1, Math.min(TOTAL_STAGES, stageNum));
    setCurrentStage(nextStage);
    if (nextStage > maxUnlockedStage) {
      setMaxUnlockedStage(nextStage);
    }
    saveStorageData({
      currentStage: nextStage,
      maxUnlockedStage: Math.max(maxUnlockedStage, nextStage),
      unlockedMemories,
    });
  };

  const nextStage = () => {
    goToStage(currentStage + 1);
  };

  const unlockMemory = (memoryId) => {
    if (!unlockedMemories.includes(memoryId)) {
      const updated = [...unlockedMemories, memoryId];
      setUnlockedMemories(updated);
      saveStorageData({
        currentStage,
        maxUnlockedStage,
        unlockedMemories: updated,
      });
    }
  };

  const resetProgress = () => {
    clearStorageData();
    setCurrentStage(1);
    setMaxUnlockedStage(1);
    setUnlockedMemories([]);
  };

  return {
    currentStage,
    maxUnlockedStage,
    unlockedMemories,
    isLoaded,
    goToStage,
    nextStage,
    unlockMemory,
    resetProgress,
  };
};
