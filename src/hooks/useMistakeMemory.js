/**
 * useMistakeMemory Hook
 * Tracks player mistakes persistently for character reminders
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'claimsDeskMistakes';

export default function useMistakeMemory() {
    const [mistakes, setMistakes] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    });

    // Persist to localStorage whenever mistakes change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
        } catch (e) {
            console.warn('Could not save mistakes to localStorage:', e);
        }
    }, [mistakes]);

    // Add a new mistake
    const addMistake = useCallback((mistakeType, claimId, day, code = null) => {
        setMistakes(prev => {
            const existing = prev[mistakeType] || { count: 0, history: [] };
            return {
                ...prev,
                [mistakeType]: {
                    count: existing.count + 1,
                    lastClaim: claimId,
                    lastDay: day,
                    lastCode: code,
                    lastTime: Date.now(),
                    history: [
                        ...existing.history.slice(-4), // Keep last 5
                        { claimId, day, code, time: Date.now() }
                    ]
                }
            };
        });
    }, []);

    // Get mistake count for a type
    const getMistakeCount = useCallback((mistakeType) => {
        return mistakes[mistakeType]?.count || 0;
    }, [mistakes]);

    // Get total mistakes for a type
    const getTotalMistakeCount = useCallback(() => {
        return Object.values(mistakes).reduce((sum, m) => sum + (m.count || 0), 0);
    }, [mistakes]);

    // Get most recent mistake of a type
    const getLastMistake = useCallback((mistakeType) => {
        return mistakes[mistakeType] || null;
    }, [mistakes]);

    // Get all mistake types the player has made
    const getMistakeTypes = useCallback(() => {
        return Object.keys(mistakes).filter(type => mistakes[type].count > 0);
    }, [mistakes]);

    // Get recent mistakes across all types (for reminders)
    const getRecentMistakes = useCallback((limit = 3) => {
        const allMistakes = [];
        Object.entries(mistakes).forEach(([type, data]) => {
            if (data.lastTime) {
                allMistakes.push({
                    type,
                    ...data
                });
            }
        });
        return allMistakes
            .sort((a, b) => b.lastTime - a.lastTime)
            .slice(0, limit);
    }, [mistakes]);

    // Check if player has made a specific type of mistake
    const hasMadeMistake = useCallback((mistakeType) => {
        return (mistakes[mistakeType]?.count || 0) > 0;
    }, [mistakes]);

    // Clear all mistakes (for testing or reset)
    const clearMistakes = useCallback(() => {
        setMistakes({});
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    // Get a relevant mistake type for current claim (for reminders)
    const getRelevantMistakeFor = useCallback((claimIssues) => {
        if (!claimIssues || claimIssues.length === 0) return null;

        // Find if player has made mistakes related to this claim's issues
        for (const issue of claimIssues) {
            if (hasMadeMistake(issue)) {
                return {
                    type: issue,
                    data: mistakes[issue]
                };
            }
        }
        return null;
    }, [mistakes, hasMadeMistake]);

    return {
        mistakes,
        addMistake,
        getMistakeCount,
        getTotalMistakeCount,
        getLastMistake,
        getMistakeTypes,
        getRecentMistakes,
        hasMadeMistake,
        clearMistakes,
        getRelevantMistakeFor
    };
}
