'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { Play, RotateCw } from 'lucide-react';
import { Node, Edge, addEdge, Connection } from 'reactflow';
import { AgentNodeData } from '@/components/flow/AgentNode';
import NodePalette from '@/components/flow/NodePalette';

const AgentGraph = dynamic(() => import('@/components/flow/AgentGraph'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full text-zinc-500">Loading node editor...</div>,
});

let nodeIdCounter = 4;

export default function VibeForgeIDE() {
  const [nodes, setNodes] = useState<Node<AgentNodeData>[]>([
    { id: '1', type: 'agent', position: { x: 150, y: 100 }, data: { label: 'System Prompt', type: 'prompt' } },
    { id: '2', type: 'agent', position: { x: 420, y: 240 }, data: { label: 'Primary Agent', type: 'agent' } },
    { id: '3', type: 'agent', position: { x: 280, y: 400 }, data: { label: 'Self-Reflection', type: 'reflection' } },
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ]);

  const onAddNode = useCallback((type: string) => {
    const newNode: Node<AgentNodeData> = {
      id: String(nodeIdCounter++),
      type: 'agent',
      position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 150 },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        type: type as AgentNodeData['type'],
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    []
  );

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
        <div className="w-72 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] flex flex-col">
          <NodePalette onAddNode={onAddNode} />

          <div className="p-4 flex-1 overflow-auto text-sm space-y-1">
            <div className="section-header mb-2">Current Graph</div>
            {nodes.map((node) => (
              <div key={node.id} className="px-3 py-1.5 text-xs rounded bg-[var(--bg-elevated)] font-mono">
                {node.data.label}
              </div>
            ))}
          </div>
        </div>

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

        <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-panel)] p-4 text-sm">
          <div className="section-header mb-3">Inspector</div>
          <div className="text-zinc-400 text-xs leading-relaxed">
            Click nodes in the graph to inspect. Use the palette on the left to add new agent nodes.
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
