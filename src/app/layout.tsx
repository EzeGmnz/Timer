import { theme } from '@/theme';
import { ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Timer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' style={{ height: '100%' }}>
            <ThemeProvider theme={theme}>
                <body className={inter.className}>{children}</body>
            </ThemeProvider>
        </html>
    );
}
