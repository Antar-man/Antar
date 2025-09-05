import { useState, useEffect } from "react";

export default function Letters() {
  const [letters, setLetters] = useState([]);
  const [newLetter, setNewLetter] = useState("");

  // Load saved letters from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("letters")) || [];
    setLetters(saved);
  }, []);

  // Save letters to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("letters", JSON.stringify(letters));
  }, [letters]);

  // Add new letter
  const addLetter = () => {
    if (newLetter.trim() === "") return;
    const letter = {
      id: Date.now(),
      text: newLetter,
      date: new Date().toLocaleDateString(),
    };
    setLetters([letter, ...letters]);
    setNewLetter("");
  };

  // Delete letter
  const deleteLetter = (id) => {
    setLetters(letters.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <h1 className="text-3xl font-bold text-center mb-6">Your Letters</h1>

      {/* Write letter */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-4 mb-6">
        <textarea
          value={newLetter}
          onChange={(e) => setNewLetter(e.target.value)}
          placeholder="Write a letter to yourself or someone special..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        />
        <button
          onClick={addLetter}
          className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          Save Letter
        </button>
      </div>

      {/* Saved Letters */}
      <div className="max-w-2xl mx-auto space-y-4">
        {letters.length === 0 ? (
          <p className="text-gray-600 text-center">No letters yet. Start writing ✍️</p>
        ) : (
          letters.map((letter) => (
            <div
              key={letter.id}
              className="bg-white p-4 rounded-xl shadow-md relative"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{letter.text}</p>
              <p className="text-sm text-gray-500 mt-2">📅 {letter.date}</p>
              <button
                onClick={() => deleteLetter(letter.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
