'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    return (
        <button
            className="fixed top-4 right-4 p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? '🌞' : '🌙'}
        </button>
    )
}