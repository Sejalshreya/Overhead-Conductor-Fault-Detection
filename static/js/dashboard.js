// ===== Dashboard / Poles =====
const poles = [
    { id: "pole001", lat: 12.9716, lng: 77.5946, status: "Healthy", action: "Monitor" },
    { id: "pole002", lat: 12.9352, lng: 77.6245, status: "Warning", action: "Inspect" },
    { id: "pole003", lat: 12.9279, lng: 77.6271, status: "Alert", action: "Repair" }
];

// Load poles in table
function loadPoles() {
  const tbody = document.querySelector("#poleTable tbody");
  tbody.innerHTML = "";

  poles.forEach(pole => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${pole.id}</td>
      <td><a href="https://www.google.com/maps?q=${pole.lat},${pole.lng}" target="_blank">📍 View Map</a></td>
      <td class="status-${pole.status.toLowerCase()}">${pole.status}</td>
      <td>${pole.action}</td>
      <td><button onclick="viewPole('${pole.id}')">View</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Notifications
function checkNotifications() {
  const notifyBox = document.getElementById("officerNotify");
  const alerts = poles.filter(p => p.status === "Alert" || p.status === "Warning");

  if (alerts.length > 0) {
    notifyBox.style.display = "block";
    notifyBox.innerHTML = `⚠️ ${alerts.length} issue(s) need attention!`;
  } else {
    notifyBox.style.display = "none";
  }
}

// Redirect to pole details
function viewPole(poleId) {
  // Navigate to the pole details page with query parameter
  window.location.href = `/pole?poleId=${poleId}`;
}

window.addEventListener("DOMContentLoaded", () => {
  loadPoles();
  checkNotifications();
});