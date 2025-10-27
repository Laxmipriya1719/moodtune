import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios"; // for ML service requests

// Models
import User from "./models/User.js";
import Mood from "./models/Mood.js";
import Playlist from "./models/Playlist.js";
import Analytics from "./models/Analytics.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import spotifyRoutes from "./routes/Spotify.js";
import discoverRoutes from "./routes/discoverRoutes.js";
import youtubeRoutes from "./routes/youtube.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------- Middleware -------------------
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ------------------- MongoDB Connection -------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------- Routes -------------------
// Core API routes
app.use("/api/users", userRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/spotify/discover", discoverRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/youtube", youtubeRoutes);

// Root route (health check)
app.get("/", (req, res) => {
  res.send("🎶 MoodTune Backend API is running!");
});

// ------------------- ML Service Connection -------------------
// Optional: separate POST route to call ML service directly
app.post("/api/predict-mood", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const mlUrl =
      process.env.ML_SERVICE_URL || "https://moodtune-1.onrender.com/analyze-text";

    const response = await axios.post(mlUrl, { text });

    // Return the detected mood from Flask ML backend
    const detectedMood = response.data.faces?.[0]?.emotion || "Neutral";

    return res.json({ mood: detectedMood, raw: response.data });
  } catch (error) {
    console.error("❌ ML Service Error:", error.message);
    return res.status(500).json({ error: "Failed to connect to ML service" });
  }
});

// Default analytics example route
app.get("/api/analytics", (req, res) => {
  res.json({
    moodData: [
      { day: "Mon", happy: 5, calm: 3, energetic: 2 },
      { day: "Tue", happy: 3, calm: 4, energetic: 5 },
      { day: "Wed", happy: 6, calm: 2, energetic: 3 },
      { day: "Thu", happy: 4, calm: 3, energetic: 6 },
      { day: "Fri", happy: 7, calm: 2, energetic: 4 },
      { day: "Sat", happy: 5, calm: 5, energetic: 5 },
      { day: "Sun", happy: 6, calm: 4, energetic: 3 },
    ],
    genreData: [
      { name: "Pop", value: 40, color: "#8B5CF6" },
      { name: "Rock", value: 25, color: "#3B82F6" },
      { name: "Hip-Hop", value: 20, color: "#10B981" },
      { name: "Jazz", value: 15, color: "#F59E0B" },
    ],
    topSongs: [
      { title: "Song A", artist: "Artist 1", plays: 120, mood: "Happy" },
      { title: "Song B", artist: "Artist 2", plays: 95, mood: "Calm" },
      { title: "Song C", artist: "Artist 3", plays: 85, mood: "Energetic" },
    ],
  });
});

// ------------------- Catch-all 404 -------------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ------------------- Start Server -------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
