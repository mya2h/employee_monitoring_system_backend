const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoUtil = require("./dao/dbConnection");
const userRouter = require("./routes/user");

const passport = require("passport");

const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Employe monitoring API");
});

app.use("/api/users", userRouter);
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
