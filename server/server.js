const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const port = 8080;
const io = socketio(server);

const clientPath = `${__dirname}/../client/`;
app.use(express.static(clientPath));

let counter = 0;

io.on('connection', (socket) => {
    console.log(`${counter++} someone connected`);

    // Emit sends message to everybody when client connects
    socket.emit('message', '😻 Welcome to KittyChat! 😻');

    // Send message when user connects, to everybody except client
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the chat');
    });

    // Send message to everybody
    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", (message));
    });

    // Send message only to me
    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", (message));
    });
});

server.listen(port, () => {
    console.log(`server running on ${port}`)
});