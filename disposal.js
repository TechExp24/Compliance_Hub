const tabMap = {
  'daily': 'btn-daily',
  'docs': 'btn-docs',
  'lessons': 'btn-lessons',
  'certs': 'btn-certs'
};

function activateSection(id) {
  document.getElementById("main-section-buttons").style.display = "none";
  document.getElementById("disposal-box").style.display = "none";
  document.getElementById("top-tabs").style.display = "block";
  showTab(id);
}

function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-buttons button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById(tabMap[id]).classList.add('active');
  document.getElementById('top-tabs').scrollIntoView({ behavior: 'smooth' });
}

// Generate T-code using: day letter + (date + month)
function getTCode(date) {
  const dayLetter = date.toLocaleDateString('en-GB', { weekday: 'short' })[0].toUpperCase();
  const codeNum = date.getDate() + (date.getMonth() + 1); // date + month
  return `${dayLetter}${codeNum}`;
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
    return;
  }

  document.body.style.display = "block";

  const today = new Date();

  // Cooked = today
  const cooked = new Date(today);

  // Disposal = today + 2 days
  const disposal = new Date(today);
  disposal.setDate(today.getDate() + 2);

  // Expired threshold = today - 2 days
  const expired = new Date(today);
  expired.setDate(today.getDate() - 2);

  // Set T-codes and full dates
  document.getElementById("cook-code").textContent = getTCode(cooked);
  document.getElementById("cook-date").textContent = formatFullDate(cooked);

  document.getElementById("dispose-code").textContent = getTCode(disposal);
  document.getElementById("dispose-date").textContent = formatFullDate(disposal);

  // Reminder code: Today + 3-days-ago code
  const reminderCode = getTCode(expired) + getTCode(today);
  const reminder = document.getElementById("reminder-code");
  if (reminder) reminder.textContent = reminderCode;
});

// logout logic
document.getElementById("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});
