// src/app/passwords/page.tsx
'use client';

import { Box, Container, Fab, List, ListItem, ListItemButton, ListItemText, Typography, TextField, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

// Mock data, we will replace this with real data from localStorage later
const mockPasswords = [
    { id: '1', account: 'okpass', username: 'kapil' },
    { id: '2', account: 'newway', username: 'kapil' },
    { id: '3', account: 'Hi Kapil Hacker', username: 'your account has been hacked' },
    { id: '4', account: 'hello', username: 'we' },
];

export default function PasswordsPage() {
    const router = useRouter();

    return (
        <Container>
            <Box sx={{ my: 2 }}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Search passwords..."
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
                {mockPasswords.map((p) => (
                    <ListItem key={p.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton sx={{ bgcolor: 'background.paper', borderRadius: '8px' }}>
                            <ListItemText 
                                primary={<Typography variant="h6">{p.account}</Typography>} 
                                secondary={p.username} 
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

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