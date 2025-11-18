import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "zurag oroogui baina" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();

  const result = await inference.imageToText({
    model: "nlpconnect/vit-gpt2-image-captioning",
    inputs: new Blob([buffer]),
  });

  return Response.json({
    description: result.generated_text,
  });
};
