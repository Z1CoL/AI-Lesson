"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageAnalysis from "@/_components/ImageAnalysis";
import IngredientRecognition from "@/_components/IngredientRecognition";
import ImageCreator from "@/_components/ImageCreator";

export default function Home() {
  const [active, setActive] = useState("analysis");

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-[580px] h-full items-center">
        <div className="flex flex-col w-[888px] h-[580px] mt-8 items-start gap-10">
          {/* BUTTONS */}
          <div className="bg-gray-200 flex gap-2 p-1 rounded-[9px]">
            <Button
              variant={active === "analysis" ? "outline" : "ghost"}
              onClick={() => setActive("analysis")}
            >
              Image analysis
            </Button>

            <Button
              variant={active === "ingredient" ? "outline" : "ghost"}
              onClick={() => setActive("ingredient")}
            >
              Ingredient recognition
            </Button>

            <Button
              variant={active === "creator" ? "outline" : "ghost"}
              onClick={() => setActive("creator")}
            >
              Image creator
            </Button>
          </div>

          {/* CONTENT SECTION */}
          {active === "analysis" && <ImageAnalysis />}
          {active === "ingredient" && <IngredientRecognition />}
          {active === "creator" && <ImageCreator />}
        </div>
      </div>
    </div>
  );
}
