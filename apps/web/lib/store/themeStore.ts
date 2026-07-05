import { create } from 'zustand';
import { applyTheme } from '@/lib/themes';
import type { ThemeId } from '@/lib/types';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

interface ThemeState {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  hydrate: (theme: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'cyberpunk',

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
    persistWorkspace();
  },

  hydrate: (theme) => {
    applyTheme(theme);
    set({ theme });
  },
}));