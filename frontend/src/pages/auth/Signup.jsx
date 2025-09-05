// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [step, setStep] = useState(1);

  // Signup form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Quiz state
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("User Info:", { name, email, password, mood, stress });
    alert("Signup successful! Check console for data.");
    navigate("/"); // 🚀 redirect after signup
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-4">
      <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg animate-fadeIn">
        
        {/* Step Progress */}
        <div className="flex justify-center mb-6 space-x-2">
          <div className={`w-3 h-3 rounded-full ${step === 1 ? "bg-blue-600" : "bg-gray-300"}`} />
          <div className={`w-3 h-3 rounded-full ${step === 2 ? "bg-blue-600" : "bg-gray-300"}`} />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          {step === 1 ? "Create Account" : "Quick Quiz"}
        </h2>

        {/* Step 1: Signup Form */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
            >
              Next
            </button>
          </form>
        )}

        {/* Step 2: Quick Quiz */}
        {step === 2 && (
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">How are you feeling today?</p>
              <div className="flex justify-center space-x-4 text-3xl">
                {["😊", "😐", "😢"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setMood(emoji)}
                    className={`p-3 rounded-lg transition transform hover:scale-110 ${
                      mood === emoji ? "bg-blue-200" : "bg-gray-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">How stressed are you right now?</p>
              <div className="flex justify-center space-x-4 text-3xl">
                {["😌", "😟", "😫"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setStress(emoji)}
                    className={`p-3 rounded-lg transition transform hover:scale-110 ${
                      stress === emoji ? "bg-blue-200" : "bg-gray-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
            >
              Finish Signup
            </button>
          </form>
        )}

        {/* Login Link */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
