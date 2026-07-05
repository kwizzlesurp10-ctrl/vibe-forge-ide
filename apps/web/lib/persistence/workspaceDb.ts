import { openDB, type IDBPDatabase } from 'idb';
import type { ForgeFile, MemoryEntry, ThemeId } from '@/lib/types';
import type { Node, Edge } from 'reactflow';
import type { AgentNodeData } from '@/components/flow/AgentNode';

const DB_NAME = 'vibe-forge-workspace';
const DB_VERSION = 1;
const STORE = 'workspace';
const KEY = 'main';

export interface WorkspaceSnapshot {
  files: Record<string, ForgeFile>;
  openTabs: string[];
  currentFile: string | null;
  theme: ThemeId;
  graph: {
    nodes: Node<AgentNodeData>[];
    edges: Edge[];
  };
  memory: MemoryEntry[];
  sessionImprovements: number;
  copilotOutput: string;
  version: number;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      },
    });
  }
  return dbPromise;
}

export async function loadWorkspace(): Promise<WorkspaceSnapshot | null> {
  const db = await getDb();
  return (await db.get(STORE, KEY)) ?? null;
}

export async function saveWorkspace(partial: Partial<WorkspaceSnapshot>): Promise<void> {
  const db = await getDb();
  const existing = (await db.get(STORE, KEY)) as WorkspaceSnapshot | undefined;
  const merged: WorkspaceSnapshot = {
    files: {},
    openTabs: [],
    currentFile: null,
    theme: 'cyberpunk',
    graph: { nodes: [], edges: [] },
    memory: [],
    sessionImprovements: 0,
    copilotOutput: '',
    version: 2,
    ...existing,
    ...partial,
  };
  await db.put(STORE, merged, KEY);
}

export async function exportWorkspaceBundle(): Promise<WorkspaceSnapshot> {
  const db = await getDb();
  const snapshot = (await db.get(STORE, KEY)) as WorkspaceSnapshot | undefined;
  return (
    snapshot ?? {
      files: {},
      openTabs: [],
      currentFile: null,
      theme: 'cyberpunk',
      graph: { nodes: [], edges: [] },
      memory: [],
      sessionImprovements: 0,
      copilotOutput: '',
      version: 2,
    }
  );
}