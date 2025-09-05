import { useState } from "react";

const mockResources = [
  {
    id: 1,
    title: "Stress Relief Guide",
    type: "pdf",
    thumbnail: "/assets/pdf.png", // placeholder thumbnail
    url: "/docs/stress.pdf",
  },
  {
    id: 2,
    title: "Sleep Meditation",
    type: "audio",
    thumbnail: "/assets/audio.png",
    url: "/audio/sleep.mp3",
  },
  {
    id: 3,
    title: "Exam Motivation",
    type: "video",
    thumbnail: "/assets/video.png",
    url: "/videos/motivation.mp4",
  },
  {
    id: 4,
    title: "Exam Motivation",
    type: "video",
    thumbnail: "/assets/video.png",
    url: "/videos/motivation.mp4",
  },
];

export default function Resources() {
  const [resources] = useState(mockResources);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
      <h1 className="text-3xl font-bold text-center mb-6">Resources</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={res.thumbnail}
              alt={res.title}
              className="w-full h-40 object-contain p-4 bg-gray-100"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{res.title}</h3>
              <p className="text-sm text-gray-500 capitalize">Type: {res.type}</p>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
              >
                Open {res.type === "pdf" ? "Document" : res.type === "audio" ? "Audio" : "Video"}
              </a>
            </div>
            
          </div>
        ))}
      </div>

      {/* Empty State */}
      {resources.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No resources available yet 📂
        </p>
      )}
    </div>
  );
}
