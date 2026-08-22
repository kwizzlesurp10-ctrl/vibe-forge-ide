import { createMCPClient } from '@ai-sdk/mcp';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Initialize a connection to the local Github MCP server
// Note: In a real Cloud Run production environment, this would need to point to a deployed SSE endpoint
// or a bundled binary rather than a local stdio process.
export async function getGithubMCPClient() {
  const transport = new StdioClientTransport({
    command: 'python',
    args: [
      'C:\\Users\\Keith\\mcps\\mcp_generic_server.py',
      '--dir',
      'C:\\Users\\Keith\\mcps\\github'
    ]
  });
  
  const mcpClient = await createMCPClient({
    transport: transport
  });

  return mcpClient;
}

// Example usage to get tools:
export async function getGithubTools() {
  const client = await getGithubMCPClient();
  const tools = await client.tools();
  return tools;
}
