const express = require("express");
const app = express();
var fs = require("fs");
const PORT = process.env.PORT || 5000;
// const mongoUtil = require("./dao/dbConnection");
const userRouter = require("./routes/user");

// const indexRouter = require("./routes/index");
// const deviceRouter = require("./routes/device");
// const categoryRouter = require("./routes/category");
// // const memberRouter = require("./routes/member");
// const resourceRouter = require("./routes/resource");
// const HRRouter = require("./routes/HRpersonnel");
// // const NTrackRouter = require("./routes/notTrack");

const indexRouter = require("./routes/index");
const deviceRouter = require("./routes/device");
const categoryRouter = require("./routes/category");
const memberRouter = require("./routes/member");
const resourceRouter = require("./routes/resource");
const HRRouter = require("./routes/HRpersonnel");
// const NTrackRouter = require("./routes/notTrack");
app.use("/api/deviceUsers", require("./routes/deviceUsers"));
app.use("/api/changedFiles", require("./routes/changedFiles"));
app.use("/api/activeWindows", require("./routes/activeWindows"));


var flash = require('express-flash');
var passport = require('passport');
var session = require('express-session')
var flash = require("express-flash");
var passport = require("passport");
var session = require("express-session");


const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
connectDB();



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Total-Count');
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
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


app.use("/api/user", userRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/device", deviceRouter);
app.use("/api/category", categoryRouter);


// app.use("/api/member", memberRouter);
app.use("/api/HR", HRRouter);
// app.use("/api/NotTrack", NTrackRouter);


app.use("/api/deviceUsers", require("./routes/deviceUsers"));
app.use("/api/changedFiles", require("./routes/changedFiles"));
app.use("/api/activeWindows", require("./routes/activeWindows"));
app.use("/api/suspiciousActivityRegisteration", require("./routes/suspiciousActivityRegistration"))
//app.use("/api/suspiciousActivityDone", require("./routes/suspiciousActivitiesDone"))
app.use("/api/HR", HRRouter);

// app.use("/api/NotTrack", NTrackRouter);

app.use("/api/member", memberRouter);

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});

