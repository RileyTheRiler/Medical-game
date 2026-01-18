import React, { useState, useEffect } from 'react';
import { BOSS_CHARACTERS } from '../data/characters.js';

export default function BossBattleView({ boss, onComplete, onDefeat }) {
    const [stageIndex, setStageIndex] = useState(0);
    const [hp, setHp] = useState(100);
    const [showFeedback, setShowFeedback] = useState(null); // { correct: bool, text: string }
    const [showBossIntro, setShowBossIntro] = useState(true);
    const [showVictory, setShowVictory] = useState(false);
    const [showDefeat, setShowDefeat] = useState(false);
    const [bossPhase, setBossPhase] = useState(0);

    // Get boss character narrative data
    const bossChar = BOSS_CHARACTERS[boss.characterId] || BOSS_CHARACTERS.auditorQueen;

    const currentStage = boss.stages[stageIndex];
    const isLastStage = stageIndex === boss.stages.length - 1;

    // Determine boss phase based on progress
    useEffect(() => {
        const progress = (stageIndex / boss.stages.length) * 100;
        if (progress > 66) setBossPhase(2);
        else if (progress > 33) setBossPhase(1);
        else setBossPhase(0);
    }, [stageIndex, boss.stages.length]);

    const handleNext = () => {
        setShowFeedback(null);
        if (isLastStage) {
            setShowVictory(true);
            setTimeout(onComplete, 3000);
        } else {
            setStageIndex(prev => prev + 1);
        }
    };

    const handleAnswer = (option) => {
        if (showFeedback) return;

        if (option.correct) {
            setShowFeedback({ correct: true, text: option.feedback || "Correct!" });
        } else {
            const damage = currentStage.damage || 10;
            const newHp = Math.max(0, hp - damage);
            setHp(newHp);
            setShowFeedback({ correct: false, text: option.feedback || "Incorrect!" });

            if (newHp === 0) {
                setTimeout(() => setShowDefeat(true), 1000);
            }
        }
    };

    // Boss Intro Screen
    if (showBossIntro) {
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto',
                height: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    background: `linear-gradient(145deg, ${bossChar.color}20, rgba(15,10,30,1))`,
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: `2px solid ${bossChar.color}`,
                    boxShadow: `0 0 60px ${bossChar.color}40`,
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'bounceIn 0.5s' }}>
                        {bossChar.avatar || boss.icon}
                    </div>
                    <h2 style={{
                        fontSize: '2rem',
                        color: bossChar.color,
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        {bossChar.name || boss.title}
                    </h2>
                    <div style={{ color: '#fca5a5', marginBottom: '1rem' }}>
                        {bossChar.title}
                    </div>
                    <p style={{
                        color: '#e2e8f0',
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                        marginBottom: '2rem'
                    }}>
                        "{bossChar.dialogues?.intro || 'Prepare yourself for battle!'}"
                    </p>

                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <span style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                            ⚔️ Specialty: <strong>{bossChar.specialty}</strong>
                        </span>
                    </div>

                    <button
                        onClick={() => setShowBossIntro(false)}
                        style={{
                            padding: '1rem 3rem',
                            background: `linear-gradient(135deg, ${bossChar.color}, ${bossChar.color}cc)`,
                            color: 'white',
                            borderRadius: '50px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            animation: 'pulse 2s infinite'
                        }}
                    >
                        ⚔️ BEGIN BATTLE ⚔️
                    </button>
                </div>
            </div>
        );
    }

    // Victory Screen
    if (showVictory) {
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(34,197,94,0.2), rgba(15,10,30,1))',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: '2px solid #4ade80',
                    boxShadow: '0 0 60px rgba(74,222,128,0.3)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                    <h2 style={{
                        fontSize: '2rem',
                        color: '#4ade80',
                        marginBottom: '1rem'
                    }}>
                        VICTORY!
                    </h2>
                    <p style={{
                        color: '#e2e8f0',
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        marginBottom: '1rem'
                    }}>
                        "{bossChar.dialogues?.victory || 'You have defeated me...'}"
                    </p>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>
                        {bossChar.avatar}
                    </div>
                    <p style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        +{boss.xpReward} XP
                    </p>
                </div>
            </div>
        );
    }

    // Defeat Screen
    if (showDefeat) {
        return (
            <div className="animate-fade-in" style={{
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'linear-gradient(145deg, rgba(239,68,68,0.2), rgba(15,10,30,1))',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    border: '2px solid #ef4444',
                    boxShadow: '0 0 60px rgba(239,68,68,0.3)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💀</div>
                    <h2 style={{
                        fontSize: '2rem',
                        color: '#ef4444',
                        marginBottom: '1rem'
                    }}>
                        DEFEATED
                    </h2>
                    <p style={{
                        color: '#e2e8f0',
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        marginBottom: '1.5rem'
                    }}>
                        "{bossChar.dialogues?.defeat || 'You were no match for me!'}"
                    </p>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                        {bossChar.avatar}
                    </div>
                    <button
                        onClick={onDefeat}
                        style={{
                            padding: '1rem 2rem',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#e2e8f0',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="boss-container animate-fade-in" style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>

            {/* HUD with Boss Phase */}
            <div style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{bossChar.avatar || boss.icon}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ color: bossChar.color, fontWeight: 'bold' }}>{bossChar.name}</span>
                            <span style={{
                                color: '#fbbf24',
                                fontSize: '0.85rem',
                                background: 'rgba(251,191,36,0.2)',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '10px'
                            }}>
                                {bossChar.phases?.[bossPhase] || `Phase ${bossPhase + 1}`}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: '#94a3b8' }}>AUDIT INTEGRITY</span>
                            <span style={{ color: hp > 50 ? '#4ade80' : '#ef4444' }}>{hp}%</span>
                        </div>
                    </div>
                </div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${hp}%`,
                        background: hp > 50 ? 'linear-gradient(90deg, #22c55e, #4ade80)' : 'linear-gradient(90deg, #b91c1c, #ef4444)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            {/* Stage Content */}
            <div style={{
                background: 'rgba(30,27,50,0.85)',
                border: `1px solid ${bossChar.color}40`,
                borderRadius: '16px',
                padding: '2rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>

                {/* DIALOGUE STAGE */}
                {currentStage.type === 'dialogue' && (
                    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{bossChar.avatar}</div>
                        <h3 style={{ color: bossChar.color, marginBottom: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {currentStage.speaker || bossChar.name}
                        </h3>
                        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '2rem', fontStyle: 'italic', color: '#e2e8f0' }}>
                            "{currentStage.text}"
                        </p>
                        <button
                            onClick={handleNext}
                            style={{ padding: '1rem 3rem', background: bossChar.color, color: 'white', fontWeight: 'bold', borderRadius: '50px', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}
                        >
                            Continue →
                        </button>
                    </div>
                )}

                {/* QUESTION STAGE */}
                {currentStage.type === 'question' && (
                    <div className="animate-fade-in">
                        {/* Boss taunt based on phase */}
                        {!showFeedback && (
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                color: bossChar.color,
                                fontStyle: 'italic',
                                fontSize: '0.95rem'
                            }}>
                                {bossChar.dialogues?.[`phase${bossPhase + 1}`] || '...'}
                            </div>
                        )}

                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', textAlign: 'center' }}>{currentStage.prompt}</h3>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {currentStage.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(opt)}
                                    disabled={showFeedback !== null}
                                    style={{
                                        padding: '1.2rem',
                                        background: showFeedback && opt.correct ? 'rgba(34,197,94,0.2)' : showFeedback && !opt.correct && showFeedback.text === opt.feedback ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                                        border: showFeedback && opt.correct ? '2px solid #22c55e' : '2px solid transparent',
                                        borderRadius: '12px',
                                        color: 'white',
                                        textAlign: 'left',
                                        fontSize: '1.1rem',
                                        cursor: showFeedback ? 'default' : 'pointer'
                                    }}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>

                        {showFeedback && (
                            <div className="animate-fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <p style={{
                                    color: showFeedback.correct ? '#4ade80' : '#ef4444',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1rem'
                                }}>
                                    {showFeedback.text}
                                </p>
                                {hp > 0 && (
                                    <button
                                        onClick={handleNext}
                                        style={{ padding: '0.8rem 2rem', background: 'white', color: 'black', fontWeight: 'bold', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
                                    >
                                        {isLastStage ? 'Claim Victory' : 'Next Stage →'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
