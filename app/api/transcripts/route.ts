import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const { messages, scenarioId, agentId } = await req.json();
    
    if (!messages || !scenarioId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const transcriptId = `transcript-${Date.now()}`;
    const data = {
      id: transcriptId,
      timestamp: new Date().toISOString(),
      agentId: agentId || "anonymous",
      scenarioId,
      messages,
      evaluation: "Pending"
    };

    const filename = `transcripts/${transcriptId}.json`;
    
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: "public",
      contentType: "application/json"
    });

    console.log(`Transcript saved to Blob URL: ${blob.url}`);

    return NextResponse.json({ success: true, id: transcriptId, url: blob.url });
  } catch (error) {
    console.error("Error saving transcript:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Listing not supported in Vercel Blob mode yet" });
}
