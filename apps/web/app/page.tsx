'use client';

import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

export default function VibeForgeIDE() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)]" />
            <div>
              <div className="font-display text-xl tracking-[-0.02em] neon-text">VIBE FORGE</div>
              <div className="text-[10px] text-zinc-500 -mt-1">PRODUCTION AGENTIC IDE</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="px-3 py-1 rounded-full bg-[var(--bg-panel)] border border-[var(--border-subtle)] text-xs">
              v0.2.0 • Production
            </div>
            <button className="px-4 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-colors">
              Deploy
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col">
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="section-header mb-2">Agent Graph</div>
            <div className="text-sm text-zinc-400">Self-Improving Workflow</div>
          </div>

          <div className="p-4 flex-1 overflow-auto space-y-1 text-sm">
            <div className="px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border-l-2 border-[var(--neon-cyan)]">
              Prompt Composer
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] cursor-pointer">
              Reflection Engine
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] cursor-pointer">
              Multi-Agent Swarm
            </div>
            <div className="px-3 py-2 rounded-lg hover:bg-[var(--bg-elevated)] cursor-pointer">
              Code Refactorer
            </div>
          </div>

          <div className="p-4 border-t border-[var(--border-subtle)] text-xs text-zinc-500">
            4 nodes • 12 connections
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] flex items-center px-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--neon-lime)] animate-pulse" />
              <span>Live Execution • React Flow Ready</span>
            </div>
          </div>

          <div className="flex-1 relative bg-[#0a0a0f]">
            <ReactFlowProvider>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl opacity-10">🐼</div>
                  <div>
                    <div className="font-display text-2xl neon-text">React Flow Node Editor</div>
                    <div className="text-sm text-zinc-500 mt-1">Production-grade agent graph coming in Phase 1</div>
                  </div>
                  <div className="text-xs text-zinc-600 max-w-xs mx-auto">
                    This area will contain a real React Flow canvas with typed nodes, 
                    live execution highlighting, and LangGraph synchronization.
                  </div>
                </div>
              </div>
            </ReactFlowProvider>
          </div>
        </div>

        {/* Right Inspector */}
        <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-panel)] p-4 text-sm">
          <div className="section-header mb-3">Inspector</div>
          <div className="text-zinc-400 text-xs">Select a node to inspect its configuration and execution history.</div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] text-xs flex items-center px-4 text-zinc-500 font-mono">
        <div className="flex-1">Ready • TypeScript • React Flow v11 • LangGraph connected</div>
        <div>Self-Improvement Protocol v2 • 0 runs today</div>
      </div>
    </div>
  );
}