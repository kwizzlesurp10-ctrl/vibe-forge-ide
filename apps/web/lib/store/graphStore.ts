import { create } from 'zustand';
import { Node, Edge, Connection, addEdge } from 'reactflow';
import { AgentNodeData } from '@/components/flow/AgentNode';

interface GraphState {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  setNodes: (nodes: Node<AgentNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: AgentNodeData['type']) => void;
  deleteNode: (id: string) => void;
  updateNodeData: (id: string, data: Partial<AgentNodeData>) => void;
}

let nodeId = 10;

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [
    { id: '1', type: 'agent', position: { x: 150, y: 100 }, data: { label: 'System Prompt', type: 'prompt' } },
    { id: '2', type: 'agent', position: { x: 420, y: 240 }, data: { label: 'Primary Agent', type: 'agent' } },
    { id: '3', type: 'agent', position: { x: 280, y: 400 }, data: { label: 'Self-Reflection', type: 'reflection' } },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, animated: true }, state.edges),
    })),

  addNode: (type) => {
    const newNode: Node<AgentNodeData> = {
      id: String(nodeId++),
      type: 'agent',
      position: { x: 320 + Math.random() * 180, y: 220 + Math.random() * 160 },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        type,
      },
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    })),

  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    })),
}));