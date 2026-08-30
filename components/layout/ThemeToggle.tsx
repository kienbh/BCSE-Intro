'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Đọc từ DOM (đã được themeScript set trước paint) để icon không nháy sai.
    const current = (document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null) ?? 'dark';
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-ink-3 hover:text-ink hover:bg-fill/5 transition-colors"
    >
      {/* Trước khi mounted: giữ ổn định icon Sun (khớp default dark) để không nháy */}
      {!mounted || theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
