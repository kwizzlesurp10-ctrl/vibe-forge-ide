'use client';

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { AgentNode, AgentNodeData } from './AgentNode';

const nodeTypes = {
  agent: AgentNode,
};

interface AgentGraphProps {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (connection: Connection) => void;
}

export default function AgentGraph({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: AgentGraphProps) {
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
