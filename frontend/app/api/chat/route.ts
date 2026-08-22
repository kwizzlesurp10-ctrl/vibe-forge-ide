import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getGithubTools } from '@/lib/mcp/github';

// Initialize the OpenAI provider with Vercel AI Gateway
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-local-dev', // Ensure you have this in .env.local
});

// Allow streaming responses up to 5 minutes
export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Dynamically load tools from the Github MCP server 
    // (In production, these would be statically compiled via mcp-to-ai-sdk)
    const tools = await getGithubTools();

    // Use streamText for real-time streaming to the useChat hook
    const result = streamText({
      model: openai('gpt-4o'), // Basic coding model with advanced capability
      system: `You are ForgeMind, a highly advanced, self-evolving AI coding assistant (represented visually as a FusionPanda). 
You help the user write, refactor, and execute code within the Vibe Forge IDE.
You have access to MCP tools to interact with the environment (e.g., GitHub).
Always be concise, agentic, and offer self-improving suggestions.`,
      messages,
      tools: tools,
      onStepFinish(stepResult: any) {
        const { text, toolCalls, toolResults } = stepResult;
        if (toolCalls && toolCalls.length > 0) {
          console.log(`[ForgeMind] Executed tools: ${toolCalls.map((t: any) => t.toolName).join(', ')}`);
        }
      }
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in streamText route:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
