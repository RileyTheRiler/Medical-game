import React, { useState } from 'react';

export default function ScenarioView({ scenario, onComplete, color = '#3b82f6' }) {
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState([]); // Track answers
    const [complete, setComplete] = useState(false);
    const [accuracy, setAccuracy] = useState(100);

    const currentQ = scenario.questions[step];

    const handleAnswer = (optionIndex) => {
        const isCorrect = optionIndex === currentQ.correct;

        // Penalize accuracy for wrong answers
        if (!isCorrect) {
            setAccuracy(prev => Math.max(0, prev - 15));
        }

        const newHistory = [...history, {
            q: currentQ.text,
            correct: isCorrect,
            explanation: currentQ.explanation
        }];
        setHistory(newHistory);

        if (step < scenario.questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setComplete(true);
        }
    };

    if (complete) {
        return (
            <div className="animate-fade-in" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(30,27,50,0.8)', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Case Closed!</h2>
                <div style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                    Final Accuracy: <span style={{ color: accuracy > 80 ? '#4ade80' : accuracy > 50 ? '#fbbf24' : '#ef4444', fontWeight: 'bold' }}>{accuracy}%</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Case Review</h3>
                    {history.map((h, i) => (
                        <div key={i} style={{ marginBottom: '1rem', opacity: 0.9 }}>
                            <div style={{ fontWeight: '600', color: h.correct ? '#4ade80' : '#ef4444' }}>
                                {h.correct ? '✓' : '✗'} Step {i + 1}: {h.q}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>{h.explanation}</div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onComplete}
                    style={{ padding: '1rem 3rem', background: color, color: 'white', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                    Return to Lab
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: 'calc(100vh - 140px)' }}>
            {/* LEFT: EHR View */}
            <div style={{
                background: '#f1f5f9',
                color: '#1e293b',
                borderRadius: '8px',
                padding: '2rem',
                overflowY: 'auto',
                fontFamily: '"Courier New", Courier, monospace',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <div style={{ borderBottom: '2px solid #334155', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>PATIENT: {scenario.patient.name}</strong>
                    <strong>MRN: {scenario.patient.mrn}</strong>
                </div>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {scenario.documentation}
                </pre>
            </div>

            {/* RIGHT: Work Area */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Step {step + 1} / {scenario.questions.length}</span>
                    <span style={{ fontSize: '0.9rem', color: accuracy > 80 ? '#4ade80' : '#ef4444' }}>Accuracy: {accuracy}%</span>
                </div>

                <div style={{ background: 'rgba(30,27,50,0.6)', borderRadius: '12px', padding: '1.5rem', flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>{currentQ.text}</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentQ.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(i)}
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#e2e8f0',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.3rem'
                                }}
                                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                <span style={{ fontWeight: '600', color: color }}>{opt.code || opt.text}</span>
                                {opt.desc && <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{opt.desc}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
