'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { useSettings } from './SettingsContext';

// Define keys for storage
const MASTER_PASSWORD_KEY = 'masterPasswordHash';
const PASSWORDS_STORAGE_KEY = 'lockBoxPasswords';
const SESSION_KEY = 'lockBoxSessionKey'; // For sessionStorage

export type PasswordEntry = {
    id: string;
    account: string;
    username: string;
    password?: string;
    remarks?: string;
};

interface AuthContextType {
    isUnlocked: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
    isPasswordSet: boolean;
    passwords: PasswordEntry[];
    addPassword: (data: Omit<PasswordEntry, 'id'>) => void;
    deletePassword: (id: string) => void;
    updatePassword: (id: string, data: Omit<PasswordEntry, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isPasswordSet, setIsPasswordSet] = useState(false);
    const [masterKey, setMasterKey] = useState<string | null>(null);
    const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
    const settings = useSettings();

    // This effect now ONLY checks for a master password's existence on initial load.
    useEffect(() => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);
        setIsPasswordSet(!!hash);
    }, []);
    
    // This new effect attempts to auto-login from the session key when the app loads.
    useEffect(() => {
        // This check prevents the effect from running until the settings have loaded.
        if (settings) {
            const sessionKey = sessionStorage.getItem(SESSION_KEY);
            // If there's a key and the setting is off, try to log in with it.
            if (sessionKey && !settings.askPinEverytime && !isUnlocked) {
                login(sessionKey);
            }
        }
    }, [settings]); // Re-run when settings are loaded

    // This effect encrypts and saves the password list whenever it changes.
    useEffect(() => {
        if (isUnlocked && masterKey) {
            try {
                const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(passwords), masterKey).toString();
                localStorage.setItem(PASSWORDS_STORAGE_KEY, encryptedData);
            } catch (error) {
                console.error("Failed to encrypt and save passwords", error);
            }
        }
    }, [passwords, isUnlocked, masterKey]);

    const login = async (password: string): Promise<boolean> => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);

        const handleSuccessfulLogin = (plainTextPassword: string) => {
            setMasterKey(plainTextPassword); // Hold the key in state
            setIsUnlocked(true);
            
            // If "Ask PIN everytime" is OFF, save the master password to sessionStorage.
            if (settings && !settings.askPinEverytime) {
                sessionStorage.setItem(SESSION_KEY, plainTextPassword);
            }
            
            // Decrypt and load the password list
            try {
                const encryptedData = localStorage.getItem(PASSWORDS_STORAGE_KEY);
                if (encryptedData) {
                    const bytes = CryptoJS.AES.decrypt(encryptedData, plainTextPassword);
                    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    setPasswords(decryptedData);
                }
            } catch (error) {
                console.error("Failed to decrypt passwords. Wrong key or corrupted data.", error);
                setPasswords([]);
            }
        };

        if (hash) { // Returning user
            const isMatch = await bcrypt.compare(password, hash);
            if (isMatch) {
                handleSuccessfulLogin(password);
                return true;
            }
            return false;
        } else { // First-time user
            const newHash = await bcrypt.hash(password, 10);
            localStorage.setItem(MASTER_PASSWORD_KEY, newHash);
            setIsPasswordSet(true);
            handleSuccessfulLogin(password);
            return true;
        }
    };

    const logout = () => {
        setIsUnlocked(false);
        setMasterKey(null);
        setPasswords([]);
        sessionStorage.removeItem(SESSION_KEY); // Clear the session key on logout
    };

    // --- Password modification functions ---
    const addPassword = (data: Omit<PasswordEntry, 'id'>) => {
        setPasswords(current => [newPassword, ...current]);
        const newPassword = { id: uuidv4(), ...data };
    };
    const deletePassword = (id: string) => {
        setPasswords(current => current.filter(p => p.id !== id));
    };
    const updatePassword = (id: string, data: Omit<PasswordEntry, 'id'>) => {
        setPasswords(current => current.map(p => p.id === id ? { ...p, ...data } : p));
    };

    return (
        <AuthContext.Provider value={{
            isUnlocked, login, logout, isPasswordSet,
            passwords, addPassword, deletePassword, updatePassword
        }}>
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