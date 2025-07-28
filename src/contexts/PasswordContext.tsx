'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type PasswordEntry = {
    id: string;
    account: string;
    username: string;
    password?: string;
    remarks?: string;
};

const initialPasswords: PasswordEntry[] = [
    { id: '1', account: 'okpass', username: 'kapil', password: '1231', remarks: 'Main account for testing' },
    { id: '2', account: 'newway', username: 'kapil', password: 'password123', remarks: '' },
];

interface PasswordContextType {
    passwords: PasswordEntry[];
    addPassword: (data: Omit<PasswordEntry, 'id'>) => void;
    deletePassword: (id: string) => void; // <-- Add delete function type
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider = ({ children }: { children: ReactNode }) => {
    const [passwords, setPasswords] = useState<PasswordEntry[]>(initialPasswords);

    const addPassword = (data: Omit<PasswordEntry, 'id'>) => {
        const newPassword = { id: uuidv4(), ...data };
        setPasswords([newPassword, ...passwords]);
    };

    // --- NEW DELETE FUNCTION ---
    const deletePassword = (id: string) => {
        setPasswords(currentPasswords => 
            currentPasswords.filter(password => password.id !== id)
        );
    };

    return (
        <PasswordContext.Provider value={{ passwords, addPassword, deletePassword }}>
            {children}
        </PasswordContext.Provider>
    );
};

export const usePasswords = () => {
    const context = useContext(PasswordContext);
    if (context === undefined) {
        throw new Error('usePasswords must be used within a PasswordProvider');
    }
    return context;
};