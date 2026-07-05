'use client';

import { Bot, Copy, Eraser, Sparkles } from 'lucide-react';
import { useCopilotStore } from '@/lib/store/copilotStore';
import type { QuickActionType } from '@/lib/types';

const QUICK_ACTIONS: { type: QuickActionType; label: string; desc: string }[] = [
  { type: 'explain', label: 'Explain Code', desc: 'Deep reasoning + architecture' },
  { type: 'refactor', label: 'Refactor Prod', desc: 'Clean arch + perf + types' },
  { type: 'test', label: 'Generate Tests', desc: 'TDD + edge cases' },
  { type: 'agentic', label: 'Agentic Wrap', desc: 'LangGraph / CrewAI swarm' },
  { type: 'security', label: 'Security Audit', desc: 'Ethics + hardening' },
];

export default function CopilotPanel() {
  const {
    promptInput,
    output,
    copied,
    setPromptInput,
    runQuickAction,
    generateCustom,
    clear,
    copyOutput,
  } = useCopilotStore();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={16} className="text-[var(--neon-cyan)]" />
          <div>
            <div className="font-semibold text-sm">FORGEMIND</div>
            <div className="text-[10px] text-emerald-400">Agentic Copilot • Ready</div>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 font-mono">
          v2.0
        </span>
      </div>

      <div className="p-3 border-b border-[var(--border-subtle)]">
        <div className="section-header mb-2">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.type}
              onClick={() => runQuickAction(action.type)}
              className="px-3 py-2 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-panel)] border border-[var(--border-subtle)] text-left transition active:scale-[0.985]"
            >
              <div className="text-xs font-medium">{action.label}</div>
              <div className="text-[10px] text-zinc-500">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-3 min-h-0">
        <div className="section-header mb-1.5">Prompt Composer</div>
        <textarea
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          className="flex-1 resize-none min-h-[80px] text-xs p-3 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-subtle)] font-mono focus:border-[var(--neon-cyan)]/40 outline-none"
          placeholder="Describe what you want to do with the current code..."
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={generateCustom}
            className="flex-1 py-2 text-xs font-semibold rounded-xl bg-white text-black hover:bg-zinc-200 transition flex items-center justify-center gap-2"
          >
            <Sparkles size={12} /> Generate Prompt
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 text-xs rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition"
          >
            <Eraser size={12} />
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)] p-3 flex flex-col max-h-[280px]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="section-header">Output / Ready Prompt</div>
          <button
            onClick={copyOutput}
            className={`text-[10px] px-2 py-0.5 rounded flex items-center gap-1 transition ${
              copied ? 'bg-emerald-900 text-emerald-400' : 'bg-[var(--bg-elevated)] text-[var(--neon-cyan)] hover:bg-[var(--bg-panel)]'
            }`}
          >
            <Copy size={10} /> {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
        <div className="flex-1 overflow-auto p-3 text-xs border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-deep)] text-zinc-300 min-h-[100px] whitespace-pre-wrap font-mono leading-relaxed">
          {output || (
            <span className="text-zinc-500 italic">
              Generated prompts appear here. Ready to paste into Grok, Claude, or local models.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}