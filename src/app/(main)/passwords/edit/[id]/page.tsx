'use client';

import { Container, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import { usePasswords } from "@/contexts/PasswordContext";
import PasswordForm from "@/components/PasswordForm";

export default function EditPasswordPage() {
    const router = useRouter();
    const params = useParams();
    const { passwords, updatePassword } = usePasswords();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const passwordToEdit = passwords.find(p => p.id === id);

    const handleUpdate = (data: Omit<typeof passwordToEdit, 'id'>) => {
        if (id) {
            updatePassword(id, data);
            router.push('/passwords');
        }
    };
    
    if (!passwordToEdit) {
        return (
            <Container>
                <Typography sx={{mt: 4}}>Password not found.</Typography>
            </Container>
        )
    }

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => router.back()} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
                        Edit Password
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <PasswordForm 
                    initialData={passwordToEdit} 
                    onSubmit={handleUpdate} 
                    isEditing={true} 
                />
            </Container>
        </>
    );
}