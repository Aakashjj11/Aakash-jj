function closeChat() {
  window.location.href = "dashboard.html";
}

function sendRequest() {
  const name = document.getElementById("pname").value;
  const group = document.getElementById("bgroup").value;
  const age = document.getElementById("age").value;
  const location = document.getElementById("location").value;
  const time = document.getElementById("time").value;

  const message = `${name}: Need ${group} blood at ${location} at ${time}`;
  const chatBox = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = "message donor";
  div.textContent = message;
  chatBox.appendChild(div);

  // Clear inputs
  document.getElementById("pname").value = "";
  document.getElementById("bgroup").value = "";
  document.getElementById("age").value = "";
  document.getElementById("location").value = "";
  document.getElementById("time").value = "";
}
