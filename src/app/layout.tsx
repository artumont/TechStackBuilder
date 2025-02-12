import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/theme';
import "./globals.css";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Tech Stack Builder",
    description: "Build and share your tech stack",
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/assets/favicon-light.ico',
                href: '/assets/favicon-light.ico',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/assets/favicon-dark.ico',
                href: '/assets/favicon-dark.ico',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${nunito.variable} antialiased`}
            >
                <ThemeProvider 
                    attribute="class"
                    defaultTheme="system"
                    enableSystem={true}
                    storageKey="theme"
                >
                    {children}
                    <ThemeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}
