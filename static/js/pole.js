// ===== Pole Details & Assignments =====

const staffList = [
  { id: "staff01", name: "Komal Kumari" },
  { id: "staff02", name: "Mayurika Das" },
  { id: "staff03", name: "Shreya Jirankali" },
  { id: "staff04", name: "Sejal Shreya" },
  { id: "staff05", name: "Navami S" }
];

let currentPoleId = null;

function getPoleIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("poleId");
}

function showPoleDetails(poleId) {
  const data = poleData[poleId];
  const details = document.getElementById("poleDetails");

  details.innerHTML = `
    <h3>Pole ID: ${poleId}</h3>
    <p><b>Status:</b> ${data.status}</p>
    <p><b>Accelerometer:</b> X=${data.acc[0]}, Y=${data.acc[1]}, Z=${data.acc[2]}</p>
    <p><b>Gyroscope:</b> X=${data.gyro[0]}, Y=${data.gyro[1]}, Z=${data.gyro[2]}</p>
    <p><b>Current:</b> ${data.current}</p>
    <p><b>Coordinates:</b> Lat ${data.lat}, Lng ${data.lng}</p>
  `;

  document.getElementById("mapArea").innerHTML =
    `<iframe width="100%" height="100%" frameborder="0" 
      src="https://maps.google.com/maps?q=${data.lat},${data.lng}&z=15&output=embed"></iframe>`;
}

function loadStaffOptions() {
  const select = document.getElementById("staffSelect");
  staffList.forEach(staff => {
    const opt = document.createElement("option");
    opt.value = staff.id;
    opt.textContent = staff.name;
    select.appendChild(opt);
  });
}

function assignTask() {
  const staffId = document.getElementById("staffSelect").value;
  const dueDate = document.getElementById("dueDate").value;
  const msgBox = document.getElementById("assignMsg");

  if (!dueDate) {
    msgBox.textContent = "⚠️ Please select a due date.";
    msgBox.style.color = "yellow";
    return;
  }

  msgBox.textContent =
    `✅ Task for Pole ${currentPoleId} assigned to ${staffId} (due ${dueDate}).`;

  // Simulate notification
  localStorage.setItem(`notify_${staffId}`,
    `New task: Pole ${currentPoleId}, Due: ${dueDate}`);
}

window.addEventListener("DOMContentLoaded", () => {
  currentPoleId = getPoleIdFromURL();
  if (currentPoleId) {
    showPoleDetails(currentPoleId);
    loadStaffOptions();
  }
});
