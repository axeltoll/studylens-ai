import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { OpenAI } from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  let messages;
  let systemPrompt = "You are a helpful AI assistant";
  
  // Handle different request formats
  if (body.messages) {
    // Use the messages array directly if provided
    messages = body.messages;
  } else if (body.message) {
    // Convert a single message to the messages array format
    messages = [
      { role: "user", content: body.message }
    ];
    
    // Adjust system prompt based on context if provided
    if (body.context === "code") {
      systemPrompt = "You are an expert programming assistant. Provide clear, efficient code examples with explanations. Format code blocks with ```language syntax. Focus on best practices.";
    } else if (body.context === "essay") {
      systemPrompt = "You are an expert writing assistant. Help create well-structured essays with proper grammar, compelling arguments, and clear organization. Provide guidance on thesis statements, topic sentences, and transitions.";
    } else if (body.quizMode) {
      systemPrompt = "You are an academic assistant providing educational help. Give comprehensive, accurate answers based on established academic knowledge. Include relevant facts, definitions, and explanations.";
    }
  } else {
    // If neither format is provided, return an error
    return Response.json({ error: "Invalid request format" }, { status: 400 });
  }
  
  // Use the model specified in environment variables or fallback to gpt-4-turbo
  const model = process.env.OPENAI_API_MODEL || "gpt-4-turbo";
  
  try {
    // For single message format, use direct completion instead of streaming
    if (body.message) {
      const openaiClient = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      
      const response = await openaiClient.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body.message }
        ]
      });
      
      return Response.json({ content: response.choices[0].message.content });
    }
    
    // For messages array format, use streaming
    const result = await streamText({
      model: openai(model),
      messages: convertToCoreMessages(messages),
      system: systemPrompt,
    });
    
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
