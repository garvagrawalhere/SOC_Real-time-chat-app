const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector("#send-btn");
const messages = document.querySelector(".messages");

function handleSend() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const time = new Date().toLocaleTimeString();

  // Create message bubble
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "sent");

  // Create message text
  const messageText = document.createElement("p");
  messageText.textContent = text;

  // Create timestamp
  const sentTimestamp = document.createElement("div");
  sentTimestamp.classList.add("sent-timestamp");
  sentTimestamp.textContent = time;

  // Put text and timestamp inside message
  messageDiv.appendChild(messageText);
  messageDiv.appendChild(sentTimestamp);

  // Add message to chat
  messages.appendChild(messageDiv);
  messageDiv.scrollIntoView();

  // Clear input
  input.value = "";
}

// Send on button click
sendBtn.addEventListener("click", handleSend);

// Send on Enter key
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSend();
  }
});