# VibeForge IDE

**Production-grade agentic IDE for continuous self-improvement of AI systems.**

Cyberpunk panda aesthetic • React Flow node editor • LangGraph-powered agents • Self-Improvement Protocol

---

## Architecture (Production Monorepo)

```
vibe-forge-ide/
├── apps/
│   ├── web/                 # Next.js 15 + TypeScript + React Flow
│   └── api/                 # FastAPI + WebSocket execution
├── packages/
│   └── agent-core/          # SelfImprovementProtocol engine
├── .github/workflows/       # Production CI
└── docker-compose.yml
```

---

## Quick Start (Local Development)

```bash
# Frontend
cd apps/web
npm install
npm run dev

# Backend (separate terminal)
cd apps/api
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Full Stack with Docker

```bash
docker compose up --build
```

---

## Key Features (Current)

- **React Flow Node Editor** — Drag, connect, and manage typed agent nodes
- **Node Palette** — Prompt, Agent, Reflection, Tool
- **Self-Improvement Protocol Panel** — Live reflection history
- **Graph Persistence** — Survives page refresh
- **Run Graph Simulation** — Realistic execution status updates
- **Production CI** — TypeScript, lint, build, Python checks

---

## Roadmap

- Real LangGraph backend execution
- Persistent graph storage (Postgres)
- Multi-agent swarm orchestration
- Cost & token tracking
- Full deployment pipeline (Vercel + Railway)

---

**Status:** Phase 1 complete — Production foundation + interactive node editor established. This is the opposite of an MVP throwaway.

Built with strict production standards from day one.