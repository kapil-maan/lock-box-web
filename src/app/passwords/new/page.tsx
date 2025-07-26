// src/app/passwords/new/page.tsx
'use client';

import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

export default function NewPasswordPage() {
    const router = useRouter();

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
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        mt: 4
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField label="Account Name" variant="outlined" fullWidth />
                    <TextField label="User Name" variant="outlined" fullWidth />
                    <TextField label="Password" type="password" variant="outlined" fullWidth />
                    <TextField label="Remarks" variant="outlined" fullWidth multiline rows={4} />

                    <Button variant="contained" size="large" sx={{ mt: 2, py: 1.5 }}>
                        Save
                    </Button>
                </Box>
            </Container>
        </>
    );
}