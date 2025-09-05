import { useState, useEffect } from "react";

export default function Growth() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Mock: load streak from localStorage
    const savedStreak = localStorage.getItem("streak") || 0;
    setStreak(Number(savedStreak));
  }, []);

  const increaseStreak = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("streak", newStreak);
  };

  // Define growth stages
  const stages = [
    { level: 0, label: "Ruins", emoji: "🏚️" },
    { level: 3, label: "Repairing", emoji: "🛠️" },
    { level: 7, label: "Temple", emoji: "⛩️" },
    { level: 14, label: "Monument", emoji: "🏰" },
    { level: 30, label: "Grand Palace", emoji: "🏛️" },
  ];

  // Find current stage
  const currentStage =
    [...stages].reverse().find((stage) => streak >= stage.level) || stages[0];

  return (
    <div className="p-6 text-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold mb-4">Your Growth Journey</h1>

      {/* Current Stage */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 inline-block">
        <div className="text-6xl">{currentStage.emoji}</div>
        <p className="mt-2 text-lg font-semibold">{currentStage.label}</p>
        <p className="text-gray-500">Streak: {streak} days</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mx-auto mb-6">
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4"
            style={{
              width: `${Math.min((streak / 30) * 100, 100)}%`,
              transition: "width 0.5s ease-in-out",
            }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">Towards Grand Palace (30 days)</p>
      </div>

      {/* Button to simulate streak */}
      <button
        onClick={increaseStreak}
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full shadow-lg transition"
      >
        Add Day to Streak
      </button>

      {/* Stage Roadmap */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
        {stages.map((s, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl shadow-md ${
              streak >= s.level ? "bg-green-100 border-2 border-green-500" : "bg-gray-100"
            }`}
          >
            <div className="text-4xl">{s.emoji}</div>
            <p className="font-semibold">{s.label}</p>
            <p className="text-sm text-gray-500">{s.level}+ days</p>
          </div>
        ))}
      </div>
    </div>
  );
}
