import { create } from 'zustand';
import { STARTER_FILES, STARTER_TEMPLATES } from '@/lib/data/starterFiles';
import { detectLanguage } from '@/lib/utils/language';
import type { CursorPosition, ForgeFile } from '@/lib/types';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

interface FileState {
  files: Record<string, ForgeFile>;
  openTabs: string[];
  currentFile: string | null;
  cursor: CursorPosition;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  hydrate: (data: Partial<Pick<FileState, 'files' | 'openTabs' | 'currentFile'>>) => void;
  openFile: (filename: string) => void;
  closeTab: (filename: string) => void;
  setContent: (content: string) => void;
  setCursor: (cursor: CursorPosition) => void;
  createFile: (filename?: string) => string;
  deleteFile: (filename: string) => void;
  renameFile: (oldName: string, newName: string) => void;
  loadTemplate: (key: string) => void;
  getCurrentContent: () => string;
}

function seedFiles(): Record<string, ForgeFile> {
  return Object.fromEntries(
    Object.entries(STARTER_FILES).map(([name, file]) => [name, { ...file }])
  );
}

export const useFileStore = create<FileState>((set, get) => ({
  files: seedFiles(),
  openTabs: Object.keys(STARTER_FILES).slice(0, 1),
  currentFile: Object.keys(STARTER_FILES)[0] ?? null,
  cursor: { line: 1, column: 1 },
  hydrated: false,

  setHydrated: (value) => set({ hydrated: value }),

  hydrate: (data) => {
    set({
      files: data.files ?? seedFiles(),
      openTabs: data.openTabs ?? [],
      currentFile: data.currentFile ?? null,
      hydrated: true,
    });
  },

  openFile: (filename) => {
    const { files, openTabs } = get();
    if (!files[filename]) return;
    const tabs = openTabs.includes(filename) ? openTabs : [...openTabs, filename];
    set({ currentFile: filename, openTabs: tabs });
    persistWorkspace();
  },

  closeTab: (filename) => {
    const { openTabs, currentFile, files } = get();
    const tabs = openTabs.filter((t) => t !== filename);
    let next = currentFile;
    if (currentFile === filename) {
      next = tabs[tabs.length - 1] ?? null;
    }
    set({ openTabs: tabs, currentFile: next });
    persistWorkspace();
  },

  setContent: (content) => {
    const { currentFile, files } = get();
    if (!currentFile) return;
    set({
      files: {
        ...files,
        [currentFile]: { ...files[currentFile], content, updatedAt: Date.now() },
      },
    });
    persistWorkspace();
  },

  setCursor: (cursor) => set({ cursor }),

  createFile: (filename) => {
    const name = filename ?? `untitled_${Date.now()}.md`;
    const { files, openTabs } = get();
    if (files[name]) return name;
    const file: ForgeFile = { content: '', lang: detectLanguage(name), updatedAt: Date.now() };
    set({
      files: { ...files, [name]: file },
      openTabs: [...openTabs, name],
      currentFile: name,
    });
    persistWorkspace();
    return name;
  },

  deleteFile: (filename) => {
    const { files, openTabs, currentFile } = get();
    const next = { ...files };
    delete next[filename];
    const tabs = openTabs.filter((t) => t !== filename);
    set({
      files: next,
      openTabs: tabs,
      currentFile: currentFile === filename ? tabs[tabs.length - 1] ?? null : currentFile,
    });
    persistWorkspace();
  },

  renameFile: (oldName, newName) => {
    const { files, openTabs, currentFile } = get();
    if (!files[oldName] || files[newName]) return;
    const next = { ...files };
    next[newName] = { ...next[oldName], lang: detectLanguage(newName) };
    delete next[oldName];
    set({
      files: next,
      openTabs: openTabs.map((t) => (t === oldName ? newName : t)),
      currentFile: currentFile === oldName ? newName : currentFile,
    });
    persistWorkspace();
  },

  loadTemplate: (key) => {
    const filename = STARTER_TEMPLATES[key];
    if (filename) get().openFile(filename);
  },

  getCurrentContent: () => {
    const { currentFile, files } = get();
    return currentFile ? files[currentFile]?.content ?? '' : '';
  },
}));