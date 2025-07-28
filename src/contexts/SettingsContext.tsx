'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type ThemeMode = 'light' | 'dark';

interface SettingsContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
    // Add new states
    askPinEverytime: boolean;
    setAskPinEverytime: (value: boolean) => void;
    allowPasswordDelete: boolean;
    setAllowPasswordDelete: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
    // Add state for the new settings
    const [askPinEverytime, setAskPinEverytime] = useState<boolean>(true);
    const [allowPasswordDelete, setAllowPasswordDelete] = useState<boolean>(false);

    // This useEffect handles loading ALL settings from localStorage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
        if (savedMode) setThemeMode(savedMode);

        const savedPin = localStorage.getItem('askPinEverytime');
        if (savedPin) setAskPinEverytime(JSON.parse(savedPin));

        const savedDelete = localStorage.getItem('allowPasswordDelete');
        if (savedDelete) setAllowPasswordDelete(JSON.parse(savedDelete));
    }, []);

    const toggleTheme = () => {
        setThemeMode(prevMode => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    // Create setter functions that also persist to localStorage
    const handleSetAskPin = (value: boolean) => {
        setAskPinEverytime(value);
        localStorage.setItem('askPinEverytime', JSON.stringify(value));
    };

    const handleSetAllowDelete = (value: boolean) => {
        setAllowPasswordDelete(value);
        localStorage.setItem('allowPasswordDelete', JSON.stringify(value));
    };
    
    const value = useMemo(() => ({
        themeMode,
        toggleTheme,
        askPinEverytime,
        setAskPinEverytime: handleSetAskPin,
        allowPasswordDelete,
        setAllowPasswordDelete: handleSetAllowDelete,
    }), [themeMode, askPinEverytime, allowPasswordDelete]);

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