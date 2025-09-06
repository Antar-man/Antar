// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function ProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "********", // you usually don’t get password in JWT
    profilePic: "src/monuments/example.png",
  });

  useEffect(() => {
    // get token (saved in localStorage after login)
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // set profile values from token payload
        setProfile((prev) => ({
          ...prev,
          username: decoded.username || "Guest User",
          email: decoded.email || "no-email@example.com",
          profilePic: decoded.profilePic || "",
        }));
      } catch (err) {
        console.error("Invalid token", err);
        navigate("/login");
      }
    } else {
      // no token → force login
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setProfile({ ...profile, profilePic: URL.createObjectURL(files[0]) });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
    // send updated profile to backend
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            profile.profilePic ||
            "src/monuments/example.png"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          className="mt-3 text-sm"
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          disabled // usually not editable from token
        />
      </div>

      {/* Save Changes */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600"
      >
        Save Changes
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-lg mb-3 hover:bg-red-600"
      >
        Logout
      </button>

      {/* Go to Help */}
      <Link
        to="/help"
        className="block text-center text-blue-500 hover:underline"
      >
        Need Help?
      </Link>
    </div>
  );
}
