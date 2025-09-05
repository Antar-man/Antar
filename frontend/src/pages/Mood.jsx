import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Mood() {
  const moods = ["😢", "😟", "😐", "😊", "😁"]; // from sad → happy
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState([]);

  // Load past moods from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moodHistory")) || [];
    setHistory(saved);
  }, []);

  // Save today's mood
  const handleSave = () => {
    if (!selectedMood) {
      alert("Please select a mood before saving!");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    const newEntry = { date: today, mood: selectedMood };
    const updated = [...history.filter((h) => h.date !== today), newEntry]; // overwrite today's if exists

    setHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));

    alert("Mood saved!");
  };

  // Prepare data for chart
  const chartData = history.map((h) => ({
    date: h.date,
    moodScore: moods.indexOf(h.mood) + 1, // convert emoji → numeric
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Mood Tracker</h1>
      <p className="text-gray-600">How are you feeling today?</p>

      {/* Emoji Picker */}
      <div className="flex gap-4 text-3xl">
        {moods.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedMood(m)}
            className={`p-3 rounded-full transition ${
              selectedMood === m ? "bg-blue-100 scale-110" : "hover:bg-gray-100"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Save Mood
      </button>

      {/* Chart */}
      <div className="h-64 bg-white border rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Weekly Trend</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} hide />
              <Tooltip />
              <Bar dataKey="moodScore" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No mood data yet. Save a mood to see your trend!</p>
        )}
      </div>
    </div>
  );
}
