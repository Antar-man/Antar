import { Link } from "react-router-dom";

export default function Homecard() {
  const features = [
    { title: "Daily Journal", description: "Write freely", path: "/journal" },
    { title: "Mood Tracker", description: "Log & trends", path: "/mood" },
    { title: "Growth", description: "Ruins to monuments", path: "/growth" },
    { title: "Letters", description: "Anonymous support", path: "/letters" },
    { title: "Resources", description: "PDFs, audio, videos", path: "/resources" },
    {
      title: "Monument Mitra",
      description: "A gentle chatbot with an Indian monuments vibe",
      highlight: true,path: "/chatbot"
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
      {features.map((item, index) => (
        <Link
          key={index}
          to={item.path || "#"}
          className={`block border rounded-xl p-4 bg-white transition-shadow duration-300 hover:shadow-lg 
          ${item.highlight ? "bg-yellow-50 border-yellow-300" : "border-gray-200"}`}
        >
          <h3
            className={`text-base font-semibold mb-1 
            ${item.highlight ? "text-yellow-900" : "text-gray-800"}`}
          >
            {item.title}
          </h3>
          <p
            className={`text-sm 
            ${item.highlight ? "text-yellow-800" : "text-gray-500"}`}
          >
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
