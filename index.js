const app = require('express');
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors: {origin: "*"}});
http.listen(PORT);
const users = {};
io.on('connection', socket=>{
    socket.on('joined',id=>{
        users[socket.id] = id;
        socket.broadcast.emit('user-joined',id);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive',{message: message , id : users[socket.id]});
        
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})