"""
Production LangGraph Workflow for VibeForge IDE
"""

from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

class AgentState(TypedDict):
    node_id: str
    output: str
    reflection: str
    status: Literal["idle", "running", "success", "error"]


def prompt_node(state: AgentState):
    return {"output": f"Prompt generated for {state['node_id']}", "status": "success"}


def agent_node(state: AgentState):
    return {"output": f"Agent executed for {state['node_id']}", "status": "success"}


def reflection_node(state: AgentState):
    return {
        "reflection": f"Reflection complete for {state['node_id']}",
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