# 🏈 Journey to 4,000

**Journey to 4,000** is a personal web project that tracks Chicago Bears quarterback **Caleb Williams’ journey to 4,000 passing yards** in the NFL.  
The Bears have never had a 4,000-yard passer — this project visualizes Caleb’s progress in real-time with a dynamic progress bar, live stats, and historical comparisons.

---

## 🚀 Features

- **Dynamic Stats Update:** Pulls Caleb Williams’ live season stats from an NFL API.
- **Progress Bar Visualization:** Shows real-time progress toward 4,000 passing yards.
- **Weekly Auto-Caching:** Node.js backend fetches fresh data every Tuesday at midnight (Pacific Time) and caches locally to save API calls.
- **Historical Stats:** 2024 season stats displayed statically.
- **Top 10 Franchise Leaders:** Automatically ranks Bears QBs once Caleb enters the top 10 list.

---

## 🗂️ Project Structure

journey-to-4000/
├── frontend/
│ ├── index.html # Main webpage
│ ├── styles.css # Visual design
│ └── script.js # Frontend logic + API calls
├── backend/
│ ├── server.js # Node.js server with caching + API routes
│ ├── data/
│ │ └── bears-leaders.json # Static Bears top 10 passing yard list
│ ├── cache/
│ │ └── caleb.json # Auto-generated weekly cache file
│ ├── .env # Private API keys (ignored by Git)
│ └── package.json
├── .gitignore
└── README.md


---

## 🧰 Technologies Used

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **API:** [RapidAPI NFL API Data](https://rapidapi.com/Creativesdev/api/nfl-api-data)
- **Cron Jobs:** `node-cron` for automatic weekly updates
- **Environment Variables:** `dotenv` to secure private API keys
- **CORS & Fetch:** For safe local API integration

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/journey-to-4000.git
cd journey-to-4000/backend

2. Install dependencies
npm install

3. Add your environment variables

Create a .env file inside /backend:

RAPIDAPI_KEY=your_api_key_here
RAPIDAPI_HOST=nfl-api-data.p.rapidapi.com
PORT=3000

4. Start the server
npm start


The backend will run at http://localhost:3000

5. Open the frontend

Open frontend/index.html in your browser (or use a local Live Server extension).

🌐 Deployment

Frontend: GitHub Pages

Backend: Render, Railway, or Vercel (Node environment required)

Once deployed:

Update script.js to point to your live backend URL (e.g. https://journey-to-4000.onrender.com/api/caleb-stats).

🕒 Auto Caching

The backend automatically refreshes Caleb’s stats every Tuesday at midnight (Pacific Time) via node-cron.
If the API fails, the cached version remains active until the next refresh.

🐻 Future Enhancements

Add per-game stat charting

Historical comparison by week

Live score updates during Bears games

Player milestone alerts (e.g. 1,000, 2,000, 3,000 yards)

👤 Author

Mark Baker
IT professional & Bears fan 🐻⬇️
Bakermark1996@gmail.com
https://github.com/Bakermark1996

⚠️ Disclaimer

This project is for personal and educational use only.
Data provided by RapidAPI’s NFL Data API.