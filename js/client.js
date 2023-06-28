const socket = io('https://siuuu-chat.onrender.com/');
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
};
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`,'right');
    socket.emit(`send`,message);
    messageInput.value = '';
});

const id = prompt("Enter your name to join");
const join = document.getElementById('join');
const joined = document.getElementById('joined');
const show = document.getElementById('show');
join.addEventListener('click', (e)=>{
    e.preventDefault();
    socket.emit('joined',id);
    joined.classList.remove('v-class');
    join.classList.add('v-class');
    show.classList.remove('v-class');
});
socket.on('user-joined', id=>{
    append(`${id} joined the chat`, 'left');
});
socket.on('receive', data=>{
    append(`${data.id} : ${data.message}`, `left`);
});
socket.on('left', id=>{
    append(`${id} left the chat`,`left`);
});