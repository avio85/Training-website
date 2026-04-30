let token = localStorage.getItem("token") || "";
let userRole = localStorage.getItem("role") || "";
let briefingCache = [];
let selectedBriefingCategory = "all";

const pageTitles = {
  dashboard: "Dashboard",
  schedule: "Training Schedule",
  briefings: "Briefing Library",
  airfields: "Airfields",
  aircraft: "Aircraft & Instruments",
  modular: "Modular Training",
  admin: "Admin Workspace"
};

function toast(message){
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.remove("hidden");
  setTimeout(()=>el.classList.add("hidden"), 2600);
}

function setAuthUi(){
  const logged = !!token;
  document.getElementById("loginStatus").textContent = logged ? (userRole === "admin" ? "Admin online" : "Member online") : "Guest mode";
  document.getElementById("logoutBtn").classList.toggle("hidden", !logged);
  document.querySelector(".topbar .primary-button").classList.toggle("hidden", logged);
  document.querySelectorAll(".admin-only").forEach(el=>el.classList.toggle("hidden", userRole !== "admin"));
}

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("pageTitle").textContent = pageTitles[id] || "Avi Oren Aviation";

  document.querySelectorAll(".nav-item,.mobile-nav").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.page === id);
  });

  if(id === "schedule") loadSchedule(false);
  if(id === "briefings") loadBriefings(false);
}

document.querySelectorAll(".nav-item,.mobile-nav").forEach(btn=>{
  btn.addEventListener("click", ()=>showPage(btn.dataset.page));
});

function authHeaders(){
  return token ? {"Authorization":"Bearer "+token} : {};
}

function openLoginModal(){ document.getElementById("loginModal").classList.remove("hidden"); }
function closeLoginModal(){ document.getElementById("loginModal").classList.add("hidden"); }

function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  token = "";
  userRole = "";
  setAuthUi();
  toast("Logged out");
  showPage("dashboard");
}
document.getElementById("logoutBtn").addEventListener("click", logout);

async function postForm(url, form){
  const res = await fetch(url,{method:"POST",headers:authHeaders(),body:new FormData(form)});
  const data = await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.detail || "Request failed");
  return data;
}

document.getElementById("loginForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{
    const data = await postForm("/api/login", e.target);
    token = data.token;
    userRole = data.role;
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setAuthUi();
    closeLoginModal();
    toast(data.approved ? "Logged in" : "Logged in, waiting for approval");
    if(userRole === "admin") showPage("admin");
  }catch(err){toast(err.message)}
});

document.getElementById("signupForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{
    const data = await postForm("/api/signup", e.target);
    toast(data.message || "Signup created");
  }catch(err){toast(err.message)}
});

document.getElementById("scheduleForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{
    await postForm("/api/schedule", e.target);
    e.target.reset();
    e.target.instructor.value = "Avi Oren";
    toast("Flight added");
    loadSchedule(true);
  }catch(err){toast(err.message)}
});

document.getElementById("studentForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{
    await postForm("/api/students", e.target);
    e.target.reset();
    toast("Student added");
  }catch(err){toast(err.message)}
});

document.getElementById("briefingForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{
    await postForm("/api/briefings", e.target);
    e.target.reset();
    toast("Briefing uploaded");
    loadBriefings(true);
  }catch(err){toast(err.message)}
});

function formatEndTime(start, length){
  const [h,m] = start.split(":").map(Number);
  const startM = h*60 + m;
  const endM = startM + Math.round(Number(length)*60);
  return `${String(Math.floor(endM/60)%24).padStart(2,"0")}:${String(endM%60).padStart(2,"0")}`;
}

async function loadSchedule(showErrors=true){
  const empty = document.getElementById("scheduleEmpty");
  const timeline = document.getElementById("scheduleTimeline");
  const res = await fetch("/api/schedule",{headers:authHeaders()});
  const data = await res.json().catch(()=>[]);
  if(!res.ok){
    timeline.innerHTML = "";
    empty.classList.remove("hidden");
    if(showErrors) toast(data.detail || "Login required");
    return;
  }
  empty.classList.add("hidden");
  if(!data.length){
    timeline.innerHTML = `<div class="empty-state">No flights scheduled yet.</div>`;
    return;
  }
  document.getElementById("todayFlights").textContent = data.length;
  timeline.innerHTML = data.map(r=>`
    <article class="timeline-card">
      <div>
        <div class="time-block">${r.start_time}</div>
        <div class="duration">until ${formatEndTime(r.start_time, r.length_hours)} · ${r.length_hours}h</div>
      </div>
      <div>
        <div class="flight-title">${r.student}</div>
        <div class="flight-meta">
          <span class="badge">${r.date}</span>
          <span class="badge">${r.instructor}</span>
          <span class="badge aircraft-badge">${r.aircraft_type} #${r.aircraft_number}</span>
        </div>
        ${r.notes ? `<p>${r.notes}</p>` : ""}
      </div>
      <button class="ghost-button">Details</button>
    </article>
  `).join("");
}

document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");
    selectedBriefingCategory = tab.dataset.category;
    renderBriefings();
  });
});

async function loadBriefings(showErrors=true){
  const empty = document.getElementById("briefingsEmpty");
  const grid = document.getElementById("briefingGrid");
  const res = await fetch("/api/briefings",{headers:authHeaders()});
  const data = await res.json().catch(()=>[]);
  if(!res.ok){
    briefingCache = [];
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    if(showErrors) toast(data.detail || "Login required");
    return;
  }
  briefingCache = data;
  empty.classList.toggle("hidden", data.length > 0);
  renderBriefings();
}

function renderBriefings(){
  const grid = document.getElementById("briefingGrid");
  const data = selectedBriefingCategory === "all" ? briefingCache : briefingCache.filter(b=>b.category === selectedBriefingCategory);
  if(!data.length){
    grid.innerHTML = `<div class="empty-state">No files in this category yet.</div>`;
    return;
  }
  grid.innerHTML = data.map(b=>`
    <article class="file-card">
      <div class="file-icon">📄</div>
      <a target="_blank" href="/uploads/${b.filename}">${b.title}</a>
      <p>${b.category}</p>
      <span class="badge">${b.original_name}</span>
    </article>
  `).join("");
}

async function loadUsers(){
  const res = await fetch("/api/users",{headers:authHeaders()});
  const data = await res.json().catch(()=>[]);
  if(!res.ok){toast(data.detail || "Admin login required"); return;}
  document.getElementById("usersList").innerHTML = data.map(u=>`
    <p>
      <strong>${u.email}</strong><br>
      Role: ${u.role} · Approved: ${u.approved ? "Yes" : "No"}
      ${u.approved ? "" : `<br><button class="ghost-button" onclick="approveUser('${u.id}')">Approve user</button>`}
    </p>
  `).join("");
}

async function approveUser(id){
  const res = await fetch("/api/users/"+id+"/approve",{method:"POST",headers:authHeaders()});
  if(res.ok){toast("User approved"); loadUsers();} else {toast("Approval failed");}
}

setAuthUi();
showPage("dashboard");
