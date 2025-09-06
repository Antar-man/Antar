import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const staticLetters = [
  {
    id: 1,
    sender: "A Friend",
    content:
      "Hey there! Just wanted to remind you that you're doing amazing. Keep going!",
    date: "2025-09-01",
  },
  {
    id: 2,
    sender: "Someone Special",
    content:
      "Remember, every day is a new chance to shine. Sending you lots of positivity!",
    date: "2025-09-02",
  },
  {
    id: 3,
    sender: "Secret Wellwisher",
    content:
      "You are stronger than you think. Take a deep breath and smile!",
    date: "2025-09-03",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
};

const Letters = () => {
  const [current, setCurrent] = useState(0);
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [writeMode, setWriteMode] = useState(false);
  const [newLetter, setNewLetter] = useState("");
  const [showPage, setShowPage] = useState(false);

  const handleNext = () => {
    setReplyMode(false);
    setReplyText("");
    setCurrent((prev) => (prev + 1) % staticLetters.length);
  };

  const handleReply = () => {
    setReplyMode(true);
  };

  const handleSendReply = () => {
    setReplyMode(false);
    setReplyText("");
    alert("Reply sent!");
  };

  const handleWriteLetter = () => {
    setWriteMode(true);
    setShowPage(true);
  };

  const handleSendLetter = () => {
    setWriteMode(false);
    setNewLetter("");
    alert("Letter sent and will be visible to others!");
  };

  const openLetters = () => {
    setShowPage(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 overflow-hidden">
      {!showPage ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-32 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold shadow-lg"
          onClick={openLetters}
        >
          Open Letters
        </motion.button>
      ) : (
        <div className="w-full max-w-xl px-4 py-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!writeMode ? (
              <motion.div
                key={staticLetters[current].id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full bg-white rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden"
                style={{ minHeight: "320px" }}
              >
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4 text-lg text-gray-600"
                >
                  <span className="font-semibold text-purple-600">From: </span>
                  {staticLetters[current].sender}
                </motion.div>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-2xl font-serif text-gray-800 mb-6"
                >
                  "{staticLetters[current].content}"
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-4 right-8 text-sm text-gray-400"
                >
                  {staticLetters[current].date}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex gap-4 mt-8"
                >
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold shadow-md hover:scale-105 transition"
                    onClick={handleReply}
                  >
                    Reply
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold shadow-md hover:scale-105 transition"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold shadow-md hover:scale-105 transition"
                    onClick={handleWriteLetter}
                  >
                    Write a Letter
                  </button>
                </motion.div>
                {replyMode && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-8 p-4 bg-purple-50 rounded-xl shadow-inner"
                  >
                    <textarea
                      className="w-full p-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      rows={3}
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="mt-2 px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
                      onClick={handleSendReply}
                    >
                      Send Reply
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="write-letter"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full bg-white rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden"
                style={{ minHeight: "320px" }}
              >
                <div className="text-xl font-bold text-purple-700 mb-4">Write a Letter</div>
                <textarea
                  className="w-full p-3 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
                  rows={6}
                  placeholder="Share your thoughts, encouragement, or a story..."
                  value={newLetter}
                  onChange={(e) => setNewLetter(e.target.value)}
                />
                <div className="flex gap-4 mt-4">
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 text-white font-semibold shadow-md hover:scale-105 transition"
                    onClick={handleSendLetter}
                  >
                    Send Letter
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold shadow-md hover:scale-105 transition"
                    onClick={() => setWriteMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Letters;
