import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { getGithubTools } from '@/lib/mcp/github';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Dynamically load the tools from the GitHub MCP server
    const tools = await getGithubTools();

    // Call the model using the AI SDK, providing the tools
    const result = await generateText({
      model: openai('gpt-4o'),
      tools: tools,
      prompt: prompt || 'Summarize my recent GitHub activity.',
    });

    return new Response(JSON.stringify({ text: result.text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in agent route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
