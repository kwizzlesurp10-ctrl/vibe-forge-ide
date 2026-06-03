'use client';

import React from 'react';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface Reflection {
  id: number;
  node: string;
  reflection: string;
  status: 'success' | 'improved' | 'failed';
}

const mockReflections: Reflection[] = [
  { id: 1, node: 'Primary Agent', reflection: 'Output was too verbose. Reduced token usage by 23%.', status: 'improved' },
  { id: 2, node: 'Self-Reflection', reflection: 'Added better critique criteria for code quality.', status: 'success' },
  { id: 3, node: 'Refactorer', reflection: 'Failed to apply changes — missing context.', status: 'failed' },
];

export default function SelfImprovementPanel() {
  return (
    <div className="p-4">
      <div className="section-header mb-4 flex items-center gap-2">
        <RefreshCw size={14} /> Self-Improvement Protocol
      </div>

      <div className="space-y-3 text-sm">
        {mockReflections.map((r) => (
          <div key={r.id} className="panel rounded-lg p-3 border-l-2 border-[var(--neon-lime)]">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium text-xs text-zinc-400">{r.node}</div>
              {r.status === 'improved' && <CheckCircle size={14} className="text-[var(--neon-lime)]" />}
              {r.status === 'failed' && <AlertTriangle size={14} className="text-amber-500" />}
            </div>
            <div className="text-xs leading-snug text-zinc-300">{r.reflection}</div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2 text-xs rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition-colors">
        Run Full Self-Improvement Cycle
      </button>
    </div>
  );
}
