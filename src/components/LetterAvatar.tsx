'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';

// A simple function to generate a color from a string
function stringToColor(string: string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

interface LetterAvatarProps {
    name: string;
}

export default function LetterAvatar({ name }: LetterAvatarProps) {
    // Find the first letter of the name, or default to '?'
    const firstLetter = name.trim().charAt(0).toUpperCase() || '?';
    
    return (
        <Avatar sx={{ bgcolor: stringToColor(name), width: 40, height: 40 }}>
            {firstLetter}
        </Avatar>
    );
}