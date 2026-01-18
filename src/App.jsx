import React, { useState, useEffect } from 'react';
import './App.css';
import { useGameState } from './hooks/useGameState';
import TitleScreen from './components/TitleScreen';
import MenuScreen from './components/MenuScreen';
import GameScreen from './components/GameScreen';
import CompleteScreen from './components/CompleteScreen';
import FlashcardView from './components/FlashcardView';
import EMCalculatorView from './components/EMCalculatorView';
import WordBuilderView from './components/WordBuilderView';
import { CHAPTERS } from './data/chapters';
import { SCENARIOS } from './data/scenarios';
import { BOSSES } from './data/bosses';
import { DAILY_RULES } from './data/claims';
import { FLASHCARD_DECKS } from './data/flashcards';

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

  const handleChapterComplete = () => {
    if (activeChapterId) {
      completeChapter(activeChapterId, CHAPTERS.length);
    }
    setScreen('complete');
  };

  const handleScenarioComplete = () => {
    addXp(150);
    setScreen('menu');
  };

  const handleBossComplete = () => {
    addXp(500);
    setScreen('menu');
  };

  const handleClaimsDayComplete = () => {
    // Explicit null check for Day 0 support (0 is falsy but valid)
    if (activeClaimsDayId !== null) {
      const dayConfig = DAILY_RULES.find(d => d.day === activeClaimsDayId);
      if (dayConfig) {
        addXp(dayConfig.xpReward);
        completeClaimsDay(activeClaimsDayId);  // Track completion for gating
      }
    }
    setScreen('menu');
  };

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
  const activeContent = activeChapterId
    ? CHAPTERS.find(c => c.id === activeChapterId)
    : activeScenarioId
      ? { ...SCENARIOS.find(s => s.id === activeScenarioId), icon: '💻', color: '#3b82f6' }
      : activeBossId
        ? BOSSES.find(b => b.id === activeBossId)
        : activeClaimsDayId !== null
          ? { day: activeClaimsDayId, ...DAILY_RULES.find(d => d.day === activeClaimsDayId), icon: '📋', color: '#10b981' }
          : null;

  const activeDeck = activeFlashcardDeckId
    ? FLASHCARD_DECKS.find(d => d.id === activeFlashcardDeckId)
    : null;

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

      {screen === 'game' && activeChapterId === 'modifierMatching' && (
        <GameScreen
          chapter={{ id: 'modifierMatching', title: 'Modifier Matching', icon: '💼', color: '#ef4444' }}
          initialMode="modifierMatching"
          onMenu={() => setScreen('menu')}
          onComplete={() => setScreen('menu')}
          onXpGain={addXp}
          onAnswerRecord={recordAnswer}
        />
      )}

      {screen === 'game' && activeContent && (
        <GameScreen
          chapter={activeContent} // Acts as the config object
          initialMode={activeScenarioId ? 'scenario' : activeBossId ? 'boss' : activeClaimsDayId !== null ? 'claims' : 'lesson'}
          onMenu={() => setScreen('menu')}
          onComplete={activeChapterId ? handleChapterComplete : activeBossId ? handleBossComplete : activeClaimsDayId !== null ? handleClaimsDayComplete : handleScenarioComplete}
          onXpGain={addXp}
          onAnswerRecord={recordAnswer}
        />
      )}

      {screen === 'complete' && activeContent && (
        <CompleteScreen
          chapter={activeContent}
          stats={stats}
          onMenu={() => setScreen('menu')}
          onNext={handleNextChapter}
        />
      )}

      {screen === 'flashcard' && activeDeck && (
        <FlashcardView
          deck={activeDeck}
          onMenu={() => setScreen('menu')}
        />
      )}

      {screen === 'calculator' && (
        <EMCalculatorView
          onMenu={() => setScreen('menu')}
        />
      )}

      {screen === 'wordBuilder' && (
        <WordBuilderView
          onMenu={() => setScreen('menu')}
          onComplete={() => setScreen('menu')}
          onXpGain={addXp}
        />
      )}
    </>
  );
}

export default App;
