import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // allow local frontend to access during dev

// ====== CACHE SETTINGS ======
const CACHE_FILE = path.join(__dirname, "cache", "caleb.json");

// helper: get next Tuesday 00:00 PT
function getNextTuesdayMidnight() {
  const now = new Date();
  const result = new Date(now);
  result.setHours(0, 0, 0, 0);
  const day = now.getDay(); // Sunday = 0
  const daysUntilTuesday = (9 - day) % 7 || 7;
  result.setDate(now.getDate() + daysUntilTuesday);
  return result.getTime();
}

// ====== ROUTE: /api/caleb-stats ======
app.get("/api/caleb-stats", async (_req, res) => {
  try {
    const now = Date.now();

    // 1️⃣ Try existing cache
    try {
      const txt = await fs.readFile(CACHE_FILE, "utf8");
      const cache = JSON.parse(txt);

      if (cache.expiresAt > now && cache.data) {
        console.log("✅ Using cached data");
        return res.json(cache);
      } else {
        console.log("⚠️ Cache expired, refreshing...");
      }
    } catch {
      console.log("ℹ️ No cache found, fetching new data...");
    }

    // 2️⃣ Fetch fresh data from RapidAPI
    const url =
      "https://nfl-api-data.p.rapidapi.com/nfl-ath-statistics?year=2025&id=4431611";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      },
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();

    // 3️⃣ Save new cache file
    const cachePayload = {
      fetchedAt: new Date().toISOString(),
      expiresAt: getNextTuesdayMidnight(),
      data,
    };

    await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify(cachePayload, null, 2));
    console.log(
      "✅ Cache updated! Next refresh:",
      new Date(cachePayload.expiresAt).toLocaleString()
    );

    res.json(cachePayload);
  } catch (error) {
    console.error("❌ Error fetching player stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
