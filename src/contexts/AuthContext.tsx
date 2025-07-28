'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as bcrypt from 'bcryptjs';
import { useSettings } from './SettingsContext';

const MASTER_PASSWORD_KEY = 'masterPasswordHash';

interface AuthContextType {
    isUnlocked: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
    isPasswordSet: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isPasswordSet, setIsPasswordSet] = useState(false);
    const settings = useSettings();

    // Check on load if a password is set and if the session is still active
    useEffect(() => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);
        setIsPasswordSet(!!hash);

        // Logic for "Ask PIN everytime"
        if (!settings?.askPinEverytime) {
            const sessionActive = sessionStorage.getItem('sessionActive') === 'true';
            if (sessionActive) {
                setIsUnlocked(true);
            }
        }
    }, [settings?.askPinEverytime]);

    const login = async (password: string): Promise<boolean> => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);

        if (hash) { // Returning user
            const isMatch = await bcrypt.compare(password, hash);
            if (isMatch) {
                setIsUnlocked(true);
                if (!settings.askPinEverytime) {
                    sessionStorage.setItem('sessionActive', 'true');
                }
                return true;
            }
            return false;
        } else { // First-time user
            const newHash = await bcrypt.hash(password, 10); // Hash with a salt round of 10
            localStorage.setItem(MASTER_PASSWORD_KEY, newHash);
            setIsPasswordSet(true);
            setIsUnlocked(true);
            if (!settings.askPinEverytime) {
                sessionStorage.setItem('sessionActive', 'true');
            }
            return true;
        }
    };

    const logout = () => {
        setIsUnlocked(false);
        sessionStorage.removeItem('sessionActive');
    };

    return (
        <AuthContext.Provider value={{ isUnlocked, login, logout, isPasswordSet }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};