import { useState } from "react";

export default function Journal() {
  const [entry, setEntry] = useState("");

  const prompts = [
    "What made you smile today?",
    "What’s stressing you out right now?",
    "One thing you’re grateful for?",
    "How did you take care of yourself today?",
  ];

  const handleSave = () => {
    // store in localStorage for offline-first experience
    localStorage.setItem("journalEntry", entry);
    alert("Saved offline!");
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-green-50 via-white to-green-100">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">Daily Journal</h1>
      <p className="text-gray-600">Write freely or use a prompt below 👇</p>

      {/* Suggestion Prompts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prompts.map((prompt, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-gray-200 bg-neutral-50 shadow-sm text-gray-700 hover:shadow-md cursor-pointer"
            onClick={() => setEntry(entry ? entry + "\n\n" + prompt : prompt)}
          >
            💡 {prompt}
          </div>
        ))}
      </div>

      {/* Textarea for journaling */}
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Start writing your thoughts here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none resize-none"
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Save Offline
      </button>
    </div>
  );
}
