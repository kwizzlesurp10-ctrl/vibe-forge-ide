import { create } from 'zustand';
import type { MainView } from '@/lib/types';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

interface SessionState {
  improvements: number;
  mainView: MainView;
  incrementImprovements: () => void;
  setMainView: (view: MainView) => void;
  hydrate: (data: Partial<Pick<SessionState, 'improvements' | 'mainView'>>) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  improvements: 0,
  mainView: 'code',

  incrementImprovements: () => {
    set((s) => ({ improvements: s.improvements + 1 }));
    persistWorkspace();
  },

  setMainView: (view) => set({ mainView: view }),

  hydrate: (data) =>
    set({
      improvements: data.improvements ?? 0,
      mainView: data.mainView ?? 'code',
    }),
}));