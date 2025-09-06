import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const steps = [
    {
      icon: "📝",
      title: "Track Your Mood",
      desc: "Log daily feelings and moods to better understand emotional patterns."
    },
    {
      icon: "🌿",
      title: "Guided Exercises",
      desc: "Follow mindfulness and breathing exercises to reduce anxiety."
    },
    {
      icon: "📚",
      title: "Resource Library",
      desc: "Access curated PDFs, audio guides, and videos for mental wellness."
    },
    {
      icon: "📈",
      title: "Monitor Growth",
      desc: "Visualize your progress and personal growth over time."
    }
  ];

  const features = [
    {
      icon: "🧠",
      title: "Mindfulness Exercises",
      desc: "Daily exercises to train your mind and reduce stress."
    },
    {
      icon: "🎧",
      title: "Audio Guides",
      desc: "Calming audio meditations and guided relaxation tracks."
    },
    {
      icon: "📖",
      title: "Resource Library",
      desc: "PDFs, videos, and articles to help students manage anxiety."
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      desc: "Track mood trends and visualize your mental wellness journey."
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-green-100 shadow-md">
        <h1 className="text-2xl font-bold text-green-800">Antar</h1>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition">
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center h-[90vh] bg-green-50 overflow-hidden">
        {/* Floating background circles */}
        <motion.div 
          className="absolute w-48 h-48 bg-green-200 rounded-full top-10 left-10 opacity-40 z-0"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <motion.div 
          className="absolute w-64 h-64 bg-green-300 rounded-full bottom-10 right-10 opacity-30 z-0"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />

        {/* Text and buttons on top */}
        <motion.div className="relative z-10 flex flex-col items-center">
          <motion.h2 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-green-800 mb-4"
          >
            Manage Anxiety. Track Your Mood. Grow Daily.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-green-700 text-lg md:text-xl mb-6 max-w-xl"
          >
            Antar helps students monitor mental health, access guided exercises, and track personal growth through simple, interactive tools.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="space-x-4"
          >
            <Link to="/signup" className="px-6 py-3 rounded bg-green-600 text-white font-semibold hover:scale-105 hover:bg-green-700 transition transform">
              Get Started
            </Link>
            <Link to="/login" className="px-6 py-3 rounded border border-green-600 text-green-600 font-semibold hover:scale-105 hover:bg-green-600 hover:text-white transition transform">
              Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-green-100">
        <h3 className="text-3xl font-bold text-center text-green-800 mb-12">How It Works</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-xl shadow-lg p-6 w-64 text-center cursor-pointer transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h4 className="font-bold text-green-800 mb-2">{step.title}</h4>
              <p className="text-green-700 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-green-800 mb-12">Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
              className="bg-green-100 p-6 rounded-xl text-center cursor-pointer transition"
            >
              <div className="text-5xl mb-3">{feature.icon}</div>
              <h4 className="font-semibold text-green-800">{feature.title}</h4>
              <p className="text-green-700 text-sm mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-200 py-6 text-center text-green-800">
        &copy; 2025 Antar | Student Anxiety Management Software
      </footer>
    </div>
  );
}
