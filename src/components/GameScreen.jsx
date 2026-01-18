import React, { useState, useEffect } from 'react';
import LessonView from './LessonView';
import QuizView from './QuizView';
import ScenarioView from './ScenarioView';
import BossBattleView from './BossBattleView';
import ClaimsDeskView from './ClaimsDeskView';
import ModifierMatchingView from './ModifierMatchingView';
import { LESSONS } from '../data/lessons';
import { QUIZ_DATA } from '../data/quizzes';
import { SCENARIOS } from '../data/scenarios';
import { DAILY_RULES, getClaimsForDay } from '../data/claims';

export default function GameScreen({ chapter, initialMode = 'lesson', onMenu, onComplete, onXpGain, onAnswerRecord }) {
    const [mode, setMode] = useState(initialMode); // 'lesson', 'quiz', 'scenario'
    const [activeScenario, setActiveScenario] = useState(null);

    // Reset mode when chapter changes OR initialMode changes
    // Use chapter.id for regular chapters, chapter.day for claims
    const chapterKey = chapter?.id ?? chapter?.day ?? 'unknown';
    useEffect(() => {
        setMode(initialMode);
        setActiveScenario(null);
    }, [chapterKey, initialMode]);

    const lesson = initialMode === 'scenario' || initialMode === 'boss' || initialMode === 'claims' ? null : (chapter?.id ? LESSONS[chapter.id] : null);
    const quizzes = initialMode === 'scenario' || initialMode === 'boss' || initialMode === 'claims' ? null : (chapter?.id ? QUIZ_DATA[chapter.id] : null);

    // Get claims data if in claims mode
    const claimsDayConfig = initialMode === 'claims' && chapter?.day !== undefined ? DAILY_RULES.find(d => d.day === chapter.day) : null;
    const claimsForDay = initialMode === 'claims' && chapter?.day !== undefined ? getClaimsForDay(chapter.day) : [];

    // Helper to find scenarios relevant to this chapter (if any)
    // For now, we'll manually map Chapter 9 (Integumentary) to Scenario 1, etc.
    // Or purely menu driven. Let's make it menu driven for "Coding Lab" mode, 
    // but if we are in "Scenario Mode" passed from App, handle it.

    // Actually, wait. "Coding Lab" is a top-level feature alongside "Chapters".
    // So GameScreen needs to handle "Scenario Mode" specifically if 'chapter' is actually a scenario object?
    // OR we distinguish based on props.
    // Let's refactor: GameScreen takes 'context' which can be a chapter OR a scenario.

    // Simplification: logic below handles standard chapter flow. If we want scenarios, we need to handle "Scenario Mode" in App.jsx separately or integrate here.
    // Let's integrate here for smoother UI reuse.

    const handleQuizAnswer = (isCorrect) => {
        const xp = isCorrect ? 30 : 5;
        onXpGain(xp);
        onAnswerRecord(isCorrect);
    };

    const containerWidth = mode === 'claims' ? '1400px' : '900px';

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
            {/* Header */}
            <div style={{
                background: 'rgba(12,10,29,0.95)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ maxWidth: containerWidth, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'max-width 0.3s ease' }}>
                    <button
                        onClick={onMenu}
                        style={{
                            background: 'transparent',
                            color: '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}
                    >
                        ← Menu
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: mode === 'boss' ? '#ef4444' : 'white' }}>
                        <span style={{ fontSize: '1.2rem' }}>{chapter.icon || '📋'}</span>
                        <span className="hide-on-mobile">{chapter.title}</span>
                    </div>

                    <div style={{ opacity: 0 }}>placeholder</div>
                </div>
            </div>

            <div style={{ maxWidth: containerWidth, margin: '0 auto', padding: '1.5rem', transition: 'max-width 0.3s ease' }}>
                {/* Mode Toggles - Only show if it's a standard chapter */}
                {mode !== 'scenario' && mode !== 'boss' && mode !== 'claims' && (
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '4px',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        <button
                            onClick={() => setMode('lesson')}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                background: mode === 'lesson' ? chapter.color : 'transparent',
                                color: mode === 'lesson' ? 'white' : '#94a3b8',
                                borderRadius: '8px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            📖 Lesson
                        </button>
                        <button
                            onClick={() => setMode('quiz')}
                            style={{
                                flex: 1,
                                padding: '0.8rem',
                                background: mode === 'quiz' ? chapter.color : 'transparent',
                                color: mode === 'quiz' ? 'white' : '#94a3b8',
                                borderRadius: '8px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            ❓ Quiz
                        </button>
                    </div>
                )}

                {/* Content Area */}
                {mode === 'lesson' && (
                    <LessonView
                        chapter={chapter}
                        lesson={lesson}
                        onComplete={() => setMode('quiz')}
                    />
                )}

                {mode === 'quiz' && (
                    <QuizView
                        chapter={chapter}
                        questions={quizzes}
                        color={chapter.color}
                        onAnswer={handleQuizAnswer}
                        onComplete={onComplete}
                    />
                )}

                {mode === 'scenario' && (
                    <ScenarioView
                        scenario={chapter} // We treat the scenario object as the 'chapter' prop when in this mode
                        onComplete={onComplete}
                        color={chapter.color || '#3b82f6'}
                    />
                )}

                {mode === 'boss' && (
                    <BossBattleView
                        boss={chapter}
                        onComplete={onComplete}
                        onDefeat={onMenu}
                    />
                )}

                {mode === 'claims' && claimsDayConfig && (
                    <ClaimsDeskView
                        dayConfig={claimsDayConfig}
                        claims={claimsForDay}
                        onComplete={onComplete}
                        onMenu={onMenu}
                    />
                )}

                {mode === 'modifierMatching' && (
                    <ModifierMatchingView
                        onComplete={onComplete}
                        onMenu={onMenu}
                    />
                )}
            </div>
        </div>
    );
}
