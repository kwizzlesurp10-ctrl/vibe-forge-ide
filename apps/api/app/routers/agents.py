from fastapi import APIRouter
from pydantic import BaseModel
from typing import Literal

router = APIRouter()

class NodeType(BaseModel):
    type: Literal["prompt", "agent", "reflection", "tool"]
    label: str

@router.get("/types")
async def get_node_types():
    return [
        {"type": "prompt", "label": "Prompt"},
        {"type": "agent", "label": "Agent"},
        {"type": "reflection", "label": "Reflection"},
        {"type": "tool", "label": "Tool"},
    ]