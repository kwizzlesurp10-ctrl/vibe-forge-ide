'use client';

import { Palette } from 'lucide-react';
import { THEMES } from '@/lib/themes';
import { useThemeStore } from '@/lib/store/themeStore';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-1">
      <Palette size={14} className="text-zinc-500" />
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-2.5 py-1 text-[10px] rounded-full border transition ${
            theme === t.id
              ? 'border-[var(--neon-cyan)] bg-[var(--accent-glow)] text-white'
              : 'border-[var(--border-subtle)] text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}