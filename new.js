// const socket_io = require('socket.io');
// var io = socket_io();
// const User = require('./model');

// const changeStream = User.watch();

// changeStream.on('change', (change) => {
//     console.log(change); // You could parse out the needed info and send only that data. 
//     io.emit('changeData', change);
// }); 

// io.on('connection', function () {
//     console.log('connected');
// });

// var socket = io;
// module.exports = socket;

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const User = require('./model');
const app = express();
app.use(index);
app.get("/",(req,res)=>{
    console.log("requested")
})
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
let interval;

const changeStream = User.watch();

changeStream.on('change', (change) => {
    console.log(change); // You could parse out the needed info and send only that data. 
    io.emit('changeData', change);
}); 
io.on('connection', function () {
    console.log('connected');
});
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });



server.listen(port, () => console.log(`Listening on port ${port}`));
