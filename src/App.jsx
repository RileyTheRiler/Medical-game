import React, { useState, useMemo, useCallback, Suspense } from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import TitleScreen from './components/TitleScreen';
import MenuScreen from './components/MenuScreen';
import { CHAPTERS } from './data/chapters';
import { SCENARIOS } from './data/scenarios';
import { BOSSES } from './data/bosses';
import { DAILY_RULES } from './data/claims';
import { FLASHCARD_DECKS } from './data/flashcards';

// Lazy load heavy screens for better initial load performance
const GameScreen = React.lazy(() => import('./components/GameScreen'));
const CompleteScreen = React.lazy(() => import('./components/CompleteScreen'));
const FlashcardView = React.lazy(() => import('./components/FlashcardView'));
const EMCalculatorView = React.lazy(() => import('./components/EMCalculatorView'));
const WordBuilderView = React.lazy(() => import('./components/WordBuilderView'));

// Stable constant for modifier matching chapter config
const MODIFIER_MATCHING_CHAPTER = {
  id: 'modifierMatching',
  title: 'Modifier Matching',
  icon: '💼',
  color: '#ef4444'
};

function App() {
  const [screen, setScreen] = useState('title'); // title, menu, game, complete, flashcard, calculator, wordBuilder
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [activeBossId, setActiveBossId] = useState(null);
  const [activeClaimsDayId, setActiveClaimsDayId] = useState(null);
  const [activeFlashcardDeckId, setActiveFlashcardDeckId] = useState(null);
  const { stats, addXp, recordAnswer, completeChapter, completeClaimsDay } = useGameState();

  const handleStart = () => {
    setScreen('menu');
  };

  const handleChapterSelect = (id) => {
    setActiveChapterId(id);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setActiveFlashcardDeckId(null);
    setScreen('game');
  };

  const handleScenarioSelect = (id) => {
    setActiveScenarioId(id);
    setActiveChapterId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setActiveFlashcardDeckId(null);
    setScreen('game');
  };

  const handleBossSelect = (id) => {
    setActiveBossId(id);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveClaimsDayId(null);
    setActiveFlashcardDeckId(null);
    setScreen('game');
  };

  const handleClaimsDaySelect = (day) => {
    setActiveClaimsDayId(day);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveFlashcardDeckId(null);
    setScreen('game');
  };

  const handleFlashcardDeckSelect = (id) => {
    setActiveFlashcardDeckId(id);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setScreen('flashcard');
  };

  const handleCalculatorSelect = () => {
    setActiveFlashcardDeckId(null);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setScreen('calculator');
  };

  const handleModifierMatchingSelect = () => {
    setActiveFlashcardDeckId(null);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setScreen('game');
    // Use a special marker to indicate modifier matching mode
    setActiveChapterId('modifierMatching');
  };

  const handleWordBuilderSelect = () => {
    setActiveFlashcardDeckId(null);
    setActiveChapterId(null);
    setActiveScenarioId(null);
    setActiveBossId(null);
    setActiveClaimsDayId(null);
    setScreen('wordBuilder');
  };

  // Memoize handlers passed to GameScreen
  const handleChapterComplete = useCallback(() => {
    if (activeChapterId) {
      completeChapter(activeChapterId, CHAPTERS.length);
    }
    setScreen('complete');
  }, [activeChapterId, completeChapter]);

  const handleScenarioComplete = useCallback(() => {
    addXp(150);
    setScreen('menu');
  }, [addXp]);

  const handleBossComplete = useCallback(() => {
    addXp(500);
    setScreen('menu');
  }, [addXp]);

  const handleClaimsDayComplete = useCallback(() => {
    // Explicit null check for Day 0 support (0 is falsy but valid)
    if (activeClaimsDayId !== null) {
      const dayConfig = DAILY_RULES.find(d => d.day === activeClaimsDayId);
      if (dayConfig) {
        addXp(dayConfig.xpReward);
        completeClaimsDay(activeClaimsDayId);  // Track completion for gating
      }
    }
    setScreen('menu');
  }, [activeClaimsDayId, addXp, completeClaimsDay]);

  const handleMenu = useCallback(() => {
    setScreen('menu');
  }, []);

  const handleNextChapter = () => {
    if (activeChapterId) {
      const nextId = activeChapterId + 1;
      if (nextId <= CHAPTERS.length) {
        setActiveChapterId(nextId);
        setScreen('game');
      } else {
        setScreen('menu');
      }
    } else {
      setScreen('menu');
    }
  };

  // Determine what object to pass to GameScreen
  const activeContent = useMemo(() => activeChapterId
    ? CHAPTERS.find(c => c.id === activeChapterId)
    : activeScenarioId
      ? { ...SCENARIOS.find(s => s.id === activeScenarioId), icon: '💻', color: '#3b82f6' }
      : activeBossId
        ? BOSSES.find(b => b.id === activeBossId)
        : activeClaimsDayId !== null
          ? { day: activeClaimsDayId, ...DAILY_RULES.find(d => d.day === activeClaimsDayId), icon: '📋', color: '#10b981' }
          : null, [activeChapterId, activeScenarioId, activeBossId, activeClaimsDayId]);

  const activeDeck = useMemo(() => activeFlashcardDeckId
    ? FLASHCARD_DECKS.find(d => d.id === activeFlashcardDeckId)
    : null, [activeFlashcardDeckId]);

  // Determine correct onComplete handler
  const onCompleteHandler = useMemo(() => {
    if (activeChapterId) return handleChapterComplete;
    if (activeBossId) return handleBossComplete;
    if (activeClaimsDayId !== null) return handleClaimsDayComplete;
    return handleScenarioComplete;
  }, [activeChapterId, activeBossId, activeClaimsDayId, handleChapterComplete, handleBossComplete, handleClaimsDayComplete, handleScenarioComplete]);

  // Calculate initial mode for GameScreen key generation
  const initialMode = activeScenarioId ? 'scenario' : activeBossId ? 'boss' : activeClaimsDayId !== null ? 'claims' : 'lesson';

  return (
    <>
      {screen === 'title' && (
        <TitleScreen onStart={handleStart} stats={stats} />
      )}

      {screen === 'menu' && (
        <MenuScreen
          stats={stats}
          onSelectChapter={handleChapterSelect}
          onSelectScenario={handleScenarioSelect}
          onSelectBoss={handleBossSelect}
          onSelectClaimsDay={handleClaimsDaySelect}
          onSelectFlashcardDeck={handleFlashcardDeckSelect}
          onSelectCalculator={handleCalculatorSelect}
          onSelectModifierMatching={handleModifierMatchingSelect}
          onSelectWordBuilder={handleWordBuilderSelect}
        />
      )}

      <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '20vh', fontSize: '1.5rem' }}>Loading...</div>}>
        {screen === 'game' && activeChapterId === 'modifierMatching' && (
          <GameScreen
            key="modifierMatching"
            chapter={MODIFIER_MATCHING_CHAPTER}
            initialMode="modifierMatching"
            onMenu={handleMenu}
            onComplete={handleMenu}
            onXpGain={addXp}
            onAnswerRecord={recordAnswer}
          />
        )}

        {screen === 'game' && activeContent && (
          <GameScreen
            key={`${activeContent.id ?? activeContent.day}-${initialMode}`}
            chapter={activeContent} // Acts as the config object
            initialMode={initialMode}
            onMenu={handleMenu}
            onComplete={onCompleteHandler}
            onXpGain={addXp}
            onAnswerRecord={recordAnswer}
          />
        )}

        {screen === 'complete' && activeContent && (
          <CompleteScreen
            chapter={activeContent}
            stats={stats}
            onMenu={handleMenu}
            onNext={handleNextChapter}
          />
        )}

        {screen === 'flashcard' && activeDeck && (
          <FlashcardView
            deck={activeDeck}
            onMenu={handleMenu}
          />
        )}

        {screen === 'calculator' && (
          <EMCalculatorView
            onMenu={handleMenu}
          />
        )}

        {screen === 'wordBuilder' && (
          <WordBuilderView
            onMenu={handleMenu}
            onComplete={handleMenu}
            onXpGain={addXp}
          />
        )}
      </Suspense>
    </>
  );
}

export default App;
