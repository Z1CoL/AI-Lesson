"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageCreator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshForm = () => {
    setPrompt("");
    setImageUrl("");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate image");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      alert("Image generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[580px]">
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          <Image src={"Article.svg"} height={26} width={26} alt="" />
          <span className="size-xl font-semibold text-2xl">
            Food image creator
          </span>
        </div>
        <Button variant="outline" onClick={refreshForm} type="button">
          <Image src={"reload.svg"} height={16} width={16} alt="" />
        </Button>
      </div>

      <span className="text-gray-400">
        What food image do you want? Describe it briefly.
      </span>

      <input
        className="border border-gray-300 rounded-md mt-4 px-3 py-2 w-full h-[130px]"
        placeholder="image prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="mt-3 ml-[490px] p-3 bg-black text-white rounded-md opacity-20 "
      >
        Generate
      </button>

      <div className="flex gap-2">
        <Image src={"/Vector.svg"} height={24} width={24} alt="" />
        <span className="font-semibold text-[20px] ">Result</span>
      </div>

      {imageUrl ? (
        <div className="mt-2">
          <img src={imageUrl} alt="Generated" className="w-full rounded-md" />
        </div>
      ) : (
        <p className="mt-2 text-gray-500">
          First, enter your text to generate an image.
        </p>
      )}
    </div>
  );
}
