let socket = io.connect();

const target = document.querySelector('.target');
const form = document.querySelector('#form');
const sendAll = document.querySelector('#sendAllBtn');
const sendMe = document.querySelector('#sendMeBtn');
const input = document.querySelector('#input')


socket.on('welcomeMessage', (message) => {
    target.innerHTML += `<br> ${message}`;
    console.log(message)
})


sendAll.addEventListener('click', (e) => {
    e.preventDefault();
    const message = input.value;
    socket.emit('sendToAll', (message));
});

sendMe.addEventListener('click', (e) => {
    e.preventDefault();
    const message = input.value;
    socket.emit('sendToMe', (message));
});

socket.on('displayMessage', (message) => {
    target.innerHTML += `<br> ${message}`;
    console.log(message);
});

