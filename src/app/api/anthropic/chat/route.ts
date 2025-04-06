import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  // Use the model specified in environment variables or fallback to claude-3-sonnet
  const model = process.env.ANTHROPIC_MODEL || "claude-3-sonnet-20240229";
  
  const result = await streamText({
    model: anthropic(model),
    messages: convertToCoreMessages(messages),
    system: "You are a helpful AI assistant",
  });

  return result.toDataStreamResponse();
}
