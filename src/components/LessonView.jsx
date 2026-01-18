import React from 'react';

export default function LessonView({ chapter, lesson, onComplete }) {
    return (
        <div style={{ background: 'rgba(30,27,50,0.8)', borderRadius: '12px', padding: '1.5rem' }} className="animate-fade-in">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: chapter.color }}>{lesson.title}</h2>

            <div style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                fontSize: '1rem',
                lineHeight: '1.7',
                color: '#cbd5e1',
                background: 'rgba(0,0,0,0.2)',
                padding: '1rem',
                borderRadius: '8px'
            }}>
                {lesson.content}
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Topics</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {chapter.topics.map((t, i) => (
                        <span key={i} style={{
                            background: `${chapter.color}22`,
                            color: chapter.color,
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            border: `1px solid ${chapter.color}44`
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={onComplete}
                style={{
                    marginTop: '2rem',
                    width: '100%',
                    padding: '1rem',
                    background: chapter.color,
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '12px',
                    boxShadow: `0 4px 12px ${chapter.color}40`
                }}
            >
                Start Quiz →
            </button>
        </div>
    );
}
