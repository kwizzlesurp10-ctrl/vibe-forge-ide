'use client';

import { useEffect } from 'react';
import { loadWorkspace } from '@/lib/persistence/workspaceDb';
import { useFileStore } from '@/lib/store/fileStore';
import { useThemeStore } from '@/lib/store/themeStore';
import { useSessionStore } from '@/lib/store/sessionStore';
import { useMemoryStore } from '@/lib/store/memoryStore';
import { useCopilotStore } from '@/lib/store/copilotStore';
import { useGraphStore } from '@/lib/store/graphStore';

export default function WorkspaceHydrator() {
  useEffect(() => {
    loadWorkspace().then((snapshot) => {
      if (snapshot) {
        useFileStore.getState().hydrate({
          files: snapshot.files,
          openTabs: snapshot.openTabs,
          currentFile: snapshot.currentFile,
        });
        useThemeStore.getState().hydrate(snapshot.theme);
        useSessionStore.getState().hydrate({ improvements: snapshot.sessionImprovements });
        useMemoryStore.getState().hydrate(snapshot.memory);
        useCopilotStore.getState().setOutput(snapshot.copilotOutput);
        if (snapshot.graph?.nodes?.length) {
          useGraphStore.getState().hydrateGraph(snapshot.graph.nodes, snapshot.graph.edges);
        }
      } else {
        useThemeStore.getState().hydrate('cyberpunk');
      }
      useFileStore.getState().setHydrated(true);
    });
  }, []);

  return null;
}