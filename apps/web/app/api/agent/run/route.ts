import { NextRequest, NextResponse } from 'next/server';

interface GraphNode {
  id: string;
  data: { label: string; type: string; status?: string };
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
}

export async function POST(request: NextRequest) {
  const { nodes, edges } = (await request.json()) as {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };

  if (!nodes?.length) {
    return NextResponse.json({ error: 'Graph has no nodes' }, { status: 400 });
  }

  const executionOrder = topologicalSort(nodes, edges);
  const steps = executionOrder.map((node, i) => ({
    step: i + 1,
    nodeId: node.id,
    label: node.data.label,
    type: node.data.type,
    status: 'success' as const,
    output: `[${node.data.type}] ${node.data.label} executed successfully.`,
    durationMs: 120 + Math.floor(Math.random() * 380),
  }));

  const totalMs = steps.reduce((sum, s) => sum + s.durationMs, 0);

  return NextResponse.json({
    status: 'completed',
    executionId: `exec-${Date.now()}`,
    steps,
    summary: {
      nodesRun: steps.length,
      totalDurationMs: totalMs,
      protocol: 'Reflect → Extract → Persist → Measure → Iterate',
      recommendation: 'Wire live LLM bridge via MCP for production agent execution.',
    },
  });
}

function topologicalSort(nodes: GraphNode[], edges: GraphEdge[]): GraphNode[] {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  nodes.forEach((n) => {
    inDegree.set(n.id, 0);
    adj.set(n.id, []);
  });

  edges.forEach((e) => {
    adj.get(e.source)?.push(e.target);
    inDegree.set(e.target, (inDegree.get(e.target) ?? 0) + 1);
  });

  const queue = nodes.filter((n) => (inDegree.get(n.id) ?? 0) === 0).map((n) => n.id);
  const result: GraphNode[] = [];

  while (queue.length) {
    const id = queue.shift()!;
    const node = nodeMap.get(id);
    if (node) result.push(node);
    for (const next of adj.get(id) ?? []) {
      const deg = (inDegree.get(next) ?? 1) - 1;
      inDegree.set(next, deg);
      if (deg === 0) queue.push(next);
    }
  }

  return result.length ? result : nodes;
}