'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemButton, ListItemText, Switch, Button, Divider } from '@mui/material';

export default function SettingsPage() {
    const [askPinEverytime, setAskPinEverytime] = useState(true);
    const [allowDelete, setAllowDelete] = useState(false);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Settings
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: '8px', padding: 0 }}>
                <ListItem>
                    <ListItemText primary="Use Dark Mode" />
                    <Switch edge="end" checked={true} disabled />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Ask PIN everytime" />
                    <Switch
                        edge="end"
                        onChange={() => setAskPinEverytime(!askPinEverytime)}
                        checked={askPinEverytime}
                    />
                </ListItem>
                <Divider component="li" />
                <ListItem>
                    <ListItemText primary="Allow password delete" />
                    <Switch
                        edge="end"
                        onChange={() => setAllowDelete(!allowDelete)}
                        checked={allowDelete}
                    />
                </ListItem>
                <Divider component="li" />
                {/* Corrected clickable list items below */}
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="About this App" />
                    </ListItemButton>
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary="App's Info" />
                    </ListItemButton>
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                    <ListItemButton>
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