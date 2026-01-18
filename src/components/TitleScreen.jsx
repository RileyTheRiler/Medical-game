import React from 'react';

export default function TitleScreen({ onStart, stats }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }} className="animate-fade-in">⚕️</div>

            <h1 className="animate-fade-in" style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem',
                animationDelay: '0.1s'
            }}>
                CodeRx Academy
            </h1>

            <p className="animate-fade-in" style={{
                fontSize: '1.2rem',
                letterSpacing: '0.3em',
                color: '#64748b',
                marginBottom: '1rem',
                animationDelay: '0.2s'
            }}>
                CPC® CERTIFICATION PREP
            </p>

            <p className="animate-fade-in" style={{
                color: '#94a3b8',
                marginBottom: '3rem',
                maxWidth: '500px',
                lineHeight: '1.6',
                animationDelay: '0.3s'
            }}>
                Master medical coding through interactive lessons and quizzes aligned with AAPC's Certified Professional Coder curriculum.
            </p>

            <button
                onClick={onStart}
                className="animate-fade-in"
                style={{
                    padding: '1rem 3.5rem',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                    color: 'white',
                    borderRadius: '50px',
                    boxShadow: '0 10px 40px rgba(124, 58, 237, 0.4)',
                    animationDelay: '0.4s'
                }}
            >
                {stats.xp > 0 ? 'Resume Training' : 'Begin Training'}
            </button>

            {stats.completed.length > 0 && (
                <div className="animate-fade-in" style={{
                    marginTop: '2rem',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    display: 'flex',
                    gap: '1.5rem',
                    animationDelay: '0.5s'
                }}>
                    <span>📚 {stats.completed.length}/18 Chapters</span>
                    <span>⭐ {stats.xp} XP</span>
                </div>
            )}
        </div>
    );
}
