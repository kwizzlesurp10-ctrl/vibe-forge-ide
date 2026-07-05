'use client';

import { useState } from 'react';
import { Brain, Plus, Search, Trash2 } from 'lucide-react';
import { useMemoryStore } from '@/lib/store/memoryStore';
import type { MemoryLayer } from '@/lib/types';

const LAYERS: { id: MemoryLayer | 'all'; label: string; color: string }[] = [
  { id: 'all', label: 'All', color: 'text-zinc-400' },
  { id: 'ephemeral', label: 'Ephemeral', color: 'text-zinc-500' },
  { id: 'session', label: 'Session', color: 'text-blue-400' },
  { id: 'persistent', label: 'Persistent', color: 'text-[var(--neon-cyan)]' },
  { id: 'skill', label: 'Skill', color: 'text-[var(--neon-magenta)]' },
  { id: 'vector', label: 'Vector', color: 'text-[var(--neon-lime)]' },
];

const LAYER_COLORS: Record<MemoryLayer, string> = {
  ephemeral: 'border-zinc-600',
  session: 'border-blue-500',
  persistent: 'border-[var(--neon-cyan)]',
  skill: 'border-[var(--neon-magenta)]',
  vector: 'border-[var(--neon-lime)]',
};

export default function MemoryVisualizer() {
  const { search, filterLayer, setSearch, setFilterLayer, addEntry, deleteEntry, getFiltered } =
    useMemoryStore();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const entries = getFiltered();

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    addEntry({
      layer: 'session',
      title: title.trim(),
      content: content.trim(),
      tags: ['user-added'],
    });
    setTitle('');
    setContent('');
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain size={20} className="text-[var(--neon-magenta)]" />
          <div>
            <div className="font-display text-lg neon-text">Memory Garden</div>
            <div className="text-[10px] text-zinc-500">Agent memory layers • {entries.length} entries</div>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition"
        >
          <Plus size={12} /> Add Memory
        </button>
      </div>

      <div className="px-6 py-3 border-b border-[var(--border-subtle)] flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search memory..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[var(--bg-deep)] border border-[var(--border-subtle)] outline-none focus:border-[var(--neon-cyan)]/40"
          />
        </div>
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setFilterLayer(layer.id)}
            className={`px-3 py-1 text-[10px] rounded-full border transition ${
              filterLayer === layer.id
                ? 'border-[var(--neon-cyan)] bg-[var(--accent-glow)] text-white'
                : 'border-[var(--border-subtle)] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {showAdd && (
        <div className="px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memory title"
            className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-deep)] border border-[var(--border-subtle)] outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Memory content..."
            rows={3}
            className="w-full px-3 py-2 text-xs rounded-lg bg-[var(--bg-deep)] border border-[var(--border-subtle)] outline-none resize-none"
          />
          <button onClick={handleAdd} className="px-4 py-1.5 text-xs rounded-lg bg-white text-black font-medium">
            Save Memory
          </button>
        </div>
      )}

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`panel rounded-xl p-4 border-l-2 ${LAYER_COLORS[entry.layer]} hover:bg-[var(--bg-elevated)] transition group`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{entry.layer}</div>
                  <div className="font-medium text-sm">{entry.title}</div>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4">{entry.content}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {entry.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded bg-[var(--bg-deep)] text-zinc-500">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-[10px] text-zinc-600 mt-2">
                {new Date(entry.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}