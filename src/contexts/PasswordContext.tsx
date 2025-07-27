// src/contexts/PasswordContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; // We need a library to create unique IDs

// First, install the uuid library by running: npm install uuid @types/uuid
// It's used to give each new password a unique ID.

export type PasswordEntry = {
    id: string;
    account: string;
    username: string;
    password?: string;
    remarks?: string;
};

// Initial mock data
const initialPasswords: PasswordEntry[] = [
    { id: '1', account: 'okpass', username: 'kapil', password: '1231', remarks: 'Main account for testing' },
    { id: '2', account: 'newway', username: 'kapil', password: 'password123', remarks: '' },
];

// Define what our context will provide
interface PasswordContextType {
    passwords: PasswordEntry[];
    addPassword: (data: Omit<PasswordEntry, 'id'>) => void;
}

// Create the context with a default value
const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

// Create the Provider component
export const PasswordProvider = ({ children }: { children: ReactNode }) => {
    const [passwords, setPasswords] = useState<PasswordEntry[]>(initialPasswords);

    const addPassword = (data: Omit<PasswordEntry, 'id'>) => {
        const newPassword = { id: uuidv4(), ...data };
        // Add the new password to the beginning of the array
        setPasswords([newPassword, ...passwords]);
    };

    return (
        <PasswordContext.Provider value={{ passwords, addPassword }}>
            {children}
        </PasswordContext.Provider>
    );
};

// Create a custom hook to easily use the context
export const usePasswords = () => {
    const context = useContext(PasswordContext);
    if (context === undefined) {
        throw new Error('usePasswords must be used within a PasswordProvider');
    }
    return context;
};