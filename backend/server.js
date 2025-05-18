require('dotenv').config();
const express = require("express");
const connectDB = require("./db"); 
const authRoutes = require("./routes/auth");
const chatRoutes = require('./routes/chat');
const lawRoutes = require('./routes/laws');
const evidenceRoutes = require("./routes/evidence");
const cors = require('cors');
const path = require('path'); 


const app = express();

app.use(express.json());
app.use(cors());

connectDB(); 

app.use("/api/auth", authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/laws', lawRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Server running on port 5000");
});
