'use client';

import { Box, Button, Container, TextField, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { usePasswords } from '@/contexts/PasswordContext';
import PasswordForm from '@/components/PasswordForm'; // <-- Import reusable form

export default function NewPasswordPage() {
    const router = useRouter();
    const { addPassword } = usePasswords();

    const handleSubmit = (data: Omit<ReturnType<typeof usePasswords>['passwords'][0], 'id'>) => {
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