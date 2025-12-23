
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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
      evaluation: "Pending" // Placeholder for evaluation logic
    };

    const filePath = path.join(process.cwd(), "app/data/transcripts", `${transcriptId}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, id: transcriptId });
  } catch (error) {
    console.error("Error saving transcript:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  // Optional: List all transcripts
  const dirPath = path.join(process.cwd(), "app/data/transcripts");
  if (!fs.existsSync(dirPath)) return NextResponse.json({ transcripts: [] });
  
  const files = fs.readdirSync(dirPath);
  const transcripts = files.map(file => {
     const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
     return JSON.parse(content);
  });
  
  return NextResponse.json({ transcripts });
}
