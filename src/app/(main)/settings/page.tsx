'use client';

import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemButton, ListItemText, Switch, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext'; // We still need useAuth

export default function SettingsPage() {
    const { 
        themeMode, 
        toggleTheme, 
        askPinEverytime, 
        setAskPinEverytime, 
        allowPasswordDelete, 
        setAllowPasswordDelete 
    } = useSettings();
    
    // --- THIS IS THE FIX ---
    // We get the whole auth object instead of just the logout function.
    const auth = useAuth();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: '8px', padding: 0 }}>
                {/* ... The ListItems for settings remain the same ... */}
                <ListItem>
                    <ListItemText primary="Use Dark Mode" />
                    <Switch
                        edge="end"
                        onChange={toggleTheme}
                        checked={themeMode === 'dark'}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Ask PIN everytime" />
                    <Switch
                        edge="end"
                        onChange={(e) => setAskPinEverytime(e.target.checked)}
                        checked={askPinEverytime}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText id="switch-list-label-allow-delete" primary="Allow password delete" />
                    <Switch
                        edge="end"
                        onChange={(e) => setAllowPasswordDelete(e.target.checked)}
                        checked={allowPasswordDelete}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/about">
                        <ListItemText primary="About this App" />
                    </ListItemButton>
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/info">
                        <ListItemText primary="App's Info" />
                    </ListItemButton>
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton component={Link} href="/privacy">
                        <ListItemText primary="Privacy Policy" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                {/* We now call auth.logout() directly */}
                <Button onClick={() => auth.logout()} variant="outlined" color="primary" sx={{ width: '100%', py: 1.5 }}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
}