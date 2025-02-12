import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/theme';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Tech Stack Builder",
    description: "Build and share your technology stack badges for GitHub profiles and portfolios. Easy to use, customizable badge generator.",
    keywords: "tech stack, GitHub badges, shields.io, developer tools, portfolio builder",
    authors: [{ name: "Artu" }],
    creator: "Artu",
    publisher: "Artu",
    robots: "index, follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://techstackbuilder.vercel.app",
        title: "Tech Stack Builder",
        description: "Build and share your technology stack badges for GitHub profiles",
        siteName: "Tech Stack Builder",
        images: [{
            url: "/assets/og-image.png",
            width: 1200,
            height: 630,
            alt: "Tech Stack Builder Preview"
        }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tech Stack Builder",
        description: "Build and share your technology stack badges for GitHub profiles",
        images: ["/assets/og-image.png"],
    },
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
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" }
    ],
    viewport: "width=device-width, initial-scale=1.0",
    category: "technology",
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
                <SpeedInsights/>
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
