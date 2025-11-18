import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const prompt = formData.get("prompt") as File;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (prompt) {
    }

    const response = await hf.chatCompletion({
      provider: "nebius",
      model: "google/gemma-3-27b-it",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "explan this photo.",
            },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    const generatedText = response.choices[0]?.message?.content || "";

    return NextResponse.json({ text: generatedText.trim() });
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
