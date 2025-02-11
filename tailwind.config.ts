import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#050505',
          secondary: '#1a1a1a'
        },
        light: {
          DEFAULT: '#e2e2e2',
          secondary: '#c1c1c1'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
