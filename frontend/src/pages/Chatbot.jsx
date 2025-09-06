import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/nav.jsx";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your chatbot. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/chatbot",
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((msgs) => [...msgs, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: "bot", text: "Error: Could not reach chatbot.",err }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 p-6 md:p-12" style={{ backgroundImage: 'url(src/monuments/bg.png)' }}>
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10"  >
      <h2 className="text-2xl font-bold mb-4 text-green-700">Chatbot</h2>
      <div className="h-64 overflow-y-auto border rounded p-4 mb-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 text-${msg.sender === "bot" ? "gray-700" : "blue-700"}`}>
            <b>{msg.sender === "bot" ? "Bot" : "You"}:</b> {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-400">Bot is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
          Send
        </button>
      </form>
      <Navbar />
    </div>
    </div>
  );
}
