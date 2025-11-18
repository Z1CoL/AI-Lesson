import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageAnalysis() {
  return (
    <div className="w-[580px]">
      <div className="w-3/4">
        <div className="flex justify-between w-full">
          <div className="flex gap-3">
            <Image src={"Article.svg"} height={26} width={26} alt="" />
            <span className="size-xl font-semibold text-2xl">
              Image analysis
            </span>
          </div>
          <Button variant="outline">
            <Image src={"reload.svg"} height={16} width={16} alt="" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-400">
            Upload a food photo, and AI will detect the ingredients.
          </span>

          <label className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100">
            <span>Choose File </span>
            <span className="text-gray-500">JPG, PNG</span>
            <Input type="file" className="hidden" />
          </label>
        </div>

        <div className="flex w-full items-end">
          <button className=" mt-3 ml-[345px] p-3 bg-black opacity-20 rounded-[5px] text-white">
            Generate
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="w-full mt-10">
        <div className="flex gap-2">
          <Image src={"articleSummary.svg"} height={24} width={24} alt="" />
          <span className="font-semibold text-[20px] ">
            Here is the Summary
          </span>
        </div>

        <span>First, enter your image to recognize an ingredients.</span>
      </div>
    </div>
  );
}
