'use client';

import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AgentNode, AgentNodeData } from './AgentNode';

const nodeTypes = {
  agent: AgentNode,
};

const initialNodes: Node<AgentNodeData>[] = [
  {
    id: '1',
    type: 'agent',
    position: { x: 150, y: 100 },
    data: { label: 'System Prompt', type: 'prompt' },
  },
  {
    id: '2',
    type: 'agent',
    position: { x: 400, y: 220 },
    data: { label: 'Primary Agent', type: 'agent', status: 'idle' },
  },
  {
    id: '3',
    type: 'agent',
    position: { x: 250, y: 380 },
    data: { label: 'Self-Reflection', type: 'reflection', status: 'idle' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

export default function AgentGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-full bg-[#0a0a0f]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#27272a" gap={24} />
        <Controls className="!bg-[var(--bg-panel)] !border-[var(--border-subtle)]" />
        <MiniMap
          nodeColor="#27272a"
          className="!bg-[var(--bg-panel)] !border-[var(--border-subtle)]"
        />
      </ReactFlow>
    </div>
  );
}