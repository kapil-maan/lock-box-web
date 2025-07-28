'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from '../theme/EmotionCache';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext'; // <-- Import AuthProvider
import { createAppTheme } from '@/theme/theme';

function ThemeDynamicApplicator({ children }: { children: React.ReactNode }) {
  const { themeMode } = useSettings();
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <SettingsProvider>
        {/* AuthProvider now wraps the entire app */}
        <AuthProvider>
          <ThemeDynamicApplicator>
            {children}
          </ThemeDynamicApplicator>
        </AuthProvider>
      </SettingsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}