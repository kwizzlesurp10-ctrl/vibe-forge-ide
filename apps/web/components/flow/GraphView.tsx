'use client';

import dynamic from 'next/dynamic';
import { Play } from 'lucide-react';
import NodePalette from '@/components/flow/NodePalette';
import { useGraphStore } from '@/lib/store/graphStore';

const AgentGraph = dynamic(() => import('@/components/flow/AgentGraph'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
      Loading agent graph...
    </div>
  ),
});

export default function GraphView() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useGraphStore();

  const runGraph = async () => {
    await fetch('/api/agent/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges }),
    });
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col shrink-0">
        <NodePalette onAddNode={addNode} />
        <div className="p-4 flex-1 overflow-auto text-sm space-y-1">
          <div className="section-header mb-2">Current Graph</div>
          {nodes.map((node) => (
            <div key={node.id} className="px-3 py-1.5 text-xs rounded bg-[var(--bg-elevated)] font-mono">
              {node.data.label}
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[var(--border-subtle)]">
          <button
            onClick={runGraph}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
          >
            <Play size={12} /> Run Graph
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-10 border-b border-[var(--border-subtle)] bg-[var(--bg-panel)] flex items-center px-4 text-xs justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--neon-lime)] animate-pulse" />
            <span>React Flow + LangGraph Ready</span>
          </div>
          <span className="text-zinc-500">{nodes.length} nodes • {edges.length} edges</span>
        </div>
        <div className="flex-1 relative">
          <AgentGraph
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          />
        </div>
      </div>
    </div>
  );
}