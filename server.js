const express = require("express"); 
const http = require("http"); 
const socketIo = require("socket.io"); 

const app = express(); 
const server = http.createServer(app); 
const io = socketIo(server); 

// Serve static files (like HTML, CSS, JS) 

app.use(express.static(__dirname)); 

io.on("connection", (socket) => { 
    console.log("A user connected"); 
    // Broadcast incoming message to all other clients 
    socket.on("chat message", (msg) => { 
        console.log("Message received: " + msg); 
        socket.broadcast.emit("chat message", msg);  // send to all other clients 
    }); 
    socket.on("disconnect", () => { 
        console.log("A user disconnected"); 

    }); 

}); 

server.listen(3001, () => { 

    console.log("Server running on http://localhost:3001"); 

}); 