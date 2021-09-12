let socket = io();

const target = document.querySelector('.target');
const targetContainer = document.querySelector('.target-container')
const form = document.querySelector('#form');
const sendAll = document.querySelector('#sendAllBtn');
const sendMe = document.querySelector('#sendMeBtn');
const input = document.querySelector('#input');
const userNameInput = document.querySelector('#username');
const login = document.querySelector('#login');

const { username, chatroom } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(username, chatroom);

socket.emit('joinRoom', {username, chatroom});

socket.on('message', message => {
    console.log(message);
    displayMessage(message);
});

sendAll.addEventListener('click', (e) => {
    e.preventDefault();
    const message = input.value;
    if (input.value) {
        console.log(message)
        socket.emit('sendToAll', (message));
        input.value = "";
        input.focus();
    }
});

sendMe.addEventListener('click', (e) => {
    e.preventDefault();
    let message = input.value;
    if (input.value) {
        socket.emit('sendToMe', (message));
        input.value = "";
        input.focus();
    }
});

function displayMessage(message){
    if (target !== null) {
        const item = document.createElement('div');
        item.classList.add('message-item');
        item.innerHTML = `<p class="message-username">${message.name} - Active in ${chatroom} - ${message.time}</p><p>${message.text}</p>`;
        target.appendChild(item);
        console.log(message)
    };

    targetContainer.scrollTop = targetContainer.scrollHeight;

}

function addEmoji(emoji) {
    input.value += emoji;
}

function toggleEmojiPopup() {
    let popup = document.getElementById('emoji-popup-id');
    popup.classList.toggle('toggle-popup');
}

