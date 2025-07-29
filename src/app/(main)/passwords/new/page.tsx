'use client';

import { Container, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useAuth, PasswordEntry } from '@/contexts/AuthContext';
import PasswordForm from '@/components/PasswordForm';

export default function NewPasswordPage() {
    const router = useRouter();
    const { addPassword } = useAuth();

    // The type for 'data' is now much cleaner
    const handleSubmit = (data: Omit<PasswordEntry, 'id'>) => {
        addPassword(data);
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
                <PasswordForm onSubmit={handleSubmit} />
            </Container>
        </>
    );
}