'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Bot, Zap, RefreshCw, Wrench } from 'lucide-react';

export type AgentNodeData = {
  label: string;
  type: 'prompt' | 'agent' | 'reflection' | 'tool';
  status?: 'idle' | 'running' | 'success' | 'error';
};

const iconMap = {
  prompt: Zap,
  agent: Bot,
  reflection: RefreshCw,
  tool: Wrench,
};

const colorMap = {
  prompt: 'var(--neon-cyan)',
  agent: 'var(--neon-magenta)',
  reflection: 'var(--neon-lime)',
  tool: '#fbbf24',
};

export function AgentNode({ data, selected }: NodeProps<AgentNodeData>) {
  const Icon = iconMap[data.type];
  const accent = colorMap[data.type];

  return (
    <div
      className={`panel rounded-xl w-[220px] overflow-hidden transition-all ${
        selected ? 'ring-2 ring-[var(--neon-cyan)]' : ''
      }`}
    >
      <div className="px-4 py-3 flex items-center gap-3 border-b border-[var(--border-subtle)]">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm truncate">{data.label}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{data.type}</div>
        </div>
      </div>

      <div className="px-4 py-3 text-xs text-zinc-400 font-mono">
        {data.status === 'running' && 'Executing...'}
        {data.status === 'success' && 'Completed'}
        {data.status === 'error' && 'Failed'}
        {!data.status && 'Ready'}
      </div>

      <Handle type="target" position={Position.Top} className="!bg-zinc-600" />
      <Handle type="source" position={Position.Bottom} className="!bg-zinc-600" />
    </div>
  );
}