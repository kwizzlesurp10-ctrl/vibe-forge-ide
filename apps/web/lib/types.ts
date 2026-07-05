export type FileLanguage = 'python' | 'javascript' | 'typescript' | 'markdown' | 'json' | 'plaintext';

export interface ForgeFile {
  content: string;
  lang: FileLanguage;
  updatedAt: number;
}

export type ThemeId = 'cyberpunk' | 'panda' | 'neon' | 'glitch';

export interface ThemeDefinition {
  id: ThemeId;
  label: string;
  vars: Record<string, string>;
}

export type QuickActionType = 'explain' | 'refactor' | 'test' | 'agentic' | 'security';

export type MemoryLayer = 'ephemeral' | 'session' | 'persistent' | 'skill' | 'vector';

export interface MemoryEntry {
  id: string;
  layer: MemoryLayer;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type MainView = 'code' | 'graph' | 'memory';

export interface CursorPosition {
  line: number;
  column: number;
}