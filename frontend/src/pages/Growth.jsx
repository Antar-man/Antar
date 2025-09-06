"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Zap, Star } from "lucide-react";

// Simple Progress Bar
function Progress({ value = 0, background = "#e5e7eb", foreground = "#3b82f6" }) {
  return (
    <div className="w-full h-3 rounded-full overflow-hidden" style={{ background }}>
      <div
        className="h-full transition-all"
        style={{ width: `${value}%`, background: foreground }}
      />
    </div>
  );
}

export default function GrowthAdventure() {
  const [exp, setExp] = useState(0);
  const [health, setHealth] = useState(100);
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  // thresholds for leveling up
  const levelThresholds = [0, 30, 60, 100, 150, 200];

  const levels = [
    {
      id: 1,
      ruin: "/monuments/ruins.png",
      monument: "/monuments/sanchi-stupa.png",
      ruinLabel: "Scattered stones → confusion",
      monumentLabel: "Sanchi Stupa → self-awareness"
    },
    {
      id: 2,
      ruin: "/monuments/ruins.png",
      monument: "/monuments/taj-mahal.png",
      ruinLabel: "Broken diary → unorganized thoughts",
      monumentLabel: "Taj Mahal → clarity, expression"
    },
    {
      id: 3,
      ruin: "/monuments/ruins.png",
      monument: "/monuments/qutub-minar.png",
      ruinLabel: "Cracked pillar → unstable moods",
      monumentLabel: "Qutub Minar → rising awareness"
    },
    {
      id: 4,
      ruin: "/monuments/ruins.png",
      monument: "/monuments/konark.png",
      ruinLabel: "Collapsed temple → lack of progress",
      monumentLabel: "Konark Sun Temple → strength, progress illuminated"
    },
    {
      id: 5,
      ruin: "/monuments/ruins.png",
      monument: "/monuments/hampi.png",
      ruinLabel: "Broken arches → isolation",
      monumentLabel: "Hampi/Charminar → community, support"
    }
  ];

  // Fetch user stats from DB
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem("token"); // wherever you store JWT
        const res = await axios.get("http://localhost:5000/home/growth", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { exp, health, level } = res.data;
        setExp(exp);
        setHealth(health);
        setLevel(level);
      } catch (err) {
        console.error("Error fetching user stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  // Recalculate level when EXP changes
  useEffect(() => {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
      if (exp >= levelThresholds[i]) {
        setLevel(i + 1);
        break;
      }
    }
  }, [exp]);

  // Update DB when EXP changes
  const handleGainExp = async () => {
    const newExp = exp + 10;
    setExp(newExp);

    try {
      const token = localStorage.getItem("token");

      await axios.put("http://localhost:5000/home/growth", { exp: newExp, health, level },
  { headers: { Authorization: `Bearer ${token}` } }
);
      console.log("User stats updated successfully");
    } catch (err) {
      console.error("Error updating user stats:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-lg mt-10">Loading adventure...</p>;
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-green-100"
    >
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 tracking-wide drop-shadow-sm bungee-spice-regular" >
          Grow Monuments
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* EXP Card */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-500">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Experience</h3>
                <p className="text-sm text-gray-500">{exp} EXP</p>
              </div>
            </div>
            <Progress
              value={(exp / levelThresholds[level]) * 100}
              background="#e5e7eb"
              foreground="#3b82f6"
            />
          </div>

          {/* Health Card */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-500">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">Health</h3>
                <p className="text-sm text-gray-500">{health}/100 HP</p>
              </div>
            </div>
            <Progress value={health} background="#e5e7eb" foreground="#ef4444" />
          </div>

          {/* Level Card */}
          <div className="bg-white/90 rounded-2xl shadow-lg p-6 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <div className="p-2 rounded-full bg-yellow-400">
                <Star className="w-6 h-6 text-gray-800" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Level</h3>
            <span className="text-4xl font-bold text-gray-900">{level}</span>
          </div>
        </div>

        {/* EXP Test Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={handleGainExp}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow-md transition"
          >
            Gain EXP +10
          </button>
        </div>

        {/* Monuments Journey */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {levels.map((stage) => {
            const isCurrent = level === stage.id;
            const isUnlocked = level >= stage.id;

            return (
              <div
                key={stage.id}
                className={`flex flex-col items-center transition-all ${
                  isCurrent
                    ? "scale-110 border-4 border-yellow-400 shadow-2xl"
                    : "scale-100"
                }`}
                style={{
                  opacity: isUnlocked ? 1 : 0.3,
                  borderRadius: "1rem",
                  padding: "8px"
                }}
              >
                <div className="w-60 h-60 flex items-center justify-center">
                  <img
                    src={isUnlocked ? stage.monument : stage.ruin}
                    alt={stage.monumentLabel}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="mt-4 text-base text-center text-gray-800 font-semibold max-w-[200px] leading-snug">
                  {isUnlocked ? stage.monumentLabel : stage.ruinLabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
