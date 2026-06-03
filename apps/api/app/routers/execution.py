from fastapi import APIRouter, WebSocket
from pydantic import BaseModel
from typing import List, Literal
import asyncio
import json

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
    Execute the agent graph using LangGraph (simulated for now).
    In production this would compile a real StateGraph.
    """
    results = []
    for node in request.nodes:
        await asyncio.sleep(0.4)
        results.append({
            "node_id": node.id,
            "status": "success",
            "reflection": f"Node {node.label} executed successfully via LangGraph",
            "improvement": "Quality improved by 22%"
        })
    return {"status": "completed", "results": results}


@router.websocket("/ws")
async def execution_ws(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            node_id = message.get("node_id")

            # Simulate LangGraph node execution
            for status in ["running", "success"]:
                await websocket.send_json({
                    "type": "node_update",
                    "node_id": node_id,
                    "status": status,
                    "progress": 50 if status == "running" else 100
                })
                await asyncio.sleep(0.7)
    except Exception:
        await websocket.close()