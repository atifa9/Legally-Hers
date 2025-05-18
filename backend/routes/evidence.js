const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); 
const Evidence = require("../models/evidence"); 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads", req.user.id);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; 
    next();
  });
};

// Upload evidence
router.post("/upload", authenticateToken, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const newEvidence = new Evidence({
      user: req.user.id,
      filename: req.file.filename,
      url: `/uploads/${req.user.id}/${req.file.filename}`,
      type: req.file.mimetype,
      uploadedAt: new Date(),
    });

    await newEvidence.save();
    res.status(201).json({ message: "Evidence uploaded successfully", evidence: newEvidence });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error uploading evidence" });
  }
});

// Get user evidence list
router.get("/", authenticateToken, async (req, res) => {
  try {
    const evidences = await Evidence.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    // Return full URLs for frontend
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const formatted = evidences.map((e) => ({
      _id: e._id,
      filename: e.filename,
      url: baseUrl + e.url,
      type: e.type,
      uploadedAt: e.uploadedAt,
    }));
    res.json({ evidences: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching evidence" });
  }
});

module.exports = router;
