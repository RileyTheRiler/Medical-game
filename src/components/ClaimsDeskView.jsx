import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CHARACTERS, getRandomDialogue, getCharacterBySpecialty, formatReminder, POP_QUIZ_QUESTIONS, getDayIntro, getOldCartsMnemonic } from '../data/characters.js';
import { getStoryEvent } from '../data/storyEvents.js';
import useMistakeMemory from '../hooks/useMistakeMemory.js';

export default function ClaimsDeskView({ dayConfig, claims, onComplete, onMenu }) {
    const [currentClaimIndex, setCurrentClaimIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(dayConfig.shiftTime || 0);
    const [results, setResults] = useState([]);
    const [showFeedback, setShowFeedback] = useState(null);
    const [isShiftComplete, setIsShiftComplete] = useState(false);
    const [money, setMoney] = useState(0);
    const [showRules, setShowRules] = useState(true);
    const [hintsEnabled, setHintsEnabled] = useState(dayConfig.isOrientation || false);
    const [showTutorial, setShowTutorial] = useState(!dayConfig.isOrientation && dayConfig.day === 1);

    // Narrative system state
    const [showStoryEvent, setShowStoryEvent] = useState(null);
    const [currentDialogue, setCurrentDialogue] = useState(null);
    const [showReminder, setShowReminder] = useState(null);
    const mistakeMemory = useMistakeMemory();

    // Pop Quiz & Audit Snowball state
    const [showPopQuiz, setShowPopQuiz] = useState(null);
    const [popQuizAnswer, setPopQuizAnswer] = useState(null);
    const [auditStack, setAuditStack] = useState([]); // Tracks mistakes for snowball visualization
    const [showOldCarts, setShowOldCarts] = useState(false); // OLD CARTS helper
    const [showDayIntro, setShowDayIntro] = useState(true); // Day intro narrative

    const isOrientation = dayConfig.isOrientation;
    const currentClaim = claims[currentClaimIndex];

    // Timer countdown - only if not orientation mode
    useEffect(() => {
        if (isOrientation || isShiftComplete || showFeedback || !dayConfig.shiftTime) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    setIsShiftComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOrientation, isShiftComplete, showFeedback, dayConfig.shiftTime]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        if (!seconds) return '∞';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Highlight text in documentation
    const highlightDocumentation = (text) => {
        if (!hintsEnabled || !currentClaim.hpiHints) return text;

        let result = text;

        // Highlight HPI hints in yellow
        if (currentClaim.hpiHints) {
            currentClaim.hpiHints.forEach(hint => {
                const regex = new RegExp(`(${hint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                result = result.replace(regex, '【HPI: $1】');
            });
        }

        // Highlight exam hints in blue
        if (currentClaim.examHints) {
            currentClaim.examHints.forEach(hint => {
                const regex = new RegExp(`(${hint.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                result = result.replace(regex, '⟦EXAM: $1⟧');
            });
        }

        return result;
    };

    // Count hints for display
    const hpiCount = currentClaim.hpiHints?.length || 0;
    const examCount = currentClaim.examHints?.length || 0;

    // Calculate accuracy
    const accuracy = results.length > 0
        ? Math.round((results.filter(r => r.correct).length / results.length) * 100)
        : 100;

    // Handle decision with narrative integration
    const handleDecision = useCallback((decision) => {
        const isCorrect = (
            (decision === 'APPROVE' && currentClaim.correctDecision === 'APPROVE') ||
            (decision === 'DENY' && currentClaim.correctDecision === 'DENY')
        );

        const reward = isCorrect ? 50 : -25;
        setMoney(prev => Math.max(0, prev + reward));

        setResults(prev => [...prev, {
            claimId: currentClaim.id,
            decision,
            correct: isCorrect,
            expected: currentClaim.correctDecision,
            explanation: currentClaim.explanation
        }]);

        // If wrong, track mistake and show story event
        if (!isCorrect && currentClaim.issues && currentClaim.issues.length > 0) {
            const mistakeType = currentClaim.issues[0];
            mistakeMemory.addMistake(mistakeType, currentClaim.id, dayConfig.day, currentClaim.cptCode);

            // Add to audit snowball stack
            setAuditStack(prev => [...prev, {
                claimId: currentClaim.id,
                type: mistakeType,
                code: currentClaim.cptCode,
                time: Date.now()
            }]);

            // Get escalating story event based on mistake count
            const mistakeCount = mistakeMemory.getMistakeCount(mistakeType) + 1;
            const storyEvent = getStoryEvent(mistakeType, mistakeCount);

            if (storyEvent) {
                setShowStoryEvent({
                    ...storyEvent,
                    explanation: currentClaim.explanation,
                    expected: currentClaim.correctDecision
                });
                return; // Story event will transition to feedback
            }
        }

        // Show regular feedback (or for correct answers)
        setShowFeedback({
            correct: isCorrect,
            explanation: currentClaim.explanation,
            expected: currentClaim.correctDecision
        });
    }, [currentClaim, dayConfig.day, mistakeMemory]);

    // Maybe trigger a pop quiz between claims
    const maybeShowPopQuiz = useCallback(() => {
        // Only show pop quiz if player has made mistakes and not in orientation
        if (isOrientation || mistakeMemory.getTotalMistakeCount() < 1) return false;

        // 25% chance of pop quiz after each claim (after making at least 1 mistake)
        if (Math.random() > 0.25) return false;

        // Get a random quiz question related to player's mistakes
        const mistakeTypes = mistakeMemory.getMistakeTypes();
        const relevantQuestions = POP_QUIZ_QUESTIONS.filter(q => {
            const char = CHARACTERS[q.character];
            return char && mistakeTypes.includes(char.specialty);
        });

        // If no relevant questions, pick any random one
        const questionPool = relevantQuestions.length > 0 ? relevantQuestions : POP_QUIZ_QUESTIONS;
        const randomQuestion = questionPool[Math.floor(Math.random() * questionPool.length)];

        setShowPopQuiz(randomQuestion);
        setPopQuizAnswer(null);
        return true;
    }, [isOrientation, mistakeMemory]);

    // Move to next claim
    const handleNextClaim = () => {
        setShowFeedback(null);
        setShowStoryEvent(null);
        setShowReminder(null);

        if (currentClaimIndex < claims.length - 1) {
            // Maybe show a pop quiz before next claim
            if (!maybeShowPopQuiz()) {
                setCurrentClaimIndex(prev => prev + 1);
                // Check for reminder on next claim
                checkForReminder(claims[currentClaimIndex + 1]);
            }
        } else {
            setIsShiftComplete(true);
        }
    };

    // Handle pop quiz answer
    const handlePopQuizAnswer = (answerIndex) => {
        setPopQuizAnswer(answerIndex);
    };

    // Continue after pop quiz
    const handlePopQuizContinue = () => {
        setShowPopQuiz(null);
        setPopQuizAnswer(null);
        setCurrentClaimIndex(prev => prev + 1);
        checkForReminder(claims[currentClaimIndex + 1]);
    };

    // Close story event and show regular feedback
    const handleStoryEventContinue = () => {
        if (showStoryEvent) {
            setShowFeedback({
                correct: false,
                explanation: showStoryEvent.explanation,
                expected: showStoryEvent.expected
            });
            setShowStoryEvent(null);
        }
    };

    // Check if we should show a reminder for this claim
    const checkForReminder = useCallback((claim) => {
        if (!claim || !claim.issues) return;
        const relevant = mistakeMemory.getRelevantMistakeFor(claim.issues);
        if (relevant && relevant.data.count >= 1) {
            const character = getCharacterBySpecialty(relevant.type);
            if (character) {
                const reminderTemplate = getRandomDialogue(character.id, 'reminder');
                const formattedReminder = formatReminder(reminderTemplate, {
                    code: relevant.data.lastCode,
                    count: relevant.data.count
                });
                setShowReminder({
                    character,
                    text: formattedReminder
                });
            }
        }
    }, [mistakeMemory]);

    // Check for reminder on initial load
    useEffect(() => {
        if (currentClaim && dayConfig.day > 0) {
            checkForReminder(currentClaim);
        }
    }, []);

    // Calculate final stats
    const correctCount = results.filter(r => r.correct).length;
    const totalProcessed = results.length;
    const finalXp = Math.round((accuracy / 100) * dayConfig.xpReward);

    // Tutorial Modal for Day 1
    if (showTutorial) {
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(30,27,50,0.95), rgba(15,10,30,0.98))',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    border: '2px solid rgba(59,130,246,0.3)'
                }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem',
                        color: '#60a5fa',
                        textAlign: 'center'
                    }}>
                        📖 Quick Reference Guide
                    </h2>

                    <div style={{
                        background: 'rgba(251,191,36,0.1)',
                        border: '1px solid rgba(251,191,36,0.3)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{ color: '#fbbf24', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            🔍 HPI Elements (History of Present Illness)
                        </h3>
                        <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Count these in the documentation:<br />
                            <strong>L</strong>ocation • <strong>Q</strong>uality • <strong>S</strong>everity • <strong>D</strong>uration • <strong>T</strong>iming • <strong>C</strong>ontext • <strong>M</strong>odifying factors • <strong>A</strong>ssociated signs
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(34,211,238,0.1)',
                        border: '1px solid rgba(34,211,238,0.3)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{ color: '#22d3ee', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            🩺 E/M Level Requirements
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            gap: '0.5rem 1rem',
                            fontSize: '0.9rem',
                            color: '#e2e8f0'
                        }}>
                            <span style={{ color: '#94a3b8' }}>99212:</span>
                            <span>Minimal (1-2 HPI, 1 exam)</span>
                            <span style={{ color: '#4ade80' }}>99213:</span>
                            <span>Low (2-3 HPI, 1-2 exam areas)</span>
                            <span style={{ color: '#fbbf24' }}>99214:</span>
                            <span>Moderate (4+ HPI, 2+ exam areas)</span>
                            <span style={{ color: '#ef4444' }}>99215:</span>
                            <span>High (Comprehensive everything)</span>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(74,222,128,0.1)',
                        border: '1px solid rgba(74,222,128,0.3)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ color: '#4ade80', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                            ✅ Your Task
                        </h3>
                        <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            Read the documentation → Count HPI elements and exam areas →
                            Compare to the CPT code's requirements → APPROVE if it matches, DENY if it doesn't!
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => setShowTutorial(false)}
                            style={{
                                padding: '1rem 3rem',
                                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                color: 'white',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Got it! Start Day 1 →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Shift Complete Screen
    if (isShiftComplete) {
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(30,27,50,0.9), rgba(15,10,30,0.95))',
                    borderRadius: '20px',
                    padding: '2.5rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        background: isOrientation
                            ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                            : 'linear-gradient(135deg, #4ade80, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {isOrientation ? 'Orientation Complete!' : 'Shift Complete!'}
                    </h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                        {isOrientation ? 'Great job learning the basics!' : `Day ${dayConfig.day}: ${dayConfig.title}`}
                    </p>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            background: 'rgba(74,222,128,0.1)',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(74,222,128,0.2)'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>
                                {correctCount}/{totalProcessed}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Correct</div>
                        </div>
                        <div style={{
                            background: 'rgba(251,191,36,0.1)',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(251,191,36,0.2)'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                                ${money}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Earned</div>
                        </div>
                        <div style={{
                            background: 'rgba(139,92,246,0.1)',
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(139,92,246,0.2)'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#a78bfa' }}>
                                {accuracy}%
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Accuracy</div>
                        </div>
                    </div>

                    {/* XP Reward */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        <span style={{ color: '#94a3b8' }}>XP Earned: </span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
                            +{finalXp} XP
                        </span>
                    </div>

                    {/* Audit Snowball - Visual pile of mistakes */}
                    {auditStack.length > 0 && (
                        <div style={{
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '2rem',
                            textAlign: 'left'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>📋</span>
                                <span style={{ color: '#ef4444', fontWeight: '600' }}>
                                    Your Audit File ({auditStack.length} {auditStack.length === 1 ? 'issue' : 'issues'})
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                            }}>
                                {auditStack.map((item, i) => (
                                    <div key={i} style={{
                                        background: 'rgba(239,68,68,0.2)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        color: '#fca5a5',
                                        transform: `rotate(${(Math.random() - 0.5) * 6}deg)`,
                                        animation: 'bounceIn 0.3s ease-out'
                                    }}>
                                        📄 {item.code || 'Claim'} - {item.type.replace(/_/g, ' ')}
                                    </div>
                                ))}
                            </div>
                            <p style={{
                                color: '#94a3b8',
                                fontSize: '0.85rem',
                                fontStyle: 'italic'
                            }}>
                                {auditStack.length >= 3
                                    ? "👵 Gloria: 'This stack is getting concerning...'"
                                    : auditStack.length >= 2
                                        ? "💼 Karen: 'I'll be reviewing these later.'"
                                        : "📋 Just one mistake - not bad! Learn from it."}
                            </p>
                        </div>
                    )}

                    {/* Orientation Next Steps */}
                    {isOrientation && (
                        <div style={{
                            background: 'rgba(59,130,246,0.1)',
                            border: '1px solid rgba(59,130,246,0.3)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '2rem',
                            textAlign: 'left'
                        }}>
                            <p style={{ color: '#60a5fa', marginBottom: '0.5rem', fontWeight: '600' }}>
                                🎓 What's Next?
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                You've unlocked Day 1! It will have a timer, but you can toggle hints on/off anytime.
                                Want more practice? Try the E/M Coding chapter in Learning Chapters!
                            </p>
                        </div>
                    )}

                    {/* Review Section */}
                    {results.length > 0 && (
                        <div style={{
                            textAlign: 'left',
                            marginBottom: '2rem',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            <h3 style={{
                                fontSize: '1rem',
                                color: '#64748b',
                                marginBottom: '1rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                paddingBottom: '0.5rem'
                            }}>
                                Case Review
                            </h3>
                            {results.map((r, i) => (
                                <div key={i} style={{
                                    marginBottom: '0.75rem',
                                    padding: '0.75rem',
                                    background: r.correct ? 'rgba(74,222,128,0.05)' : 'rgba(239,68,68,0.05)',
                                    borderRadius: '8px',
                                    borderLeft: `3px solid ${r.correct ? '#4ade80' : '#ef4444'}`
                                }}>
                                    <div style={{
                                        fontWeight: '600',
                                        color: r.correct ? '#4ade80' : '#ef4444',
                                        fontSize: '0.9rem'
                                    }}>
                                        {r.correct ? '✓' : '✗'} Claim #{r.claimId}: You said {r.decision}
                                        {!r.correct && ` (Should be ${r.expected})`}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                                        {r.explanation}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={onComplete}
                        style={{
                            padding: '1rem 3rem',
                            background: isOrientation
                                ? 'linear-gradient(135deg, #a78bfa, #60a5fa)'
                                : 'linear-gradient(135deg, #4ade80, #22d3ee)',
                            color: isOrientation ? 'white' : '#0f172a',
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {isOrientation ? 'Continue to Day 1 →' : 'Continue'}
                    </button>
                </div>
            </div>
        );
    }

    // Day Intro Narrative - shows at the start of each day
    const dayIntro = getDayIntro(dayConfig.day);
    if (showDayIntro && dayIntro && !isOrientation) {
        const introChar = CHARACTERS[dayIntro.character];
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '650px',
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(30,27,50,0.95), rgba(15,10,30,1))',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: `2px solid ${introChar?.color || '#4ade80'}40`,
                    boxShadow: `0 0 60px ${introChar?.color || '#4ade80'}20`,
                    textAlign: 'center'
                }}>
                    {/* Character Avatar */}
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {introChar?.avatar || '📋'}
                    </div>

                    {/* Day Title */}
                    <h2 style={{
                        fontSize: '1.8rem',
                        marginBottom: '0.5rem',
                        background: `linear-gradient(135deg, ${introChar?.color || '#4ade80'}, #60a5fa)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Day {dayConfig.day}: {dayIntro.title}
                    </h2>

                    {/* Narrative Text */}
                    <p style={{
                        color: '#e2e8f0',
                        fontSize: '1.1rem',
                        lineHeight: '1.7',
                        marginBottom: '2rem',
                        fontStyle: 'italic'
                    }}>
                        {dayIntro.narrative}
                    </p>

                    {/* Today's Focus */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                            📋 Today's Focus: <strong>{dayConfig.title}</strong>
                        </span>
                    </div>

                    <button
                        onClick={() => setShowDayIntro(false)}
                        style={{
                            padding: '0.875rem 2.5rem',
                            background: `linear-gradient(135deg, ${introChar?.color || '#4ade80'}, ${introChar?.color || '#4ade80'}cc)`,
                            color: 'white',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.1rem'
                        }}
                    >
                        Let's Get to Work →
                    </button>
                </div>
            </div>
        );
    }

    // Main Game UI
    return (
        <div className="animate-fade-in" style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* OLD CARTS Helper Toggle */}
            <button
                onClick={() => setShowOldCarts(!showOldCarts)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 100,
                    padding: '0.5rem 0.75rem',
                    background: showOldCarts ? '#10b981' : 'rgba(16,185,129,0.2)',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    color: showOldCarts ? 'white' : '#10b981',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                }}
            >
                🛒 OLD CARTS
            </button>

            {/* OLD CARTS Helper Panel */}
            {showOldCarts && (
                <div style={{
                    position: 'absolute',
                    top: '50px',
                    right: '10px',
                    zIndex: 100,
                    background: 'rgba(16,185,129,0.15)',
                    border: '1px solid rgba(16,185,129,0.4)',
                    borderRadius: '12px',
                    padding: '1rem',
                    width: '280px',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ fontWeight: '600', color: '#10b981', marginBottom: '0.75rem' }}>
                        🛒 HPI Elements (OLD CARTS)
                    </div>
                    {Object.values(getOldCartsMnemonic()).map(item => (
                        <div key={item.letter} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                            marginBottom: '0.5rem',
                            fontSize: '0.85rem'
                        }}>
                            <span style={{
                                background: '#10b981',
                                color: 'white',
                                width: '20px',
                                height: '20px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                flexShrink: 0
                            }}>
                                {item.letter}
                            </span>
                            <div>
                                <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{item.word}</span>
                                <span style={{ color: '#94a3b8' }}> - {item.question}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Coach Message for Orientation */}
            {isOrientation && currentClaim.coachMessage && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(96,165,250,0.2))',
                    border: '1px solid rgba(167,139,250,0.4)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🧑‍🏫</span>
                    <div>
                        <div style={{ fontWeight: '600', color: '#a78bfa', marginBottom: '0.25rem' }}>Coach Says:</div>
                        <div style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            {currentClaim.coachMessage}
                        </div>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: isOrientation ? 'rgba(167,139,250,0.15)' : 'rgba(30,27,50,0.8)',
                borderRadius: '12px',
                marginBottom: '1rem',
                border: isOrientation ? '1px solid rgba(167,139,250,0.3)' : 'none'
            }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {isOrientation && (
                        <span style={{ color: '#a78bfa', fontWeight: '600' }}>🎓 TRAINING</span>
                    )}
                    <span style={{ color: '#fbbf24', fontWeight: '600' }}>💰 ${money}</span>
                    <span style={{ color: '#94a3b8' }}>
                        📋 {currentClaimIndex + 1}/{claims.length}
                    </span>
                    <span style={{ color: accuracy >= 80 ? '#4ade80' : accuracy >= 60 ? '#fbbf24' : '#ef4444' }}>
                        📊 {accuracy}%
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Hints Toggle */}
                    <button
                        onClick={() => setHintsEnabled(!hintsEnabled)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: hintsEnabled ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.1)',
                            border: hintsEnabled ? '1px solid rgba(251,191,36,0.5)' : '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            color: hintsEnabled ? '#fbbf24' : '#94a3b8',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        💡 Hints {hintsEnabled ? 'ON' : 'OFF'}
                    </button>
                    {/* Timer or Training indicator */}
                    {isOrientation ? (
                        <div style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(167,139,250,0.2)',
                            borderRadius: '8px',
                            color: '#a78bfa',
                            fontWeight: 'bold'
                        }}>
                            ⏸️ No Timer
                        </div>
                    ) : (
                        <div style={{
                            padding: '0.5rem 1rem',
                            background: timeRemaining <= 30 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            color: timeRemaining <= 30 ? '#ef4444' : '#e2e8f0',
                            fontFamily: 'monospace',
                            fontSize: '1.1rem'
                        }}>
                            ⏱️ {formatTime(timeRemaining)}
                        </div>
                    )}
                </div>
            </div>

            {/* Hints Counter (when enabled) */}
            {hintsEnabled && (currentClaim.hpiHints || currentClaim.examHints) && (
                <div style={{
                    background: 'rgba(251,191,36,0.1)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    gap: '2rem',
                    fontSize: '0.9rem'
                }}>
                    <span style={{ color: '#fbbf24' }}>
                        <strong>HPI Elements:</strong> {hpiCount} found (look for 【HPI: ...】)
                    </span>
                    <span style={{ color: '#22d3ee' }}>
                        <strong>Exam Areas:</strong> {examCount} found (look for ⟦EXAM: ...⟧)
                    </span>
                </div>
            )}

            {/* Main Content Split */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                flex: 1,
                minHeight: 0
            }}>
                {/* Left: Documentation */}
                <div style={{
                    background: '#f8fafc',
                    color: '#1e293b',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    overflowY: 'auto',
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                }}>
                    <div style={{
                        borderBottom: '2px solid #334155',
                        paddingBottom: '0.75rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold'
                    }}>
                        <span>📄 MEDICAL DOCUMENTATION</span>
                    </div>
                    <pre style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        margin: 0
                    }}>
                        {highlightDocumentation(currentClaim.documentation)}
                    </pre>
                </div>

                {/* Right: Claim Form + Rules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflowY: 'auto', paddingRight: '4px' }}>
                    {/* Claim Form */}
                    <div style={{
                        background: 'rgba(30,27,50,0.8)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        flex: 1
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            color: isOrientation ? '#a78bfa' : '#3b82f6',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            letterSpacing: '0.1em'
                        }}>
                            {isOrientation ? 'PRACTICE ' : ''}CLAIM #{String(currentClaim.id).padStart(4, '0')}
                        </div>

                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Patient:</span>
                                <span style={{ fontWeight: '600' }}>{currentClaim.patient.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>DOB:</span>
                                <span>{currentClaim.patient.dob}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Insurance:</span>
                                <span>{currentClaim.patient.insurance}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Provider:</span>
                                <span>{currentClaim.provider}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>DOS:</span>
                                <span>{currentClaim.dateOfService}</span>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>CPT Code:</span>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: '#22d3ee',
                                    fontFamily: 'monospace'
                                }}>
                                    {currentClaim.cptCode}{currentClaim.modifier || ''}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>ICD-10:</span>
                                <span style={{ fontFamily: 'monospace' }}>
                                    {currentClaim.icdCodes.join(', ')}
                                </span>
                            </div>
                            {currentClaim.additionalCodes && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Also Billed:</span>
                                    <span style={{ fontFamily: 'monospace', color: '#fbbf24' }}>
                                        {currentClaim.additionalCodes.join(', ')}
                                    </span>
                                </div>
                            )}
                            {currentClaim.claimDate && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#64748b' }}>Claim Filed:</span>
                                    <span style={{ color: '#f87171' }}>{currentClaim.claimDate}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Charge:</span>
                                <span style={{ fontWeight: 'bold', color: '#4ade80' }}>
                                    ${currentClaim.chargedAmount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Rules Panel (Collapsible) */}
                    <div style={{
                        background: isOrientation ? 'rgba(167,139,250,0.1)' : 'rgba(59,130,246,0.1)',
                        borderRadius: '12px',
                        border: isOrientation ? '1px solid rgba(167,139,250,0.2)' : '1px solid rgba(59,130,246,0.2)',
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => setShowRules(!showRules)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                background: 'transparent',
                                border: 'none',
                                color: isOrientation ? '#a78bfa' : '#60a5fa',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <span>📖 {isOrientation ? 'Training Tips' : `Day ${dayConfig.day} Rules`}</span>
                            <span>{showRules ? '▼' : '▶'}</span>
                        </button>
                        {showRules && (
                            <div style={{
                                padding: '0 1rem 1rem',
                                fontSize: '0.85rem',
                                color: '#94a3b8'
                            }}>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                    {dayConfig.rules.map((rule, i) => (
                                        <li key={i} style={{ marginBottom: '0.25rem' }}>{rule}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Decision Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '1rem',
                background: 'rgba(30,27,50,0.6)',
                borderRadius: '12px',
                marginTop: '0.5rem',
                flexShrink: 0 // Always keep buttons visible/sized correctly
            }}>
                <button
                    onClick={() => handleDecision('APPROVE')}
                    disabled={showFeedback}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: showFeedback ? 'not-allowed' : 'pointer',
                        background: showFeedback ? 'rgba(74,222,128,0.3)' : 'linear-gradient(135deg, #4ade80, #22c55e)',
                        color: 'white',
                        transition: 'transform 0.1s',
                        opacity: showFeedback ? 0.5 : 1
                    }}
                    onMouseOver={e => !showFeedback && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ✓ APPROVE
                </button>
                <button
                    onClick={() => handleDecision('DENY')}
                    disabled={showFeedback}
                    style={{
                        padding: '1rem 3rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        border: 'none',
                        cursor: showFeedback ? 'not-allowed' : 'pointer',
                        background: showFeedback ? 'rgba(239,68,68,0.3)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        transition: 'transform 0.1s',
                        opacity: showFeedback ? 0.5 : 1
                    }}
                    onMouseOver={e => !showFeedback && (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    ✗ DENY
                </button>
            </div>

            {/* Story Event Overlay - Absurd consequences for mistakes */}
            {showStoryEvent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1001
                }}>
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(30,27,50,0.98), rgba(15,10,30,1))',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        textAlign: 'center',
                        border: `2px solid ${CHARACTERS[showStoryEvent.character]?.color || '#ef4444'}`,
                        animation: 'fadeIn 0.3s ease-out',
                        boxShadow: `0 0 60px ${CHARACTERS[showStoryEvent.character]?.color || '#ef4444'}40`
                    }}>
                        {/* Character Avatar */}
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1rem',
                            animation: 'bounceIn 0.5s ease-out'
                        }}>
                            {CHARACTERS[showStoryEvent.character]?.avatar || '❌'}
                        </div>

                        {/* Event Title */}
                        <h3 style={{
                            fontSize: '1.4rem',
                            color: CHARACTERS[showStoryEvent.character]?.color || '#ef4444',
                            marginBottom: '1rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            {showStoryEvent.title}
                        </h3>

                        {/* Story Text */}
                        <p style={{
                            color: '#e2e8f0',
                            fontSize: '1.1rem',
                            lineHeight: '1.7',
                            marginBottom: '1.5rem',
                            fontStyle: 'italic',
                            padding: '0 1rem'
                        }}>
                            {showStoryEvent.text}
                        </p>

                        {/* Learning Point */}
                        <div style={{
                            background: 'rgba(251,191,36,0.15)',
                            border: '1px solid rgba(251,191,36,0.3)',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                                💡 <strong>Remember:</strong> {showStoryEvent.learning}
                            </span>
                        </div>

                        <button
                            onClick={handleStoryEventContinue}
                            style={{
                                padding: '0.875rem 2.5rem',
                                background: `linear-gradient(135deg, ${CHARACTERS[showStoryEvent.character]?.color || '#ef4444'}, ${CHARACTERS[showStoryEvent.character]?.color || '#ef4444'}cc)`,
                                color: 'white',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            ...I'll remember this
                        </button>
                    </div>
                </div>
            )}

            {/* Character Reminder Banner - Shows when player has made this type of mistake before */}
            {showReminder && !showFeedback && !showStoryEvent && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: `linear-gradient(135deg, ${showReminder.character.color}20, ${showReminder.character.color}10)`,
                    border: `1px solid ${showReminder.character.color}60`,
                    borderRadius: '16px',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    zIndex: 500,
                    maxWidth: '600px',
                    animation: 'slideDown 0.4s ease-out',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                    <span style={{ fontSize: '2rem' }}>{showReminder.character.avatar}</span>
                    <div>
                        <div style={{
                            color: showReminder.character.color,
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            marginBottom: '0.25rem'
                        }}>
                            {showReminder.character.name} remembers...
                        </div>
                        <div style={{
                            color: '#e2e8f0',
                            fontSize: '0.95rem',
                            lineHeight: '1.4'
                        }}>
                            {showReminder.text}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowReminder(null)}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Feedback Overlay */}
            {showFeedback && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'rgba(30,27,50,0.95)',
                        borderRadius: '20px',
                        padding: '2rem',
                        maxWidth: '500px',
                        textAlign: 'center',
                        border: `2px solid ${showFeedback.correct ? '#4ade80' : '#ef4444'}`,
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>
                            {showFeedback.correct ? '✓' : '✗'}
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            color: showFeedback.correct ? '#4ade80' : '#ef4444',
                            marginBottom: '1rem'
                        }}>
                            {showFeedback.correct ? 'Correct!' : 'Incorrect'}
                        </h3>
                        {!showFeedback.correct && (
                            <p style={{ color: '#fbbf24', marginBottom: '0.5rem' }}>
                                Should be: <strong>{showFeedback.expected}</strong>
                            </p>
                        )}
                        <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                            {showFeedback.explanation}
                        </p>
                        <button
                            onClick={handleNextClaim}
                            style={{
                                padding: '0.75rem 2rem',
                                background: showFeedback.correct ? '#4ade80' : '#ef4444',
                                color: 'white',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {currentClaimIndex < claims.length - 1 ? 'Next Claim →' : (isOrientation ? 'Complete Training' : 'Finish Shift')}
                        </button>
                    </div>
                </div>
            )}

            {/* Pop Quiz Overlay */}
            {showPopQuiz && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1002
                }}>
                    <div style={{
                        background: 'linear-gradient(145deg, rgba(30,27,50,0.98), rgba(15,10,30,1))',
                        borderRadius: '24px',
                        padding: '2rem',
                        maxWidth: '550px',
                        width: '90%',
                        textAlign: 'center',
                        border: `2px solid ${CHARACTERS[showPopQuiz.character]?.color || '#10b981'}`,
                        boxShadow: `0 0 40px ${CHARACTERS[showPopQuiz.character]?.color || '#10b981'}30`
                    }}>
                        {/* Character */}
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '0.5rem'
                        }}>
                            {CHARACTERS[showPopQuiz.character]?.avatar || '🛒'}
                        </div>
                        <div style={{
                            color: CHARACTERS[showPopQuiz.character]?.color || '#10b981',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            marginBottom: '1rem'
                        }}>
                            {CHARACTERS[showPopQuiz.character]?.name || 'Pop Quiz'} wants to know...
                        </div>

                        {/* Question */}
                        <h3 style={{
                            fontSize: '1.2rem',
                            color: '#e2e8f0',
                            marginBottom: '1.5rem',
                            lineHeight: '1.4'
                        }}>
                            {showPopQuiz.question}
                        </h3>

                        {/* Options */}
                        <div style={{
                            display: 'grid',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                        }}>
                            {showPopQuiz.options.map((option, i) => {
                                const isSelected = popQuizAnswer === i;
                                const isCorrect = i === showPopQuiz.correct;
                                const showResult = popQuizAnswer !== null;

                                let bgColor = 'rgba(255,255,255,0.1)';
                                let borderColor = 'rgba(255,255,255,0.2)';

                                if (showResult) {
                                    if (isCorrect) {
                                        bgColor = 'rgba(74,222,128,0.2)';
                                        borderColor = '#4ade80';
                                    } else if (isSelected && !isCorrect) {
                                        bgColor = 'rgba(239,68,68,0.2)';
                                        borderColor = '#ef4444';
                                    }
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => !showResult && handlePopQuizAnswer(i)}
                                        disabled={showResult}
                                        style={{
                                            padding: '0.875rem 1rem',
                                            background: bgColor,
                                            border: `2px solid ${borderColor}`,
                                            borderRadius: '12px',
                                            color: showResult && isCorrect ? '#4ade80' : '#e2e8f0',
                                            fontSize: '1rem',
                                            cursor: showResult ? 'default' : 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {showResult && isCorrect && '✓ '}
                                        {showResult && isSelected && !isCorrect && '✗ '}
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Result & Explanation */}
                        {popQuizAnswer !== null && (
                            <div style={{
                                background: popQuizAnswer === showPopQuiz.correct
                                    ? 'rgba(74,222,128,0.1)'
                                    : 'rgba(239,68,68,0.1)',
                                border: `1px solid ${popQuizAnswer === showPopQuiz.correct ? '#4ade80' : '#ef4444'}40`,
                                borderRadius: '12px',
                                padding: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    color: popQuizAnswer === showPopQuiz.correct ? '#4ade80' : '#ef4444',
                                    fontWeight: '600',
                                    marginBottom: '0.5rem'
                                }}>
                                    {popQuizAnswer === showPopQuiz.correct ? '🎉 Correct!' : '😅 Not quite!'}
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                    {showPopQuiz.explanation}
                                </div>
                            </div>
                        )}

                        {/* Continue Button */}
                        {popQuizAnswer !== null && (
                            <button
                                onClick={handlePopQuizContinue}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: popQuizAnswer === showPopQuiz.correct
                                        ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                                        : 'linear-gradient(135deg, #f97316, #ea580c)',
                                    color: 'white',
                                    borderRadius: '10px',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                Continue to Next Claim →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
