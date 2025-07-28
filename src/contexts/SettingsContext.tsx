'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type ThemeMode = 'light' | 'dark';

interface SettingsContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
    // ... other settings can be added back here later if needed
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    // Start with a default theme, and we'll load the saved one immediately on the client.
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark'); 

    // This useEffect runs only on the client, after the initial render.
    // It safely loads the user's preference from localStorage.
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
        if (savedMode) {
            setThemeMode(savedMode);
        }
    }, []);

    const toggleTheme = () => {
        setThemeMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            // Persist the new theme to localStorage
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };
    
    // useMemo helps prevent unnecessary re-renders
    const value = useMemo(() => ({
        themeMode,
        toggleTheme,
    }), [themeMode]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};