/* ✅ login.js - full smart login with name logging and validation */

const webhookURL = "https://script.google.com/macros/s/AKfycbzdB6oglQvB5MNBy_5OdsYmkDWI9f74Vo5XzvtixvbUNA7FjgQuVZv1ex16Bxay78z_/exec";

// ✅ All users with names
const users = [
  { email: "India.chambers11@gmail.com", password: "2004", name: "India", business: ["ricks-diner", "stclaire-valentine"] },
  { email: "abrarsuhaib98@gmail.com", password: "1998", name: "Suhaib", business: ["ricks-diner", "stclaire-valentine"] },
  { email: "selmanewafi3@gmail.com", password: "2007", name: "Wafi", business: ["phillys-cowley", "phillys-stclements"] },
  { email: "alexa.xandra.mae@gmail.com", password: "2003", name: "Alexandra", business: ["stclaire-valentine"] },
  { email: "cerysljenkins@gmail.com", password: "2003", name: "Cerys", business: ["stclaire-valentine"] },
  { email: "mdaullah86@gmail.com", password: "1986", name: "Ahsan", business: ["stclaire-valentine"] },
  { email: "abtshahed@gmail.com", password: "1998", name: "Shahed", business: ["stclaire-valentine"] },
  { email: "oliviarr08@gmail.com", password: "2008", name: "Olivia", business: ["stclaire-valentine"] },
  { email: "stclements@phillys.com", password: "1234", name: "St Clements", business: ["phillys-stclements"] },
  { email: "rick@diner.com", password: "1234", name: "Rick", business: ["ricks-diner"] },
  { email: "hanimensur63@gmail.com", password: "2004", name: "Hani", business: ["ricks-diner"] },
  { email: "sumeshkp@gmail.com", password: "1987", name: "Sumesh", business: ["ricks-diner"] },
  { email: "dejejus14@yahoo.com", password: "1990", name: "Abito", business: ["ricks-diner"] },
  { email: "Constancio", password: "1992", name: "Soares", business: ["ricks-diner"] },
  { email: "toprakcideniz@gmail.com", password: "1995", name: "Deniz", business: ["ricks-diner"] },
  { email: "sonaruksha97@gmail.com", password: "1997", name: "Sona", business: ["ricks-diner", "stclaire-valentine"] },
  { email: "charlottehunthughes@gmail.com", password: "2005", name: "Lotte", business: ["ricks-diner", "stclaire-valentine"] },
  { email: "valentine@stclaire.com", password: "1234", name: "Valentine", business: ["stclaire-valentine"] },
  { email: "bantu.maruthi990@gmail.com", password: "1999", name: "Bantu", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
  { email: "sbenbakhti@gmail.com", password: "1234", name: "Sami", business: ["phillys-cowley", "phillys-stclements", "ricks-diner", "stclaire-valentine"] },
  { email: "mourad2001@yahoo.com", password: "1972", name: "Mourad", business: ["phillys-cowley", "phillys-stclements"] },
  { email: "Sertorio", password: "1999", name: "Rio", business: ["phillys-cowley", "phillys-stclements"] },
  { email: "niharpatil345@gmail.com", password: "1999", name: "Patil", business: ["phillys-stclements"] },
  { email: "honorio", password: "1980", name: "Honorio", business: ["phillys-stclements"] },
];

// ✅ Quotes
const quotes = [
"You’re on fire today — don’t burn the place down! 🔥",
"Look at you go! Total shift slayer 💪",
"If awesome had a face, it’d be yours today 😎",
"Crushing it like it’s your full-time job (oh wait… it is!) 😄",
"You + today = absolute chaos in the best way 💥",
"You’re the reason today’s going so smooth. No cap! 🧢",
"This shift doesn’t know what hit it — you showed up!",
"If we had a scoreboard, you'd be top every round 🎯",
"Go ahead, steal the spotlight again ✨",
"You’re serving more than food — you’re serving good vibes too 🍔⚡",
"You’re moving like you’ve had 3 espressos and a Beyoncé playlist ☕🎶",
"Speed, style, and smiles – you’re the full package today 📦",
"Whatever playlist is in your head — keep it playing!",
"We should put YOU on the specials board 🔥",
"Your energy’s louder than the ticket printer – and we love it!",
"That’s not just a shift – that’s a performance 👏",
"Keep rollin’, rockstar – the day’s not ready for you!",
"You’re not even halfway done and you’ve already made the day better!",
"If hustle was a sport, you’d be in the hall of fame 🏆",
"The sauce isn’t the only thing bringing heat today! 🌶️"
];

// ✅ Login handler
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  const user = users.find(u =>
  (u.email.toLowerCase() === email || u.name.toLowerCase() === email) && u.password === password);
  
  if (!user) {
    errorMsg.innerText = "Invalid credentials.";
    errorMsg.classList.add("shake");
    setTimeout(() => errorMsg.classList.remove("shake"), 400);
    return false;
  }

  sessionStorage.setItem("loggedIn", true);
  showGreeting(user);
  return false;
}

// ✅ Greeting popup
function showGreeting(user) {
  const loginBox = document.querySelector(".login-box");
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  loginBox.innerHTML = `
    <div class="popup">
      <h2>Hey ${user.name} 👋</h2>
      <p class="quote">"${randomQuote}"</p>
      <button class="ok-btn">Proceed</button>
    </div>
  `;

  document.querySelector(".ok-btn").onclick = () => showLocationButtons(user);
}

// ✅ Show business locations
function showLocationButtons(user) {
  const loginBox = document.querySelector(".login-box");
  loginBox.innerHTML = `<h3>Select Location</h3>`;

  const container = document.createElement("div");
  container.className = "location-buttons";

  if (user.business.length === 1) {
    const loc = user.business[0];
    logToSheet(user.email, user.name, loc);
    window.location.href = `${loc}.html`;
    return;
  }

  user.business.forEach(loc => {
    const btn = document.createElement("button");
    btn.innerText = loc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    btn.onclick = () => {
      logToSheet(user.email, user.name, loc);
      sessionStorage.setItem("loggedIn", true);
      window.location.href = `${loc}.html`;
    };

    container.appendChild(btn);
  });

  loginBox.appendChild(container);
}

// ✅ Logging function (prevents "Unknown")
function logToSheet(email, name, business) {
  if (!email || !name || !business) {
    console.warn("Missing data, not logging:", { email, name, business });
    return;
  }

  const url = `${webhookURL}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&business=${encodeURIComponent(business)}`;

  fetch(url)
    .then(res => res.text())
    .then(data => console.log("Logged:", data))
    .catch(err => console.error("Log failed:", err));
}
