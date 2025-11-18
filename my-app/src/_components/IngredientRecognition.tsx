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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function IngredientRecognition() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setResult(
        data.ingredients?.length
          ? data.ingredients.join(", ")
          : "No ingredients detected"
      );
    } catch (e) {
      setResult("Error processing the text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[580px]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <Image src="/Article.svg" height={26} width={26} alt="" />
          <span className="font-semibold text-2xl">Ingredient Recognition</span>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setText("");
            setResult("");
          }}
          className="p-2"
        >
          <Image src="/reload.svg" height={16} width={16} alt="reload" />
        </Button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-500 mb-2">
        Describe the food, and AI will detect the ingredients.
      </p>

      {/* INPUT BOX */}
      <textarea
        className="border border-gray-300 rounded-md px-3 py-2 w-full h-[130px] resize-none focus:outline-none focus:ring-2 focus:ring-black/20"
        placeholder="Write food description here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* GENERATE BUTTON */}
      <Button
        onClick={handleGenerate}
        disabled={!text.trim() || loading}
        className="mt-3 ml-auto block bg-black text-white disabled:opacity-30"
      >
        {loading ? "Processing..." : "Generate"}
      </Button>

      {/* RESULTS */}
      <div className="mt-10">
        <div className="flex gap-2 items-center mb-2">
          <Image src="/Vector.svg" height={24} width={24} alt="icon" />
          <span className="font-semibold text-[20px]">
            Identified Ingredients
          </span>
        </div>

        <div className="text-gray-700">
          {result ? result : "First, enter your text to recognize ingredients."}
        </div>
      </div>
    </div>
  );
}
