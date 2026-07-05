import { create } from 'zustand';
import {
  Node,
  Edge,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
} from 'reactflow';
import { AgentNodeData } from '@/components/flow/AgentNode';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

interface GraphState {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: AgentNodeData['type']) => void;
  deleteNode: (id: string) => void;
  updateNodeData: (id: string, data: Partial<AgentNodeData>) => void;
  hydrateGraph: (nodes: Node<AgentNodeData>[], edges: Edge[]) => void;
}

let nodeId = 10;

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [
    { id: '1', type: 'agent', position: { x: 150, y: 100 }, data: { label: 'System Prompt', type: 'prompt' } },
    { id: '2', type: 'agent', position: { x: 420, y: 240 }, data: { label: 'Primary Agent', type: 'agent' } },
    { id: '3', type: 'agent', position: { x: 280, y: 400 }, data: { label: 'Self-Reflection', type: 'reflection' } },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
  ],

  onNodesChange: (changes) => {
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) }));
    persistWorkspace();
  },

  onEdgesChange: (changes) => {
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) }));
    persistWorkspace();
  },

  onConnect: (connection) => {
    set((state) => ({ edges: addEdge({ ...connection, animated: true }, state.edges) }));
    persistWorkspace();
  },

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
    persistWorkspace();
  },

  deleteNode: (id) => {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    }));
    persistWorkspace();
  },

  updateNodeData: (id, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    }));
    persistWorkspace();
  },

  hydrateGraph: (nodes, edges) => set({ nodes, edges }),
}));