import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (đảo theo theme, hỗ trợ opacity qua <alpha-value>).
        // Định nghĩa kênh RGB trong globals.css (:root / [data-theme]).
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          2: 'rgb(var(--surface-2) / <alpha-value>)',
          3: 'rgb(var(--surface-3) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        fill: 'rgb(var(--fill) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          1: 'rgb(var(--ink-1) / <alpha-value>)',
          2: 'rgb(var(--ink-2) / <alpha-value>)',
          3: 'rgb(var(--ink-3) / <alpha-value>)',
          4: 'rgb(var(--ink-4) / <alpha-value>)',
          5: 'rgb(var(--ink-5) / <alpha-value>)',
          6: 'rgb(var(--ink-6) / <alpha-value>)',
          7: 'rgb(var(--ink-7) / <alpha-value>)',
        },
        bcse: {
          primary: '#0ea5e9',
          secondary: '#6366f1',
          accent: '#f59e0b',
          dark: '#0f172a',
          darker: '#020617',
        },
        vju: {
          red: '#dc2626',
          navy: '#1e3a5f',
        },
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'Noto Sans JP', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(14,165,233,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(14,165,233,0.4)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
