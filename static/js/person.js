// ===== Staff Assignments & Details =====
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// Show assignments in table
const tbody = document.getElementById("assignments-body");
if (assignments.length === 0) {
  tbody.innerHTML = `<tr><td colspan="6">No assignments yet.</td></tr>`;
} else {
  assignments.forEach((a, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${a.poleId}</td>
      <td>${a.location}</td>
      <td>${a.assignmentDate}</td>
      <td>${a.dueDate}</td>
      <td>${a.status}</td>
      <td><button onclick="openDetails(${idx})">View</button></td>
    `;
    tbody.appendChild(row);
  });
}

function openDetails(idx) {
  document.getElementById("persons-page").style.display = "none";
  document.getElementById("details-page").style.display = "block";

  const task = assignments[idx];
  const tb = document.getElementById("details-table-body");
  tb.innerHTML = task.details.map(row => `
    <tr>
      <td>${row.id}</td><td>${row.lon}</td><td>${row.alt}</td>
      <td>${row.ax}</td><td>${row.ay}</td><td>${row.az}</td>
      <td>${row.gx}</td><td>${row.gy}</td><td>${row.gz}</td>
    </tr>
  `).join("");

  document.getElementById("map-frame").src =
    `https://www.google.com/maps?q=${task.details[0].lat},${task.details[0].lon}&hl=es;z=14&output=embed`;
}

function goBack() {
  document.getElementById("details-page").style.display = "none";
  document.getElementById("persons-page").style.display = "block";
}

// Image preview
function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById('preview').innerHTML =
        `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
}

// Upload simulation
function submitUpload() {
  alert("File uploaded successfully!");
}
