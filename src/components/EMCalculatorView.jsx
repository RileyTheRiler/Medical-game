import React, { useState, useEffect } from 'react';

export default function EMCalculatorView({ onMenu }) {
    // MDM Components
    const [problems, setProblems] = useState('minimal'); // minimal, low, moderate, high
    const [data, setData] = useState('minimal'); // minimal, limited, moderate, extensive
    const [risk, setRisk] = useState('minimal'); // minimal, low, moderate, high

    // Helper to determine single element level (0=SF/Min, 1=Low, 2=Mod, 3=High)
    const getLevel = (val) => {
        switch (val) {
            case 'extensive':
            case 'high': return 3;
            case 'moderate': return 2;
            case 'limited':
            case 'low': return 1;
            default: return 0;
        }
    };

    // MDM Calculation Logic
    // MDM requires 2 out of 3 elements to meet or exceed the level
    const mdmLevel = (() => {
        const scores = [getLevel(problems), getLevel(data), getLevel(risk)];
        scores.sort((a, b) => b - a); // Descending: [3, 2, 1] means High, Mod, Low

        // The second highest score determines the overall MDM level because 2/3 must be met
        const levelScore = scores[1];

        switch (levelScore) {
            case 3: return 'High';
            case 2: return 'Moderate';
            case 1: return 'Low';
            default: return 'Straightforward';
        }
    })();

    // Map MDM Level to CPT Codes (New vs Established)
    const getCodes = (level) => {
        switch (level) {
            case 'High': return { new: '99205', est: '99215' };
            case 'Moderate': return { new: '99204', est: '99214' };
            case 'Low': return { new: '99203', est: '99213' };
            default: return { new: '99202', est: '99212' };
        }
    };

    const codes = getCodes(mdmLevel);

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
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}
                >
                    ← Back to Menu
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🧮</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>E/M Level Calculator</span>
                </div>
                <div style={{ width: '80px' }}></div>
            </div>

            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', width: '100%' }}>

                {/* Result Card */}
                <div className="animate-fade-in" style={{
                    background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>MDM Level</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: mdmLevel === 'High' ? '#f472b6' : mdmLevel === 'Moderate' ? '#60a5fa' : mdmLevel === 'Low' ? '#34d399' : '#94a3b8', marginBottom: '1.5rem' }}>
                        {mdmLevel}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>If New Patient</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{codes.new}</div>
                        </div>
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>If Established</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>{codes.est}</div>
                        </div>
                    </div>
                </div>

                {/* Input Sections */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>

                    {/* 1. Number and Complexity of Problems */}
                    <section style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: problems === 'high' ? '1px solid #f472b6' : '1px solid transparent' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>1. Number & Complexity of Problems</span>
                            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Val: {getLevel(problems)}</span>
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            {['minimal', 'low', 'moderate', 'high'].map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setProblems(lvl)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: problems === lvl ? '#f472b6' : 'rgba(255,255,255,0.1)',
                                        background: problems === lvl ? 'rgba(244,114,182,0.2)' : 'transparent',
                                        color: problems === lvl ? '#f472b6' : '#94a3b8',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        fontWeight: problems === lvl ? '600' : '400'
                                    }}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                            {problems === 'minimal' && "1 self-limited or minor problem"}
                            {problems === 'low' && "2+ minor problems OR 1 stable chronic illness OR 1 acute uncomplicated"}
                            {problems === 'moderate' && "1+ chronic w/ exacerbation OR 2+ stable chronic OR 1 new problem w/ uncertain prognosis OR 1 acute with systemic symptoms"}
                            {problems === 'high' && "1+ chronic severe exacerbation OR 1 acute illness with threat to life/function"}
                        </div>
                    </section>

                    {/* 2. Amount and/or Complexity of Data */}
                    <section style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: data === 'extensive' ? '1px solid #60a5fa' : '1px solid transparent' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>2. Amount/Complexity of Data</span>
                            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Val: {getLevel(data)}</span>
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            {['minimal', 'limited', 'moderate', 'extensive'].map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setData(lvl)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: data === lvl ? '#60a5fa' : 'rgba(255,255,255,0.1)',
                                        background: data === lvl ? 'rgba(96,165,250,0.2)' : 'transparent',
                                        color: data === lvl ? '#60a5fa' : '#94a3b8',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        fontWeight: data === lvl ? '600' : '400'
                                    }}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                            {data === 'minimal' && "Minimal or no data reviewed"}
                            {data === 'limited' && "Review of prior external notes AND/OR review of result(s) of each unique test AND/OR ordering of each unique test (Must meet 1 category)"}
                            {data === 'moderate' && "Must meet 1 of 3 categories: (1) Tests/docs (count 3), (2) Indep. interp, (3) Discuss mgmt w/ external provider"}
                            {data === 'extensive' && "Must meet 2 of 3 categories from Moderate level"}
                        </div>
                    </section>

                    {/* 3. Risk of Complications */}
                    <section style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: risk === 'high' ? '1px solid #34d399' : '1px solid transparent' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
                            <span>3. Risk of Complications</span>
                            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Val: {getLevel(risk)}</span>
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            {['minimal', 'low', 'moderate', 'high'].map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setRisk(lvl)}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid',
                                        borderColor: risk === lvl ? '#34d399' : 'rgba(255,255,255,0.1)',
                                        background: risk === lvl ? 'rgba(52,211,153,0.2)' : 'transparent',
                                        color: risk === lvl ? '#34d399' : '#94a3b8',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        fontWeight: risk === lvl ? '600' : '400'
                                    }}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                            {risk === 'minimal' && "Rest, gargles, elastic bandages, superficial dressings"}
                            {risk === 'low' && "OTC drugs, PT/OT, IV fluids w/o additives, minor surgery w/o risk factors"}
                            {risk === 'moderate' && "Prescription drug mgmt, decision for minor surgery w/ risk factors, elective major surgery w/o risk factors"}
                            {risk === 'high' && "Drug therapy requiring intensive monitoring, elective major surgery w/ risk factors, emergency major surgery, decision for hospitalization"}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
