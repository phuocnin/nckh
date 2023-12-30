document.addEventListener("DOMContentLoaded", function () {
  // Bắt sự kiện gửi form tin nhắn
  const messageForm = document.getElementById("messageForm");
  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const messageInput = document.querySelector('input[name="message"]');
    const message = messageInput.value.trim();

    messageInput.value = "";
  });

  const searchButton = document.querySelector(".input-group-append button");
  searchButton.addEventListener("click", function () {
    const searchInput = document.querySelector(
      '.input-group input[type="text"]'
    );
    const searchTerm = searchInput.value.toLowerCase();

    const userList = document.getElementById("userList");
    const users = userList.querySelectorAll(".list-group-item");

    users.forEach((user) => {
      const userName = user.textContent.toLowerCase();
      if (userName.includes(searchTerm)) {
        user.style.display = "";
      } else {
        user.style.display = "none";
      }
    });
  });
});

function loadConversation(conversationId, index) {
  axios
    .get(`/api/v1/conversations/${conversationId}`)
    .then(function (response) {
      const { data } = response;
      const chatName = document.getElementById("chatName");
      if (index == 3) {
        chatName.textContent = data.data.name;
      } else {
        chatName.textContent = data.data.participants[index].name;
      }

      console.log(data);
      // chatWindow.innerHTML = ""; // clear the chat window
      // messages.forEach((message) => {
      //   const messageElement = document.createElement("p");
      //   messageElement.textContent = message.content; // replace 'content' with the actual property you want to display
      //   chatWindow.appendChild(messageElement);
      // });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
