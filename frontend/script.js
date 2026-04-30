let token = localStorage.getItem("token") || "";

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
function authHeaders(){
  return token ? {"Authorization":"Bearer "+token} : {};
}
function logout(){
  localStorage.removeItem("token");
  token="";
  alert("Logged out");
  showPage("home");
}
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
    token = data.token; localStorage.setItem("token", token);
    alert("Logged in. Role: "+data.role+" Approved: "+data.approved);
  }catch(err){alert(err.message)}
});
document.getElementById("signupForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{ const data = await postForm("/api/signup", e.target); alert(data.message); }
  catch(err){alert(err.message)}
});
document.getElementById("scheduleForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{ await postForm("/api/schedule", e.target); alert("Schedule added"); loadSchedule(); }
  catch(err){alert(err.message)}
});
document.getElementById("studentForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{ await postForm("/api/students", e.target); alert("Student added"); }
  catch(err){alert(err.message)}
});
document.getElementById("briefingForm").addEventListener("submit", async e=>{
  e.preventDefault();
  try{ await postForm("/api/briefings", e.target); alert("File uploaded"); }
  catch(err){alert(err.message)}
});

async function loadSchedule(){
  const res = await fetch("/api/schedule",{headers:authHeaders()});
  const data = await res.json();
  if(!res.ok){alert(data.detail || "Login required"); return;}
  let html="<tr><th>Date</th><th>Start</th><th>Length</th><th>Student</th><th>Instructor</th><th>Aircraft</th><th>Notes</th></tr>";
  data.forEach(r=>{
    html+=`<tr><td>${r.date}</td><td>${r.start_time}</td><td>${r.length_hours}h</td><td>${r.student}</td><td>${r.instructor}</td><td>${r.aircraft_type} #${r.aircraft_number}</td><td>${r.notes||""}</td></tr>`;
  });
  document.getElementById("scheduleTable").innerHTML=html;
}
async function loadBriefings(){
  const res = await fetch("/api/briefings",{headers:authHeaders()});
  const data = await res.json();
  if(!res.ok){alert(data.detail || "Login required"); return;}
  document.getElementById("briefingsList").innerHTML = data.length ? data.map(b=>`<p><b>${b.category}</b> — <a target="_blank" href="/uploads/${b.filename}">${b.title}</a></p>`).join("") : "<p>No files uploaded yet.</p>";
}
async function loadUsers(){
  const res = await fetch("/api/users",{headers:authHeaders()});
  const data = await res.json();
  if(!res.ok){alert(data.detail || "Admin login required"); return;}
  document.getElementById("usersList").innerHTML = data.map(u=>`
    <p>${u.email} — ${u.role} — approved: ${u.approved}
    ${u.approved ? "" : `<button onclick="approveUser('${u.id}')">Approve</button>`}</p>
  `).join("");
}
async function approveUser(id){
  const res = await fetch("/api/users/"+id+"/approve",{method:"POST",headers:authHeaders()});
  if(res.ok){alert("Approved"); loadUsers();} else {alert("Approval failed");}
}
