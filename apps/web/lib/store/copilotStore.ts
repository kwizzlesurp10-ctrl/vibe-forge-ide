import { create } from 'zustand';
import {
  generateCustomPrompt,
  generatePromptForTask,
  launchAgentSwarmPrompt,
  runSelfImprovementOnFile,
  runSessionReflection,
} from '@/lib/prompts/generators';
import type { QuickActionType } from '@/lib/types';
import { useFileStore } from '@/lib/store/fileStore';
import { useSessionStore } from '@/lib/store/sessionStore';
import { persistWorkspace } from '@/lib/persistence/syncWorkspace';

interface CopilotState {
  promptInput: string;
  output: string;
  copied: boolean;
  setPromptInput: (value: string) => void;
  setOutput: (value: string) => void;
  clear: () => void;
  runQuickAction: (type: QuickActionType) => void;
  generateCustom: () => void;
  runSelfImprovement: () => void;
  launchSwarm: () => void;
  copyOutput: () => Promise<boolean>;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const useCopilotStore = create<CopilotState>((set, get) => ({
  promptInput: '',
  output: '',
  copied: false,

  setPromptInput: (value) => set({ promptInput: value }),

  setOutput: (value) => {
    set({ output: value });
    persistWorkspace();
  },

  clear: () => {
    set({ promptInput: '', output: '', copied: false });
    persistWorkspace();
  },

  runQuickAction: (type) => {
    const { currentFile, getCurrentContent } = useFileStore.getState();
    if (!currentFile) {
      set({ output: 'Open a file first to use quick actions.' });
      return;
    }
    const prompt = generatePromptForTask(type, getCurrentContent(), currentFile);
    set({ output: prompt });
    copyToClipboard(prompt);
    useSessionStore.getState().incrementImprovements();
    persistWorkspace();
  },

  generateCustom: () => {
    const { promptInput } = get();
    const { currentFile, getCurrentContent } = useFileStore.getState();
    if (!promptInput.trim()) {
      set({ output: 'Describe the task in the prompt composer first.' });
      return;
    }
    if (!currentFile) {
      set({ output: 'Open a file to provide context to the prompt.' });
      return;
    }
    const prompt = generateCustomPrompt(promptInput, getCurrentContent(), currentFile);
    set({ output: prompt });
    copyToClipboard(prompt);
    useSessionStore.getState().incrementImprovements();
    persistWorkspace();
  },

  runSelfImprovement: () => {
    const { currentFile, getCurrentContent } = useFileStore.getState();
    const output = currentFile
      ? runSelfImprovementOnFile(getCurrentContent(), currentFile)
      : runSessionReflection();
    set({ output });
    useSessionStore.getState().incrementImprovements();
    persistWorkspace();
  },

  launchSwarm: () => {
    const { currentFile } = useFileStore.getState();
    const prompt = launchAgentSwarmPrompt(currentFile);
    set({ output: prompt });
    copyToClipboard(prompt);
    useSessionStore.getState().incrementImprovements();
    persistWorkspace();
  },

  copyOutput: async () => {
    const { output } = get();
    if (!output) return false;
    const ok = await copyToClipboard(output);
    set({ copied: ok });
    setTimeout(() => set({ copied: false }), 1200);
    return ok;
  },
}));