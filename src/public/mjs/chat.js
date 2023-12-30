document.addEventListener("DOMContentLoaded", function () {
  const messageForm = document.getElementById("messageForm");
  if (messageForm) {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const messageInput = document.querySelector('input[name="message"]');
      const message = messageInput.value.trim();

      if (message) {
        sendMessage(message);
        addMessageToChatWindow('Bạn', message, true);
      }

      messageInput.value = "";
    });
  }

  const searchButton = document.querySelector(".input-group-append button");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const searchInput = document.querySelector('.input-group input[type="text"]');
      const searchTerm = searchInput.value.toLowerCase();

      const userList = document.getElementById("userList");
      if (userList) {
        const users = userList.querySelectorAll(".list-group-item");
        users.forEach((user) => {
          const userName = user.textContent.toLowerCase();
          user.style.display = userName.includes(searchTerm) ? "" : "none";
        });
      }
    });
  }
});


function sendMessage(message) {
  axios.post('/api/v1/messages', { content: message })
    .then(function (response) {
       console.log('Tin nhắn đã được gửi');
     })
     .catch(function (error) {
       console.error('Lỗi khi gửi tin nhắn:', error);
     });
}


function addMessageToChatWindow(username, message, isSender) {
  const chatWindow = document.getElementById("chatWindow");
  const messageElement = document.createElement("div");
  messageElement.classList.add('message', isSender ? 'sender' : 'receiver');
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; 
}

function loadConversation(conversationId, index) {
  axios.get(`/api/v1/conversations/${conversationId}`)
    .then(function (response) {
       console.log('Tin nhắn đã được gửi');
     })
     .catch(function (error) {
       console.error('Lỗi khi gửi tin nhắn:', error);
     });
}


function addMessageToChatWindow(username, message) {
  const chatWindow = document.getElementById("chatWindow");
  const messageElement = document.createElement("div");
  messageElement.classList.add('message');
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; 
}

// Hàm để tải cuộc hội thoại
function loadConversation(conversationId, index) {
  
   axios.get(`/api/v1/conversations/${conversationId}`)
   .then(function (response) {
      const { data } = response;
      const chatName = document.getElementById("chatName");
      const chatWindow = document.getElementById("chatWindow");

       if (index == 3) {
         chatName.textContent = data.data.name;
       } else {
         chatName.textContent = data.data.participants[index].name;
       }

       chatWindow.innerHTML = "";
      const messages = data.data.messages;

      messages.forEach((message) => {
         addMessageToChatWindow(message.username, message.content);
       });
     })
     .catch(function (error) {
       console.error('Lỗi khi tải cuộc hội thoại:', error);
     });
}
