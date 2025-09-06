// src/pages/QuestionnairePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuestionnairePage() {
  const [answers, setAnswers] = useState({
    mood: "",
    stress: "",
    sleepHours: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/home/questions",
        answers,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        navigate("/"); // 🚀 go to landing/home
      } else {
        setMessage(res.data.message || "Could not save answers");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(src/monuments/bg2.png)`, backgroundSize: "cover" }}>
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Quick Questionnaire
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              How are you feeling today?
            </label>
            <select
              name="mood"
              value={answers.mood}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select mood</option>
              <option value="happy">😊 Happy</option>
              <option value="neutral">😐 Neutral</option>
              <option value="sad">😢 Sad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Stress level right now
            </label>
            <select
              name="stress"
              value={answers.stress}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select stress</option>
              <option value="low">😌 Low</option>
              <option value="medium">😟 Medium</option>
              <option value="high">😫 High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How many hours did you sleep last night?
            </label>
            <input
              type="number"
              name="sleepHours"
              value={answers.sleepHours}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="e.g., 7"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Save & Continue
          </button>
        </form>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
