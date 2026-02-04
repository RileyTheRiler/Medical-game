import React, { useState, useEffect, useCallback } from 'react';

export default function FlashcardView({ deck, onMenu }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [learnedCards, setLearnedCards] = useState(() => {
        // Load learned status from local storage
        const saved = localStorage.getItem(`flashcards_${deck.id}`);
        return saved ? JSON.parse(saved) : [];
    });

    const currentCard = deck.cards[currentIndex];
    const isLearned = learnedCards.includes(currentCard.id);

    // Persist learned status
    useEffect(() => {
        localStorage.setItem(`flashcards_${deck.id}`, JSON.stringify(learnedCards));
    }, [learnedCards, deck.id]);

    const handleNext = useCallback(() => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % deck.cards.length);
        }, 150);
    }, [deck.cards.length]);

    const handlePrev = useCallback(() => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev - 1 + deck.cards.length) % deck.cards.length);
        }, 150);
    }, [deck.cards.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                // Ignore if focus is on a button or interactive element
                const activeTag = document.activeElement.tagName;
                if (activeTag === 'BUTTON' || activeTag === 'INPUT' || activeTag === 'TEXTAREA' || document.activeElement.getAttribute('role') === 'button') {
                    return;
                }
                e.preventDefault();
                setIsFlipped(prev => !prev);
            } else if (e.code === 'ArrowRight') {
                handleNext();
            } else if (e.code === 'ArrowLeft') {
                handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const toggleLearned = (e) => {
        e.stopPropagation();
        setLearnedCards(prev =>
            prev.includes(currentCard.id)
                ? prev.filter(id => id !== currentCard.id)
                : [...prev, currentCard.id]
        );
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#0f172a',
            color: 'white',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                background: 'rgba(15, 23, 42, 0.9)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button
                    onClick={onMenu}
                    aria-label="Back to Menu"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600'
                    }}
                >
                    ← Back to Menu
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{deck.icon}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{deck.title}</span>
                </div>
                <div style={{ width: '80px', textAlign: 'right', color: '#94a3b8', fontSize: '0.9rem' }}>
                    {currentIndex + 1} / {deck.cards.length}
                </div>
            </div>

            {/* Main Card Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                position: 'relative'
            }}>
                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    color: '#94a3b8'
                }}>
                    <span>Mastery:</span>
                    <span style={{ color: '#4ade80', fontWeight: 'bold' }}>
                        {Math.round((learnedCards.length / deck.cards.length) * 100)}%
                    </span>
                </div>

                {/* The Card */}
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setIsFlipped(prev => !prev);
                        }
                    }}
                    role="button"
                    tabIndex="0"
                    aria-pressed={isFlipped}
                    aria-label={`Flashcard: ${isFlipped ? 'Back side, definition: ' + currentCard.back : 'Front side, term: ' + currentCard.front}. Click or press Space to flip.`}
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        aspectRatio: '3/2',
                        perspective: '1000px',
                        cursor: 'pointer'
                    }}
                >
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.6s',
                        transformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}>
                        {/* Front */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                            padding: '2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                                TERM
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f8fafc' }}>
                                {currentCard.front}
                            </div>
                            <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#64748b' }}>
                                (Click or Space to flip)
                            </div>

                            {/* Learned Badge on Front */}
                            {isLearned && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    color: '#4ade80',
                                    fontWeight: 'bold'
                                }}>
                                    ✓ Learned
                                </div>
                            )}
                        </div>

                        {/* Back */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            background: 'linear-gradient(145deg, #334155, #1e293b)',
                            borderRadius: '20px',
                            border: `1px solid ${deck.color}`,
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                            padding: '2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: deck.color, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                                DEFINITION
                            </div>
                            <div style={{ fontSize: '1.5rem', lineHeight: '1.6', color: '#e2e8f0' }}>
                                {currentCard.back}
                            </div>

                            {/* Mark as Learned Toggle */}
                            <button
                                onClick={toggleLearned}
                                aria-pressed={isLearned}
                                style={{
                                    marginTop: '2rem',
                                    padding: '0.5rem 1rem',
                                    background: isLearned ? '#4ade80' : 'rgba(255,255,255,0.1)',
                                    color: isLearned ? '#064e3b' : 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isLearned ? '✓ Learned' : '○ Mark as Learned'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    marginTop: '2rem',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={handlePrev}
                        aria-label="Previous card"
                        title="Previous card (Left Arrow)"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                        }}
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        aria-label="Next card"
                        title="Next card (Right Arrow)"
                        style={{
                            background: deck.color,
                            border: 'none',
                            color: 'white',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 20px ${deck.color}40`,
                            transition: 'transform 0.2s'
                        }}
                    >
                        →
                    </button>
                </div>
                <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.8rem' }}>
                    Use Arrow Keys to Navigate
                </div>
            </div>
        </div>
    );
}
