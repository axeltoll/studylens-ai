import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

interface Flashcard {
  front: string;
  back: string;
}

export async function POST(req: Request) {
  try {
    const { text, count = 10 } = await req.json();
    
    if (!text) {
      return NextResponse.json(
        { error: "Text content is required" },
        { status: 400 }
      );
    }

    // Use the model specified in environment variables or fallback to gpt-4-turbo
    const model = process.env.OPENAI_API_MODEL || "gpt-4-turbo";

    // Generate flashcards using AI
    const response = await streamText({
      model: openai(model),
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that generates high-quality flashcards.
            You will be given some content and should create ${count} flashcards based on it.
            Each flashcard should have a "front" with a question or key term 
            and a "back" with the answer or definition.
            
            Format your response as a valid JSON array of objects with "front" and "back" properties.
            Example format:
            [
              {
                "front": "Question or key term",
                "back": "Answer or definition"
              }
            ]
            
            Respond with ONLY the JSON array without any additional text.`
        },
        {
          role: "user",
          content: `Generate ${count} flashcards based on the following content:\n\n${text}`
        }
      ],
      temperature: 0.5,
      maxTokens: 2000,
    });

    // Return streaming response for client-side parsing
    return response.toDataStreamResponse();
  } catch (error) {
    console.error("Error in flashcards API:", error);
    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
} 