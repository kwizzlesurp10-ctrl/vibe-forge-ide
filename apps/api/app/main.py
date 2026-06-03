from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import agents, execution

app = FastAPI(title="VibeForge Agent API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(execution.router, prefix="/api/execution", tags=["execution"])

@app.get("/health")
async def health():
    return {"status": "ok", "service": "vibe-forge-api"}