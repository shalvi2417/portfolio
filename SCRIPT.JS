particlesJS
<script>
const form = document.getElementById("contactForm");
const messagesList = document.getElementById("messagesList");

// Load saved messages when page loads
document.addEventListener("DOMContentLoaded", loadMessages);

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop default form submit

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const newMessage = { name, email, message };

  // Save to localStorage
  let messages = JSON.parse(localStorage.getItem("portfolioMessages")) || [];
  messages.push(newMessage);
  localStorage.setItem("portfolioMessages", JSON.stringify(messages));

  loadMessages();

  // Send to Formspree using fetch
  fetch("https://formspree.io/f/xgolopdp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newMessage)
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Something went wrong. Try again.");
    }
  })
  .catch(error => {
    alert("❌ Error sending message.");
  });
});

function loadMessages() {
  messagesList.innerHTML = "";
  let messages = JSON.parse(localStorage.getItem("portfolioMessages")) || [];

  messages.forEach((msg, index) => {
    const messageCard = document.createElement("div");
    messageCard.style.background = "#1e1e1e";
    messageCard.style.padding = "15px";
    messageCard.style.margin = "10px 0";
    messageCard.style.borderRadius = "10px";
    messageCard.style.color = "white";

    messageCard.innerHTML = `
      <p><strong>Name:</strong> ${msg.name}</p>
      <p><strong>Email:</strong> ${msg.email}</p>
      <p><strong>Message:</strong> ${msg.message}</p>
      <button onclick="deleteMessage(${index})" 
        style="margin-top:10px; background:red; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
        Delete
      </button>
    `;

    messagesList.appendChild(messageCard);
  });
}

function deleteMessage(index) {
  let messages = JSON.parse(localStorage.getItem("portfolioMessages")) || [];
  messages.splice(index, 1);
  localStorage.setItem("portfolioMessages", JSON.stringify(messages));
  loadMessages();
}
</script>
