'use client';

import { Container, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';
import { useAuth, PasswordEntry } from "@/contexts/AuthContext";
import PasswordForm from "@/components/PasswordForm";

// This new function tells Next.js how to handle this dynamic page during a static build.
// By returning an empty array, we are saying "don't pre-build any pages, this route is fully dynamic".
export async function generateStaticParams() {
  return [];
}

export default function EditPasswordPage() {
    const router = useRouter();
    const params = useParams();
    const { passwords, updatePassword } = useAuth();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const passwordToEdit = passwords.find(p => p.id === id);

    const handleUpdate = (data: Omit<PasswordEntry, 'id'>) => {
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