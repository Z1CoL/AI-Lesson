"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

type DetectedObject = {
  label: string;
  score: number;
};

type AnalyzeResponse = {
  objects?: DetectedObject[];
  error?: string;
};

export default function ImageAnalysis() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [summaryText, setSummaryText] = useState(
    "First, upload your image to recognize ingredients.",
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setUploadedImageUrl(URL.createObjectURL(file));
      setDetectedObjects([]);
      setSummaryText("Image uploaded. Click Generate to analyze.");
    }
  };

  const analyzeImage = async () => {
    if (!uploadedImage) return;

    setAnalyzing(true);
    setDetectedObjects([]);
    setSummaryText("Analyzing image...");

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as AnalyzeResponse;

      if (response.ok) {
        const objects = data.objects ?? [];
        setDetectedObjects(objects);

        if (objects.length === 0) {
          setSummaryText("No ingredients detected.");
        } else {
          const labels = objects.map((obj) => obj.label).join(", ");
          setSummaryText(`Detected ingredients: ${labels}`);
        }
      } else {
        setSummaryText(data.error ?? "Failed to analyze image.");
      }
    } catch (err) {
      console.error(err);
      setSummaryText("An error occurred.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-[580px]">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Image src={"/Article.svg"} height={26} width={26} alt="icon" />
          <span className="text-2xl font-semibold">Image Analysis</span>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          onClick={analyzeImage}
          disabled={analyzing || !uploadedImage}
          className="mt-3 w-full p-3 bg-black text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {analyzing ? "Analyzing..." : "Generate"}
        </button>
      </div>

      <div className="mt-6">
        <span className="font-semibold text-xl">Summary</span>
        <p className="opacity-70 mt-2">{summaryText}</p>
      </div>

      {uploadedImageUrl && (
        <div className="border rounded-lg p-4 mt-4">
          <img
            src={uploadedImageUrl}
            alt="Uploaded food"
            className="w-full rounded-lg mb-4"
          />

          {detectedObjects.length > 0 && (
            <ul className="space-y-1">
              {detectedObjects.map((obj, index) => (
                <li key={index}>
                  {obj.label} ({(obj.score * 100).toFixed(1)}%)
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
