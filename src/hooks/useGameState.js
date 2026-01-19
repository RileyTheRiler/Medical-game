import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'coderx-cpc-v2';

const INITIAL_STATE = {
    xp: 0,
    correct: 0,
    total: 0,
    completed: [],
    unlocked: [1],
    claimsDaysCompleted: []  // Track completed claims desk days
};

export function useGameState() {
    const [stats, setStats] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Ensure claimsDaysCompleted exists for backwards compatibility
                return { ...INITIAL_STATE, ...parsed, claimsDaysCompleted: parsed.claimsDaysCompleted || [] };
            }
            return INITIAL_STATE;
        } catch (e) {
            console.error('Failed to load save state', e);
            return INITIAL_STATE;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }, [stats]);

    const addXp = useCallback((amount) => {
        setStats(prev => ({ ...prev, xp: prev.xp + amount }));
    }, []);

    const recordAnswer = useCallback((isCorrect) => {
        setStats(prev => ({
            ...prev,
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));
    }, []);

    const completeChapter = useCallback((chapterId, totalChapters) => {
        setStats(prev => {
            const newCompleted = prev.completed.includes(chapterId)
                ? prev.completed
                : [...prev.completed, chapterId];

            const nextChapterId = chapterId + 1;
            const newUnlocked = (prev.unlocked.includes(nextChapterId) || chapterId >= totalChapters)
                ? prev.unlocked
                : [...prev.unlocked, nextChapterId];

            return {
                ...prev,
                xp: prev.xp + 100, // Chapter completion bonus
                completed: newCompleted,
                unlocked: newUnlocked
            };
        });
    }, []);

    const completeClaimsDay = useCallback((day) => {
        setStats(prev => {
            if (prev.claimsDaysCompleted.includes(day)) {
                return prev;
            }
            return {
                ...prev,
                claimsDaysCompleted: [...prev.claimsDaysCompleted, day]
            };
        });
    }, []);

    return {
        stats,
        addXp,
        recordAnswer,
        completeChapter,
        completeClaimsDay
    };
}
