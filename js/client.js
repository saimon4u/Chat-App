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
    // if(position=='left')audio.play();
};
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`,'right');
    socket.emit(`send`,message);
    messageInput.value = '';
    const el = document.getElementById('chat-feed');
    if (el) {
        el.scrollTop = el.scrollHeight;
    }
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

let ok = document.getElementById('ok');
const active = (id)=>{
    const element = document.createElement('li');
    element.innerHTML = id;
    element.setAttribute('id',id);
    element.classList.add('active');
    ok.append(element);
};

socket.on('user-joined',id=>{
    append(`${id} joined the chat`, 'left');
    active(`${id}`);
    audio.play();
});
socket.on('receive', data=>{
    append(`${data.id} : ${data.message}`, `left`);
    const el = document.getElementById('chat-feed');
    if (el) {
        el.scrollTop = el.scrollHeight;
    }   

});
socket.on('left', id=>{
    if(id!=null){
        append(`${id} left the chat`,`left`);
        let rem = document.getElementById(id);
        rem.remove();
        audio.play();
    }
});

let remove = document.getElementById('remove');
let m_body = document.getElementById('m_body');
let confirm = document.getElementById('confirm');
remove.addEventListener('click', ()=>{
    let arr = Array.from(document.getElementsByClassName('right'));
    let del = arr[arr.length - 1];
    m_body.innerHTML = del.innerHTML;
    confirm.addEventListener('click', ()=>{
        del.remove();
    });
});