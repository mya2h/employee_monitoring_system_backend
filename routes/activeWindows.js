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
    check("duration", "the duration is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let date = new Date().getDate();
    const { deviceUser, app, title, duration } = req.body;
    try {
      let activeWindow = await ActiveWindow.findOne({ deviceUser, app, title });
      if (activeWindow && activeWindow.date === date) {
        activeWindow.duration += duration;
        await activeWindow.save();
      } else {
        activeWindow = new ActiveWindow({
          deviceUser,
          app,
          title,
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

//getting a changed file
router.get(
  "/:date/:userName",
  [
    check("date", "the date is required").not().isEmpty(),
    check("userName", "the userName is required").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const { date, userName } = req.params;
      console.log(date, userName);
      const today = new Date().getDate();
      const activeWindows = await ActiveWindow.find({
        date,
      }).populate("deviceUser", ["macAddress", "deviceName", "userName"]);
      res.json(activeWindows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
