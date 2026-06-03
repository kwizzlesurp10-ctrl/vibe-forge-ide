"""
LLM Provider Abstraction for VibeForge
"""

import os
from langchain_core.language_models import BaseChatModel
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

def get_llm() -> BaseChatModel:
    """Returns the configured LLM (defaults to OpenAI if key is present)."""
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        return ChatOpenAI(model="gpt-4o-mini", temperature=0.3, api_key=api_key)
    # Fallback to a dummy model for development without keys
    return None

async def generate_reflection(prompt: str) -> str:
    llm = get_llm()
    if llm is None:
        return f"[DEV] Simulated reflection on: {prompt[:80]}..."

    messages = [HumanMessage(content=f"Reflect on this output and suggest one concrete improvement:\n\n{prompt}")]
    response = await llm.ainvoke(messages)
    return response.content