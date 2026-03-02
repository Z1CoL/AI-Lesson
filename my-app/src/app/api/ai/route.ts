// import { NextRequest } from "next/server";
// import { InferenceClient } from "@huggingface/inference";

// const HF_TOKEN = process.env.HF_TOKEN;
// const inference = new InferenceClient(HF_TOKEN);

// export const POST = async (request: NextRequest) => {
//   const data = await request.json();
//   const blob = (await inference.textToImage({
//     model: "black-forest-labs/FLUX.1-schnell",
//     inputs: data.prompt,
//   })) as any;

//   // Convert blob to buffer
//   const buffer = await blob.arrayBuffer();
//   console.log(buffer);
//   // Return the image as a response
//   return new Response(buffer, {
//     headers: {
//       "Content-Type": "image/png",
//     },
//   });
// };
import { NextRequest } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) throw new Error("HF_TOKEN is missing");

const inference = new InferenceClient(HF_TOKEN);

type Body = { prompt: string };

export async function POST(request: NextRequest) {
  const data: unknown = await request.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("prompt" in data) ||
    typeof (data as { prompt: unknown }).prompt !== "string"
  ) {
    return new Response(
      JSON.stringify({ error: "Invalid body. Expected { prompt: string }" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = data as Body;

  // ✅ Гол fix: outputType: "blob"
  const blob = await inference.textToImage(
    {
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: body.prompt,
    },
    { outputType: "blob" },
  );

  return new Response(blob, {
    headers: { "Content-Type": "image/png" },
  });
}
