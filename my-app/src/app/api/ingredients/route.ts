import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [{ role: "user", content: `Extract from: ${prompt}` }],
    });

    const generatedText = response.choices?.[0]?.message?.content || "";

    return NextResponse.json({ text: generatedText.trim() });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
