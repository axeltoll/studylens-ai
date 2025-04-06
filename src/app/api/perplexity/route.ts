import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { query, files } = await req.json();
    
    if (!query && (!files || files.length === 0)) {
      return NextResponse.json(
        { error: "Query or files are required" },
        { status: 400 }
      );
    }

    // The API key should be in environment variables
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Perplexity API key is not configured" },
        { status: 500 }
      );
    }

    // Construct prompt based on query and files
    let prompt = query || "";
    if (files && files.length > 0) {
      prompt += "\n\nAdditional context from documents:\n";
      files.forEach((file: any) => {
        prompt += `\n${file.name}: ${file.content}\n`;
      });
    }

    // Call Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "sonar-medium-online",
        messages: [
          { 
            role: "system", 
            content: "You are a research assistant that provides comprehensive information with academic citations. Your answers should be thorough, well-structured, and backed by credible sources. Include references to recent research papers, academic journals, and authoritative publications whenever possible."
          },
          { role: "user", content: prompt }
        ],
        options: {
          stream: true
        }
      })
    });

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in Perplexity API:", error);
    return NextResponse.json(
      { error: "Failed to process research request" },
      { status: 500 }
    );
  }
} 