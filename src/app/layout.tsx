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
