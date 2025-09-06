// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        // optionally store token if backend returns one
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        navigate("/questions"); // 🚀 go to questionnaire
      } else {
        setMessage(res.data.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Server error during signup");
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(src/monuments/cloud.png)`, backgroundSize: "cover" }}>
      <div className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
