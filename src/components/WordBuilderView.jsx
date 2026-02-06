import React, { useState, useEffect, useRef } from 'react';
import { WORD_PARTS, WORD_BUILDER_TERMS, getRandomTerms, getCategories, combineWordParts } from '../data/wordBuilder';

// Game mode constants
const GAME_MODES = [
    { id: 'builder', name: 'Word Builder', icon: '🔤', description: 'Combine prefixes, roots, and suffixes' },
    { id: 'hangman', name: 'Hangman', icon: '💀', description: 'Guess the term letter by letter' },
    { id: 'fillblanks', name: 'Fill in Blanks', icon: '📝', description: 'Complete the missing parts' },
    { id: 'scramble', name: 'Term Scramble', icon: '🔀', description: 'Unscramble the letters' },
    { id: 'match', name: 'Definition Match', icon: '🎯', description: 'Match terms to definitions' },
    { id: 'speed', name: 'Speed Round', icon: '⚡', description: 'Race against the clock' },
    { id: 'jeopardy', name: 'Jeopardy', icon: '🎮', description: 'Answer in question form' },
];

export default function WordBuilderView({ onComplete, onMenu, onXpGain }) {
    const [gameMode, setGameMode] = useState(null); // null = mode selection screen
    const [terms, setTerms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [isComplete, setIsComplete] = useState(false);
    const [feedback, setFeedback] = useState(null);

    // Initialize terms when game mode is selected
    useEffect(() => {
        if (gameMode) {
            if (gameMode === 'jeopardy') {
                // Jeopardy uses all terms organized by category
                setTerms(WORD_BUILDER_TERMS);
            } else if (gameMode === 'match') {
                // Match mode uses fewer terms
                setTerms(getRandomTerms(6));
            } else {
                setTerms(getRandomTerms(10));
            }
            setCurrentIndex(0);
            setScore({ correct: 0, total: 0 });
            setIsComplete(false);
            setFeedback(null);
        }
    }, [gameMode]);

    const handleModeSelect = (mode) => {
        setGameMode(mode);
    };

    const handleBackToModes = () => {
        setGameMode(null);
        setTerms([]);
        setCurrentIndex(0);
        setScore({ correct: 0, total: 0 });
        setIsComplete(false);
    };

    const handleCorrectAnswer = (xp = 25) => {
        setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        if (onXpGain) onXpGain(xp);
    };

    const handleIncorrectAnswer = () => {
        setScore(prev => ({ ...prev, total: prev.total + 1 }));
    };

    const handleNextQuestion = () => {
        setFeedback(null);
        if (currentIndex < terms.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsComplete(true);
        }
    };

    // Mode Selection Screen
    if (!gameMode) {
        return (
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔤 Word Games</h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
                        Master medical terminology through fun games!
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.25rem'
                }}>
                    {GAME_MODES.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => handleModeSelect(mode.id)}
                            style={{
                                background: 'rgba(30,27,50,0.8)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(13, 148, 136, 0.3)',
                                textAlign: 'left',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = '#0d9488';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.3)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '2.5rem' }}>{mode.icon}</span>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>{mode.name}</h3>
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{mode.description}</p>
                        </button>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={onMenu}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#94a3b8',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            fontWeight: '600'
                        }}
                    >
                        ← Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    // Completion Screen
    if (isComplete) {
        const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
        const xpEarned = score.correct * 25;

        return (
            <div style={{
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, #0d9488, #0f766e)',
                    borderRadius: '24px',
                    padding: '3rem',
                    maxWidth: '500px',
                    width: '100%'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
                        {GAME_MODES.find(m => m.id === gameMode)?.name} Complete!
                    </h2>
                    <div style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: percentage >= 70 ? '#4ade80' : '#fbbf24',
                        marginBottom: '1rem'
                    }}>
                        {score.correct} / {score.total}
                    </div>
                    <p style={{ color: '#ccfbf1', marginBottom: '1rem' }}>{percentage}% accuracy</p>
                    <p style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '2rem' }}>⭐ {xpEarned} XP earned!</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => { setIsComplete(false); setCurrentIndex(0); setScore({ correct: 0, total: 0 }); setTerms(getRandomTerms(10)); }}
                            style={{ padding: '1rem 1.5rem', background: 'white', color: '#0d9488', borderRadius: '12px', fontWeight: 'bold' }}
                        >
                            🔄 Play Again
                        </button>
                        <button
                            onClick={handleBackToModes}
                            style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '12px', fontWeight: 'bold' }}
                        >
                            🎮 Other Games
                        </button>
                        <button
                            onClick={onMenu}
                            style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px', fontWeight: 'bold' }}
                        >
                            ← Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render specific game mode
    const currentTerm = terms[currentIndex];
    const modeInfo = GAME_MODES.find(m => m.id === gameMode);

    const GameHeader = () => (
        <div style={{
            background: 'linear-gradient(135deg, #0d9488, #0891b2)',
            borderRadius: '12px 12px 0 0',
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{modeInfo?.icon}</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{modeInfo?.name}</span>
            </div>
            <button
                onClick={handleBackToModes}
                style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '8px', color: 'white', fontSize: '0.85rem' }}
            >
                ← Games
            </button>
        </div>
    );

    const ProgressBar = () => (
        <div style={{ background: 'rgba(255,255,255,0.1)', height: '4px' }}>
            <div style={{ background: '#4ade80', height: '100%', width: `${((currentIndex + 1) / terms.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>
    );

    const ScoreDisplay = () => (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            <span>Question {currentIndex + 1} of {terms.length}</span>
            <span style={{ color: '#4ade80' }}>✓ {score.correct} correct</span>
        </div>
    );

    // BUILDER MODE
    if (gameMode === 'builder') {
        return <BuilderMode
            currentTerm={currentTerm}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextQuestion}
            GameHeader={GameHeader}
            ProgressBar={ProgressBar}
            ScoreDisplay={ScoreDisplay}
            feedback={feedback}
            setFeedback={setFeedback}
            onXpGain={onXpGain}
        />;
    }

    // HANGMAN MODE
    if (gameMode === 'hangman') {
        return <HangmanMode
            currentTerm={currentTerm}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextQuestion}
            GameHeader={GameHeader}
            ProgressBar={ProgressBar}
            ScoreDisplay={ScoreDisplay}
        />;
    }

    // FILL IN BLANKS MODE
    if (gameMode === 'fillblanks') {
        return <FillBlanksMode
            currentTerm={currentTerm}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextQuestion}
            GameHeader={GameHeader}
            ProgressBar={ProgressBar}
            ScoreDisplay={ScoreDisplay}
        />;
    }

    // SCRAMBLE MODE
    if (gameMode === 'scramble') {
        return <ScrambleMode
            currentTerm={currentTerm}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextQuestion}
            GameHeader={GameHeader}
            ProgressBar={ProgressBar}
            ScoreDisplay={ScoreDisplay}
        />;
    }

    // MATCH MODE
    if (gameMode === 'match') {
        return <MatchMode
            terms={terms}
            onCorrect={handleCorrectAnswer}
            onComplete={() => setIsComplete(true)}
            GameHeader={GameHeader}
            score={score}
        />;
    }

    // SPEED MODE
    if (gameMode === 'speed') {
        return <SpeedMode
            terms={terms}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onComplete={() => setIsComplete(true)}
            GameHeader={GameHeader}
            score={score}
        />;
    }

    // JEOPARDY MODE
    if (gameMode === 'jeopardy') {
        return <JeopardyMode
            terms={terms}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onComplete={() => setIsComplete(true)}
            GameHeader={GameHeader}
            score={score}
            setScore={setScore}
        />;
    }

    return <div>Loading...</div>;
}

// ============ BUILDER MODE ============
function BuilderMode({ currentTerm, onCorrect, onIncorrect, onNext, GameHeader, ProgressBar, ScoreDisplay, feedback, setFeedback, onXpGain }) {
    const [selectedPrefix, setSelectedPrefix] = useState(null);
    const [selectedRoot, setSelectedRoot] = useState(null);
    const [selectedSuffix, setSelectedSuffix] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        setSelectedPrefix(null);
        setSelectedRoot(null);
        setSelectedSuffix(null);
        setOpenDropdown(null);
    }, [currentTerm]);

    if (!currentTerm) return <div>Loading...</div>;

    const handleSubmit = () => {
        const answer = currentTerm.answer;
        const isCorrect = selectedPrefix === answer.prefix && selectedRoot === answer.root && selectedSuffix === answer.suffix;

        if (isCorrect) {
            setFeedback({ type: 'correct', message: `Correct! "${currentTerm.builtTerm}" is right!` });
            onCorrect();
        } else {
            setFeedback({ type: 'incorrect', message: `Not quite. The answer was "${currentTerm.builtTerm}".` });
            onIncorrect();
        }
        setTimeout(() => onNext(), 2000);
    };

    // Use proper combining vowel rules for preview
    const buildPreview = () => {
        if (!selectedRoot) return '...';
        return combineWordParts(selectedPrefix, selectedRoot, selectedSuffix);
    };

    const DropdownButton = ({ type, value, options, color }) => (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
                style={{
                    background: value ? '#0d9488' : color,
                    color: 'white',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: '120px',
                    justifyContent: 'space-between'
                }}
            >
                <span>{value || type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <span>▼</span>
            </button>
            {openDropdown === type && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '0.5rem',
                    background: '#1e293b',
                    borderRadius: '8px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    minWidth: '180px',
                    maxHeight: '250px',
                    overflowY: 'auto',
                    zIndex: 100
                }}>
                    <button onClick={() => {
                        if (type === 'prefix') setSelectedPrefix(null);
                        else if (type === 'root') setSelectedRoot(null);
                        else setSelectedSuffix(null);
                        setOpenDropdown(null);
                    }} style={{ display: 'block', width: '100%', padding: '0.75rem 1rem', textAlign: 'left', color: '#64748b', background: 'transparent', fontStyle: 'italic' }}>
                        (none)
                    </button>
                    {options.map(opt => (
                        <button key={opt.id} onClick={() => {
                            if (type === 'prefix') setSelectedPrefix(opt.value);
                            else if (type === 'root') setSelectedRoot(opt.value);
                            else setSelectedSuffix(opt.value);
                            setOpenDropdown(null);
                        }} style={{ display: 'block', width: '100%', padding: '0.75rem 1rem', textAlign: 'left', color: '#e2e8f0', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <strong>{type === 'suffix' ? '-' : ''}{opt.value}{type === 'prefix' ? '-' : ''}</strong>
                            <span style={{ color: '#64748b', marginLeft: '0.5rem', fontSize: '0.85rem' }}>({opt.meaning})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GameHeader />
            <ProgressBar />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <ScoreDisplay />
                <div style={{ textAlign: 'center', padding: '2rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Build a term that means:</p>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '300', color: 'white' }}>{currentTerm.definition}</h2>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem' }}>Your term:</p>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: buildPreview() === '...' ? '#64748b' : '#0d9488', fontFamily: 'monospace' }}>{buildPreview()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <DropdownButton type="prefix" value={selectedPrefix} options={WORD_PARTS.prefixes} color="#f97316" />
                    <DropdownButton type="root" value={selectedRoot} options={WORD_PARTS.roots} color="#0891b2" />
                    <DropdownButton type="suffix" value={selectedSuffix} options={WORD_PARTS.suffixes} color="#8b5cf6" />
                </div>
                {feedback && (
                    <div style={{ textAlign: 'center', padding: '1rem', marginBottom: '1rem', borderRadius: '12px', background: feedback.type === 'correct' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `1px solid ${feedback.type === 'correct' ? '#22c55e' : '#ef4444'}` }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{feedback.type === 'correct' ? '✅' : '❌'}</span>
                        <span style={{ color: feedback.type === 'correct' ? '#4ade80' : '#fca5a5' }}>{feedback.message}</span>
                    </div>
                )}
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleSubmit} disabled={!selectedRoot || feedback} style={{ background: (!selectedRoot || feedback) ? '#475569' : 'linear-gradient(135deg, #0d9488, #0891b2)', color: 'white', padding: '1rem 3rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: (!selectedRoot || feedback) ? 'not-allowed' : 'pointer' }}>
                        ➤ SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============ HANGMAN MODE ============
function HangmanMode({ currentTerm, onCorrect, onIncorrect, onNext, GameHeader, ProgressBar, ScoreDisplay }) {
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
    const maxWrong = 6;

    // Calculate these BEFORE the conditional useEffect
    const word = currentTerm?.builtTerm?.toLowerCase() || '';
    const isWon = word && word.split('').every(letter => guessedLetters.includes(letter));
    const isLost = wrongGuesses >= maxWrong;

    useEffect(() => {
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameState('playing');
    }, [currentTerm]);

    useEffect(() => {
        if (!currentTerm) return; // Guard inside effect
        if (isWon && gameState === 'playing') {
            setGameState('won');
            onCorrect();
            setTimeout(onNext, 2000);
        } else if (isLost && gameState === 'playing') {
            setGameState('lost');
            onIncorrect();
            setTimeout(onNext, 2000);
        }
    }, [isWon, isLost, gameState, currentTerm, onCorrect, onIncorrect, onNext]);

    // Early return AFTER all hooks
    if (!currentTerm) return <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>;

    const displayWord = word.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join(' ');

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter) || gameState !== 'playing') return;
        setGuessedLetters(prev => [...prev, letter]);
        if (!word.includes(letter)) {
            setWrongGuesses(prev => prev + 1);
        }
    };

    const hangmanParts = ['😵', '👤', '💪', '🤚', '🦵', '🦶'];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GameHeader />
            <ProgressBar />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <ScoreDisplay />
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Definition:</p>
                    <h2 style={{ fontSize: '1.4rem', color: 'white' }}>{currentTerm.definition}</h2>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                        {hangmanParts.slice(0, wrongGuesses).join(' ')}
                        {wrongGuesses === 0 && '🎯'}
                    </div>
                    <p style={{ color: '#ef4444' }}>{wrongGuesses} / {maxWrong} wrong</p>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontFamily: 'monospace', letterSpacing: '0.3em', color: '#0d9488' }}>
                    {displayWord}
                </div>
                {gameState === 'playing' && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}>
                        {alphabet.map(letter => (
                            <button
                                key={letter}
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.includes(letter)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    background: guessedLetters.includes(letter)
                                        ? (word.includes(letter) ? '#22c55e' : '#ef4444')
                                        : 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    cursor: guessedLetters.includes(letter) ? 'default' : 'pointer',
                                    opacity: guessedLetters.includes(letter) ? 0.5 : 1
                                }}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                )}
                {gameState !== 'playing' && (
                    <div style={{ textAlign: 'center', padding: '1rem', borderRadius: '12px', background: gameState === 'won' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
                        <span style={{ fontSize: '2rem' }}>{gameState === 'won' ? '🎉' : '💔'}</span>
                        <p style={{ color: gameState === 'won' ? '#4ade80' : '#fca5a5', marginTop: '0.5rem' }}>
                            {gameState === 'won' ? 'Correct!' : `The answer was: ${currentTerm.builtTerm}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============ FILL IN BLANKS MODE ============
function FillBlanksMode({ currentTerm, onCorrect, onIncorrect, onNext, GameHeader, ProgressBar, ScoreDisplay }) {
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [blankType, setBlankType] = useState('prefix');

    useEffect(() => {
        setUserInput('');
        setFeedback(null);
        // Randomly decide what to blank out
        const types = [];
        if (currentTerm?.answer.prefix) types.push('prefix');
        if (currentTerm?.answer.root) types.push('root');
        if (currentTerm?.answer.suffix) types.push('suffix');
        setBlankType(types[Math.floor(Math.random() * types.length)] || 'root');
    }, [currentTerm]);

    if (!currentTerm) return <div>Loading...</div>;

    const getDisplayTerm = () => {
        const { prefix, root, suffix } = currentTerm.answer;
        if (blankType === 'prefix') return `____${root || ''}${suffix || ''}`;
        if (blankType === 'root') return `${prefix || ''}____${suffix || ''}`;
        return `${prefix || ''}${root || ''}____`;
    };

    const getCorrectAnswer = () => currentTerm.answer[blankType] || '';

    const handleSubmit = () => {
        const correct = getCorrectAnswer().toLowerCase();
        const isCorrect = userInput.toLowerCase().trim() === correct;

        if (isCorrect) {
            setFeedback({ type: 'correct', message: `Correct! The ${blankType} is "${correct}"` });
            onCorrect();
        } else {
            setFeedback({ type: 'incorrect', message: `Not quite. The ${blankType} was "${correct}"` });
            onIncorrect();
        }
        setTimeout(() => onNext(), 2000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GameHeader />
            <ProgressBar />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <ScoreDisplay />
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Definition:</p>
                    <h2 style={{ fontSize: '1.4rem', color: 'white' }}>{currentTerm.definition}</h2>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#0d9488', marginBottom: '0.5rem' }}>Fill in the missing {blankType}:</p>
                    <div style={{ fontSize: '2rem', fontFamily: 'monospace', color: '#e2e8f0' }}>{getDisplayTerm()}</div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        maxLength={50}
                        autoComplete="off"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !feedback && handleSubmit()}
                        placeholder={`Enter the ${blankType}...`}
                        disabled={!!feedback}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid #0d9488',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            fontSize: '1.2rem',
                            color: 'white',
                            textAlign: 'center',
                            width: '250px'
                        }}
                    />
                </div>
                {feedback && (
                    <div style={{ textAlign: 'center', padding: '1rem', marginBottom: '1rem', borderRadius: '12px', background: feedback.type === 'correct' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{feedback.type === 'correct' ? '✅' : '❌'}</span>
                        <span style={{ color: feedback.type === 'correct' ? '#4ade80' : '#fca5a5' }}>{feedback.message}</span>
                    </div>
                )}
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleSubmit} disabled={!userInput.trim() || feedback} style={{ background: (!userInput.trim() || feedback) ? '#475569' : 'linear-gradient(135deg, #0d9488, #0891b2)', color: 'white', padding: '1rem 3rem', borderRadius: '12px', fontWeight: 'bold', cursor: (!userInput.trim() || feedback) ? 'not-allowed' : 'pointer' }}>
                        ➤ SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============ SCRAMBLE MODE ============
function ScrambleMode({ currentTerm, onCorrect, onIncorrect, onNext, GameHeader, ProgressBar, ScoreDisplay }) {
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [scrambled, setScrambled] = useState('');

    useEffect(() => {
        setUserInput('');
        setFeedback(null);
        if (currentTerm) {
            const letters = currentTerm.builtTerm.split('');
            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]];
            }
            setScrambled(letters.join('').toUpperCase());
        }
    }, [currentTerm]);

    if (!currentTerm) return <div>Loading...</div>;

    const handleSubmit = () => {
        const isCorrect = userInput.toLowerCase().trim() === currentTerm.builtTerm.toLowerCase();

        if (isCorrect) {
            setFeedback({ type: 'correct', message: `Correct! "${currentTerm.builtTerm}" is right!` });
            onCorrect();
        } else {
            setFeedback({ type: 'incorrect', message: `Not quite. The answer was "${currentTerm.builtTerm}"` });
            onIncorrect();
        }
        setTimeout(() => onNext(), 2000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GameHeader />
            <ProgressBar />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <ScoreDisplay />
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Definition:</p>
                    <h2 style={{ fontSize: '1.4rem', color: 'white' }}>{currentTerm.definition}</h2>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ color: '#0d9488', marginBottom: '1rem' }}>Unscramble these letters:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {scrambled.split('').map((letter, i) => (
                            <span key={i} style={{
                                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#0d9488',
                                border: '1px solid rgba(13,148,136,0.3)'
                            }}>
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <input
                        type="text"
                        maxLength={50}
                        autoComplete="off"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !feedback && handleSubmit()}
                        placeholder="Type the medical term..."
                        disabled={!!feedback}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid #0d9488',
                            borderRadius: '12px',
                            padding: '1rem 1.5rem',
                            fontSize: '1.2rem',
                            color: 'white',
                            textAlign: 'center',
                            width: '300px'
                        }}
                    />
                </div>
                {feedback && (
                    <div style={{ textAlign: 'center', padding: '1rem', marginBottom: '1rem', borderRadius: '12px', background: feedback.type === 'correct' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)' }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{feedback.type === 'correct' ? '✅' : '❌'}</span>
                        <span style={{ color: feedback.type === 'correct' ? '#4ade80' : '#fca5a5' }}>{feedback.message}</span>
                    </div>
                )}
                <div style={{ textAlign: 'center' }}>
                    <button onClick={handleSubmit} disabled={!userInput.trim() || feedback} style={{ background: (!userInput.trim() || feedback) ? '#475569' : 'linear-gradient(135deg, #0d9488, #0891b2)', color: 'white', padding: '1rem 3rem', borderRadius: '12px', fontWeight: 'bold', cursor: (!userInput.trim() || feedback) ? 'not-allowed' : 'pointer' }}>
                        ➤ SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

// ============ MATCH MODE ============
function MatchMode({ terms, onCorrect, onComplete, GameHeader, score }) {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [wrongMatch, setWrongMatch] = useState(null);
    const shuffledDefinitions = useState(() => [...terms].sort(() => Math.random() - 0.5))[0];

    const handleTermClick = (term) => {
        if (matchedPairs.includes(term.id)) return;
        setSelectedTerm(term);
        setWrongMatch(null);
    };

    const handleDefinitionClick = (def) => {
        if (!selectedTerm || matchedPairs.includes(def.id)) return;

        if (selectedTerm.id === def.id) {
            setMatchedPairs(prev => [...prev, def.id]);
            onCorrect();
            setSelectedTerm(null);
            if (matchedPairs.length + 1 === terms.length) {
                setTimeout(onComplete, 1000);
            }
        } else {
            setWrongMatch(def.id);
            setTimeout(() => setWrongMatch(null), 500);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <GameHeader />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: '#94a3b8' }}>
                    <span>Matched: {matchedPairs.length} / {terms.length}</span>
                    <span style={{ color: '#4ade80' }}>✓ {score.correct} correct</span>
                </div>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>Click a term, then click its matching definition</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ color: '#0d9488', marginBottom: '1rem', textAlign: 'center' }}>Terms</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {terms.map(term => (
                                <button
                                    key={term.id}
                                    onClick={() => handleTermClick(term)}
                                    disabled={matchedPairs.includes(term.id)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '10px',
                                        background: matchedPairs.includes(term.id) ? 'rgba(34, 197, 94, 0.2)' : selectedTerm?.id === term.id ? '#0d9488' : 'rgba(255,255,255,0.1)',
                                        color: matchedPairs.includes(term.id) ? '#4ade80' : 'white',
                                        fontWeight: 'bold',
                                        cursor: matchedPairs.includes(term.id) ? 'default' : 'pointer',
                                        border: selectedTerm?.id === term.id ? '2px solid white' : '1px solid transparent'
                                    }}
                                >
                                    {term.builtTerm}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 style={{ color: '#8b5cf6', marginBottom: '1rem', textAlign: 'center' }}>Definitions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {shuffledDefinitions.map(def => (
                                <button
                                    key={def.id}
                                    onClick={() => handleDefinitionClick(def)}
                                    disabled={matchedPairs.includes(def.id)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '10px',
                                        background: matchedPairs.includes(def.id) ? 'rgba(34, 197, 94, 0.2)' : wrongMatch === def.id ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255,255,255,0.1)',
                                        color: matchedPairs.includes(def.id) ? '#4ade80' : 'white',
                                        textAlign: 'left',
                                        cursor: matchedPairs.includes(def.id) ? 'default' : 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {def.definition}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============ SPEED MODE ============
function SpeedMode({ terms, onCorrect, onIncorrect, onComplete, GameHeader, score }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [userInput, setUserInput] = useState('');
    const [isGameOver, setIsGameOver] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentIndex]);

    useEffect(() => {
        if (timeLeft > 0 && !isGameOver) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsGameOver(true);
            setTimeout(onComplete, 1500);
        }
    }, [timeLeft, isGameOver]);

    const handleSubmit = () => {
        if (!terms[currentIndex]) return;
        const isCorrect = userInput.toLowerCase().trim() === terms[currentIndex].builtTerm.toLowerCase();

        if (isCorrect) {
            onCorrect(50); // More XP for speed mode
        } else {
            onIncorrect();
        }

        setUserInput('');
        if (currentIndex < terms.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsGameOver(true);
            setTimeout(onComplete, 1500);
        }
    };

    const currentTerm = terms[currentIndex];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <GameHeader />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ color: '#94a3b8' }}>Term {currentIndex + 1} / {terms.length}</span>
                    <span style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: timeLeft <= 10 ? '#ef4444' : timeLeft <= 30 ? '#fbbf24' : '#4ade80'
                    }}>
                        ⏱️ {timeLeft}s
                    </span>
                    <span style={{ color: '#4ade80' }}>✓ {score.correct}</span>
                </div>

                {!isGameOver && currentTerm && (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>Type the term for:</p>
                            <h2 style={{ fontSize: '1.5rem', color: 'white' }}>{currentTerm.definition}</h2>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <input
                                ref={inputRef}
                                type="text"
                                maxLength={50}
                                autoComplete="off"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                placeholder="Type fast!"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '2px solid #f97316',
                                    borderRadius: '12px',
                                    padding: '1rem 1.5rem',
                                    fontSize: '1.5rem',
                                    color: 'white',
                                    textAlign: 'center',
                                    width: '350px'
                                }}
                            />
                            <p style={{ color: '#64748b', marginTop: '0.5rem', fontSize: '0.85rem' }}>Press Enter to submit</p>
                        </div>
                    </>
                )}

                {isGameOver && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <span style={{ fontSize: '4rem' }}>⚡</span>
                        <h2 style={{ color: '#f97316', marginTop: '1rem' }}>Time's up!</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============ JEOPARDY MODE ============
function JeopardyMode({ terms, onCorrect, onIncorrect, onComplete, GameHeader, score, setScore }) {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [jeopardyScore, setJeopardyScore] = useState(0);

    // Group terms by category
    const categories = [...new Set(terms.map(t => t.category))].slice(0, 5);
    const pointValues = [100, 200, 300, 400, 500];

    const getCategoryTerms = (category) => {
        return terms.filter(t => t.category === category).slice(0, 5);
    };

    const handleQuestionSelect = (term, points) => {
        if (answeredQuestions.includes(`${term.id}-${points}`)) return;
        setSelectedQuestion({ term, points });
        setUserInput('');
        setFeedback(null);
    };

    const handleSubmit = () => {
        if (!selectedQuestion) return;

        // Jeopardy-style: answer should be in question form "What is X?"
        const answer = selectedQuestion.term.builtTerm.toLowerCase();
        const userAnswer = userInput.toLowerCase().trim();
        const isCorrect = userAnswer.includes(answer) ||
            userAnswer === answer ||
            userAnswer === `what is ${answer}` ||
            userAnswer === `what is ${answer}?`;

        if (isCorrect) {
            setFeedback({ type: 'correct', message: `Correct! What is "${selectedQuestion.term.builtTerm}"` });
            setJeopardyScore(prev => prev + selectedQuestion.points);
            onCorrect(selectedQuestion.points / 4);
        } else {
            setFeedback({ type: 'incorrect', message: `Sorry! The answer was "What is ${selectedQuestion.term.builtTerm}?"` });
            setJeopardyScore(prev => prev - selectedQuestion.points / 2);
            onIncorrect();
        }

        setAnsweredQuestions(prev => [...prev, `${selectedQuestion.term.id}-${selectedQuestion.points}`]);

        setTimeout(() => {
            setSelectedQuestion(null);
            setFeedback(null);

            if (answeredQuestions.length + 1 >= categories.length * 5) {
                onComplete();
            }
        }, 2500);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <GameHeader />
            <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '0 0 12px 12px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#94a3b8' }}>
                    <span>Answer in question form: "What is...?"</span>
                    <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem' }}>💰 ${jeopardyScore}</span>
                </div>

                {!selectedQuestion ? (
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: '0.5rem' }}>
                        {categories.map(category => (
                            <div key={category}>
                                <div style={{
                                    background: '#1e40af',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    fontSize: '0.85rem',
                                    borderRadius: '8px 8px 0 0'
                                }}>
                                    {category}
                                </div>
                                {getCategoryTerms(category).map((term, i) => {
                                    const points = pointValues[i] || 100;
                                    const isAnswered = answeredQuestions.includes(`${term.id}-${points}`);
                                    return (
                                        <button
                                            key={term.id}
                                            onClick={() => handleQuestionSelect(term, points)}
                                            disabled={isAnswered}
                                            style={{
                                                width: '100%',
                                                padding: '1.25rem',
                                                background: isAnswered ? '#1e293b' : '#1e40af',
                                                color: isAnswered ? '#475569' : '#fbbf24',
                                                fontSize: '1.25rem',
                                                fontWeight: 'bold',
                                                border: 'none',
                                                borderTop: '1px solid rgba(255,255,255,0.1)',
                                                cursor: isAnswered ? 'default' : 'pointer'
                                            }}
                                        >
                                            {isAnswered ? '' : `$${points}`}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={{ marginBottom: '1rem', color: '#fbbf24', fontSize: '1.5rem' }}>
                            ${selectedQuestion.points}
                        </div>
                        <div style={{
                            background: '#1e40af',
                            padding: '2rem',
                            borderRadius: '12px',
                            marginBottom: '1.5rem'
                        }}>
                            <h2 style={{ color: 'white', fontSize: '1.5rem' }}>
                                {selectedQuestion.term.definition}
                            </h2>
                        </div>

                        {!feedback && (
                            <div>
                                <input
                                    type="text"
                                    maxLength={50}
                                    autoComplete="off"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder='What is...?'
                                    autoFocus
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: '2px solid #1e40af',
                                        borderRadius: '12px',
                                        padding: '1rem 1.5rem',
                                        fontSize: '1.2rem',
                                        color: 'white',
                                        width: '350px',
                                        marginBottom: '1rem'
                                    }}
                                />
                                <div>
                                    <button onClick={handleSubmit} style={{
                                        background: '#1e40af',
                                        color: 'white',
                                        padding: '1rem 2rem',
                                        borderRadius: '12px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem'
                                    }}>
                                        Submit Answer
                                    </button>
                                </div>
                            </div>
                        )}

                        {feedback && (
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '12px',
                                background: feedback.type === 'correct' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                            }}>
                                <span style={{ fontSize: '2rem' }}>{feedback.type === 'correct' ? '✅' : '❌'}</span>
                                <p style={{ color: feedback.type === 'correct' ? '#4ade80' : '#fca5a5', marginTop: '0.5rem', fontSize: '1.2rem' }}>
                                    {feedback.message}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
