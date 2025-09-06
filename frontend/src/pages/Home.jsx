import Homecard from "./Homecard";
import '/src/App.css';

export default function Home() {
  return (
    <div className="w-full min-h-[96vh] flex flex-col bg-gradient-to-b from-green-50 via-white to-green-100 p-6 md:p-12">
      
      {/* Top Section */}
      <div className="mb-10">
  <h1 className="hind-regular text-green-600 text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-md 
           md:text-5xl sm:text-4xl xs:text-3xl">
          Antar
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
