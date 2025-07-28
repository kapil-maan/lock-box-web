'use client';

import React, { useState, useEffect } from 'react';
import { 
    Box, Button, Container, TextField, Typography, 
    CircularProgress, InputAdornment, IconButton 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// We no longer need a wrapper component
export default function LoginPage() {
    const router = useRouter();
    const { login, isPasswordSet, isUnlocked } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isUnlocked) {
            router.replace('/passwords');
        }
    }, [isUnlocked, router]);

    const handleConfirm = async () => {
        setLoading(true);
        setError('');
        const success = await login(password);
        if (!success) {
            setError('Incorrect password. Please try again.');
        }
        setLoading(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Return null while redirecting to prevent flash of content
    if (isUnlocked) {
        return null;
    }

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {isPasswordSet ? "Enter Master Password" : "Create Master Password"}
                </Typography>
                {!isPasswordSet && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        This will be used to encrypt and protect your data.
                    </Typography>
                )}
                <TextField
                    margin="normal" required fullWidth name="password" label="Master Password"
                    type={showPassword ? 'text' : 'password'} id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                    disabled={loading}
                    onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    onClick={handleClickShowPassword} 
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2, py: 1.5 }}
                    onClick={handleConfirm} disabled={loading || !password}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}
                </Button>
            </Box>
        </Container>
    );
}