'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCw } from 'lucide-react';
import NodePalette from '@/components/flow/NodePalette';
import SelfImprovementPanel from '@/components/SelfImprovementPanel';
import { useGraphStore } from '@/lib/store/graphStore';

const AgentGraph = dynamic(() => import('@/components/flow/AgentGraph'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-zinc-500">Loading node editor...</div>,
});

export default function VibeForgeIDE() {
  const { nodes, edges, setNodes, setEdges, onConnect, addNode } = useGraphStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-magenta)]" />
            <div>
              <div className="font-display text-xl tracking-[-0.02em] neon-text">VIBE FORGE</div>
              <div className="text-[10px] text-zinc-500 -mt-1">PRODUCTION AGENTIC IDE</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-panel)] transition-colors">
              <RotateCw size={14} /> Self-Improve
            </button>
            <button className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
              <Play size={14} /> Run Graph
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-72 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col">
          <NodePalette onAddNode={addNode} />

          <div className="p-4 flex-1 overflow-auto text-sm space-y-1">
            <div className="section-header mb-2">Current Graph</div>
            {nodes.map((node) => (
              <div key={node.id} className="px-3 py-1.5 text-xs rounded bg-[var(--bg-elevated)] font-mono">
                {node.data.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] flex items-center px-4 text-sm justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--neon-lime)] animate-pulse" />
              <span>Live Execution • React Flow + LangGraph Ready</span>
            </div>
            <div className="text-xs text-zinc-500">Phase 1 • Production Foundation</div>
          </div>

          <div className="flex-1 relative">
            <AgentGraph
              nodes={nodes}
              edges={edges}
              onNodesChange={setNodes}
              onEdgesChange={setEdges}
              onConnect={onConnect}
            />
          </div>
        </div>

        {/* Right Sidebar - Inspector + Self-Improvement */}
        <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col">
          <div className="p-4 border-b border-[var(--border-subtle)]">
            <div className="section-header mb-1">Inspector</div>
            <div className="text-xs text-zinc-400">Select nodes to inspect</div>
          </div>

          <div className="flex-1 overflow-auto">
            <SelfImprovementPanel />
          </div>
        </div>
      </div>

      <div className="h-8 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] text-xs flex items-center px-4 text-zinc-500 font-mono">
        <div className="flex-1">Production • TypeScript strict • React Flow v11 • Self-Improvement Protocol v2</div>
        <div>{nodes.length} nodes • {edges.length} edges</div>
      </div>
    </div>
  );
}
