const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static forlder
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
    //welocme current user
    socket.emit('message', 'Welcome to ChatCord!');

    //broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    //runs when client disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));