'use client';

import { useFileStore } from '@/lib/store/fileStore';
import { useGraphStore } from '@/lib/store/graphStore';
import { useSessionStore } from '@/lib/store/sessionStore';

export default function StatusBar() {
  const hydrated = useFileStore((s) => s.hydrated);
  const { nodes, edges } = useGraphStore();
  const improvements = useSessionStore((s) => s.improvements);

  return (
    <div className="h-7 px-4 flex items-center justify-between text-xs text-zinc-400 font-mono border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] shrink-0">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {hydrated ? 'IndexedDB synced' : 'Hydrating workspace...'}
        </span>
        <span>
          Mode: <span className="text-[var(--neon-cyan)]">Self-Improving</span>
        </span>
        <span className="text-zinc-600">v2.0 Production</span>
      </div>
      <div className="flex items-center gap-4">
        <span>
          Improvements: <span className="text-[var(--neon-lime)] font-semibold">{improvements}</span>
        </span>
        <span>{nodes.length} nodes • {edges.length} edges</span>
        <span className="text-emerald-400">All systems nominal</span>
      </div>
    </div>
  );
}