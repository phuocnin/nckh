document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.querySelector('input[name="message"]');
    const chatWindow = document.getElementById('chatWindow');
    let currentChatUserId = null;

    // Hàm để gửi tin nhắn đến server (giả định)
    function sendMessageToServer(message, userId) {
        console.log("Gửi tin nhắn đến server:", message, userId);
        // Thêm logic gửi tin nhắn đến server tại đây
    }

    // Hàm hiển thị tin nhắn trong cửa sổ chat
    function displayMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender === 'You' ? 'outgoing' : 'incoming');
        messageDiv.innerText = `${sender}: ${message}`;
        chatWindow.appendChild(messageDiv);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Xử lý sự kiện gửi tin nhắn
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = messageInput.value.trim();

        if (message && currentChatUserId) {
            displayMessage('You', message);
            sendMessageToServer(message, currentChatUserId);
            messageInput.value = '';
        }
    });

    // Xử lý sự kiện click vào người dùng trong danh sách
    document.querySelectorAll('.list-group-item').forEach(user => {
        user.addEventListener('click', function() {
            const userId = user.getAttribute('data-user-id');
            currentChatUserId = userId;
            // Xóa tin nhắn cũ và tải tin nhắn mới
            chatWindow.innerHTML = '';
            // Lấy tin nhắn từ server hoặc tải dữ liệu tin nhắn
            console.log("Chuyển sang cuộc trò chuyện với userId:", userId);
            // ... Tải tin nhắn từ server hoặc từ một nguồn dữ liệu
        });
    });

    // Bổ sung thêm logic cho việc gửi và nhận ảnh, file, vv. ở đây
});
