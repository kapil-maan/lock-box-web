// src/app/(main)/layout.tsx
'use client';

import { Box, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { PasswordProvider } from '@/contexts/PasswordContext';

const navPaths = ['/passwords', '/settings'];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeValue = navPaths.indexOf(pathname);

  return (
    <PasswordProvider>
        <Box sx={{ pb: 7 }}>
        {children}
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
            showLabels
            value={activeValue}
            onChange={(event, newValue) => {
                router.push(navPaths[newValue]);
            }}
            >
            <BottomNavigationAction label="Passwords" icon={<VpnKeyIcon />} />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
            </BottomNavigation>
        </Paper>
        </Box>
    </PasswordProvider>
  );
}