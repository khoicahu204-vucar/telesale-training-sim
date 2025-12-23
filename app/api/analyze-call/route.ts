import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey });

  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages to analyze" }, { status: 400 });
    }

    const transcriptText = messages.map((m: any) => `${m.speaker === "agent" ? "Agent" : "Customer"}: ${m.text}`).join("\n");

    const systemPrompt = `
      You are a Quality Assurance Specialist for a Vehicle Sales Call Center. 
      Analyze the following call transcript between a Sales Agent and a Customer.
      
      Provide the output in JSON format with the following keys:
      - sentiment: "Positive" | "Neutral" | "Negative" (In Vietnamese: Tích cực | Trung tính | Tiêu cực)
      - score: number (0-10) based on professionalism, problem solving, and closing skills.
      - summary: A brief summary of the conversation (max 3 sentences). Must be in Vietnamese.
      - strengths: A string listing what the agent did well. Must be in Vietnamese.
      - improvements: A string listing what the agent can improve. Must be in Vietnamese.
      
      IMPORTANT: All text fields must be in Vietnamese.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: transcriptText }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    // Save report to Blob
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `reports/report-${timestamp}.json`;
      
      const reportData = {
        timestamp: new Date().toISOString(),
        analysis: result,
        transcript: messages
      };

      const blob = await put(filename, JSON.stringify(reportData, null, 2), {
        access: "public",
        contentType: "application/json"
      });
      console.log(`Report saved to Blob URL: ${blob.url}`);

    } catch (blobError) {
      console.error("Error saving report to Blob:", blobError);
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in Analysis API:", error);
    return NextResponse.json({ error: "Analysis Failed" }, { status: 500 });
  }
}
