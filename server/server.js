const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const port = 8080;
const io = socketio(server);

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));


let counter = 0;

io.on('connection', socket => {
    console.log(`${counter++} someone connected`);

    socket.emit('welcomeMessage', ' 😻 Welcome to KittyChat! 😻');

    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", (message));
    });

    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", (message));
    });
});

server.listen(port, () => {
    console.log(`server running on ${port}`)
});