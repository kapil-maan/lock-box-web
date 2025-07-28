'use client';

import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PasswordEntry } from "@/contexts/PasswordContext";

type FormData = Omit<PasswordEntry, 'id'>;

interface PasswordFormProps {
    initialData?: FormData;
    onSubmit: (data: FormData) => void;
    isEditing?: boolean;
}

export default function PasswordForm({ initialData, onSubmit, isEditing = false }: PasswordFormProps) {
    const [formData, setFormData] = useState<FormData>({
        account: '',
        username: '',
        password: '',
        remarks: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formData.account) {
            alert('Account Name is required.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                mt: 4
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label="Account Name"
                variant="outlined"
                fullWidth
                required
                name="account"
                value={formData.account}
                onChange={handleChange}
            />
            <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                label="Remarks"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
            />

            <Button type="submit" variant="contained" size="large" sx={{ mt: 2, py: 1.5 }}>
                {isEditing ? 'Update Password' : 'Save Password'}
            </Button>
        </Box>
    );
}