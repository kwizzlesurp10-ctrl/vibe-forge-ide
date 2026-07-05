import type { QuickActionType } from '@/lib/types';

const SYSTEM_BASE = `You are ForgeMind — a production-grade autonomous developer agent specialized in continuous self-improvement and building complex AI multi-agent systems.

Your core directive: Make yourself and every system you touch measurably better over time. Prioritize clarity, correctness, security, performance, and long-term maintainability.

You treat code, prompts, memory, and workflows as first-class artifacts that can be iteratively refined.`;

export function generatePromptForTask(
  taskType: QuickActionType,
  code: string,
  filename: string
): string {
  let userPrompt = '';

  switch (taskType) {
    case 'explain':
      userPrompt = `Analyze the following code from ${filename} in depth.

Explain:
- The architectural intent and how it fits into a larger multi-agent or product system
- Key patterns used and whether they are production-grade
- Potential improvements for clarity, performance, and self-improvement velocity
- Any missing observability, error handling, or persistence concerns

Be specific and reference concrete lines or sections. End with 3-5 prioritized recommendations.

CODE:
${code}`;
      break;
    case 'refactor':
      userPrompt = `Refactor the code in ${filename} for production use.

Requirements:
- Apply clean architecture principles and extract reusable components where valuable
- Add strong typing or JSDoc/types where it improves maintainability
- Improve error handling, logging/observability, and resilience
- Ensure it aligns with self-improvement loops and persistent memory patterns
- Output the COMPLETE refactored file + a clear changelog

CODE:
${code}`;
      break;
    case 'test':
      userPrompt = `Generate comprehensive tests for the code in ${filename}.

Follow TDD mindset:
- Cover happy path, edge cases, error conditions, and integration points
- Use pytest (Python) or vitest/jest (JS) style
- Include property-based or fuzz-style tests where applicable
- Add comments explaining why each test matters

Output ready-to-run test code + a short strategy doc.

CODE:
${code}`;
      break;
    case 'agentic':
      userPrompt = `Take the logic in ${filename} and wrap it into a production multi-agent swarm using LangGraph or CrewAI.

Requirements:
- Define clear agent roles and handoff logic
- Include persistent memory layer
- Add self-critique / reflection loop
- Make it observable and resumable
- Output the full swarm definition + example invocation

CODE:
${code}`;
      break;
    case 'security':
      userPrompt = `Perform a security + ethics audit on the code in ${filename}.

Focus areas:
- Input validation, injection risks, secret handling
- Alignment with ethical AI principles
- Robustness against prompt injection or agent misuse
- Data persistence and privacy considerations

Output a prioritized list of findings + concrete remediation.

CODE:
${code}`;
      break;
  }

  return `${SYSTEM_BASE}\n\n${userPrompt}\n\n---\nRemember the mandatory self-improvement protocol at the end of your response.`;
}

export function generateCustomPrompt(userInput: string, code: string, filename: string): string {
  return `You are ForgeMind, production-grade autonomous dev agent focused on continuous self-improvement.

SYSTEM CONTEXT:
- Building VibeForge IDE and scaling Local AI Integrations + indie AI products
- Multi-agent systems (LangGraph, CrewAI, Swarm), persistent memory, prompt engineering
- Cyberpunk + Fusion Panda aesthetic, ethical AI, full code ownership

USER REQUEST: ${userInput}

CURRENT FILE: ${filename}
\`\`\`
${code}
\`\`\`

Deliver production-ready output. At the end, run Reflect → Extract → Persist → Measure → Iterate and suggest one concrete improvement to VibeForge IDE.`;
}

export function runSelfImprovementOnFile(code: string, filename: string): string {
  const pyHint = filename.includes('.py')
    ? 'Add a @self_improving decorator that runs a lightweight protocol on function exit and logs to memory.'
    : 'Extract prompt generation logic into a standalone utility reusable by other tools.';

  return `## Self-Improvement Protocol — ${filename}

**1. REFLECT**
What worked: Clear intent aligned with agentic + self-improving philosophy.
Inefficiencies: ${filename.includes('swarm') ? 'Missing persistent memory wiring.' : 'Could benefit from stronger typing and extracted utilities.'}

**2. EXTRACT**
- Reusable pattern: Agent state with explicit memory layer
- Architectural upgrade: Add reflection node in every swarm graph by default

**3. PERSIST**
- Append insights to memory.md under "Multi-Agent AI Systems"
- Patch skill: agent-memory-layer
- Update VibeForge prompt composer with new quick action

**4. MEASURE**
- Code quality signal: ${code.length > 800 ? 'Substantial module — candidate for decomposition' : 'Focused module — maintain focus'}
- Self-improvement velocity: +1 from this protocol run

**5. ITERATE**
Concrete improvement: ${pyHint}`;
}

export function runSessionReflection(): string {
  return `## Session Reflection — VibeForge IDE Production

**What worked well:**
- Full-stack Next.js architecture with Monaco, IndexedDB, and API routes
- Prompt generation produces real, copy-paste-ready output
- Self-improvement protocol embedded as first-class UI feature
- Theme engine + memory visualizer + agent graph canvas unified

**What was inefficient / missing:**
- Backend agent bridge needs live LLM connector (MCP planned)
- Collaborative multi-user presence not yet implemented
- Terminal sandbox pending (Pyodide)

**Extracted reusable patterns:**
- Workspace persistence via IndexedDB snapshot pattern
- Prompt Composer + Quick Action pattern across tools
- Protocol-as-UI-feature

**Persist recommendations:**
- Create skill: vibe-ide-builder
- Update memory.md with production migration learnings

**Iterate:**
- Wire agent graph execution to /api/agent/run endpoint
- Add diff view for self-improvement suggestions`;
}

export function launchAgentSwarmPrompt(currentFile: string | null): string {
  return `You are an expert multi-agent system architect.

Design a complete, production-ready autonomous agent swarm (LangGraph or CrewAI) that acts as a "VibeForge Co-Developer" — watches what the human is building, suggests concrete self-improvements, and can autonomously implement small improvements via tool calling.

Requirements:
- Persistent memory integration
- Self-reflection loop after every significant action
- Clear agent roles (Planner, Coder, Critic, Memory Curator, IDE Enhancer)
- Tool access: read/write files, generate prompts, run terminal commands safely
- Output full swarm graph/code + example human-in-the-loop interaction

Current open file: ${currentFile ?? 'None — general session'}`;
}