import React, { useState, useCallback } from 'react';
import { MODIFIER_SCENARIOS, CHARACTERS } from '../data/characters.js';

/**
 * Modifier Matching Game
 * A Tinder-style swipe game for learning when modifier -25 is needed
 */
export default function ModifierMatchingView({ onComplete, onMenu }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [showResult, setShowResult] = useState(null);
    const [gameComplete, setGameComplete] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null);

    const scenarios = MODIFIER_SCENARIOS;
    const currentScenario = scenarios[currentIndex];

    const handleSwipe = useCallback((needsModifier) => {
        const isCorrect = needsModifier === currentScenario.needsModifier25;

        setSwipeDirection(needsModifier ? 'right' : 'left');
        setShowResult({
            correct: isCorrect,
            explanation: currentScenario.explanation
        });

        setScore(prev => ({
            ...prev,
            correct: prev.correct + (isCorrect ? 1 : 0),
            incorrect: prev.incorrect + (isCorrect ? 0 : 1)
        }));

        // Auto-advance after showing result
        setTimeout(() => {
            setShowResult(null);
            setSwipeDirection(null);
            if (currentIndex < scenarios.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setGameComplete(true);
            }
        }, 2000);
    }, [currentScenario, currentIndex, scenarios.length]);

    // Game Complete Screen
    if (gameComplete) {
        const accuracy = Math.round((score.correct / scenarios.length) * 100);
        const isPassing = accuracy >= 70;

        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '500px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(30,27,50,0.95), rgba(15,10,30,1))',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: `2px solid ${isPassing ? '#4ade80' : '#ef4444'}40`
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {isPassing ? '🎉' : '📚'}
                    </div>

                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '0.5rem',
                        color: isPassing ? '#4ade80' : '#fbbf24'
                    }}>
                        {isPassing ? 'Modifier Master!' : 'Keep Practicing!'}
                    </h2>

                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                        {isPassing
                            ? "Karen approves. Gerald the rubber duck squeaks proudly."
                            : "Karen's clipboard grows thicker. Gerald looks disappointed."}
                    </p>

                    {/* Score Display */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            background: 'rgba(74,222,128,0.1)',
                            padding: '1rem',
                            borderRadius: '12px'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>
                                {score.correct}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Correct</div>
                        </div>
                        <div style={{
                            background: 'rgba(239,68,68,0.1)',
                            padding: '1rem',
                            borderRadius: '12px'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                                {score.incorrect}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Incorrect</div>
                        </div>
                        <div style={{
                            background: 'rgba(251,191,36,0.1)',
                            padding: '1rem',
                            borderRadius: '12px'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                                {accuracy}%
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Accuracy</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => {
                                setCurrentIndex(0);
                                setScore({ correct: 0, incorrect: 0 });
                                setGameComplete(false);
                            }}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#e2e8f0',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Play Again
                        </button>
                        <button
                            onClick={onMenu}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{
            padding: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto',
            height: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <button
                    onClick={onMenu}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#94a3b8',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    ← Menu
                </button>
                <div style={{ color: '#94a3b8' }}>
                    {currentIndex + 1} / {scenarios.length}
                </div>
            </div>

            {/* Instructions */}
            <div style={{
                textAlign: 'center',
                marginBottom: '1rem',
                color: '#94a3b8',
                fontSize: '0.9rem'
            }}>
                <span style={{ color: '#ef4444' }}>← Swipe LEFT</span> = No Modifier |
                <span style={{ color: '#4ade80' }}> Swipe RIGHT →</span> = Needs -25
            </div>

            {/* Scenario Card */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1000px'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(30,27,50,0.95), rgba(15,10,30,1))',
                    borderRadius: '24px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                    border: showResult
                        ? `3px solid ${showResult.correct ? '#4ade80' : '#ef4444'}`
                        : '1px solid rgba(255,255,255,0.1)',
                    transform: swipeDirection === 'right'
                        ? 'translateX(50px) rotate(5deg)'
                        : swipeDirection === 'left'
                            ? 'translateX(-50px) rotate(-5deg)'
                            : 'none',
                    transition: 'all 0.3s ease-out',
                    boxShadow: showResult
                        ? `0 0 30px ${showResult.correct ? '#4ade80' : '#ef4444'}40`
                        : '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                    {/* Karen's Avatar */}
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        💼
                    </div>

                    {/* Scenario Text */}
                    <p style={{
                        color: '#e2e8f0',
                        fontSize: '1.15rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem',
                        minHeight: '80px'
                    }}>
                        {currentScenario.scenario}
                    </p>

                    {/* Result Feedback */}
                    {showResult && (
                        <div style={{
                            background: showResult.correct
                                ? 'rgba(74,222,128,0.15)'
                                : 'rgba(239,68,68,0.15)',
                            border: `1px solid ${showResult.correct ? '#4ade80' : '#ef4444'}40`,
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1rem',
                            animation: 'fadeIn 0.3s ease-out'
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                {showResult.correct ? '✓ Correct!' : '✗ Incorrect'}
                            </div>
                            <div style={{
                                color: '#94a3b8',
                                fontSize: '0.9rem',
                                lineHeight: '1.4'
                            }}>
                                {showResult.explanation}
                            </div>
                        </div>
                    )}

                    {/* Question */}
                    {!showResult && (
                        <div style={{
                            color: '#fbbf24',
                            fontWeight: '600',
                            fontSize: '1rem'
                        }}>
                            Does this need Modifier -25?
                        </div>
                    )}
                </div>
            </div>

            {/* Swipe Buttons */}
            {!showResult && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    padding: '1.5rem 0'
                }}>
                    <button
                        onClick={() => handleSwipe(false)}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(145deg, #ef4444, #dc2626)',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(239,68,68,0.4)'
                        }}
                    >
                        ✗
                    </button>
                    <button
                        onClick={() => handleSwipe(true)}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'linear-gradient(145deg, #4ade80, #22c55e)',
                            border: 'none',
                            color: 'white',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(74,222,128,0.4)'
                        }}
                    >
                        ✓
                    </button>
                </div>
            )}
        </div>
    );
}
