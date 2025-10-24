// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Models
// import User from "./models/User.js";
// import Mood from "./models/Mood.js";
// import Playlist from "./models/Playlist.js";
// import Analytics from "./models/Analytics.js";

// // Routes
// import userRoutes from "./routes/userRoutes.js";
// import moodRoutes from "./routes/moodRoutes.js";
// import playlistRoutes from "./routes/playlistRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import spotifyRoutes from "./routes/Spotify.js"; // ✅ Spotify routes
// import discoverRoutes from "./routes/discoverRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const API_KEY = process.env.YT_API_KEY;
// // Middleware
// app.use(cors());
// app.use(express.json());

// // DB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/moods", moodRoutes);
// app.use("/api/playlists", playlistRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/spotify/discover", discoverRoutes);

// // app.use("/spotify", spotifyRoutes); // ✅ All Spotify routes under /spotify
// app.use("/api/spotify", spotifyRoutes);
// // Add this line with your other route imports
// const youtubeRoutes = require('./routes/youtube');

// // Add this line with your other app.use() statements
// app.use('/api/youtube', youtubeRoutes);
// // Default analytics example route
// app.get("/api/analytics", (req, res) => {
//   res.json({
//     moodData: [
//       { day: "Mon", happy: 5, calm: 3, energetic: 2 },
//       { day: "Tue", happy: 3, calm: 4, energetic: 5 },
//       { day: "Wed", happy: 6, calm: 2, energetic: 3 },
//       { day: "Thu", happy: 4, calm: 3, energetic: 6 },
//       { day: "Fri", happy: 7, calm: 2, energetic: 4 },
//       { day: "Sat", happy: 5, calm: 5, energetic: 5 },
//       { day: "Sun", happy: 6, calm: 4, energetic: 3 },
//     ],
//     genreData: [
//       { name: "Pop", value: 40, color: "#8B5CF6" },
//       { name: "Rock", value: 25, color: "#3B82F6" },
//       { name: "Hip-Hop", value: 20, color: "#10B981" },
//       { name: "Jazz", value: 15, color: "#F59E0B" },
//     ],
//     topSongs: [
//       { title: "Song A", artist: "Artist 1", plays: 120, mood: "Happy" },
//       { title: "Song B", artist: "Artist 2", plays: 95, mood: "Calm" },
//       { title: "Song C", artist: "Artist 3", plays: 85, mood: "Energetic" },
//     ],
//   });
// });
// // === YOUTUBE SEARCH ENDPOINT ===
// app.get("/youtube/search", async (req, res) => {
//   const q = req.query.query;
//   try {
//     const ytRes = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
//         q
//       )}&key=${process.env.YT_API_KEY}`
//     );
//     const data = await ytRes.json();
//     if (data.items?.length > 0) {
//       res.json({ videoId: data.items[0].id.videoId });
//     } else {
//       res.json({ videoId: null });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "YT search failed" });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Models
// import User from "./models/User.js";
// import Mood from "./models/Mood.js";
// import Playlist from "./models/Playlist.js";
// import Analytics from "./models/Analytics.js";

// // Routes
// import userRoutes from "./routes/userRoutes.js";
// import moodRoutes from "./routes/moodRoutes.js";
// import playlistRoutes from "./routes/playlistRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import spotifyRoutes from "./routes/Spotify.js";
// import discoverRoutes from "./routes/discoverRoutes.js";
// import youtubeRoutes from "./routes/youtube.js"; // ✅ Fixed import

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const API_KEY = process.env.YT_API_KEY;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // DB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/moods", moodRoutes);
// app.use("/api/playlists", playlistRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/spotify/discover", discoverRoutes);
// app.use("/api/spotify", spotifyRoutes);
// app.use("/api/youtube", youtubeRoutes); // ✅ YouTube routes

// // Default analytics example route
// app.get("/api/analytics", (req, res) => {
//   res.json({
//     moodData: [
//       { day: "Mon", happy: 5, calm: 3, energetic: 2 },
//       { day: "Tue", happy: 3, calm: 4, energetic: 5 },
//       { day: "Wed", happy: 6, calm: 2, energetic: 3 },
//       { day: "Thu", happy: 4, calm: 3, energetic: 6 },
//       { day: "Fri", happy: 7, calm: 2, energetic: 4 },
//       { day: "Sat", happy: 5, calm: 5, energetic: 5 },
//       { day: "Sun", happy: 6, calm: 4, energetic: 3 },
//     ],
//     genreData: [
//       { name: "Pop", value: 40, color: "#8B5CF6" },
//       { name: "Rock", value: 25, color: "#3B82F6" },
//       { name: "Hip-Hop", value: 20, color: "#10B981" },
//       { name: "Jazz", value: 15, color: "#F59E0B" },
//     ],
//     topSongs: [
//       { title: "Song A", artist: "Artist 1", plays: 120, mood: "Happy" },
//       { title: "Song B", artist: "Artist 2", plays: 95, mood: "Calm" },
//       { title: "Song C", artist: "Artist 3", plays: 85, mood: "Energetic" },
//     ],
//   });
// });

// // YouTube Search Endpoint
// app.get("/youtube/search", async (req, res) => {
//   const q = req.query.query;
//   try {
//     const ytRes = await fetch(
//       `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
//         q
//       )}&key=${process.env.YT_API_KEY}`
//     );
//     const data = await ytRes.json();
//     if (data.items?.length > 0) {
//       res.json({ videoId: data.items[0].id.videoId });
//     } else {
//       res.json({ videoId: null });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "YT search failed" });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch"; // for Node <18

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

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/spotify/discover", discoverRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/youtube", youtubeRoutes);

// Default analytics route
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
app.get("/", (req, res) => {
  res.send("🎶 MoodTune Backend API is running!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
