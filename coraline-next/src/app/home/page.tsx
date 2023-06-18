import React from "react";
import { BiShuffle } from "react-icons/bi";
import { TbArrowsRightLeft } from "react-icons/tb";

export default function Home() {
  return (
    <div
      className={
        "w-screen h-screen flex flex-col gap-5 items-center justify-center"
      }
    >
      <div className="group h-96 w-80 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl bg-[#8098F9]/50 text-white shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(-180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">English</h1>
          </div>
          <div className="absolute inset-0 h-full w-full rounded-xl bg-[#8098F9]/50 text-white px-12 text-center [transform:rotateY(-180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h1 className="text-3xl font-bold ">Japanese</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={"w-80 flex justify-center"}>
        <button
          className={
            "w-1/3 h-10 bg-[#8098F9]/50 text-white rounded-full flex items-center justify-center"
          }
        >
          <BiShuffle className={"w-10 h-10"} />
        </button>
      </div>
      <div className={"ml-3 w-80 flex justify-center"}>
        <button
          className={
            "w-[60%] h-10 border-4 border-[#8098F9]/50 bg-amber-50 text-black rounded-full flex items-center justify-evenly"
          }
        >
          <div>English</div>
          <div>
            <TbArrowsRightLeft />
          </div>
          <div>Japanese</div>
        </button>
      </div>
    </div>
  );
}
