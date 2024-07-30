'use client';

import { createTheme } from '@mui/material';

import { Open_Sans } from 'next/font/google';

export const openSans = Open_Sans({
    subsets: ['latin'],
    preload: false,
});

const pallete = {
    typography: {
        fontFamily: openSans.style.fontFamily,
        h1: {
            fontFamily: openSans.style.fontFamily,
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        h2: {
            fontFamily: openSans.style.fontFamily,
            fontSize: '2rem',
            fontWeight: 400,
        },
        h3: {
            fontFamily: openSans.style.fontFamily,
            fontSize: '1.5rem',
            fontWeight: 400,
        },
        h4: {
            fontFamily: openSans.style.fontFamily,
            fontSize: '1.1rem',
            fontWeight: 400,
        },
    },
    borderRadius: 16,
    appBarHeight: '64px',
    bannerHeight: '80px',
    palette: {
        mode: 'dark',
        primary: {
            main: '#F8F8F8',
            light: '#FFFFFF',
            dark: '#CCCCCC',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
            '1': '#1E1E1E',
            '2': '#2A2A2A',
            '-1': '#0D0D0D',
            '-2': '#080808',
        },
        success: {
            main: '#28A745',
        },
        info: {
            main: '#17A2B8',
        },
    },
};

export const theme = createTheme(pallete as any);
