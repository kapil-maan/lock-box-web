// src/app/passwords/layout.tsx
'use client';

import { Box, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(0);
  const router = useRouter();

  return (
    <Box sx={{ pb: 7 }}>
      {children}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 0) router.push('/passwords');
            if (newValue === 1) router.push('/settings');
          }}
        >
          <BottomNavigationAction label="Passwords" icon={<VpnKeyIcon />} />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}