// ==============================================================================
// frontend_logic.js
// WHAT THIS FILE IS: The brain of the webpage.
// HTML only displays static boxes; this JavaScript code reaches out over the network,
// gets data from the backend, and changes the HTML in real-time.
// ==============================================================================

// "async function": Defines a function that is allowed to do asynchronous work
// (meaning: it can wait for slow network requests without freezing the web page).
// "updateScreen" is a user-chosen name. You could name this function "refreshTemp" or "getData".
async function updateScreen() {

  // "fetch(...)": A built-in browser tool that sends a network request.
  // "http://127.0.0.1:5000": The target backend server address.
  // "await": Pauses execution right here until the backend server responds with data.
  // "const response": Stores the raw network package received from the backend into a variable.
  const response = await fetch("http://127.0.0.1:5000");

  // "response.json()": Reads the body of the response and parses JSON text into a real JavaScript object.
  // "await": Pauses until all the bytes are read and parsed.
  // "const data": Now holds the object, e.g. { temperature: 29.0 }.
  const data = await response.json();

  // "document": Represents the active webpage loaded in the browser.
  // ".getElementById('temp-display')": Searches the HTML for the tag having id="temp-display".
  // ".innerText = ...": Replaces the text inside that HTML box with new text.
  // "data.temperature": Extracts the number (e.g. 29.0) from the data object.
  // '+ " °C"': Glues the degree symbol string onto the number to make "29.0 °C".
  document.getElementById("temp-display").innerText = data.temperature + " °C";
}

// "document.getElementById('fetch-btn')": Finds the HTML <button> that has id="fetch-btn".
// ".onclick = updateScreen": Tells the browser: "Whenever the user clicks this button,
// immediately trigger and run the updateScreen() function defined above".
document.getElementById("fetch-btn").onclick = updateScreen;

// "updateScreen()": Calling the function right here means it runs automatically the instant
// the page finishes loading in the browser, so the user doesn't see a blank placeholder.
updateScreen();
