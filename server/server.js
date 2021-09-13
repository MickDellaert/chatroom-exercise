const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const port = 8070;
const io = socketio(server);

const botName = 'KittyChat bot';
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users')

const clientPath = `${__dirname}/../client/`;
app.use(express.static(clientPath));


io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('joinRoom', ({username, chatroom}) => {
        const user = userJoin(socket.id, username, chatroom);

        socket.join(user.chatroom);
        console.log(user.chatroom)

        // Emit sends message to everybody when client connects
        socket.emit('message', formatMessage(botName, `😻 Hi ${user.username}, welcome to KittyChat - ${user.chatroom}! 😻`));

        // Send message when user connects, to everybody except client
        socket.broadcast.to(user.chatroom).emit('message', formatMessage(botName, `${user.username} has joined the chat`));

        // Runs when client disconnects
        socket.on('disconnect', () => {
            io.emit('message', formatMessage(botName, `${user.username} has left the chat`));
        });
    });

    // Send message to everybody
    socket.on('sendToAll', (message) => {
        const user = getCurrentUser(socket.id);

        io.emit("message", formatMessage(user.username, message));
    });

    // Send message only to me
    socket.on('sendToMe', (message) => {
        socket.emit("message", formatMessage(user.username, message));
    });

});

server.listen(port, () => {
    console.log(`server running on ${port}`)
});