import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageCreator() {
  return (
    <div className="w-[580px]">
      <div className="w-[580px]">
        <div className="flex justify-between w-full">
          <div className="flex gap-3">
            <Image src={"Article.svg"} height={26} width={26} alt="" />
            <span className="size-xl font-semibold text-2xl">
              Food image creator
            </span>
          </div>
          <Button variant="outline">
            <Image src={"reload.svg"} height={16} width={16} alt="" />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-400">
            What food image do you want? Describe it briefly.
          </span>

          <label className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer w-[580px] h-[130px] hover:bg-gray-100">
            <span className="text-gray-500">hoolni tailbar</span>
            <Input type="Input" className="hidden" />
          </label>
        </div>

        <div className="flex w-full items-end">
          <button className=" mt-3 ml-[490px] p-3 bg-black opacity-20 rounded-[5px] text-white">
            Generate
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="w-full mt-10">
        <div className="flex gap-2">
          <Image src={"/Vector.svg"} height={24} width={24} alt="" />
          <span className="font-semibold text-[20px] ">Result</span>
        </div>

        <span>First, enter your tetx to generate an image.</span>
      </div>
    </div>
  );
}
