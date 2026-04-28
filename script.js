const textElement = document.getElementById("typed-text");
const buttonContainer = document.getElementById("button-container");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

// --- Typing Effect Logic ---
const line1 = "I just have a burning question... ";
const line2 = "<br>Do you ... uhm... have a job for me? 😊";
const fullText = line1 + line2;
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    if (fullText.substring(index, index + 4) === "<br>") {
      textElement.innerHTML += "<br>";
      index += 4;
    } else {
      textElement.innerHTML += fullText.charAt(index);
      index++;
    }
    let speed =
      fullText.charAt(index - 1) === "." && index < line1.length + 1 ? 500 : 70;
    setTimeout(typeWriter, speed);
  } else {
    buttonContainer.style.display = "block";
  }
}
window.onload = typeWriter;

// --- The "Evasive" Logic ---

// Function to move the button
function moveButton() {
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate bounds to keep button on screen
  const maxX = window.innerWidth - btnRect.width - 20;
  const maxY = window.innerHeight - btnRect.height - 20;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Desktop: Move when mouse gets close
document.addEventListener("mousemove", (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;
  const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

  if (dist < 80) moveButton();
});

// Mobile: Move the moment it is touched
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevents the actual "click" from happening
  moveButton();
});

yesBtn.addEventListener("click", () => {
  textElement.innerHTML =
    'Yay! ❤️ Hit me up at <a href="https://annahoang.dev" target="_blank">https://annahoang.dev</a>';
  buttonContainer.style.display = "none";
});
