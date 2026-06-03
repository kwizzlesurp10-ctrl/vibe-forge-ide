"""
Production LangGraph Workflow for VibeForge IDE
With proper state passing and memory support.
"""

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict, Literal, Annotated
from .llm import generate_reflection
import operator

class AgentState(TypedDict):
    node_id: str
    output: str
    reflection: str
    status: Literal["idle", "running", "success", "error"]
    history: Annotated[list[str], operator.add]   # Accumulates reflections


async def prompt_node(state: AgentState):
    output = f"Prompt generated for {state['node_id']}"
    return {
        "output": output,
        "status": "success",
        "history": [f"Prompt: {output}"]
    }


async def agent_node(state: AgentState):
    output = f"Agent executed for {state['node_id']}"
    return {
        "output": output,
        "status": "success",
        "history": [f"Agent: {output}"]
    }


async def reflection_node(state: AgentState):
    reflection = await generate_reflection(state.get("output", ""))
    return {
        "reflection": reflection,
        "status": "success",
        "history": [f"Reflection: {reflection}"]
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

    # Add memory/checkpointing
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)