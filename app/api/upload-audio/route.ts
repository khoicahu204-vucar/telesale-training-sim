
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const filename = `recordings/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading to Blob:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
