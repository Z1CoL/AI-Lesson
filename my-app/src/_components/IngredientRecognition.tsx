// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function IngredientRecognition() {
//   return (
//     <div className="w-[580px]">
//       <div className="w-[580px]">
//         <div className="flex justify-between w-full">
//           <div className="flex gap-3">
//             <Image src={"Article.svg"} height={26} width={26} alt="" />
//             <span className="size-xl font-semibold text-2xl">
//               Ingredient recognition
//             </span>
//           </div>
//           <Button variant="outline">
//             <Image src={"reload.svg"} height={16} width={16} alt="" />
//           </Button>
//         </div>

//         <div className="flex flex-col gap-2">
//           <span className="text-gray-400">
//             Describe the food, and AI will detect the ingreadients.
//           </span>

//           <label className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer w-[580px] h-[130px] hover:bg-gray-100">
//             <span className="text-gray-500">orts todorhoilolt</span>
//             <Input type="Input" className="hidden" />
//           </label>
//         </div>

//         <div className="flex w-full items-end">
//           <button className=" mt-3 ml-[490px] p-3 bg-black opacity-20 rounded-[5px] text-white">
//             Generate
//           </button>
//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="w-full mt-10">
//         <div className="flex gap-2 mb-3">
//           <Image src={"/Vector.svg"} height={24} width={24} alt="" />
//           <span className="font-semibold text-[20px] ">
//             Identified Ingredients
//           </span>
//         </div>

//         <span>First, enter your tetx to recognize an ingredients.</span>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { RxReload } from "react-icons/rx";

export const IngredientRecognition = () => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [ingredient, setIngredient] = useState("");

  const generateTextToText = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredient("");

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredient(data.text);
      } else {
        console.error("Failed to generate text to text");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Failed to generate text to text");
    } finally {
      setLoading(false);
    }
  };

  const refreshForm = () => {
    setPrompt("");
    setIngredient("");
  };

  return (
    <Tabs defaultValue="ingredient-recognition" className="w-[580px]">
      <TabsList>
        <TabsTrigger value="ingredient-recognition">
          Ingredient Recognition
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ingredient-recognition">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="text-xl leading-7 font-semibold text-foreground">
                Ingredient recognition
              </div>
              <Button
                onClick={refreshForm}
                type="button"
                variant="outline"
                className="w-12 h-10"
              >
                <RxReload size={16} />
              </Button>
            </div>

            <div className="text-sm leading-5 text-muted-foreground">
              What image do you want? Describe it briefly.
            </div>

            <form
              onSubmit={generateTextToText}
              className="w-full flex flex-col gap-2"
            >
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                className="w-full px-3 py-2 border border-input rounded-md text-sm leading-5 text-primary"
              />

              <Button
                type="submit"
                disabled={loading || !prompt}
                className="w-full"
              >
                {loading ? "Generating ..." : "Generate Image"}
              </Button>
            </form>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xl leading-7 font-semibold text-foreground">
              Identified Ingredients
            </div>
            {ingredient ? (
              <div>{ingredient}</div>
            ) : (
              <div className="text-sm leading-6 text-muted-foreground">
                First, enter your text to recognize an ingredient.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
