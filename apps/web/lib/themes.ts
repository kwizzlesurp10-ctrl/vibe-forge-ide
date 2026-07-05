import type { ThemeDefinition } from '@/lib/types';

export const THEMES: ThemeDefinition[] = [
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    vars: {
      '--neon-cyan': '#00f5ff',
      '--neon-magenta': '#ff00aa',
      '--neon-lime': '#39ff14',
      '--panda-white': '#f0f0f0',
      '--bg-deep': '#0a0a0f',
      '--bg-panel': '#121218',
      '--bg-elevated': '#1a1a22',
      '--border-subtle': '#27272a',
      '--accent-glow': 'rgba(0,245,255,0.12)',
    },
  },
  {
    id: 'panda',
    label: 'Fusion Panda',
    vars: {
      '--neon-cyan': '#7dd3fc',
      '--neon-magenta': '#f472b6',
      '--neon-lime': '#a3e635',
      '--panda-white': '#fafafa',
      '--bg-deep': '#111111',
      '--bg-panel': '#1a1a1a',
      '--bg-elevated': '#262626',
      '--border-subtle': '#404040',
      '--accent-glow': 'rgba(163,230,53,0.1)',
    },
  },
  {
    id: 'neon',
    label: 'Neon Pulse',
    vars: {
      '--neon-cyan': '#22d3ee',
      '--neon-magenta': '#e879f9',
      '--neon-lime': '#4ade80',
      '--panda-white': '#e4e4e7',
      '--bg-deep': '#09090b',
      '--bg-panel': '#18181b',
      '--bg-elevated': '#27272a',
      '--border-subtle': '#3f3f46',
      '--accent-glow': 'rgba(34,211,238,0.15)',
    },
  },
  {
    id: 'glitch',
    label: 'Glitch',
    vars: {
      '--neon-cyan': '#ff6b6b',
      '--neon-magenta': '#c084fc',
      '--neon-lime': '#facc15',
      '--panda-white': '#f5f5f4',
      '--bg-deep': '#0c0a09',
      '--bg-panel': '#1c1917',
      '--bg-elevated': '#292524',
      '--border-subtle': '#44403c',
      '--accent-glow': 'rgba(250,204,21,0.1)',
    },
  },
];

export function applyTheme(themeId: string) {
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.dataset.theme = theme.id;
}