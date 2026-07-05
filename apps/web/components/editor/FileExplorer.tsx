'use client';

import { useState } from 'react';
import { FolderTree, Plus, Trash2, Pencil } from 'lucide-react';
import { useFileStore } from '@/lib/store/fileStore';
import { fileIcon } from '@/lib/utils/language';
import { STARTER_TEMPLATES } from '@/lib/data/starterFiles';

const QUICK_LAUNCH = [
  { key: 'swarmforge', label: 'SwarmForge Core', color: 'text-[var(--neon-cyan)]' },
  { key: 'promptvault', label: 'Prompt Vault', color: 'text-[var(--neon-magenta)]' },
  { key: 'memoryarch', label: 'Memory Architecture', color: 'text-[var(--neon-lime)]' },
  { key: 'selfimprove', label: 'Self-Improve Protocol', color: 'text-amber-400' },
];

export default function FileExplorer() {
  const { files, currentFile, openFile, createFile, deleteFile, renameFile, loadTemplate } =
    useFileStore();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const startRename = (name: string) => {
    setRenaming(name);
    setRenameValue(name);
  };

  const commitRename = () => {
    if (renaming && renameValue && renameValue !== renaming) {
      renameFile(renaming, renameValue);
    }
    setRenaming(null);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="section-header flex items-center gap-2">
          <FolderTree size={14} /> Explorer
        </div>
        <button
          onClick={() => createFile()}
          className="w-7 h-7 flex items-center justify-center hover:bg-[var(--bg-elevated)] rounded text-zinc-400 hover:text-white transition"
          title="New File"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {Object.keys(files).map((filename) => (
          <div
            key={filename}
            className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition ${
              filename === currentFile
                ? 'bg-[var(--accent-glow)] border border-[var(--neon-cyan)]/30'
                : 'hover:bg-[var(--bg-elevated)]'
            }`}
            onClick={() => openFile(filename)}
          >
            <span className="text-xs">{fileIcon(filename)}</span>
            {renaming === filename ? (
              <input
                autoFocus
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={(e) => e.key === 'Enter' && commitRename()}
                className="flex-1 bg-[var(--bg-deep)] border border-[var(--border-subtle)] rounded px-1 text-xs font-mono"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="flex-1 truncate font-mono text-xs">{filename}</span>
            )}
            <div className="hidden group-hover:flex gap-0.5">
              <button
                onClick={(e) => { e.stopPropagation(); startRename(filename); }}
                className="p-1 hover:text-[var(--neon-cyan)]"
              >
                <Pencil size={12} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); deleteFile(filename); }}
                className="p-1 hover:text-red-400"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--border-subtle)] p-3">
        <div className="section-header mb-2">Quick Launch</div>
        <div className="space-y-1">
          {QUICK_LAUNCH.map((item) => (
            <button
              key={item.key}
              onClick={() => loadTemplate(item.key)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] text-xs text-zinc-300 hover:text-white transition flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${item.color} bg-current opacity-60`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}