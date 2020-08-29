const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => {
  console.error("Erroo occured in db connection");
});

db.on("open", () => {
  console.log("Db connection established successfully");
});
module.exports = db;
