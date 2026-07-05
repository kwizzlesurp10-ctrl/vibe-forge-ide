'use client';

import { useState } from 'react';
import { Download, Play, RotateCw, Upload } from 'lucide-react';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';
import ViewSwitcher from '@/components/layout/ViewSwitcher';
import { useCopilotStore } from '@/lib/store/copilotStore';
import { exportWorkspaceBundle, saveWorkspace } from '@/lib/persistence/workspaceDb';
import type { WorkspaceSnapshot } from '@/lib/persistence/workspaceDb';

export default function IDEHeader() {
  const { runSelfImprovement, launchSwarm } = useCopilotStore();
  const [exporting, setExporting] = useState(false);

  const exportGist = async () => {
    setExporting(true);
    try {
      const bundle = await exportWorkspaceBundle();
      const res = await fetch('/api/gist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bundle }),
      });
      const data = await res.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else if (data.download) {
        const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vibe-forge-workspace-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setExporting(false);
    }
  };

  const importWorkspace = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const bundle = JSON.parse(text) as WorkspaceSnapshot;
      await saveWorkspace(bundle);
      window.location.reload();
    };
    input.click();
  };

  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/95 backdrop-blur-sm sticky top-0 z-50 shrink-0">
      <div className="px-4 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)]" />
          <div>
            <div className="font-display text-lg tracking-tight neon-text">VIBE FORGE</div>
            <div className="text-[10px] text-zinc-500 -mt-0.5">PRODUCTION AGENTIC IDE</div>
          </div>
        </div>

        <ViewSwitcher />

        <div className="flex items-center gap-2 shrink-0">
          <ThemeSwitcher />
          <button
            onClick={importWorkspace}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-panel)] transition"
            title="Import workspace"
          >
            <Upload size={12} /> Import
          </button>
          <button
            onClick={exportGist}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-panel)] transition disabled:opacity-50"
          >
            <Download size={12} /> {exporting ? 'Exporting...' : 'Export'}
          </button>
          <button
            onClick={runSelfImprovement}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-panel)] transition"
          >
            <RotateCw size={12} /> Self-Improve
          </button>
          <button
            onClick={launchSwarm}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            <Play size={12} /> Launch Swarm
          </button>
        </div>
      </div>
    </header>
  );
}