// ===== CORE STATE =====
let token = localStorage.getItem('token') || '';
let userRole = localStorage.getItem('role') || '';

// ===== NAVIGATION =====
function showPage(id){
  if(id === "schedule" && !token){
    openLoginModal();
    toast("Login required");
    return;
  }

  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.nav-item,.mobile-nav').forEach(b=>{
    b.classList.toggle('active', b.dataset.page === id);
  });

  if(id === "schedule") loadSchedule();
}

// ===== AUTH =====
function authHeaders(){
  return token ? {'Authorization':'Bearer ' + token} : {};
}

// ===== TOAST =====
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'), 2500);
}

// ===== LOGIN =====
function openLoginModal(){document.getElementById('loginModal').classList.remove('hidden')}
function closeLoginModal(){document.getElementById('loginModal').classList.add('hidden')}

function logout(){
  localStorage.clear();
  token = '';
  userRole = '';
  location.reload();
}

// ===== ATPL AI =====
async function handleAtplAiClick(e){
  e.preventDefault();

  try{
    const res = await fetch("/api/settings/atpl-ai");
    const data = await res.json();

    if(data.active){
      window.open(data.url, "_blank");
    }else{
      showPage("atplai");
    }
  }catch{
    showPage("atplai");
  }
}

// ===== BRIEFING TABS =====
function showBriefingTab(tab){
  document.querySelectorAll(".briefing-tab").forEach(b=>{
    b.classList.toggle("active", b.dataset.briefingTab === tab);
  });

  document.querySelectorAll(".briefing-tab-panel").forEach(p=>{
    p.classList.toggle("active", p.id === "briefingTab-" + tab);
  });
}

// ===== AIRPORT CHARTS =====
function showChartInViewer(url){
  document.getElementById("chartFrame").src = url;
  document.getElementById("chartOpenLink").href = url;
}

function selectAirport(code){
  document.querySelectorAll(".airport-card").forEach(btn=>{
    btn.classList.remove("active");
    if(btn.querySelector("strong")?.innerText === code){
      btn.classList.add("active");
    }
  });

  const item = airportCharts[code];
  if(!item) return;

  document.getElementById("selectedAirportChip").textContent = code;
  document.getElementById("selectedAirportName").textContent = item.name;

  showChartInViewer(item.chart);

  document.getElementById("googleMapsLink").href = item.maps;

  const extra = document.getElementById("chartExtraLinks");
  extra.innerHTML = (item.links || []).map(link =>
    `<button class="ghost-button" onclick="showChartInViewer('${link.url}')">${link.label}</button>`
  ).join("");
}

// ===== WEATHER (HOME) =====
async function loadHomeWeather(){
  try{
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=46.53&longitude=18.99&current_weather=true"
    );
    const data = await res.json();
    const w = data.current_weather;

    document.getElementById("homeTemp").textContent = w.temperature + "°C";
    document.getElementById("homeWind").textContent = w.windspeed + " kt";
    document.getElementById("homePressure").textContent = "—";

  }catch{
    console.log("Weather failed");
  }
}

// ===== SCHEDULE =====
async function loadSchedule(){
  if(!token){
    document.getElementById("scheduleGuestMessage").classList.remove("hidden");
    return;
  }

  document.getElementById("scheduleGuestMessage").classList.add("hidden");

  const res = await fetch("/api/wave-schedule", {headers: authHeaders()});
  const data = await res.json();

  renderWaveCalendar(data.flights || []);
}

function renderWaveCalendar(flights){
  const cal = document.getElementById("waveCalendar");
  if(!cal) return;

  cal.innerHTML = flights.map(f => `
    <div class="flight-card">
      <strong>${f.student}</strong>
      <div>${f.date} ${f.time}</div>
      <div>${f.instructor} · ${f.aircraft}</div>
      ${f.note ? `<div>${f.note}</div>` : ""}
    </div>
  `).join("");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", ()=>{
  loadHomeWeather();

  document.querySelectorAll('.nav-item,.mobile-nav').forEach(b=>{
    if(b.dataset.page !== "atplai"){
      b.addEventListener("click", ()=>showPage(b.dataset.page));
    }
  });
});