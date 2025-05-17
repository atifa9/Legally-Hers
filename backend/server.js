require('dotenv').config();
const express = require("express");
const connectDB = require("./db"); // ✅ Import db connection function
const authRoutes = require("./routes/auth");
const chatRoutes = require('./routes/chat');
const lawRoutes = require('./routes/laws');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

connectDB(); // ✅ Call db connection function

app.use("/api/auth", authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/laws', lawRoutes);


app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Server running on port 5000");
});
