// Initial staff data with full details
let staffList = [
  { username: "staff01", fullname: "Komal Kumari", phone: "9199367067", email: "eng24cy0124@dsu.edu.in", role: "Staff" },
  { username: "staff02", fullname: "Mayurika Das", phone: "7439761950", email: "eng24ad0041@dsu.edu.in", role: "Staff" },
  { username: "staff03", fullname: "Shreya Jirankali", phone: "8767000519", email: "eng24cs0656@dsu.edu.in", role: "Staff" },
  { username: "staff04", fullname: "Sejal Shreya", phone: "7091177708", email: "eng24ds0153@dsu.edu.in", role: "Staff" },
  { username: "staff05", fullname: "Navami S", phone: "7975148392", email: "eng24am0232@dsu.edu.in", role: "Staff" }
];

// Render staff list in staff.html
function loadStaff() {
  const tbody = document.querySelector("#staffTable tbody");
  tbody.innerHTML = "";
  staffList.forEach((staff, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${staff.username}</td>
      <td>${staff.fullname}</td>
      <td>${staff.phone}</td>
      <td>${staff.email}</td>
      <td>${staff.role}</td>
      <td><button onclick="removeStaff(${index})">Remove</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Remove staff member
function removeStaff(index) {
  if (confirm(`Delete staff ${staffList[index].fullname}?`)) {
    staffList.splice(index, 1);
    loadStaff();
    alert("Staff removed.");
  }
}

// Add new staff from form (staffadd.html)
function addNewStaff(evt) {
  evt.preventDefault();

  const username = document.getElementById("username").value.trim();
  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !fullname || !phone || !email) {
    alert("Please fill all required fields.");
    return;
  }

  if (staffList.some(staff => staff.username.toLowerCase() === username.toLowerCase())) {
    alert("Username already exists.");
    return;
  }

  staffList.push({ username, fullname, phone, email, role });
  alert(`Staff ${fullname} added.`);
  evt.target.reset();

  // reload table if on staff.html
  if (document.querySelector("#staffTable")) {
    loadStaff();
  }
}
