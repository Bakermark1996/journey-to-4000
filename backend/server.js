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

app.use(cors());

// Cache file path
const CACHE_FILE = path.join(__dirname, "cache", "caleb.json");

// ===== Helper: Call RapidAPI and build cache file =====
async function fetchAndCacheStats() {
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
  const payload = {
    fetchedAt: new Date().toISOString(),
    data,
  };

  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
  await fs.writeFile(CACHE_FILE, JSON.stringify(payload, null, 2));
  console.log("✅ Cache refreshed at:", payload.fetchedAt);
  return payload;
}

// ===== Route: serve cached stats =====
app.get("/api/caleb-stats", async (_req, res) => {
  try {
    const file = await fs.readFile(CACHE_FILE, "utf8");
    const cache = JSON.parse(file);
    res.json(cache);
  } catch (err) {
    res.status(503).json({ error: "Cache not found. Refresh in progress?" });
  }
});

// ===== Route: force refresh (used by Cron Job) =====
app.get("/api/refresh", async (_req, res) => {
  try {
    const payload = await fetchAndCacheStats();
    res.json({ message: "Cache updated", fetchedAt: payload.fetchedAt });
  } catch (err) {
    console.error("❌ Refresh failed:", err);
    res.status(500).json({ error: "Failed to refresh cache" });
  }
});

// ===== DEV ONLY: Delete cache for testing frontend fallback =====
app.post("/api/dev-delete-cache", async (_req, res) => {
  try {
    await fs.rm(CACHE_FILE, { force: true });
    console.log("🗑️ Cache file deleted for testing.");
    res.json({ deleted: true });
  } catch (err) {
    console.error("❌ Error deleting cache:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
