import Homecard from "./Homecard";

export default function Home() {
  return (
    <div className="w-full min-h-[96vh] flex flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 p-6">
      
      {/* Top Section */}
      <div className="mb-10">
        <h1 className="text-green-600 text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-md 
                       md:text-5xl sm:text-4xl xs:text-3xl">
          AntarMan
        </h1>
        <p className="text-[1.4rem] text-gray-700 mt-3 md:text-xl sm:text-base xs:text-sm max-w-lg ">
          A gentle space for your mind
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full gap-6">
        <Homecard />
        {/* If you have multiple cards, just duplicate or map */}
      </div>
    </div>
  );
}
