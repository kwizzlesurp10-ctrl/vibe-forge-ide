'use client';

import dynamic from 'next/dynamic';
import { useFileStore } from '@/lib/store/fileStore';
import { toMonacoLanguage } from '@/lib/utils/language';

const Monaco = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
      Loading Monaco Editor...
    </div>
  ),
});

export default function CodeEditor() {
  const { currentFile, files, setContent, setCursor } = useFileStore();

  if (!currentFile || !files[currentFile]) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
        Select a file from the explorer or create a new one.
      </div>
    );
  }

  const file = files[currentFile];

  return (
    <Monaco
      height="100%"
      language={toMonacoLanguage(file.lang)}
      value={file.content}
      onChange={(value) => setContent(value ?? '')}
      onMount={(editor) => {
        editor.onDidChangeCursorPosition((e) => {
          setCursor({ line: e.position.lineNumber, column: e.position.column });
        });
      }}
      theme="vs-dark"
      options={{
        fontSize: 14,
        fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
        lineNumbers: 'on',
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        automaticLayout: true,
        tabSize: 2,
        bracketPairColorization: { enabled: true },
        padding: { top: 12 },
      }}
    />
  );
}