function sendPrompt() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const prompt = input.value.trim();
  if (!prompt) return;

  // Tampilkan prompt user
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.textContent = prompt;
  chatBox.appendChild(userBubble);

  // Bubble bot loading
  const botBubble = document.createElement("div");
  botBubble.className = "chat-bubble bot";
  botBubble.textContent = "Sedang memproses gambar...";
  chatBox.appendChild(botBubble);

  // Kirim ke Python (harus via command)
  fetch(`http://localhost:5000/generate?prompt=${encodeURIComponent(prompt)}`)
    .then(res => res.blob())
    .then(blob => {
      botBubble.textContent = "";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      img.style.maxWidth = "100%";
      botBubble.appendChild(img);
    });

  input.value = "";
}
