// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors()); // allow cross-origin requests during dev

app.get("/api/caleb-stats", async (req, res) => {
  const url = "https://nfl-api-data.p.rapidapi.com/nfl-ath-statistics?year=2025&id=4431611";
  try {
    const r = await fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST
      }
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch player stats" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
