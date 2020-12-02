const express = require("express");
const app = express();
var fs = require("fs");
const PORT = process.env.PORT || 5000;

// const mongoUtil = require("./dao/dbConnection");
// const userRouter = require("./routes/user");

const indexRouter = require("./routes/index");

<<<<<<< HEAD
// const deviceRouter = require("./routes/device");
// const categoryRouter = require("./routes/category");
// const resourceRouter = require("./routes/resource");
// const HRRouter = require("./routes/HRpersonnel");
// const NTrackRouter = require("./routes/notTrack");
var flash = require('express-flash');
var passport = require('passport');
var session = require('express-session')


=======
const deviceRouter = require("./routes/device");
const categoryRouter = require("./routes/category");
const resourceRouter = require("./routes/resource");
const HRRouter = require("./routes/HRpersonnel");
const NTrackRouter = require("./routes/notTrack");
var flash = require("express-flash");
var passport = require("passport");
var session = require("express-session");
>>>>>>> 4f29a8822b7147d18bed904067b77ae1ded59097

const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
connectDB();
// mongoUtil.connectToServer(function (err, client) {
//   if (err) console.log(err);
//   console.log("Database connected");
//   // start the rest of your app here
// });

app.use((req, res, next) => {
  // Control access to clients
  res.header("Access-Control-Allow-Origin", "*");

  // Control allowed headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    // Set allowed HTTP methods
    req.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(flash());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: "session secret key" }));

app.get("/", (req, res) => {
  res.send("Employe monitoring API");
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json("otherthing");
});

//routes

app.use("/api/v1",indexRouter);

// app.use("/api/users", require("./routes/user"));
<<<<<<< HEAD
// app.use("/api/deviceUsers", require("./routes/deviceUsers"));



app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});


// app.use("/api/user", userRouter);
// app.use("/api/resource", resourceRouter);
// app.use("/api/device", deviceRouter);
// app.use("/api/category", categoryRouter);
// app.use("/api/HR", HRRouter);
// app.use("/api/NotTrack", NTrackRouter);

=======

app.use("/api/user", userRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/device", deviceRouter);
app.use("/api/category", categoryRouter);
app.use("/api/deviceUsers", require("./routes/deviceUsers"));
app.use("/api/changedFiles", require("./routes/changedFiles"));
app.use("/api/activeWindows", require("./routes/activeWindows"));
app.use("/api/HR", HRRouter);
app.use("/api/NotTrack", NTrackRouter);
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
>>>>>>> 4f29a8822b7147d18bed904067b77ae1ded59097
