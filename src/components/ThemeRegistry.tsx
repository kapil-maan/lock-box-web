'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from '../theme/EmotionCache';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { createAppTheme } from '@/theme/theme';

// This new component will be the one that listens for theme changes.
function ThemeDynamicApplicator({ children }: { children: React.ReactNode }) {
  const { themeMode } = useSettings();
  
  // Every time themeMode changes, we create a new theme.
  const theme = React.useMemo(() => createAppTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline is what applies the background color and resets styles. 
          It's crucial that it's re-rendered with the new theme. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

// The main registry now wraps everything in the correct providers.
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <SettingsProvider>
        <ThemeDynamicApplicator>
          {children}
        </ThemeDynamicApplicator>
      </SettingsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}