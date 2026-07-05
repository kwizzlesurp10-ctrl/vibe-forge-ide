'use client';

import { X } from 'lucide-react';
import { useFileStore } from '@/lib/store/fileStore';

export default function EditorTabs() {
  const { openTabs, currentFile, openFile, closeTab } = useFileStore();

  if (!openTabs.length) {
    return (
      <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex items-center px-4 text-xs text-zinc-500">
        No files open
      </div>
    );
  }

  return (
    <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] flex items-center px-2 overflow-x-auto gap-1">
      {openTabs.map((tab) => (
        <div
          key={tab}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs font-mono cursor-pointer transition shrink-0 ${
            tab === currentFile
              ? 'bg-[var(--bg-elevated)] text-white border-t border-x border-[var(--border-subtle)]'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-[var(--bg-panel)]'
          }`}
          onClick={() => openFile(tab)}
        >
          <span className="truncate max-w-[140px]">{tab}</span>
          <button
            onClick={(e) => { e.stopPropagation(); closeTab(tab); }}
            className="hover:text-red-400 transition"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}