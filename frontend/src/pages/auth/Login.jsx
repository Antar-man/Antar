// src/pages/LoginPage.jsx
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend
      const token= localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/auth/login", {
        username: username, // backend expects username
        password,
      },{ headers: { Authorization: `Bearer ${token}` } });

      if (res.data.token) {
  localStorage.setItem("token", res.data.token);
  navigate("/home");  // redirect user
}
else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundImage: 'url(/monuments/bg.png)' }}>
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-7xl font-extrabold text-green-700 mb-6 mt-[-300px] drop-shadow-md">
            Antar
          </h1>
          <p className="text-lg text-white-100 max-w-md mx-auto leading-relaxed">
            A gentle space for your mind.  
          
          </p>
          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-10 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition ${
                  error.includes("username") ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition ${
                  error.includes("Password") ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Signup link */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
