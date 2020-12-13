const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/socketIndex");

const app = express();
app.use(index);

const server = http.createServer(app);

// const io = socketIo(server);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const port = process.env.PORT || 4001;
// const SocketI = require('./model');
// const app = express();
// const connectDB = require("./config/db");
// connectDB();
// const bodyparser = require("body-parser");
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:false}));
// app.post("/kal", (req, res) => {
//   console.log(req.body.name);
//    let newUser = new SocketI({
//     name: req.body.name
//   });
//   newUser
//   .save()
//   .then((result) => {
//     return res.status(200).json({
//       succes: true,
//       result: result,
//       message: "user successfuly registered",
//     });
//   })
//   .catch((err) => {
//     return res.status(400).json({ succes: false, result: err, message: "error" });
//   });
// });
// app.get("/",(req,res)=>{
//    User
//     .find({})
//     .then((result) => {
//       if (!result) return res.json({ succes: true, result: "No result found" });
//       return res.json({ succes: true, result: result });
//     })
//     .catch((err) => {
//       return res.json({ succes: false, result: err });
//     });
// })
// const server = http.createServer(app);

// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });
// let interval;

// const changeStream = SocketI.watch();

// changeStream.on('change', (change) => {
//     console.log(change); // You could parse out the needed info and send only that data. 
//     io.emit('changeData', change);
// }); 
// io.on('connection', function () {
//     console.log('connected');
// });
// // io.on("connection", (socket) => {
// //   console.log("New client connected");
// //   if (interval) {
// //     clearInterval(interval);
// //   }
// //   interval = setInterval(() => getApiAndEmit(socket), 1000);
// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //     clearInterval(interval);
// //   });
// // });



// server.listen(port, () => console.log(`Listening on port ${port}`));

