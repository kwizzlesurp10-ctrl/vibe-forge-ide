const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function runGraphOnBackend(nodes: any[], edges: any[]) {
  const res = await fetch(`${API_BASE}/api/execution/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  return res.json();
}