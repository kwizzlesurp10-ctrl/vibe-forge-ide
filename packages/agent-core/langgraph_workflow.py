"""
Production LangGraph Workflow for VibeForge IDE
"""

from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal, Any
from .llm import generate_reflection

class AgentState(TypedDict):
    node_id: str
    output: str
    reflection: str
    status: Literal["idle", "running", "success", "error"]


async def prompt_node(state: AgentState):
    return {"output": f"Prompt generated for {state['node_id']}", "status": "success"}


async def agent_node(state: AgentState):
    return {"output": f"Agent executed for {state['node_id']}", "status": "success"}


async def reflection_node(state: AgentState):
    reflection = await generate_reflection(state.get("output", ""))
    return {
        "reflection": reflection,
        "status": "success"
    }


def build_vibe_graph():
    workflow = StateGraph(AgentState)

    workflow.add_node("prompt", prompt_node)
    workflow.add_node("agent", agent_node)
    workflow.add_node("reflection", reflection_node)

    workflow.set_entry_point("prompt")
    workflow.add_edge("prompt", "agent")
    workflow.add_edge("agent", "reflection")
    workflow.add_edge("reflection", END)

    return workflow.compile()