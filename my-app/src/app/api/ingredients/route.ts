import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (request: NextRequest) => {
  const { text } = await request.json();

  const response = await inference.textClassification({
    model: "microsoft/phi-3-mini-128k-instruct",
    inputs: `Extract ingredients from the following text: ${text}`,
  });

  return Response.json({
    ingredients: response,
  });
};
