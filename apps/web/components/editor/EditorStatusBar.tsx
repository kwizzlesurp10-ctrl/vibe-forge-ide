'use client';

import { useFileStore } from '@/lib/store/fileStore';

export default function EditorStatusBar() {
  const { currentFile, files, cursor } = useFileStore();
  const content = currentFile ? files[currentFile]?.content ?? '' : '';
  const lang = currentFile ? files[currentFile]?.lang ?? 'plaintext' : 'plaintext';

  return (
    <div className="h-8 px-4 flex items-center justify-between text-[10px] text-zinc-500 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] font-mono">
      <div className="flex items-center gap-4">
        <span className="px-2 py-0.5 bg-[var(--bg-elevated)] rounded uppercase">{lang}</span>
        <span>UTF-8</span>
        {currentFile && <span className="text-zinc-600">{currentFile}</span>}
      </div>
      <div className="flex items-center gap-3">
        <span>Ln {cursor.line}, Col {cursor.column}</span>
        <span className="w-px h-3 bg-zinc-700" />
        <span>{content.length} chars</span>
      </div>
    </div>
  );
}