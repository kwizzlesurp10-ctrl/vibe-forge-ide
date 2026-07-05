import { debounce } from '@/lib/persistence/debounce';
import { saveWorkspace } from '@/lib/persistence/workspaceDb';
import { useFileStore } from '@/lib/store/fileStore';
import { useThemeStore } from '@/lib/store/themeStore';
import { useSessionStore } from '@/lib/store/sessionStore';
import { useMemoryStore } from '@/lib/store/memoryStore';
import { useCopilotStore } from '@/lib/store/copilotStore';
import { useGraphStore } from '@/lib/store/graphStore';

export const persistWorkspace = debounce(() => {
  if (!useFileStore.getState().hydrated) return;

  const files = useFileStore.getState();
  const theme = useThemeStore.getState();
  const session = useSessionStore.getState();
  const memory = useMemoryStore.getState();
  const copilot = useCopilotStore.getState();
  const graph = useGraphStore.getState();

  saveWorkspace({
    files: files.files,
    openTabs: files.openTabs,
    currentFile: files.currentFile,
    theme: theme.theme,
    sessionImprovements: session.improvements,
    memory: memory.entries,
    copilotOutput: copilot.output,
    graph: { nodes: graph.nodes, edges: graph.edges },
  });
}, 400);

export function persistWorkspaceNow() {
  if (!useFileStore.getState().hydrated) return;
  const files = useFileStore.getState();
  const theme = useThemeStore.getState();
  const session = useSessionStore.getState();
  const memory = useMemoryStore.getState();
  const copilot = useCopilotStore.getState();
  const graph = useGraphStore.getState();

  return saveWorkspace({
    files: files.files,
    openTabs: files.openTabs,
    currentFile: files.currentFile,
    theme: theme.theme,
    sessionImprovements: session.improvements,
    memory: memory.entries,
    copilotOutput: copilot.output,
    graph: { nodes: graph.nodes, edges: graph.edges },
  });
}