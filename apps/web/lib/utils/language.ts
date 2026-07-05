import type { FileLanguage } from '@/lib/types';

const EXT_MAP: Record<string, FileLanguage> = {
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  jsx: 'javascript',
  md: 'markdown',
  json: 'json',
};

const MONACO_MAP: Record<FileLanguage, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  markdown: 'markdown',
  json: 'json',
  plaintext: 'plaintext',
};

export function detectLanguage(filename: string): FileLanguage {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXT_MAP[ext] ?? 'plaintext';
}

export function toMonacoLanguage(lang: FileLanguage): string {
  return MONACO_MAP[lang];
}

export function fileIcon(filename: string): string {
  if (filename.endsWith('.py')) return '🐍';
  if (filename.endsWith('.js') || filename.endsWith('.ts')) return '⚡';
  if (filename.endsWith('.md')) return '📝';
  if (filename.endsWith('.json')) return '{}';
  return '📄';
}