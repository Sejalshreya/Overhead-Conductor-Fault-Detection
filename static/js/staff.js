const credentials = {
  'officer': { user: 'Saadgi', pass: 'officer123', name: 'Saadgi Puniwala', role:'Officer' },
  'staff01': { user: 'Komal', pass: 'komal123', name: 'Komal Kumari', role:'Staff' },
  'staff02': { user: 'Mayurika', pass: 'mayurika123', name: 'Mayurika Das', role:'Staff' },
  'staff03': { user: 'Shreya', pass: 'shreya123', name: 'Shreya Jirankali', role:'Staff' },
  'staff04': { user: 'Sejal', pass: 'sejal123', name: 'Sejal Shreya', role:'Staff' },
  'staff05': { user: 'Navami', pass: 'navami123', name: 'Navami S', role:'Staff' }
};
const userMap = {
  'saadgi': 'officer',
  'komal': 'staff01',
  'mayurika': 'staff02',
  'shreya': 'staff03',
  'sejal': 'staff04',
  'navami': 'staff05'
};

let currentUser = null;

// Function to reset login error message on input
function clearError() {
  document.getElementById('loginError').textContent = "";
}

function loginHandler(evt) {
  evt.preventDefault();
  const uname = document.getElementById('username').value.trim().toLowerCase();
  const pwd = document.getElementById('password').value.trim();
  const key = userMap[uname];
  if (key && credentials[key] && credentials[key].pass === pwd) {
    currentUser = credentials[key];
    showDashboard();
  } else {
    document.getElementById('loginError').textContent = "Invalid username or password. Please try again.";
  }
}

function showDashboard() {
  let greet = (currentUser.role === "Staff")
    ? `<h2>Welcome aboard, ${currentUser.name}!</h2>
       <div class="role">You are logged in as Staff.</div>`
    : `<h2>Welcome, ${currentUser.name}!</h2>
       <div class="role">Logged in as <b>${currentUser.role}</b>. Ready to manage and lead!</div>`;
  let dashOpts = `
    <div class="dashboard-options">
      <button onclick="window.location.href='dashboard.html'">View Dashboard</button>
      <button ${(currentUser.role === "Officer") ? "" : "disabled"} onclick="if(this.disabled)return; window.location.href='staff.html';">Staff Management</button>
      <button ${(currentUser.role === "Officer") ? "" : "disabled"} onclick="if(this.disabled)return; window.location.href='staffadd.html';">Add Staff</button>
    </div>
  `;
  let teamAbout = `
    <section class="team-section">
      <strong>Team Name:</strong> SYNKTRA <br>
      <em>United for Uninterrupted Power</em> <br><br>
      <b>Team Members (6)</b><br>
      Saadgi Puniwala, Komal Kumari, Mayurika Das, Shreya Jirankali, Sejal Shreya, Navami S
    </section>
    <div class="about">We are SYNKTRA, a passionate, innovative tech team of six, dedicated to building robust solutions for smarter, safer power systems.</div>
  `;
  document.getElementById('mainContent').innerHTML = `
    <div class="greet-area">${greet}</div>
    ${dashOpts}
    ${teamAbout}
  `;
}

// Attach handlers after DOM loads
window.onload = function () {
  document.getElementById('loginBtn').onclick = loginHandler;
  document.getElementById('username').oninput = clearError;
  document.getElementById('password').oninput = clearError;
  document.getElementById('loginBox').onsubmit = loginHandler;
  // Navbar logic (restrict before login)
  document.getElementById('homeNav').onclick = function(e){ e.preventDefault(); location.reload(); };
  document.getElementById('logoutNav').onclick = function(e){ 
    e.preventDefault(); 
    localStorage.clear(); 
    sessionStorage.clear(); 
    window.location.href = 'index.html'; 
  };
  document.getElementById('dashNav').onclick = function(e){
    e.preventDefault();
    if(currentUser) { showDashboard(); }
    else alert("Please login to access this section.");
  };
  document.getElementById('staffNav').onclick = function(e){
    e.preventDefault();
    if(!currentUser) { alert("Please login to access this section."); }
    else if(currentUser.role === "Officer") { window.location.href='staff.html'; }
    else alert("Access Denied. Officers only.");
  };
}