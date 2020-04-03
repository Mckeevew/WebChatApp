const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
var myColor;

const name = prompt('What is your name?');
socket.emit('new-user', name);


socket.on('user-color', function(color)
{
    myColor = color;
    appendMessage(`${name} joined`, myColor);
})

socket.on('chat-message', function(data)
{
    appendMessage(`${data.name}: ${data.message}`, data.color);
})

socket.on('user-connected', function(data)
{
    appendMessage(`${data.name} connected`, data.color);
})

socket.on('user-disconnected', function(data)
{
    appendMessage(`${name} disconnected`, data.color);
})

messageForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`${name}: ${message}`, myColor);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
})

function appendMessage(message, color)
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.style.backgroundColor = color;
    messageContainer.append(messageElement);
}