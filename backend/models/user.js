const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  sender: String, // 'user' or 'bot'
  text: String,
});

const conversationSchema = new mongoose.Schema({
  date: String, // "YYYY-MM-DD"
  messages: [messageSchema],
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: String,
  plan: { type: String, default: "free" },
  conversations: [conversationSchema],
 
});

module.exports = mongoose.model("User", userSchema);
