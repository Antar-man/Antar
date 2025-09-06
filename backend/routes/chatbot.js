const express = require("express");
const authMiddleware = require("../middleware/middleware");
const router = express.Router();
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const User = require("../models/User");

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Please send a message." });

  // Try to extract GAD-7 score from message
  let gadScore = null;
  const gadMatch = message.match(/GAD-7 score is (\d+)/);
  if (gadMatch) gadScore = parseInt(gadMatch[1], 10);

  // If not in message, get from user profile
  if (gadScore === null) {
    try {
      const user = await User.findById(req.userId);
      if (user && user.questionnaire && typeof user.questionnaire.gad7Score === "number") {
        gadScore = user.questionnaire.gad7Score;
      }
    } catch (err) {
      console.error("Error fetching user for chatbot:", err);
    }
  }

  // Build a custom prompt for Gemini
  let customPrompt = "You are a supportive mental health chatbot. Respond empathetically and helpfully.";
  if (gadScore !== null) {
    if (gadScore <= 4) {
      customPrompt += " The user has a low GAD-7 score, so offer gentle encouragement and normalizing words.";
    } else if (gadScore <= 9) {
      customPrompt += " The user has a mild GAD-7 score, so offer supportive advice and coping strategies.";
    } else if (gadScore <= 14) {
      customPrompt += " The user has a moderate GAD-7 score, so be extra empathetic, suggest self-care, and encourage seeking support if needed.";
    } else {
      customPrompt += " The user has a high GAD-7 score, so respond with deep empathy, recommend professional help, and provide crisis resources if appropriate.";
    }
    customPrompt += ` Here is the user's message: ${message}`;
  } else {
    customPrompt += ` Here is the user's message: ${message}`;
  }

  try {
    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: customPrompt }] }]
      })
    });

    const data = await geminiRes.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't get a response.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ reply: "Error connecting to Gemini API." });
  }
});

module.exports = router;
