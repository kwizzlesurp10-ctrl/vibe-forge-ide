'use client';

import FileExplorer from '@/components/editor/FileExplorer';
import EditorTabs from '@/components/editor/EditorTabs';
import CodeEditor from '@/components/editor/CodeEditor';
import EditorStatusBar from '@/components/editor/EditorStatusBar';
import CopilotPanel from '@/components/copilot/CopilotPanel';

export default function CodeView() {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <div className="w-72 border-r border-[var(--border-subtle)] bg-[var(--bg-panel)] shrink-0">
        <FileExplorer />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <EditorTabs />
        <div className="flex-1 relative bg-[#0f0f14]">
          <CodeEditor />
        </div>
        <EditorStatusBar />
      </div>

      <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-panel)] shrink-0">
        <CopilotPanel />
      </div>
    </div>
  );
}