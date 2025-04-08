let typed = "";
document.addEventListener('keydown', (e) => {
  typed += e.key.toLowerCase();
  if (typed.includes("stieg") || typed.includes("temp")) {
    showBirthday();
    typed = "";
  }
  if (typed.length > 15) typed = typed.slice(-15);
});

function showBirthday() {
  const message = document.getElementById("birthdayMessage");
  message.style.display = "block";
  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.setProperty('--hue', Math.floor(Math.random() * 360));
    confetti.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
    confetti.style.setProperty('--duration', `${Math.random() * 2 + 2}s`);
    confetti.style.width = `${Math.random() * 8 + 5}px`;
    confetti.style.height = confetti.style.width;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }
  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
}