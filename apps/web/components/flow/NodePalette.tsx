'use client';

import React from 'react';
import { Zap, Bot, RefreshCw, Wrench } from 'lucide-react';

const nodeTypes = [
  { type: 'prompt', label: 'Prompt', icon: Zap, color: 'var(--neon-cyan)' },
  { type: 'agent', label: 'Agent', icon: Bot, color: 'var(--neon-magenta)' },
  { type: 'reflection', label: 'Reflection', icon: RefreshCw, color: 'var(--neon-lime)' },
  { type: 'tool', label: 'Tool', icon: Wrench, color: '#fbbf24' },
];

interface NodePaletteProps {
  onAddNode: (type: string) => void;
}

export default function NodePalette({ onAddNode }: NodePaletteProps) {
  return (
    <div className="p-4 border-b border-[var(--border-subtle)]">
      <div className="section-header mb-3">Node Palette</div>
      <div className="grid grid-cols-2 gap-2">
        {nodeTypes.map((node) => {
          const Icon = node.icon;
          return (
            <button
              key={node.type}
              onClick={() => onAddNode(node.type)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--neon-cyan)] hover:bg-[var(--bg-elevated)] transition-all active:scale-[0.985]"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${node.color}15`, color: node.color }}
              >
                <Icon size={18} />
              </div>
              <div className="text-xs font-medium">{node.label}</div>
            </button>
          );
        })}
      </div>
      <div className="text-[10px] text-zinc-600 mt-3 text-center">Click to add node</div>
    </div>
  );
}