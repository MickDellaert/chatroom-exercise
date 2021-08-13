let socket = io();

const target = document.querySelector('.target');
const form = document.querySelector('#form');
const sendAll = document.querySelector('#sendAllBtn');
const sendMe = document.querySelector('#sendMeBtn');
const input = document.querySelector('#input');


socket.on('message', message => {
    if (target !== null) {
        const item = document.createElement('li');
        item.textContent = message;
        target.appendChild(item);
        console.log(message)
    }
})


sendAll.addEventListener('click', (e) => {
    e.preventDefault();
    const message = input.value;
    if (input.value) {
        console.log(message)
        socket.emit('sendToAll', (message));
    }
});

sendMe.addEventListener('click', (e) => {
    e.preventDefault();
    let message = input.value;
    if (input.value) {
        socket.emit('sendToMe', (message));
    }
});

socket.on('displayMessage', (message) => {
    const item = document.createElement('li');
    item.textContent = message;
    target.appendChild(item);
});

function addEmoji(emoji) {
    input.value += emoji;
}

function toggleEmojiPopup() {
    let popup = document.getElementById('emoji-popup-id');
    popup.classList.toggle('toggle-popup');
}

