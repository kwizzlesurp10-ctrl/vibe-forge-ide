"use client";

import { useState, useEffect, useRef } from "react";

const starterFiles: Record<string, { content: string; lang: string }> = {
  "swarm_forge_core.py": {
    content: `# SwarmForge Core v2.1 - Multi-Agent Orchestration
# Part of your production agent kit for Local AI Integrations + indie launches

from typing import List, Dict, Any;
from langgraph.graph import StateGraph, END;
from langchain_core.messages import BaseMessage;
import asyncio;

class AgentState(TypedDict):
    messages: List[BaseMessage]
    task: str
    context: Dict[str, Any]
    memory: Dict[str, Any]          # Persistent memory ref
    next_agent: str

def create_swarm_graph():
    """Production-ready swarm with memory + self-correction loop"""
    workflow = StateGraph(AgentState)
    
    # Nodes (your custom agents)
    workflow.add_node("planner", planner_node)
    workflow.add_node("researcher", researcher_node)
    workflow.add_node("coder", coder_node)
    workflow.add_node("critic", critic_node)
    workflow.add_node("memory_writer", memory_writer_node)
    
    # Edges + conditional routing
    workflow.set_entry_point("planner")
    workflow.add_edge("planner", "researcher")
    workflow.add_conditional_edges("researcher", route_after_research)
    workflow.add_edge("coder", "critic")
    workflow.add_edge("critic", "memory_writer")
    workflow.add_edge("memory_writer", END)
    
    return workflow.compile()

# TODO: Implement persistent memory integration (your Memory Garden pattern)
# TODO: Add Hermes CLI self-evolution hooks
`,
    lang: "python",
  },
  "prompt_vault_seed.md": {
    content: `# Seed-to-Roots Prompt Vault
## High-signal prompts for agentic coding & creative work

### Core System Prompt (SwarmForge)
You are ForgeMind, a production-grade autonomous dev agent.
Core directive: Make systems measurably better over time.
Every output must include:
1. Concrete code or prompt improvements
2. Why the change improves clarity / perf / maintainability / self-improvement velocity
3. Next measurable step

### Refactor Kill-Shot
"Refactor the following code for production. Apply clean architecture, strong typing where valuable, extract reusable patterns into skills or modules, add comprehensive error handling and observability. Prioritize long-term maintainability over cleverness. Output the full refactored file + a changelog of improvements."

### Agent Swarm Launch Template
"Design a 4-6 agent CrewAI/LangGraph swarm that can autonomously [TASK]. Include persistent memory, tool calling, self-critique loop, and output validation. Use my existing SwarmForge patterns and BADPANDA Orchestra conventions."

### Self-Improvement Protocol (MANDATORY)
After every significant coding task:
1. Reflect: What worked? What was inefficient?
2. Extract: Reusable patterns, new skills, better prompts
3. Persist: Update memory.md + create/patch skills
4. Measure: Track metrics (time, error rate, improvements shipped)
5. Iterate: Apply at least one concrete self-improvement before next task

Current context: Building VibeForge IDE + scaling Local AI Integrations + multiple indie launches.
`,
    lang: "markdown",
  },
};
import ForgeMindCopilot from "@/components/ForgeMindCopilot";

export default function Home() {
  const [files, setFiles] = useState<Record<string, { content: string; lang: string }>>({});
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [sessionImprovements, setSessionImprovements] = useState(3);
  const [promptOutput, setPromptOutput] = useState<React.ReactNode>(
    <div className="text-zinc-500 italic">Generated prompts and self-improvement output will appear here. Ready to paste into Grok, Claude, or your local models.</div>
  );
  const [promptInput, setPromptInput] = useState("");

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Initialize
    setFiles(starterFiles);
    setOpenTabs(["swarm_forge_core.py"]);
    setCurrentFile("swarm_forge_core.py");
  }, []);

  const handleFileClick = (filename: string) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename]);
    }
    setCurrentFile(filename);
  };

  const closeTab = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== filename);
    setOpenTabs(newTabs);
    if (currentFile === filename) {
      setCurrentFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentFile) {
      setFiles(prev => ({
        ...prev,
        [currentFile]: { ...prev[currentFile], content: e.target.value }
      }));
    }
    updateCursorPos(e.target);
  };

  const updateCursorPos = (element: HTMLTextAreaElement) => {
    const val = element.value;
    const start = element.selectionStart;
    const lines = val.substring(0, start).split("\n");
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const runSelfImprovement = () => {
    setPromptOutput(
      <div className="text-sm text-zinc-300">
        ## Session Reflection — VibeForge IDE v0.1<br/><br/>
        Self-improvement triggered. Tracking +1 improvements...
      </div>
    );
    setSessionImprovements(s => s + 1);
  };

  const launchSwarm = async () => {
    setPromptOutput("Launching agent swarm process...");
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Initialize the agent swarm architecture for VibeForge.' })
      });
      const data = await res.json();
      if (res.ok) {
        setPromptOutput(data.text);
        setSessionImprovements(s => s + 1);
      } else {
        setPromptOutput(`Swarm launch failed: ${data.error}`);
      }
    } catch (e) {
      setPromptOutput(`Swarm launch error: ${String(e)}`);
    }
  };

  const generatePrompt = async () => {
    if (!promptInput) return;
    setPromptOutput("Generating optimized prompt...");
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Optimize this prompt for a dev agent: ${promptInput}` })
      });
      const data = await res.json();
      if (res.ok) {
        setPromptOutput(data.text);
      } else {
        setPromptOutput(`Generation failed: ${data.error}`);
      }
    } catch (e) {
      setPromptOutput(`Generation error: ${String(e)}`);
    }
  };

  return (
    <>
      <ForgeMindCopilot />
      <header className="h-14 border-b border-zinc-800 bg-[#0a0a0f] flex items-center px-4 justify-between z-40 shrink-0">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-lime-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <span className="text-[#0a0a0f] text-2xl font-black tracking-tighter">VF</span>
            </div>
            <div>
              <div className="font-display text-2xl font-semibold tracking-tighter flex items-baseline">
                VIBE<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">FORGE</span>
              </div>
              <div className="text-[10px] text-zinc-500 -mt-1.5 font-mono">AGENTIC • SELF-IMPROVING</div>
            </div>
          </div>
          <div className="h-6 w-px bg-zinc-800"></div>
          <div className="flex items-center gap-x-2 text-sm">
            <div className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs flex items-center gap-x-1.5">
              <i className="fa-solid fa-project-diagram text-cyan-400"></i>
              <span className="font-medium">forge-mind-v0.1</span>
            </div>
            <div className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 flex items-center gap-x-1">
              <i className="fa-solid fa-check-double text-[10px]"></i>
              <span className="font-mono">SYNCED</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <button onClick={runSelfImprovement} className="px-4 py-1.5 text-xs font-semibold rounded-xl border border-lime-500/30 hover:bg-lime-950 transition flex items-center gap-x-2 text-lime-400 hover:text-lime-300">
            <i className="fa-solid fa-sync fa-sm"></i>
            <span>SELF-IMPROVE SESSION</span>
          </button>
          <button onClick={launchSwarm} className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:brightness-110 transition flex items-center gap-x-2 text-white shadow-lg shadow-fuchsia-500/30">
            <i className="fa-solid fa-rocket fa-sm"></i>
            <span>LAUNCH AGENT SWARM</span>
          </button>
          <div className="flex items-center gap-x-1 pl-3 border-l border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center ring-1 ring-offset-2 ring-offset-[#0a0a0f] ring-zinc-700 overflow-hidden">
              <span className="text-lg">🐼</span>
            </div>
            <div className="text-xs leading-none">
              <div className="font-medium">Keith</div>
              <div className="text-[10px] text-zinc-500">Local AI</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex ide-container flex-1 min-h-0">
        <div className="w-72 border-r border-zinc-800 flex flex-col bg-[#0a0a0f]">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="section-header flex items-center gap-x-2">
              <i className="fa-solid fa-folder-tree"></i>
              <span>EXPLORER</span>
            </div>
            <div className="flex gap-x-1">
              <button className="w-7 h-7 flex items-center justify-center hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition" title="New File">
                <i className="fa-solid fa-plus fa-sm"></i>
              </button>
              <button className="w-7 h-7 flex items-center justify-center hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition" title="Refresh">
                <i className="fa-solid fa-sync fa-sm"></i>
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 text-sm">
            {Object.keys(files).map(filename => (
              <div key={filename} onClick={() => handleFileClick(filename)} className={`file-item flex items-center gap-x-2.5 px-3 py-2 rounded-xl cursor-pointer text-sm ${currentFile === filename ? 'active' : ''}`}>
                <i className={`fa-solid ${filename.endsWith('.py') ? 'fa-python' : filename.endsWith('.md') ? 'fa-markdown' : 'fa-file-code'} w-4 text-zinc-400`}></i>
                <span className="flex-1 truncate">{filename}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 p-3">
            <div className="section-header mb-2 px-1">QUICK LAUNCH</div>
            <div className="space-y-1 text-xs">
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 flex items-center gap-x-2.5 text-zinc-300 hover:text-white transition group">
                <i className="fa-solid fa-network-wired w-4 text-cyan-400 group-hover:text-cyan-300"></i>
                <span>SwarmForge Core</span>
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-900 flex items-center gap-x-2.5 text-zinc-300 hover:text-white transition group">
                <i className="fa-solid fa-magic w-4 text-fuchsia-400 group-hover:text-fuchsia-300"></i>
                <span>Prompt Vault • Seed-to-Roots</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-11 bg-[#0a0a0f] border-b border-zinc-800 flex items-center px-2 overflow-x-auto shrink-0">
            {openTabs.map(filename => (
              <div key={filename} onClick={() => setCurrentFile(filename)} className={`tab flex items-center gap-x-2 px-4 h-9 text-sm rounded-t-2xl cursor-pointer select-none ${currentFile === filename ? 'active' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'}`}>
                <span className="font-medium">{filename}</span>
                <button className="ml-1 w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-full" onClick={(e) => closeTab(filename, e)}>
                  <i className="fa-solid fa-times fa-xs"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="flex-1 relative bg-[#0f0f14] flex flex-col">
            <div className="flex-1 p-4 overflow-hidden">
              <textarea
                ref={editorRef}
                id="editor"
                className="w-full h-full p-4 font-mono text-sm leading-relaxed border border-zinc-800 focus:border-cyan-500/50 rounded-2xl bg-[#0f0f14] text-zinc-200"
                spellCheck="false"
                placeholder="Select a file..."
                value={currentFile ? files[currentFile]?.content : ""}
                onChange={handleEditorChange}
                onClick={(e) => updateCursorPos(e.currentTarget)}
                onKeyUp={(e) => updateCursorPos(e.currentTarget)}
              />
            </div>
            <div className="h-8 shrink-0 px-4 flex items-center justify-between text-[10px] text-zinc-500 border-t border-zinc-800 bg-[#0a0a0f]">
              <div className="flex items-center gap-x-4">
                <div className="font-mono px-2 py-0.5 bg-zinc-900 rounded">{currentFile?.split('.').pop()?.toUpperCase() || 'TEXT'}</div>
                <div>UTF-8</div>
              </div>
              <div className="flex items-center gap-x-3">
                <div>Ln {cursorPos.line}, Col {cursorPos.col}</div>
                <div className="w-px h-3 bg-zinc-700"></div>
                <div>{currentFile ? files[currentFile]?.content.length : 0} chars</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 border-l border-zinc-800 flex flex-col bg-[#0a0a0f]">
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <i className="fa-solid fa-robot text-cyan-400"></i>
              <div>
                <div className="font-semibold text-sm">FORGEMIND</div>
                <div className="text-[10px] text-emerald-400">Agentic Copilot • Ready</div>
              </div>
            </div>
            <div className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 font-mono">v0.1</div>
          </div>
          <div className="p-3 border-b border-zinc-800">
            <div className="section-header mb-2 px-1">QUICK ACTIONS</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button className="action-btn px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-left flex flex-col items-start">
                <div className="font-medium">Explain Code</div>
                <div className="text-[10px] text-zinc-500">Deep reasoning</div>
              </button>
              <button className="action-btn px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-left flex flex-col items-start">
                <div className="font-medium">Refactor Prod</div>
                <div className="text-[10px] text-zinc-500">Clean arch + types</div>
              </button>
              <button className="action-btn px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-left flex flex-col items-start col-span-2">
                <div className="font-medium">Security + Ethics Audit</div>
                <div className="text-[10px] text-zinc-500">Non-exploitative, robust, aligned</div>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col p-3 min-h-0">
            <div className="section-header mb-1.5 px-1">PROMPT COMPOSER</div>
            <textarea
              className="flex-1 resize-none text-xs p-3 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono focus:border-cyan-500/40 outline-none"
              placeholder="Describe what you want to do with the current code..."
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button onClick={generatePrompt} className="flex-1 py-2 text-xs font-semibold rounded-2xl bg-white text-[#0a0a0f] hover:bg-zinc-100 active:scale-[0.985] transition flex items-center justify-center gap-x-2">
                <i className="fa-solid fa-magic"></i>
                <span>GENERATE PROMPT</span>
              </button>
              <button onClick={() => setPromptInput('')} className="px-4 py-2 text-xs rounded-2xl border border-zinc-700 hover:bg-zinc-900 transition">
                <i className="fa-solid fa-eraser"></i>
              </button>
            </div>
          </div>
          <div className="border-t border-zinc-800 p-3 flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <div className="section-header">OUTPUT / READY PROMPT</div>
              <button className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center gap-x-1 text-cyan-400">
                <i className="fa-solid fa-copy fa-xs"></i>
                <span>COPY</span>
              </button>
            </div>
            <div className="prompt-output flex-1 overflow-auto p-3 text-xs border border-zinc-800 rounded-2xl bg-[#0a0a0f] text-zinc-300">
              {promptOutput}
            </div>
          </div>
        </div>
      </div>

      <div className="status-bar h-7 px-4 flex items-center justify-between text-xs text-zinc-400 font-mono shrink-0">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-1.5">
            <i className="fa-solid fa-microchip text-emerald-400"></i>
            <span>Local Agents: <span className="text-emerald-400">4 active</span></span>
          </div>
          <div>Mode: <span className="text-cyan-400">Self-Improving</span></div>
        </div>
        <div className="flex items-center gap-x-4">
          <div>Improvements this session: <span className="text-lime-400 font-semibold">{sessionImprovements}</span></div>
          <div className="text-emerald-400 flex items-center gap-x-1">
            <i className="fa-solid fa-check-circle"></i>
            <span className="font-medium">All systems nominal</span>
          </div>
        </div>
      </div>
    </>
  );
}
