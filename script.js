document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class='user-message'>${userInput}</div>`;
    document.getElementById('user-input').value = '';

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div class='bot-message'>${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

document.getElementById('chatbot-icon').addEventListener('click', () => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer.style.display === 'none') {
        chatContainer.style.display = 'flex';
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = `<div class='bot-message'>Hi! I am Robofy AI, How can I assist you today?</div>`;
    } else {
        chatContainer.style.display = 'none';
    }
});

document.getElementById('close-button').addEventListener('click', () => {
    document.getElementById('chat-container').style.display = 'none';
});

document.getElementById('reset-button').addEventListener('click', () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = `<div class='bot-message'>Hi! I am Robofy AI, How can I assist you today?</div>`;
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('send-button').click();
    }
}); 