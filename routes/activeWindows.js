const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const ActiveWindow = require("../models/activeWindow");

//posting file changed.
router.post(
  "/",
  [
    check("app", "the application name is required").not().isEmpty(),
    check("title", "the title is required").not().isEmpty(),
    check("host", "the host is required").not().isEmpty(),
    check("duration", "the duration is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let date = new Date().getDate();
    const { deviceUser, app, title, host, duration } = req.body;
    try {
      
      let activeWindow = await ActiveWindow.findOne({ deviceUser, app, title, host });
      if (activeWindow && activeWindow.date === date) {
        activeWindow.duration += duration;
        await activeWindow.save();
      } else {
        activeWindow = new ActiveWindow({
          deviceUser,
          app,
          title,
          host,
          duration,
          date,
        });
        await activeWindow.save();
      }
      return res.status(200).json(activeWindow);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//getting active application
router.get(
  "/apps/:date",
  [
    check("date", "the date is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { date } = req.params;
      let query = {date};
      console.log(req.query.deviceUser)
      if (req.query.deviceUser) {
        query.deviceUser = req.query.deviceUser;
      }
      console.log(query)
      const today = new Date().getDate();
      const activeWindows = await ActiveWindow.find(query).populate("deviceUser", ["macAddress", "deviceName", "userName"]);
      res.json(activeWindows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//getting a changed file
router.get(
  "/websites/:date/",
  [
    check("date", "the date is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { date} = req.params;
      const today = new Date().getDate();
      let query = {date};
      if (req.query.deviceUser) {
        query.deviceUser = req.query.deviceUser;
      }
      query.app = {$in: ["chrome", "ApplicationFrameHost", "firefox", "edge", "explorer", "opera", "safari"]}
      let activeWindows = await ActiveWindow.find(query).populate("deviceUser", ["macAddress", "deviceName", "userName"]);
      res.json(activeWindows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
