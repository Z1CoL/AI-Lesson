import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageAnalysis() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [detectedObjects, setDetectedObjects] = useState<any[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [summaryText, setSummaryText] = useState(
    "First, enter your image to recognize an ingredients."
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
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

      const data = await response.json();

      if (response.ok) {
        const objects = data.objects || [];
        setDetectedObjects(objects);

        if (objects.length === 0) {
          setSummaryText("No ingredients detected. Try another image.");
        } else {
          const labels = objects.map((obj: any) => obj.label).join(", ");
          setSummaryText(`Detected ingredients: ${labels}.`);
        }
      } else {
        console.error("Failed:", data);
        setSummaryText("Failed to analyze the image.");
      }
    } catch (err) {
      console.error(err);
      setSummaryText("An error occurred while analyzing.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-[580px]">
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          <Image src={"Article.svg"} height={26} width={26} alt="" />
          <span className="size-xl font-semibold text-2xl">Image analysis</span>
        </div>
        <Button variant="outline">
          <Image src={"reload.svg"} height={16} width={16} alt="" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium mt-4">
            Upload a food photo, and AI will detect the ingredients
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        <div className="flex w-full items-end">
          <button
            onClick={analyzeImage}
            disabled={analyzing || !uploadedImage}
            className=" mt-3 ml-[490px] p-3 bg-black opacity-40 rounded-[5px] text-white"
          >
            Generate
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="w-full mt-10">
        <div className="flex gap-2">
          <Image src={"/articleSummary.svg"} height={24} width={24} alt="" />
          <span className="font-semibold text-[20px]">Here is the Summary</span>
        </div>

        <span className="opacity-50">{summaryText}</span>
      </div>

      {uploadedImageUrl && (
        <div className="border rounded-lg p-4">
          <img src={uploadedImageUrl} className="w-full rounded-lg mb-4" />

          {detectedObjects.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg">Detected Objects:</h3>
              <ul className="space-y-1">
                {detectedObjects.map((obj, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{obj.label}</span> (
                    {(obj.score * 100).toFixed(1)}%)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
