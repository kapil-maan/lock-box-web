// src/app/(main)/passwords/page.tsx
'use client';

import React, { useState } from 'react';
import { Box, Container, Fab, List, ListItem, ListItemButton, ListItemText, Typography, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, IconButton, Stack, DialogActions, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/navigation';

// Define the type for our password entries
type PasswordEntry = {
    id: string;
    account: string;
    username: string;
    password?: string;
    remarks?: string;
};

// Mock data with more details
const mockPasswords: PasswordEntry[] = [
    { id: '1', account: 'okpass', username: 'kapil', password: '1231', remarks: 'Main account for testing' },
    { id: '2', account: 'newway', username: 'kapil', password: 'password123', remarks: '' },
    { id: '3', account: 'Hi Kapil Hacker', username: 'your account has been hacked', password: 'hacked_password', remarks: 'This is a test entry with a long name.' },
    { id: '4', account: 'hello', username: 'we', password: 'wearethechampions', remarks: 'Another test entry.' },
];


export default function PasswordsPage() {
    const router = useRouter();
    const [selectedPassword, setSelectedPassword] = useState<PasswordEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    const handleOpenDialog = (password: PasswordEntry) => {
        setSelectedPassword(password);
    };

    const handleCloseDialog = () => {
        setSelectedPassword(null);
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Filter passwords based on the search query
    const filteredPasswords = mockPasswords.filter(p => 
        p.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Search passwords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            <List>
                {/* Map over the FILTERED list */}
                {filteredPasswords.length > 0 ? (
                    filteredPasswords.map((p) => (
                        <ListItem key={p.id} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton onClick={() => handleOpenDialog(p)} sx={{ bgcolor: 'background.paper', borderRadius: '8px' }}>
                                <ListItemText 
                                    primary={<Typography variant="h6">{p.account}</Typography>} 
                                    secondary={p.username} 
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                        No matching passwords found.
                    </Typography>
                )}
            </List>

            {/* Detail Dialog */}
            <Dialog open={!!selectedPassword} onClose={handleCloseDialog} fullWidth maxWidth="xs">
                <DialogTitle>
                    Account Details
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedPassword && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <DetailField label="Account" value={selectedPassword.account} onCopy={handleCopyToClipboard} />
                            <DetailField label="Username" value={selectedPassword.username} onCopy={handleCopyToClipboard} />
                            <DetailField label="Password" value={selectedPassword.password || ''} onCopy={handleCopyToClipboard} />
                            <DetailField label="Remarks" value={selectedPassword.remarks || 'No remarks.'} onCopy={handleCopyToClipboard} isRemark={true}/>
                        </Stack>
                    )}
                </DialogContent>
                 <DialogActions>
                    <Button onClick={handleCloseDialog}>Delete</Button>
                    <Button onClick={handleCloseDialog} variant="contained">Edit</Button>
                </DialogActions>
            </Dialog>

            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{ position: 'fixed', bottom: 80, right: 24 }}
                onClick={() => router.push('/passwords/new')}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
}

// A helper component to avoid repetition in the dialog
interface DetailFieldProps {
    label: string;
    value: string;
    onCopy: (text: string) => void;
    isRemark?: boolean;
}

function DetailField({ label, value, onCopy, isRemark = false }: DetailFieldProps) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ flexGrow: 1, whiteSpace: isRemark ? 'pre-wrap' : 'normal' }}>{value}</Typography>
                {!isRemark &&
                    <IconButton size="small" onClick={() => onCopy(value)}>
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                }
            </Box>
        </Box>
    );
}