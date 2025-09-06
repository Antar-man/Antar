

// src/pages/QuestionnairePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuestionnairePage() {
  const [answers, setAnswers] = useState({
    mood: "",
    stress: "",
    sleepHours: "",
    gad1: "",
    gad2: "",
    gad3: "",
    gad4: "",
    gad5: "",
    gad6: "",
    gad7: "",
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
      // Calculate GAD-7 score
      const gadScore = 
        ["gad1","gad2","gad3","gad4","gad5","gad6","gad7"]
          .reduce((sum, key) => sum + Number(answers[key] || 0), 0);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/home/questions",
        { ...answers, gadScore },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        // Send GAD-7 info to chatbot
        const chatMessage = `My GAD-7 score is ${gadScore}. Here are my answers: ${Object.entries(answers)
          .filter(([k]) => k.startsWith('gad'))
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ")}`;
        await axios.post(
          "http://localhost:5000/chatbot",
          { message: chatMessage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  navigate("/home"); // 🚀 go to home
      } else {
        setMessage(res.data.message || "Could not save answers");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  const gadQuestions = [
    { key: "gad1", text: "Feeling nervous, anxious or on edge" },
    { key: "gad2", text: "Not being able to stop or control worrying" },
    { key: "gad3", text: "Worrying too much about different things" },
    { key: "gad4", text: "Trouble relaxing" },
    { key: "gad5", text: "Being so restless that it is hard to sit still" },
    { key: "gad6", text: "Becoming easily annoyed or irritable" },
    { key: "gad7", text: "Feeling afraid as if something awful might happen" },
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(src/monuments/bg2.png)`, backgroundSize: "cover" }}
    >
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-8 w-full max-w-2xl overflow-y-auto max-h-screen">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Quick Questionnaire
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Original 3 questions */}
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

          {/* GAD-7 Questions */}
          <h3 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
            Over the last 2 weeks, how often have you been bothered by the following problems?
          </h3>
          {gadQuestions.map((q, index) => (
            <div key={q.key} className="border rounded-lg p-4 bg-white/80 shadow">
              <label className="block text-sm font-medium mb-3">
                {index + 1}. {q.text}
              </label>
              <div className="flex space-x-4">
                {["0","1","2","3"].map((val) => (
                  <label key={val} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={q.key}
                      value={val}
                      checked={answers[q.key] === val}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      {val === "0" && "Not at all"}
                      {val === "1" && "Several days"}
                      {val === "2" && "More than half the days"}
                      {val === "3" && "Nearly every day"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg mt-6"
          >
            Save & Continue
          </button>
        </form>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}
