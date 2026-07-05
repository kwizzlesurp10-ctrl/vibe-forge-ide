import type { ForgeFile } from '@/lib/types';

export const STARTER_FILES: Record<string, ForgeFile> = {
  'swarm_forge_core.py': {
    lang: 'python',
    updatedAt: Date.now(),
    content: `# SwarmForge Core v2.1 - Multi-Agent Orchestration
# Part of your production agent kit for Local AI Integrations + indie launches

from typing import List, Dict, Any, TypedDict
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage
import asyncio

class AgentState(TypedDict):
    messages: List[BaseMessage]
    task: str
    context: Dict[str, Any]
    memory: Dict[str, Any]
    next_agent: str

def create_swarm_graph():
    """Production-ready swarm with memory + self-correction loop"""
    workflow = StateGraph(AgentState)

    workflow.add_node("planner", planner_node)
    workflow.add_node("researcher", researcher_node)
    workflow.add_node("coder", coder_node)
    workflow.add_node("critic", critic_node)
    workflow.add_node("memory_writer", memory_writer_node)

    workflow.set_entry_point("planner")
    workflow.add_edge("planner", "researcher")
    workflow.add_conditional_edges("researcher", route_after_research)
    workflow.add_edge("coder", "critic")
    workflow.add_edge("critic", "memory_writer")
    workflow.add_edge("memory_writer", END)

    return workflow.compile()

# TODO: Implement persistent memory integration (Memory Garden pattern)
# TODO: Add Hermes CLI self-evolution hooks
`,
  },
  'prompt_vault_seed.md': {
    lang: 'markdown',
    updatedAt: Date.now(),
    content: `# Seed-to-Roots Prompt Vault
## High-signal prompts for agentic coding & creative work

### Core System Prompt (SwarmForge)
You are ForgeMind, a production-grade autonomous dev agent.
Core directive: Make systems measurably better over time.
Every output must include:
1. Concrete code or prompt improvements
2. Why the change improves clarity / perf / maintainability
3. Next measurable step

### Refactor Kill-Shot
"Refactor the following code for production. Apply clean architecture, strong typing where valuable, extract reusable patterns into skills or modules, add comprehensive error handling and observability."

### Agent Swarm Launch Template
"Design a 4-6 agent CrewAI/LangGraph swarm that can autonomously [TASK]. Include persistent memory, tool calling, self-critique loop, and output validation."

### Self-Improvement Protocol (MANDATORY)
After every significant coding task:
1. Reflect → 2. Extract → 3. Persist → 4. Measure → 5. Iterate
`,
  },
  'agent_memory_architecture.md': {
    lang: 'markdown',
    updatedAt: Date.now(),
    content: `# Agent Memory Architecture — Production Notes

### Core Principles
- Durable cross-session storage (Google Drive + local snapshots)
- Selective high-value memory only (avoid bloat)
- Timestamped snapshots + state JSON for diffing progress
- Integration with skills/ folder for reusable capabilities

### Recommended Layers
1. **Ephemeral**: Current task + recent messages
2. **Session Memory**: IndexedDB / OPFS for IDE state
3. **Persistent Memory**: memory.md + Drive sync
4. **Skill Memory**: Reusable workflows as SKILL.md files
5. **Vector / Semantic**: Embeddings of past reflections

### Next Upgrade
Add memory diffing between snapshots to visualize capability growth over weeks.
`,
  },
  'self_improvement_protocol.js': {
    lang: 'javascript',
    updatedAt: Date.now(),
    content: `// Self-Improvement Protocol — Embedded in VibeForge IDE

export const SELF_IMPROVEMENT_PROTOCOL = {
  name: "Reflect → Extract → Persist → Measure → Iterate",
  version: "2.0.0",
  mandatory: true,
  steps: [
    { id: "reflect", description: "Analyze what worked and what was inefficient" },
    { id: "extract", description: "Identify reusable patterns, skills, and upgrades" },
    { id: "persist", description: "Write improvements to memory and skills" },
    { id: "measure", description: "Track metrics: time, error rate, improvements shipped" },
    { id: "iterate", description: "Apply at least one concrete self-improvement" },
  ],
};

console.log("Self-improvement protocol loaded.");
`,
  },
};

export const STARTER_TEMPLATES: Record<string, string> = {
  swarmforge: 'swarm_forge_core.py',
  promptvault: 'prompt_vault_seed.md',
  memoryarch: 'agent_memory_architecture.md',
  selfimprove: 'self_improvement_protocol.js',
};