'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import * as bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { useSettings } from './SettingsContext';

const MASTER_PASSWORD_KEY = 'masterPasswordHash';
const PASSWORDS_STORAGE_KEY = 'lockBoxPasswords';
const SESSION_KEY = 'lockBoxSessionKey';

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

    // --- FUNCTION DEFINITIONS MOVED UP AND WRAPPED IN useCallback ---

    const login = useCallback(async (password: string): Promise<boolean> => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);

        const handleSuccessfulLogin = (plainTextPassword: string) => {
            setMasterKey(plainTextPassword);
            setIsUnlocked(true);
            
            if (settings && !settings.askPinEverytime) {
                sessionStorage.setItem(SESSION_KEY, plainTextPassword);
            }
            
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

        if (hash) {
            const isMatch = await bcrypt.compare(password, hash);
            if (isMatch) {
                handleSuccessfulLogin(password);
                return true;
            }
            return false;
        } else {
            const newHash = await bcrypt.hash(password, 10);
            localStorage.setItem(MASTER_PASSWORD_KEY, newHash);
            setIsPasswordSet(true);
            handleSuccessfulLogin(password);
            return true;
        }
    }, [settings]); // login depends on settings

    const logout = useCallback(() => {
        setIsUnlocked(false);
        setMasterKey(null);
        setPasswords([]);
        sessionStorage.removeItem(SESSION_KEY);
    }, []); // logout has no dependencies

    // --- useEffect HOOKS NOW COME AFTER FUNCTION DEFINITIONS ---

    useEffect(() => {
        const hash = localStorage.getItem(MASTER_PASSWORD_KEY);
        setIsPasswordSet(!!hash);
    }, []);
    
    useEffect(() => {
        if (settings) {
            const sessionKey = sessionStorage.getItem(SESSION_KEY);
            if (sessionKey && !settings.askPinEverytime && !isUnlocked) {
                login(sessionKey);
            }
        }
    }, [settings, isUnlocked, login]);

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

    const addPassword = (data: Omit<PasswordEntry, 'id'>) => {
        const newPassword = { id: uuidv4(), ...data };
        setPasswords(current => [newPassword, ...current]);
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