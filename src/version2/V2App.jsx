import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';

import { V2StageContainer } from './components/V2StageContainer';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { AudioControl } from '../components/AudioControl';

import { V2Intro } from './components/V2Intro';
import { V2IdentityCheck } from './components/V2IdentityCheck';
import { V2MemoryDatabase } from './components/V2MemoryDatabase';
import { V2PhotoPuzzle } from './components/V2PhotoPuzzle';
import { V2HiddenHeart } from './components/V2HiddenHeart';
import { V2MemoryQuiz } from './components/V2MemoryQuiz';
import { V2AnnoyingButton } from './components/V2AnnoyingButton';
import { V2MemoryConstellation } from './components/V2MemoryConstellation';
import { V2FinalLock } from './components/V2FinalLock';
import { V2FakeEnding } from './components/V2FakeEnding';
import { V2BirthdayReveal } from './components/V2BirthdayReveal';
import { V2PhotoGallery } from './components/V2PhotoGallery';
import { V2Timeline } from './components/V2Timeline';
import { V2SpecialThings } from './components/V2SpecialThings';
import { V2FinalMessage } from './components/V2FinalMessage';

export function V2App({ onGoHome }) {
  const {
    currentStage,
    maxUnlockedStage,
    goToStage,
    nextStage,
    resetProgress,
    isLoaded,
  } = useProgress();

  if (!isLoaded) {
    return (
      <div className="min-h-screen v2-scrapbook-bg flex items-center justify-center font-handwriting font-bold text-lg text-pastel-rose3">
        Opening Anushka's Scrapbook... ♡
      </div>
    );
  }

  const renderStageComponent = () => {
    switch (currentStage) {
      case 1:
        return <V2Intro onNext={nextStage} />;
      case 2:
        return <V2IdentityCheck onNext={nextStage} />;
      case 3:
        return <V2MemoryDatabase onNext={nextStage} />;
      case 4:
        return <V2PhotoPuzzle onNext={nextStage} />;
      case 5:
        return <V2HiddenHeart onNext={nextStage} />;
      case 6:
        return <V2MemoryQuiz onNext={nextStage} />;
      case 7:
        return <V2AnnoyingButton onNext={nextStage} />;
      case 8:
        return <V2MemoryConstellation onNext={nextStage} />;
      case 9:
        return <V2FinalLock onNext={nextStage} />;
      case 10:
        return <V2FakeEnding onNext={nextStage} />;
      case 11:
        return <V2BirthdayReveal onNext={nextStage} />;
      case 12:
        return <V2PhotoGallery onNext={nextStage} />;
      case 13:
        return <V2Timeline onNext={nextStage} />;
      case 14:
        return <V2SpecialThings onNext={nextStage} />;
      case 15:
        return <V2FinalMessage resetProgress={resetProgress} />;
      default:
        return <V2Intro onNext={nextStage} />;
    }
  };

  return (
    <V2StageContainer>
      <ProgressIndicator
        currentStage={currentStage}
        maxUnlockedStage={maxUnlockedStage}
        goToStage={goToStage}
        resetProgress={resetProgress}
        onGoHome={onGoHome}
      />

      <AudioControl />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          {renderStageComponent()}
        </motion.div>
      </AnimatePresence>
    </V2StageContainer>
  );
}
