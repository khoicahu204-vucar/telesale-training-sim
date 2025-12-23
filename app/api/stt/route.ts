
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
  }
  const openai = new OpenAI({ apiKey });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // OpenAI expects a file object compatible with their SDK
    // conversion might be needed depending on environment, but usually passing the Blob/File works or creating a ReadStream
    
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "vi", // Hint for Vietnamese
      prompt: "Hội thoại mua bán xe ô tô cũ. Nội dung ngắn gọn, không có tạp âm.", // Context hint
      temperature: 0, // Deterministic
    });

    let text = transcription.text.trim();
    
    // Filter out common Whisper hallucinations
    const hallucinations = [
      "Cảm ơn các bạn đã theo dõi",
      "hẹn gặp lại các bạn",
      "trong những video tiếp theo",
      "Subtitles by",
      "Amara.org"
    ];

    const isHallucination = hallucinations.some(h => text.includes(h));
    if (isHallucination || text.length < 2) {
      text = ""; // Treat as silence
    }

    return NextResponse.json({ text: text });
  } catch (error) {
    console.error("Error in STT API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
