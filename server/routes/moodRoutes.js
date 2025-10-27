import express from "express";
import axios from "axios";
import Mood from "../models/Mood.js";

const router = express.Router();

// 🌐 Your deployed ML service URL
const ML_SERVICE_URL = "https://moodtune-1.onrender.com";

// ================================
// 🤖 DETECT mood using AI (via ML service)
// Must be placed BEFORE any dynamic routes like /:userId
// ================================
router.post("/detect", async (req, res) => {
  try {
    const { inputData, userId } = req.body;

    if (!inputData || !userId) {
      return res.status(400).json({ error: "Missing inputData or userId" });
    }

    // Call ML backend for text analysis
    const response = await axios.post(`${ML_SERVICE_URL}/analyze-text`, {
      text: inputData,
    });

    // Extract detected mood from ML response
    const detectedMood = response.data.faces?.[0]?.emotion || "neutral";

    // Save detected mood in MongoDB
    const mood = new Mood({
      userId,
      mood: detectedMood,
      confidence: 1, // default since Flask backend doesn't return confidence
      createdAt: new Date(),
    });
    await mood.save();

    res.status(200).json({
      message: "Mood detected successfully",
      mood: detectedMood,
      savedMood: mood,
    });
  } catch (err) {
    console.error("⚠️ ML Service Error:", err.message);
    res.status(500).json({
      error: "Failed to detect mood. Check ML service connection and input format.",
    });
  }
});

// ================================
// 🟢 CREATE mood entry manually
// ================================
router.post("/", async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================================
// 🔵 READ all moods of a specific user
// ================================
router.get("/:userId", async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// 🟣 UPDATE a mood entry
// ================================
router.put("/:id", async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(mood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================================
// 🔴 DELETE a mood entry
// ================================
router.delete("/:id", async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.json({ message: "Mood deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================================
// 🟠 GET all moods (for testing or admin)
// ================================
router.get("/", async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
