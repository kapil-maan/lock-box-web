'use client';

import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemButton, ListItemText, Switch, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingsPage() {
    const { 
        themeMode, 
        toggleTheme, 
        askPinEverytime, 
        setAskPinEverytime, 
        allowPasswordDelete, 
        setAllowPasswordDelete 
    } = useSettings();

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: '8px', padding: 0 }}>
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
                {/* Updated to use Next.js Link for navigation */}
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
                <Button variant="outlined" color="primary" sx={{ width: '100%', py: 1.5 }}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
}