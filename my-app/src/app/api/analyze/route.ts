import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN!;
const inference = new InferenceClient(HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    console.log("FORMDATA >>", formData);
    console.log("IMAGE >>", formData.get("image"));

    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const results = await inference.objectDetection({
      model: "facebook/detr-resnet-50",
      data: image,
    });

    return NextResponse.json({ objects: results });
  } catch (err) {
    console.error("ERROR >>", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
