import React, { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import Chatbot from "../pages/Chatbot";

const HELPLINE_NUMBERS = [
  { name: "National Helpline", number: "+911234567890" },
  { name: "Mental Health Support", number: "+911112223333" },
  { name: "Emergency", number: "+911000000000" }
];

export default function ChatbotPopup() {
  const [chatOpen, setChatOpen] = useState(false);
  const [helplineOpen, setHelplineOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center justify-center"
        onClick={() => setChatOpen(true)}
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        aria-label="Open Chatbot"
      >
        <MessageCircle size={28} />
      </button>

      {/* Floating Helpline Button */}
      <button
        className="fixed bottom-24 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center justify-center"
        onClick={() => setHelplineOpen(true)}
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        aria-label="Show Helpline Numbers"
      >
        <Phone size={28} />
      </button>

      {/* Chatbot Popup Modal */}
      {chatOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex items-end justify-end" style={{ pointerEvents: "auto" }}>
          <div
            className="bg-white rounded-xl shadow-2xl p-0 m-6 max-w-xl w-full animate-fadeIn"
            style={{ minHeight: "400px", maxHeight: "80vh", overflow: "auto", backgroundImage: 'url(src/monuments/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="font-bold text-green-700 text-lg">Chatbot</span>
              <button className="text-gray-400 hover:text-red-500 text-xl" onClick={() => setChatOpen(false)}>&times;</button>
            </div>
            <Chatbot />
          </div>
        </div>
      )}

      {/* Helpline Numbers Popup Modal */}
      {helplineOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex items-end justify-end" style={{ pointerEvents: "auto" }}>
          <div
            className="bg-white rounded-xl shadow-2xl p-0 m-6 max-w-md w-full animate-fadeIn"
            style={{ minHeight: "200px", maxHeight: "60vh", overflow: "auto" }}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="font-bold text-blue-700 text-lg">Helpline Numbers</span>
              <button className="text-gray-400 hover:text-red-500 text-xl" onClick={() => setHelplineOpen(false)}>&times;</button>
            </div>
            <div className="px-4 py-4">
              <ul className="list-disc pl-5">
                {HELPLINE_NUMBERS.map((item, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-bold">{item.name}:</span> {item.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
