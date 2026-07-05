import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'vibe-forge-ide',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    features: {
      monaco: true,
      indexedDb: true,
      agentGraph: true,
      memoryGarden: true,
      promptEngine: true,
      themes: ['cyberpunk', 'panda', 'neon', 'glitch'],
    },
  });
}