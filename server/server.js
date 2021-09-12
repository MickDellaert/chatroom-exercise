const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const server = http.createServer(app);
const port = 8070;
const io = socketio(server);

const botName = 'KittyChat bot';
const {userJoin, getCurrentUser} = require('./utils/users')

const clientPath = `${__dirname}/../client/`;
app.use(express.static(clientPath));

let counter = 0;

io.on('connection', (socket) => {
    console.log(`${counter++} someone connected`);
    console.log(socket.id)

    socket.on('joinRoom', ({username, chatroom}) => {
        const user = userJoin(socket.id, username, chatroom);

        socket.join(username)
        // Emit sends message to everybody when client connects
        socket.emit('message', formatMessage(botName, `😻 Hi ${username}, welcome to KittyChat! 😻`));

        // Send message when user connects, to everybody except client
        socket.broadcast.emit('message', formatMessage(botName, `${username} has joined the chat`));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, `A user has left the chat`));
    });

    // Send message to everybody
    socket.on('sendToAll', (message) => {
        io.emit("message", formatMessage('USER', message));
    });

    // Send message only to me
    socket.on('sendToMe', (message) => {
        socket.emit("message", formatMessage('USER', message));
    });

});

server.listen(port, () => {
    console.log(`server running on ${port}`)
});