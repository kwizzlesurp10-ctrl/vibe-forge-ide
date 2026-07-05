import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { bundle } = await request.json();
  const token = process.env.GITHUB_TOKEN;

  const description = `VibeForge IDE Workspace Export — ${new Date().toISOString()}`;
  const filename = `vibe-forge-workspace-${Date.now()}.json`;
  const content = JSON.stringify(bundle, null, 2);

  if (!token) {
    return NextResponse.json({
      download: true,
      message: 'No GITHUB_TOKEN configured. Downloading workspace bundle locally.',
      filename,
    });
  }

  try {
    const res = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        public: false,
        files: {
          [filename]: { content },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err, download: true }, { status: res.status });
    }

    const gist = await res.json();
    return NextResponse.json({ url: gist.html_url, id: gist.id });
  } catch (error) {
    return NextResponse.json({
      download: true,
      error: String(error),
    });
  }
}