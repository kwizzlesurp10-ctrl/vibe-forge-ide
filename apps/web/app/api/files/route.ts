import { NextRequest, NextResponse } from 'next/server';
import type { WorkspaceSnapshot } from '@/lib/persistence/workspaceDb';

export async function GET() {
  return NextResponse.json({
    message: 'Workspace files are persisted client-side via IndexedDB.',
    hint: 'Use PUT to import a workspace bundle JSON.',
  });
}

export async function PUT(request: NextRequest) {
  try {
    const bundle = (await request.json()) as WorkspaceSnapshot;
    if (!bundle.files || typeof bundle.files !== 'object') {
      return NextResponse.json({ error: 'Invalid workspace bundle' }, { status: 400 });
    }
    return NextResponse.json({
      ok: true,
      message: 'Bundle validated. Client will hydrate on reload.',
      bundle,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}