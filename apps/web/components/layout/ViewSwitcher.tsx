'use client';

import { Brain, Code2, Network } from 'lucide-react';
import { useSessionStore } from '@/lib/store/sessionStore';
import type { MainView } from '@/lib/types';

const VIEWS: { id: MainView; label: string; icon: typeof Code2 }[] = [
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'graph', label: 'Graph', icon: Network },
  { id: 'memory', label: 'Memory', icon: Brain },
];

export default function ViewSwitcher() {
  const { mainView, setMainView } = useSessionStore();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-panel)] border border-[var(--border-subtle)]">
      {VIEWS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setMainView(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition ${
            mainView === id
              ? 'bg-[var(--bg-elevated)] text-white shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}