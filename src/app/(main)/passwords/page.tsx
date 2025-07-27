// src/app/(main)/passwords/page.tsx
'use client';

import React, { useState } from 'react';
import { 
    Box, Container, Fab, List, ListItem, ListItemButton, ListItemText, Typography, 
    TextField, InputAdornment, Dialog, DialogTitle, DialogContent, IconButton, 
    Stack, DialogActions, Button 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from 'next/navigation';
import { usePasswords, PasswordEntry } from '@/contexts/PasswordContext';

// Helper component to avoid repetition in the dialog
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


export default function PasswordsPage() {
    const router = useRouter();
    const { passwords } = usePasswords(); // Get passwords from the context
    const [selectedPassword, setSelectedPassword] = useState<PasswordEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenDialog = (password: PasswordEntry) => {
        setSelectedPassword(password);
    };

    const handleCloseDialog = () => {
        setSelectedPassword(null);
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: Add a snackbar here to show "Copied!"
    };

    // Use the passwords from context for filtering
    const filteredPasswords = passwords.filter(p => 
        p.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            {/* Search Box */}
            <Box sx={{ my: 2 }}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Search passwords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {/* Password List */}
            <List>
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
                        {searchQuery ? "No matching passwords found." : "No passwords yet. Click '+' to add one!"}
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