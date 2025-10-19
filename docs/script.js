// --- CONFIG ---
const API_BASE = "https://journey-to-4000.onrender.com";
const url = `${API_BASE}/api/caleb-stats`;
const options = { method: "GET", cache: "no-store" };
const GOAL = 4000;

// --- DOM HOOKS ---
const progressBar = document.querySelector(".progress-bar");

// Passing DOM
const passingYardsEl = document.querySelector('#passing-stats-container-2025 p:nth-child(2)');
const passingTD = document.querySelector('#passing-stats-container-2025 p:nth-child(3)');
const interceptions = document.querySelector('#passing-stats-container-2025 p:nth-child(4)');
const passingAttempts = document.querySelector('#passing-stats-container-2025 p:nth-child(5)');
const completions = document.querySelector('#passing-stats-container-2025 p:nth-child(6)');
const completionPercentage = document.querySelector('#passing-stats-container-2025 p:nth-child(7)');
const yardsPerPass = document.querySelector('#passing-stats-container-2025 p:nth-child(8)');

// Rushing DOM
const rushingYards = document.querySelector('#rushing-stats-container-2025 p:nth-child(2)');
const rushingTD = document.querySelector('#rushing-stats-container-2025 p:nth-child(3)');
const rushingAttempts = document.querySelector('#rushing-stats-container-2025 p:nth-child(4)');
const yardsPerCarry = document.querySelector('#rushing-stats-container-2025 p:nth-child(5)');

// --- HELPERS ---
function getStatValue(categories, categoryName, statName) {
  const cat = categories?.find(c => c.name === categoryName);
  if (!cat) return 0;
  const stat = cat.stats?.find(s => s.name === statName);
  return stat?.value ?? 0;
}

function updateProgressBar(yards) {
  const pct = Math.min((yards / GOAL) * 100, 100);
  progressBar.style.width = `${pct.toFixed(1)}%`;
  progressBar.textContent = `${yards.toLocaleString()} / ${GOAL.toLocaleString()} (${pct.toFixed(1)}%)`;
}

function updateStatsFromData(data) {
  const categories = data?.data?.statistics?.splits?.categories;
  if (!Array.isArray(categories)) {
    console.warn("No categories in API JSON");
    return;
  }

  // Passing
  const passingYardsValue     = getStatValue(categories, "passing", "passingYards");
  const passingTouchdowns     = getStatValue(categories, "passing", "passingTouchdowns");
  const passingInterceptions  = getStatValue(categories, "passing", "interceptions");
  const passAttempts          = getStatValue(categories, "passing", "passingAttempts");
  const passCompletions       = getStatValue(categories, "passing", "completions");
  const completionPct         = getStatValue(categories, "passing", "completionPct");
  const yardsPerAttempt       = getStatValue(categories, "passing", "yardsPerPassAttempt");

  // Rushing
  const rushYards             = getStatValue(categories, "rushing", "rushingYards");
  const rushTD                = getStatValue(categories, "rushing", "rushingTouchdowns");
  const rushAttempts          = getStatValue(categories, "rushing", "rushingAttempts");
  const rushYardsPer          = getStatValue(categories, "rushing", "yardsPerRushAttempt");

  // Update DOM (guard each in case the element isn't present yet)
  if (passingYardsEl)       passingYardsEl.innerHTML       = `<strong>Yards:</strong> ${passingYardsValue.toLocaleString()}`;
  if (passingTD)            passingTD.innerHTML            = `<strong>Touchdowns:</strong> ${passingTouchdowns}`;
  if (interceptions)        interceptions.innerHTML        = `<strong>Interceptions:</strong> ${passingInterceptions}`;
  if (passingAttempts)      passingAttempts.innerHTML      = `<strong>Attempts:</strong> ${passAttempts}`;
  if (completions)          completions.innerHTML          = `<strong>Completions:</strong> ${passCompletions}`;
  if (completionPercentage) completionPercentage.innerHTML = `<strong>Completion %:</strong> ${completionPct.toFixed(1)}%`;
  if (yardsPerPass)         yardsPerPass.innerHTML         = `<strong>Yards per Attempt:</strong> ${yardsPerAttempt.toFixed(1)}`;

  if (rushingYards)         rushingYards.innerHTML         = `<strong>Yards:</strong> ${rushYards}`;
  if (rushingTD)            rushingTD.innerHTML            = `<strong>Touchdowns:</strong> ${rushTD}`;
  if (rushingAttempts)      rushingAttempts.innerHTML      = `<strong>Attempts:</strong> ${rushAttempts}`;
  if (yardsPerCarry)        yardsPerCarry.innerHTML        = `<strong>Yards per Attempt:</strong> ${rushYardsPer.toFixed(1)}`;

  updateProgressBar(passingYardsValue);
}

// --- FETCH & INIT ---
async function fetchPlayerStats() {
  try {
    const res = await fetch(url, options);

    // If backend cache is missing, server returns 503
    if (res.status === 503) {
      console.warn("Cache missing. Triggering refresh...");
      await fetch(`${backendBaseUrl}/api/refresh`); // hit refresh endpoint
      await new Promise(resolve => setTimeout(resolve, 1500)); // wait ~1.5s for cache to write

      // Try again after refresh
      const retry = await fetch(url, options);
      if (!retry.ok) throw new Error(`HTTP ${retry.status}`);
      const retryData = await retry.json();
      updateStatsFromData(retryData);
      return;
    }

    // Normal path — cache exists
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    updateStatsFromData(data);

  } catch (err) {
    console.error("Error fetching player stats:", err);
  }
}


document.addEventListener("DOMContentLoaded", fetchPlayerStats);

// ======== MOBILE MENU TOGGLE ========
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Optional: close menu after clicking a link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
});
