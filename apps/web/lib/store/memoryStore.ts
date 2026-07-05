import { create } from 'zustand';
import type { MemoryEntry, MemoryLayer } from '@/lib/types';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

const SEED_MEMORY: MemoryEntry[] = [
  {
    id: 'mem-1',
    layer: 'persistent',
    title: 'SwarmForge Core Pattern',
    content: 'LangGraph StateGraph with planner → researcher → coder → critic → memory_writer loop.',
    tags: ['swarm', 'langgraph'],
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: 'mem-2',
    layer: 'skill',
    title: 'Self-Improvement Protocol',
    content: 'Reflect → Extract → Persist → Measure → Iterate. Mandatory after every significant task.',
    tags: ['protocol', 'meta'],
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'mem-3',
    layer: 'session',
    title: 'VibeForge Production Migration',
    content: 'Migrated from static MVP to Next.js with Monaco, IndexedDB, API routes, and unified workspace.',
    tags: ['ide', 'production'],
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now(),
  },
  {
    id: 'mem-4',
    layer: 'ephemeral',
    title: 'Current Task Context',
    content: 'Building full-stack production IDE opposite of MVP status.',
    tags: ['active'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

interface MemoryState {
  entries: MemoryEntry[];
  search: string;
  filterLayer: MemoryLayer | 'all';
  hydrate: (entries: MemoryEntry[]) => void;
  setSearch: (value: string) => void;
  setFilterLayer: (layer: MemoryLayer | 'all') => void;
  addEntry: (entry: Omit<MemoryEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteEntry: (id: string) => void;
  getFiltered: () => MemoryEntry[];
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  entries: SEED_MEMORY,
  search: '',
  filterLayer: 'all',

  hydrate: (entries) => set({ entries: entries.length ? entries : SEED_MEMORY }),

  setSearch: (value) => set({ search: value }),

  setFilterLayer: (layer) => set({ filterLayer: layer }),

  addEntry: (entry) => {
    const now = Date.now();
    const newEntry: MemoryEntry = {
      ...entry,
      id: `mem-${now}`,
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ entries: [newEntry, ...s.entries] }));
    persistWorkspace();
  },

  deleteEntry: (id) => {
    set((s) => ({ entries: s.entries.filter((e) => e.id !== id) }));
    persistWorkspace();
  },

  getFiltered: () => {
    const { entries, search, filterLayer } = get();
    const q = search.toLowerCase();
    return entries.filter((e) => {
      const layerMatch = filterLayer === 'all' || e.layer === filterLayer;
      const searchMatch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.content.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      return layerMatch && searchMatch;
    });
  },
}));