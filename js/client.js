const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
let audio = new Audio('ting.mp3');
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')audio.play();
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit(`send`,message);
    messageInput.value = '';
})

const id = prompt("Enter your name to join");
socket.emit('joined', id);
socket.on('user-joined', id=>{
    append(`${id} joined the chat`, 'center');
});
socket.on('receive', data=>{
    append(`${data.id} : ${data.message}`, `left`);
});
socket.on('left', id=>{
    append(`${id} left the chat`,`center`);
});