'use client';

import { Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import AuthGuard from '@/components/AuthGuard';

const navPaths = ['/passwords', '/settings'];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const activeValue = navPaths.findIndex(path => pathname.startsWith(path));

  return (
    <AuthGuard>
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
    </AuthGuard>
  );
}