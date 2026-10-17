// STEP 3: Frontend Logic (frontend_logic.js)
// Its only job: Ask backend for the number and put it on the screen.

async function updateScreen() {
  // 1. Fetch the data from the backend
  const response = await fetch("http://127.0.0.1:5000");
  const data = await response.json();

  // 2. Put the temperature number directly into the HTML
  document.getElementById("temp-display").innerText = data.temperature + " °C";
}

// When user clicks the button, run the function above
document.getElementById("fetch-btn").onclick = updateScreen;

// Run once right away so the screen isn't empty when opening
updateScreen();
