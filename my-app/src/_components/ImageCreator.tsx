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
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image src={"/Article.svg"} height={26} width={26} alt="icon" />
          <span className="text-2xl font-semibold">
            Food Image Creator
          </span>
        </div>
        <Button variant="outline" onClick={refreshForm}>
          <Image src={"/reload.svg"} height={16} width={16} alt="reload" />
        </Button>
      </div>

      <p className="text-gray-400 mt-2">
        What food image do you want? Describe it briefly.
      </p>

      <textarea
        className="border rounded-md mt-4 px-3 py-2 w-full h-[130px]"
        placeholder="Image prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-3 w-full p-3 bg-black text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div className="mt-6">
        <div className="flex gap-2 items-center">
          <Image src={"/Vector.svg"} height={24} width={24} alt="result" />
          <span className="font-semibold text-xl">Result</span>
        </div>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated food"
            className="w-full rounded-md mt-2"
          />
        ) : (
          <p className="mt-2 text-gray-500">
            First, enter your text to generate an image.
          </p>
        )}
      </div>
    </div>
  );
}