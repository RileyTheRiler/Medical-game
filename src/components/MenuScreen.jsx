import React, { useState } from 'react';
import { CHAPTERS } from '../data/chapters';
import { SCENARIOS } from '../data/scenarios';
import { BOSSES } from '../data/bosses';
import { DAILY_RULES } from '../data/claims';
import { FLASHCARD_DECKS } from '../data/flashcards';

export default function MenuScreen({ stats, onSelectChapter, onSelectScenario, onSelectBoss, onSelectClaimsDay, onSelectFlashcardDeck, onSelectCalculator, onSelectModifierMatching, onSelectWordBuilder }) {
    const [activeTab, setActiveTab] = useState('chapters'); // 'chapters', 'lab', 'claims', 'boss', 'tools'

    return (
        <div style={{ minHeight: '100vh', padding: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '2rem' }}>⚕️</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em' }}>CodeRx Academy</span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(139,92,246,0.15)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', color: '#a78bfa' }}>
                        ⭐ {stats.xp} XP
                    </div>
                    <div style={{ background: 'rgba(6,182,212,0.15)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.9rem', color: '#22d3ee' }}>
                        📚 {stats.completed.length}/18
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button
                    onClick={() => setActiveTab('chapters')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        background: activeTab === 'chapters' ? '#f8fafc' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'chapters' ? '#0f172a' : '#94a3b8',
                        fontWeight: '600'
                    }}
                >
                    Learning Chapters
                </button>
                <button
                    onClick={() => setActiveTab('lab')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        background: activeTab === 'lab' ? '#f8fafc' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'lab' ? '#0f172a' : '#94a3b8',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                    }}
                >
                    💻 Coding Lab
                </button>
                <button
                    onClick={() => setActiveTab('claims')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        background: activeTab === 'claims' ? '#10b981' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'claims' ? '#ffffff' : '#94a3b8',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        border: activeTab === 'claims' ? 'none' : '1px solid rgba(16, 185, 129, 0.3)'
                    }}
                >
                    📋 Claims Desk
                </button>
                <button
                    onClick={() => setActiveTab('boss')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        background: activeTab === 'boss' ? '#dc2626' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'boss' ? '#ffffff' : '#94a3b8',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        border: activeTab === 'boss' ? 'none' : '1px solid rgba(220, 38, 38, 0.3)'
                    }}
                >
                    ⚔️ Boss Battles
                </button>
                <button
                    onClick={() => setActiveTab('tools')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        background: activeTab === 'tools' ? '#8b5cf6' : 'rgba(255,255,255,0.05)',
                        color: activeTab === 'tools' ? '#ffffff' : '#94a3b8',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        border: activeTab === 'tools' ? 'none' : '1px solid rgba(139, 92, 246, 0.3)'
                    }}
                >
                    🔧 Study Tools
                </button>
            </div>

            {activeTab === 'chapters' && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>
                    {CHAPTERS.map((c, i) => {
                        const unlocked = stats.unlocked.includes(c.id);
                        const done = stats.completed.includes(c.id);
                        const isNext = unlocked && !done && stats.completed.length === i;

                        return (
                            <button
                                key={c.id}
                                onClick={() => unlocked && onSelectChapter(c.id)}
                                disabled={!unlocked}
                                className="animate-fade-in"
                                style={{
                                    background: unlocked ? 'rgba(30,27,50,0.6)' : 'rgba(20,18,35,0.4)',
                                    borderRadius: '16px',
                                    padding: '1.25rem',
                                    border: done ? `2px solid ${c.color}` : isNext ? '2px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)',
                                    textAlign: 'left',
                                    position: 'relative',
                                    animationDelay: `${i * 0.05}s`,
                                    transition: 'all 0.2s ease',
                                    transform: isNext ? 'scale(1.02)' : 'none',
                                    boxShadow: isNext ? '0 0 20px rgba(0,0,0,0.3)' : 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '2rem', filter: unlocked ? 'none' : 'grayscale(100%) opacity(0.5)' }}>{c.icon}</span>
                                    {done && (
                                        <span style={{ background: c.color, borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>✓</span>
                                    )}
                                    {!unlocked && <span style={{ opacity: 0.3, fontSize: '1.2rem' }}>🔒</span>}
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.7rem', color: c.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Chapter {c.id}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: unlocked ? 'white' : '#64748b' }}>{c.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{c.topics.slice(0, 3).join(' • ')}...</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {activeTab === 'lab' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {SCENARIOS.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => onSelectScenario(s.id)}
                            className="animate-fade-in"
                            style={{
                                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                textAlign: 'left',
                                animationDelay: `${i * 0.1}s`,
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'none'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ background: '#3b82f6', color: 'white', padding: '0.25rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>CASE STUDY #{s.id}</span>
                                <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>⭐ {s.xpReward} XP</span>
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: '700' }}>{s.title}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                <span>👤 {s.patient.name}</span>
                                <span>•</span>
                                <span>{s.difficulty}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {activeTab === 'claims' && (
                <div>
                    <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'linear-gradient(145deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#10b981' }}>📋 Claims Desk</h2>
                        <p style={{ color: '#94a3b8', lineHeight: '1.5' }}>
                            Review medical billing claims and decide: <strong style={{ color: '#4ade80' }}>APPROVE</strong> or <strong style={{ color: '#ef4444' }}>DENY</strong>?
                            Start with <strong style={{ color: '#a78bfa' }}>Orientation</strong> to learn the basics!
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {DAILY_RULES.map((day, i) => {
                            // Gating logic:
                            // Day 0 (Orientation): Always unlocked
                            // Day 1: Requires Day 0 completion
                            // Day 2+: Requires Chapter 17 (E/M Coding) completion
                            const claimsDaysCompleted = stats.claimsDaysCompleted || [];
                            let unlocked = false;
                            let lockReason = '';

                            if (day.day === 0) {
                                unlocked = true;  // Orientation always available
                            } else if (day.day === 1) {
                                unlocked = claimsDaysCompleted.includes(0);
                                lockReason = 'Complete Orientation first';
                            } else {
                                // Days 2+ require Chapter 17 (E/M Coding)
                                const hasChapter17 = stats.completed.includes(17);
                                const hasPreviousDay = claimsDaysCompleted.includes(day.day - 1);
                                unlocked = hasChapter17 && hasPreviousDay;
                                if (!hasChapter17) {
                                    lockReason = 'Complete Chapter 17: E/M Coding';
                                } else if (!hasPreviousDay) {
                                    lockReason = `Complete Day ${day.day - 1} first`;
                                }
                            }

                            const isCompleted = claimsDaysCompleted.includes(day.day);

                            return (
                                <button
                                    key={day.day}
                                    onClick={() => unlocked && onSelectClaimsDay(day.day)}
                                    disabled={!unlocked}
                                    className="animate-fade-in"
                                    style={{
                                        background: day.isOrientation
                                            ? (unlocked ? 'linear-gradient(145deg, #4c1d95, #5b21b6)' : 'rgba(20,18,35,0.4)')
                                            : (unlocked ? 'linear-gradient(145deg, #064e3b, #065f46)' : 'rgba(20,18,35,0.4)'),
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        border: day.isOrientation
                                            ? (isCompleted ? '2px solid #a78bfa' : '1px solid rgba(167,139,250,0.3)')
                                            : (isCompleted ? '2px solid #10b981' : '1px solid rgba(16,185,129,0.3)'),
                                        textAlign: 'left',
                                        animationDelay: `${i * 0.1}s`,
                                        transition: 'transform 0.2s',
                                        opacity: unlocked ? 1 : 0.5,
                                        cursor: unlocked ? 'pointer' : 'not-allowed'
                                    }}
                                    onMouseOver={e => unlocked && (e.currentTarget.style.transform = 'translateY(-4px)')}
                                    onMouseOut={e => unlocked && (e.currentTarget.style.transform = 'none')}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                        <span style={{
                                            background: day.isOrientation ? '#7c3aed' : '#10b981',
                                            color: 'white',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {day.isOrientation ? '🎓 TRAINING' : `DAY ${day.day}`}
                                        </span>
                                        {isCompleted && <span style={{ color: '#4ade80' }}>✓</span>}
                                        {!unlocked && <span style={{ opacity: 0.5 }}>🔒</span>}
                                        <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>⭐ {day.xpReward} XP</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', fontWeight: '700', color: unlocked ? (day.isOrientation ? '#c4b5fd' : '#6ee7b7') : '#64748b' }}>
                                        {day.title}
                                    </h3>
                                    <div style={{ color: day.isOrientation ? '#ddd6fe' : '#a7f3d0', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                        {day.subtitle}
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4' }}>
                                        {day.description}
                                    </p>
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                        {day.shiftTime ? (
                                            <span>⏱️ {Math.floor(day.shiftTime / 60)}:{String(day.shiftTime % 60).padStart(2, '0')}</span>
                                        ) : (
                                            <span>⏸️ No timer</span>
                                        )}
                                        <span>📋 {day.claimCount} claims</span>
                                    </div>
                                    {!unlocked && lockReason && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#fbbf24', fontStyle: 'italic' }}>
                                            🔒 {lockReason}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {activeTab === 'boss' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                    {BOSSES.map((b, i) => {
                        // Demo unlock logic: unlock if chapter 1 is complete
                        const demoUnlocked = stats.completed.length >= 1;

                        return (
                            <button
                                key={b.id}
                                onClick={() => demoUnlocked && onSelectBoss(b.id)}
                                disabled={!demoUnlocked}
                                className="animate-fade-in"
                                style={{
                                    background: demoUnlocked ? 'linear-gradient(145deg, #450a0a, #7f1d1d)' : 'rgba(20,18,35,0.4)',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    border: '2px solid #dc2626',
                                    textAlign: 'left',
                                    animationDelay: `${i * 0.1}s`,
                                    transition: 'transform 0.2s',
                                    opacity: demoUnlocked ? 1 : 0.6,
                                    boxShadow: demoUnlocked ? '0 10px 30px rgba(220, 38, 38, 0.2)' : 'none'
                                }}
                                onMouseOver={e => demoUnlocked && (e.currentTarget.style.transform = 'scale(1.02)')}
                                onMouseOut={e => demoUnlocked && (e.currentTarget.style.transform = 'none')}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '2.5rem' }}>{b.icon}</span>
                                    {!demoUnlocked && <span style={{ background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.8rem', borderRadius: '10px', fontSize: '0.8rem' }}>🔒 Complete Ch 1</span>}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '800', color: '#fca5a5' }}>{b.title}</h3>
                                <div style={{ color: '#fca5a5', marginBottom: '1rem', fontWeight: '600' }}>{b.subtitle}</div>
                                <p style={{ color: '#fee2e2', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1rem' }}>{b.description}</p>
                                <div style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 'bold' }}>REWARD: {b.xpReward} XP</div>
                            </button>
                        )
                    })}
                </div>
            )}

            {/* Flashcards & Tools Tab */}
            {activeTab === 'tools' && (
                <div>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#a78bfa' }}>🔧 Study Tools</h2>
                        <p style={{ color: '#94a3b8' }}>Tools to help you memorize codes and calculate E/M levels.</p>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        📚 Flashcards
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {FLASHCARD_DECKS.map((deck, i) => (
                            <button
                                key={deck.id}
                                onClick={() => onSelectFlashcardDeck(deck.id)}
                                className="animate-fade-in"
                                style={{
                                    background: `linear-gradient(145deg, ${deck.color}20, ${deck.color}10)`,
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: `1px solid ${deck.color}40`,
                                    textAlign: 'left',
                                    animationDelay: `${i * 0.1}s`,
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'none'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '2.5rem' }}>{deck.icon}</span>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>{deck.title}</h3>
                                        <span style={{ fontSize: '0.8rem', color: deck.color, fontWeight: '600' }}>{deck.cards.length} Cards</span>
                                    </div>
                                </div>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {deck.description}
                                </p>
                            </button>
                        ))}
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', marginTop: '2rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        🎮 Mini-Games
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <button
                            onClick={() => onSelectModifierMatching && onSelectModifierMatching()}
                            className="animate-fade-in"
                            style={{
                                background: 'linear-gradient(145deg, #ef444420, #ef444410)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid #ef444450',
                                textAlign: 'left',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'none'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2.5rem' }}>💼</span>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>Modifier Matching</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '600' }}>Swipe Game</span>
                                </div>
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                Tinder-style game: Does this scenario need Modifier -25? Swipe right for yes, left for no!
                            </p>
                        </button>

                        <button
                            onClick={() => onSelectWordBuilder && onSelectWordBuilder()}
                            className="animate-fade-in"
                            style={{
                                background: 'linear-gradient(145deg, #0d948820, #0d948810)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid #0d948850',
                                textAlign: 'left',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'none'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2.5rem' }}>🔤</span>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>Word Builder</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#0d9488', fontWeight: '600' }}>Terminology Game</span>
                                </div>
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                Build medical terms by combining prefixes, roots, and suffixes to match definitions!
                            </p>
                        </button>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#e2e8f0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                        🧮 Calculators
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <button
                            onClick={onSelectCalculator}
                            className="animate-fade-in"
                            style={{
                                background: 'linear-gradient(145deg, #0d9488, #115e59)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'none'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '2rem' }}>🧮</span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>E/M Level Calculator</h3>
                            </div>
                            <p style={{ color: '#ccfbf1', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                Determine the correct E/M code (99202-99215) using 2024 MDM guidelines.
                            </p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

