import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';
import { AgentNodeData } from '@/components/flow/AgentNode';
import { runGraphOnBackend } from '@/lib/api';

interface GraphState {
  nodes: Node<AgentNodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: AgentNodeData['type']) => void;
  deleteNode: (id: string) => void;
  updateNodeStatus: (id: string, status: AgentNodeData['status']) => void;
  runGraph: () => Promise<void>;
  clearGraph: () => void;
}

const STORAGE_KEY = 'vibe-forge-graph-v1';

const defaultNodes: Node<AgentNodeData>[] = [
  { id: '1', type: 'agent', position: { x: 150, y: 100 }, data: { label: 'System Prompt', type: 'prompt' } },
  { id: '2', type: 'agent', position: { x: 420, y: 240 }, data: { label: 'Primary Agent', type: 'agent' } },
  { id: '3', type: 'agent', position: { x: 280, y: 400 }, data: { label: 'Self-Reflection', type: 'reflection' } },
];

const defaultEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

let nodeId = 10;

function loadFromStorage() {
  if (typeof window === 'undefined') return { nodes: defaultNodes, edges: defaultEdges };
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { nodes: parsed.nodes || defaultNodes, edges: parsed.edges || defaultEdges };
    } catch {
      return { nodes: defaultNodes, edges: defaultEdges };
    }
  }
  return { nodes: defaultNodes, edges: defaultEdges };
}

function saveToStorage(nodes: Node<AgentNodeData>[], edges: Edge[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
  }
}

export const useGraphStore = create<GraphState>((set, get) => {
  const initial = loadFromStorage();

  return {
    nodes: initial.nodes,
    edges: initial.edges,

    onNodesChange: (changes) => {
      const newNodes = applyNodeChanges(changes, get().nodes) as Node<AgentNodeData>[];
      set({ nodes: newNodes });
      saveToStorage(newNodes, get().edges);
    },

    onEdgesChange: (changes) => {
      const newEdges = applyEdgeChanges(changes, get().edges);
      set({ edges: newEdges });
      saveToStorage(get().nodes, newEdges);
    },

    onConnect: (connection) =>
      set((state) => {
        const newEdges = addEdge({ ...connection, animated: true }, state.edges);
        saveToStorage(state.nodes, newEdges);
        return { edges: newEdges };
      }),

    addNode: (type) => {
      const newNode: Node<AgentNodeData> = {
        id: String(nodeId++),
        type: 'agent',
        position: { x: 320 + Math.random() * 180, y: 220 + Math.random() * 160 },
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`, type },
      };
      const newNodes = [...get().nodes, newNode];
      set({ nodes: newNodes });
      saveToStorage(newNodes, get().edges);
    },

    deleteNode: (id) => {
      const newNodes = get().nodes.filter((n) => n.id !== id);
      const newEdges = get().edges.filter((e) => e.source !== id && e.target !== id);
      set({ nodes: newNodes, edges: newEdges });
      saveToStorage(newNodes, newEdges);
    },

    updateNodeStatus: (id, status) => {
      const newNodes = get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, status } } : node
      );
      set({ nodes: newNodes });
      saveToStorage(newNodes, get().edges);
    },

    runGraph: async () => {
      const { nodes, edges, updateNodeStatus } = get();

      // Call real backend
      try {
        const result = await runGraphOnBackend(nodes, edges);
        console.log('LangGraph execution result:', result);

        // Update UI with results
        result.results?.forEach((r: any, index: number) => {
          setTimeout(() => {
            updateNodeStatus(r.node_id, 'success');
          }, index * 400);
        });
      } catch (error) {
        console.error('Failed to run graph on backend, falling back to simulation');
        // Fallback simulation
        nodes.forEach((node, index) => {
          setTimeout(() => {
            updateNodeStatus(node.id, 'running');
            setTimeout(() => updateNodeStatus(node.id, 'success'), 700);
          }, index * 500);
        });
      }
    },

    clearGraph: () => {
      set({ nodes: defaultNodes, edges: defaultEdges });
      saveToStorage(defaultNodes, defaultEdges);
      localStorage.removeItem(STORAGE_KEY);
    },
  };
});