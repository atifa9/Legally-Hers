const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { optionalAuth } = require("../middleware/optionalauth");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat - Handle chat and save conversation
router.post("/", optionalAuth, async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ message: "Message is required" });
    }

    console.log("📥 Incoming message from user:", userMessage);

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful legal advisor chatbot." },
        { role: "user", content: userMessage },
      ],
    });

    const botReply = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't understand that.";
    console.log("🤖 Bot reply generated:", botReply);

    if (req.user) {
      console.log("✅ Authenticated user ID:", req.user.userId);
      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const today = new Date().toISOString().split("T")[0];
      let conversation = user.conversations.find(c => c.date === today);

      if (!conversation) {
        conversation = { date: today, messages: [] };
        user.conversations.push(conversation);
      }

      conversation.messages.push(
        { sender: "user", text: userMessage },
        { sender: "bot", text: botReply }
      );

      await user.save();
      console.log("✅ Conversation saved to database.");
    } else {
      console.log("ℹ️ Guest user – not saving conversation.");
    }

    res.json({ response: botReply });

  } catch (error) {
    console.error("❌ Chat error:", error);
    res.status(500).json({ message: "Error handling chat request" });
  }
});

// GET /api/chat/history - Retrieve chat history
router.get("/history", optionalAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return full sorted conversations with all messages
    const sortedChats = [...user.conversations].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json({ chats: sortedChats });

  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

module.exports = router;
