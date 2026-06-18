// Function to reset login error message on input
function clearError() {
  document.getElementById('loginError').textContent = "";
}

// Attach handlers after DOM loads
window.onload = function () {
  // Only attach login handlers if we're on the login page
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginBox = document.getElementById('loginBox');
  
  if (loginBtn && usernameInput && passwordInput && loginBox) {
    loginBtn.onclick = function(e) {
      e.preventDefault();
      loginBox.submit();
    };
    usernameInput.oninput = clearError;
    passwordInput.oninput = clearError;
    loginBox.onsubmit = function(e) {
      // Let the form submit naturally
      return true;
    };
  }
  
  // Navbar logic
  const homeNav = document.getElementById('homeNav');
  const logoutNav = document.getElementById('logoutNav');
  const dashNav = document.getElementById('dashNav');
  const staffNav = document.getElementById('staffNav');
  
  if (homeNav) {
    homeNav.onclick = function(e){ 
      e.preventDefault(); 
      window.location.href = '/'; 
    };
  }
  
  if (logoutNav) {
    logoutNav.onclick = function(e){ 
      e.preventDefault(); 
      window.location.href = '/logout'; 
    };
  }
  
  if (dashNav) {
    dashNav.onclick = function(e){
      e.preventDefault();
      window.location.href = '/dashboard';
    };
  }
  
  if (staffNav) {
    staffNav.onclick = function(e){
      e.preventDefault();
      window.location.href = '/staff';
    };
  }
}