 'use client';

import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { usePasswords } from '@/contexts/PasswordContext'; // <-- Import our custom hook

export default function NewPasswordPage() {
    const router = useRouter();
    const { addPassword } = usePasswords(); // <-- Get the addPassword function from context

    // State for each form field
    const [account, setAccount] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!account) { // Simple validation
            alert('Account Name is required.');
            return;
        }
        
        // Call the function from our context
        addPassword({ account, username, password, remarks });

        // Go back to the passwords list
        router.push('/passwords');
    };

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => router.back()} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
                        Add New Password
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit} // <-- Add the submit handler
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        mt: 4
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        label="Account Name" 
                        variant="outlined" 
                        fullWidth 
                        required
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                    <TextField 
                        label="User Name" 
                        variant="outlined" 
                        fullWidth 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField 
                        label="Password" 
                        type="password" 
                        variant="outlined" 
                        fullWidth 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField 
                        label="Remarks" 
                        variant="outlined" 
                        fullWidth 
                        multiline 
                        rows={4} 
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    />

                    <Button type="submit" variant="contained" size="large" sx={{ mt: 2, py: 1.5 }}>
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
}