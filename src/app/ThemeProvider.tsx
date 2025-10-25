"use client";
import { useEffect, useState } from 'react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'green' | 'amber'>('green');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('ibm5100-theme') as 'green' | 'amber' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ibm5100-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Handle F1 key for theme toggle
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        setTheme(prev => prev === 'green' ? 'amber' : 'green');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return <>{children}</>;
}
