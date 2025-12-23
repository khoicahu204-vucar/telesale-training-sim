
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { scenarios } from "@/app/data/scenarios";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey });

  try {
    const { messages, scenarioId } = await req.json();

    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (!scenario) {
      return NextResponse.json({ error: "Scenario not found" }, { status: 404 });
    }

    const systemPrompt = `
      You are roleplaying as a customer named ${scenario.customerName}.
      Role: ${scenario.role}
      Objective: ${scenario.objective}
      Context: ${scenario.context}
      
      You are talking to a Call Center Agent.
      React naturally to the agent. If they are helpful, you can calm down (if angry).
      If they are rude or unhelpful, react accordingly.
      Keep your responses relatively short, conversational, and spoken-style.
      
      Do not break character. Do not include *actions* in the text, only what you say.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
    });

    return NextResponse.json({
      role: "assistant",
      content: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
