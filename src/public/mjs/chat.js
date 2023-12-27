document.addEventListener('DOMContentLoaded', function () {
  // Bắt sự kiện gửi form tin nhắn
  const messageForm = document.getElementById('messageForm');
  messageForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const messageInput = document.querySelector('input[name="message"]');
    const message = messageInput.value.trim();
    
   
    messageInput.value = ''; 
  });

  
  const searchButton = document.querySelector('.input-group-append button');
  searchButton.addEventListener('click', function () {
    const searchInput = document.querySelector('.input-group input[type="text"]');
    const searchTerm = searchInput.value.toLowerCase();

    
    const userList = document.getElementById('userList');
    const users = userList.querySelectorAll('.list-group-item');
    
    users.forEach(user => {
      const userName = user.textContent.toLowerCase();
      if (userName.includes(searchTerm)) {
        user.style.display = '';
      } else {
        user.style.display = 'none';
      }
    });
  });
});
