export default function Home() {
  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
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
    </div>
  );
}
