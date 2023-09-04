const path= require('path');
const http= require("http");
const express = require('express');
const socketio=require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server)
 
const port = process.env.PORT || 3000;
const publicDirectoryPath= path.join(__dirname,'/public');

app.use(express.static(publicDirectoryPath));

io.on("connection",(client)=>{
    console.log("New Websocket connection");
    client.on('messageFromClient',msg=> {
        io.emit('mesageFromServer',msg);
    })
    client.on('disconnect',()=>{
        console.log("New websocket disconncected");
    });
});

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});