let socket = io.connect();

const target = document.querySelector('.target');

socket.on('message', message => {
    target.innerHTML += `<br> ${message}`;
    console.log(message)
})