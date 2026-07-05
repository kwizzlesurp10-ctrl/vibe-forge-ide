'use client';

import IDEHeader from '@/components/layout/IDEHeader';
import CodeView from '@/components/layout/CodeView';
import GraphView from '@/components/flow/GraphView';
import MemoryVisualizer from '@/components/memory/MemoryVisualizer';
import StatusBar from '@/components/layout/StatusBar';
import WorkspaceHydrator from '@/components/workspace/WorkspaceHydrator';
import { useSessionStore } from '@/lib/store/sessionStore';
import { useFileStore } from '@/lib/store/fileStore';

export default function VibeForgeIDE() {
  const mainView = useSessionStore((s) => s.mainView);
  const hydrated = useFileStore((s) => s.hydrated);

  return (
    <>
      <WorkspaceHydrator />
      {!hydrated ? (
      <div className="min-h-screen flex items-center justify-center cyberpunk-bg">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)] animate-pulse" />
          <div className="font-display text-xl neon-text">VIBE FORGE</div>
          <div className="text-xs text-zinc-500">Loading workspace from IndexedDB...</div>
        </div>
      </div>
      ) : (
    <div className="h-screen flex flex-col overflow-hidden">
      <IDEHeader />

      <main className="flex-1 overflow-hidden">
        {mainView === 'code' && <CodeView />}
        {mainView === 'graph' && <GraphView />}
        {mainView === 'memory' && <MemoryVisualizer />}
      </main>

      <StatusBar />
    </div>
      )}
    </>
  );
}