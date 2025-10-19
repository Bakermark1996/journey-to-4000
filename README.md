# 🏈 Journey to 4,000

**Journey to 4,000** is a personal web project that tracks Chicago Bears quarterback **Caleb Williams' journey to 4,000 passing yards** in a single NFL season. The Chicago Bears are the only NFL franchise that has **never had a 4,000-yard passer** — this site visualizes Caleb's attempt to be the first.

The project features **live stat updates, caching, a dynamic progress bar, mobile-friendly UI**, and automated weekly data refreshes.

---

## 🚀 Features

- **Live Stat Updates** – Pulls Caleb Williams’ season stats from a RapidAPI NFL endpoint.
- **Progress Bar Tracking** – Visualizes progress toward 4,000 yards.
- **Weekly Auto-Caching** – Backend fetches stats every **Tuesday at 12:00 AM PT** and serves a cached JSON file to reduce API usage.
- **Frontend Shimmer Loading Effects** – ESPN-style skeleton UI while data loads.
- **Mobile Responsive** – Hamburger menu, responsive typography, and adaptive layout.
- **Fallback Logic** – If cache is missing, frontend auto-recovers by triggering a refresh.
- **2024 Stats Reference** – Static historical comparison while Caleb builds his first full season.

> 📝 **Coming Soon**: Top 10 Bears Passing Leaders Section (B)

---

## 🗂️ Project Structure
```
journey-to-4000/
├── backend/ # Secured Node.js API + cache
│ ├── server.js # Express server + API routes
│ ├── data/ # (future static leaderboard data)
│ ├── cache/ # caleb.json saved here (ignored by Git)
│ ├── .env # RapidAPI keys (not committed)
│ └── package.json
│
├── docs/ # GitHub Pages frontend (public website)
│ ├── index.html # Main webpage UI
│ ├── styles.css # Styling + responsive design
│ └── script.js # Frontend logic + API calls
│
├── .github/
│ └── workflows/
│ └── weekly-refresh.yml # GitHub Actions cron (Tues @ midnight PT)
│
├── .gitignore
└── README.md

```
---

## 🧰 Technologies Used

**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express  
**API:** RapidAPI — NFL API Data  
**Automation:** GitHub Actions (scheduled weekly refresh)  
**Deployment:** GitHub Pages (frontend) + Render (backend)  
**Security:** `.env` for API keys, CORS-restricted backend

---

## ⚙️ Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/<YOUR_USERNAME>/journey-to-4000.git
cd journey-to-4000/backend

Install server dependencies

npm install


Create a .env file

RAPIDAPI_KEY=your_api_key_here
RAPIDAPI_HOST=nfl-api-data.p.rapidapi.com
PORT=3000


Start backend

npm start


Running at:
http://localhost:3000

Open frontend
Open docs/index.html in your browser
(or use VS Code's Live Server extension)

🌐 Deployment
Layer	Service
Frontend	GitHub Pages
Backend	Render (free tier)
Cron (Weekly Refresh)	GitHub Actions

After deployment, your frontend should call:

https://<YOUR_BACKEND>.onrender.com/api/caleb-stats

🕒 Auto-Caching Behavior

GitHub Actions triggers /api/refresh every Tuesday @ 00:00 PT

Backend writes backend/cache/caleb.json

Frontend always reads from /api/caleb-stats

If cache is missing, frontend triggers a one-time recovery refresh

🐻 Future Enhancements

Top 10 Bears Passing Leaders

Weekly Yardage Chart

Historical Stats vs Franchise Average

Dark Mode

Mobile Home-Screen “App” Mode (PWA)

👤 Author

Mark Baker
GitHub: https://github.com/bakermark1996
🐻⬇️ Bear Down!

⚠️ Disclaimer

This project is for personal and educational use only.
All NFL data is retrieved from third-party APIs via RapidAPI.