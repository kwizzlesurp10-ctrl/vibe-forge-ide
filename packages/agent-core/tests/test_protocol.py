import pytest
from agent_core.protocol import SelfImprovementProtocol

def test_protocol_initialization():
    protocol = SelfImprovementProtocol()
    assert protocol.llm_provider == "openai"
    assert protocol.history == []

@pytest.mark.asyncio
async def test_reflect():
    protocol = SelfImprovementProtocol()
    result = await protocol.reflect("node-1", "Some output text")
    assert result["node_id"] == "node-1"
    assert "reflection" in result
    assert result["status"].value == "success"