import React from 'react';

export default function CompleteScreen({ chapter, stats, onMenu, onNext }) {
    // Check if there is a next chapter
    const hasNext = stats.unlocked.includes(chapter.id + 1);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div className="animate-fade-in">
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>

                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem',
                    background: `linear-gradient(135deg, ${chapter.color}, #ffffff)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: '800'
                }}>
                    Chapter Complete!
                </h1>

                <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.2rem' }}>You've mastered "{chapter.title}"</p>

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '20px',
                    padding: '2rem',
                    marginBottom: '2.5rem',
                    display: 'inline-flex',
                    gap: '3rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#a78bfa' }}>{stats.xp}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total XP</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22d3ee' }}>{stats.completed.length}/18</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chapters</div>
                    </div>
                </div>

                <div style={{ display: 'flex', className: 'animate-fade-in', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={onMenu}
                        style={{
                            padding: '1rem 2rem',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        Main Menu
                    </button>

                    {hasNext && (
                        <button
                            onClick={onNext}
                            style={{
                                padding: '1rem 2.5rem',
                                background: 'white',
                                color: '#0f172a',
                                borderRadius: '50px',
                                fontSize: '1rem',
                                fontWeight: '700'
                            }}
                        >
                            Next Chapter →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
