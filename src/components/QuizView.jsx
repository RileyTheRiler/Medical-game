import React, { useState } from 'react';

export default function QuizView({ chapter, questions, onAnswer, onComplete, color }) {
    const [qIndex, setQIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentQ = questions[qIndex];
    const isLastQuestion = qIndex === questions.length - 1;

    const handleSelect = (index) => {
        if (showAnswer) return;

        setSelected(index);
        setShowAnswer(true);

        const isCorrect = index === currentQ.c;
        onAnswer(isCorrect);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            onComplete();
        } else {
            setQIndex(prev => prev + 1);
            setSelected(null);
            setShowAnswer(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                <span>Question {qIndex + 1} of {questions.length}</span>
                <div style={{ height: '6px', width: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${((qIndex + 1) / questions.length) * 100}%`, background: color, transition: 'width 0.3s ease' }} />
                </div>
            </div>

            <div style={{ background: 'rgba(30,27,50,0.8)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '1.5rem', lineHeight: '1.5' }}>{currentQ.q}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {currentQ.o.map((opt, i) => {
                        let bg = 'rgba(71,85,105,0.2)';
                        let borderColor = 'transparent';

                        if (showAnswer) {
                            if (i === currentQ.c) {
                                bg = 'rgba(34,197,94,0.15)';
                                borderColor = 'rgba(34,197,94,0.5)';
                            } else if (i === selected) {
                                bg = 'rgba(239,68,68,0.15)';
                                borderColor = 'rgba(239,68,68,0.5)';
                            }
                        } else if (i === selected) {
                            bg = `${color}33`;
                            borderColor = color;
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={showAnswer}
                                style={{
                                    padding: '1rem',
                                    background: bg,
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: '10px',
                                    color: '#e2e8f0',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: showAnswer && i === currentQ.c ? '#22c55e' : showAnswer && i === selected ? '#ef4444' : 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    {showAnswer && i === currentQ.c ? '✓' : showAnswer && i === selected ? '✗' : String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                            </button>
                        );
                    })}
                </div>
            </div>

            {showAnswer && (
                <div className="animate-fade-in">
                    <div style={{
                        background: selected === currentQ.c ? 'rgba(34,197,94,0.1)' : 'rgba(251,191,36,0.1)',
                        borderLeft: `4px solid ${selected === currentQ.c ? '#4ade80' : '#fbbf24'}`,
                        borderRadius: '4px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <p style={{ fontWeight: '600', color: selected === currentQ.c ? '#4ade80' : '#fbbf24', marginBottom: '0.5rem' }}>
                            {selected === currentQ.c ? 'Correct! Excellent work.' : 'Not quite. Review the explanation below.'}
                        </p>
                        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>{currentQ.e}</p>
                    </div>

                    <button
                        onClick={handleNext}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: color,
                            border: 'none',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            boxShadow: `0 4px 12px ${color}40`
                        }}
                    >
                        {isLastQuestion ? 'Finish Chapter →' : 'Next Question →'}
                    </button>
                </div>
            )}
        </div>
    );
}
