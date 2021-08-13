const express = require('express');
const http = require('http');
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const port = 8080;
const io = socketio(server);

const clientPath = `${__dirname}/../client/`;
app.use(express.static(clientPath));

app.get('/', (req, res) => {
    res.render('index')
})

let counter = 0;

io.on('connection', (socket) => {
    console.log(`${counter++} someone connected`);
    console.log(socket.id)

    // Emit sends message to everybody when client connects
    socket.emit('message', '😻 Welcome to KittyChat! 😻');

    // Send message when user connects, to everybody except client
    socket.broadcast.emit('message', `${socket.id} A user has joined the chat`);

    // Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the chat');
    });

    // Send message to everybody
    socket.on('sendToAll', (message) => {
        io.emit("message", (message));
    });

    // Send message only to me
    socket.on('sendToMe', (message) => {
        socket.emit("message", (message));
    });
    //
    // socket.on('getUserName', (userName) => {
    //     console.log(userName)
    // });
});

server.listen(port, () => {
    console.log(`server running on ${port}`)
});