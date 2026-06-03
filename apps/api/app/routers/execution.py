from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from typing import List, Literal
import asyncio
import json

from packages.agent_core.langgraph_workflow import build_vibe_graph, AgentState

router = APIRouter()

class GraphNode(BaseModel):
    id: str
    type: Literal["prompt", "agent", "reflection", "tool"]
    label: str

class RunGraphRequest(BaseModel):
    nodes: List[GraphNode]
    edges: List[dict]

@router.post("/run")
async def run_graph(request: RunGraphRequest):
    """
    Execute the agent graph using real LangGraph + LLM.
    """
    graph = build_vibe_graph()
    results = []

    for node in request.nodes:
        state: AgentState = {
            "node_id": node.id,
            "output": "",
            "reflection": "",
            "status": "running"
        }
        result = await graph.ainvoke(state)
        results.append({
            "node_id": node.id,
            "status": result.get("status", "success"),
            "reflection": result.get("reflection", ""),
            "improvement": "LLM-powered reflection applied"
        })
        await asyncio.sleep(0.2)

    return {"status": "completed", "results": results}


@router.websocket("/ws")
async def execution_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            node_id = message.get("node_id")

            for status in ["running", "success"]:
                await websocket.send_json({
                    "type": "node_update",
                    "node_id": node_id,
                    "status": status,
                    "progress": 50 if status == "running" else 100
                })
                await asyncio.sleep(0.6)
    except Exception:
        await websocket.close()