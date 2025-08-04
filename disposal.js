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

function formatTCode(date) {
  const dayCode = date.toLocaleDateString('en-GB', { weekday: 'short' })[0].toUpperCase();
  return `${dayCode}${date.getDate() + date.getMonth() + 1}`;
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: '2-digit'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  } else {
    document.body.style.display = "block";

    const today = new Date();
    const cooked = new Date(today); cooked.setDate(today.getDate() - 2);
    const disposal = new Date(today); disposal.setDate(today.getDate() + 2);

    document.getElementById("cook-code").textContent = formatTCode(cooked);
    document.getElementById("cook-date").textContent = formatFullDate(cooked);
    document.getElementById("dispose-code").textContent = formatTCode(disposal);
    document.getElementById("dispose-date").textContent = formatFullDate(disposal);
    document.getElementById("reminder-code").textContent = formatTCode(today) + formatTCode(cooked);
  }
});

document.getElementById("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("loggedIn");
  window.location.href = "index.html";
});
