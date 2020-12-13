const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const ActiveWindow = require("../models/activeWindow");
const SuspiciousWindowRegisteration = require("../models/suspiciousWindowRegisteration");
const OpenSuspiciousWindow = require("../models/openSuspiciousWindow");

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
    let { deviceUser, app, title, host, duration } = req.body;
    if (!host) {
      host = title;
    }
    try {
     //check if it is suspicious window.
     let isSuspicious = null;
     if (app && !isSuspicious) {
      isSuspicious = await SuspiciousWindowRegisteration.findOne({app});
      //console.log("app is suspicious", isSuspicious);
     }
     if (host && !isSuspicious) {
      isSuspicious = await SuspiciousWindowRegisteration.findOne({title:host});
      //console.log("host is suspicious", isSuspicious);
     }
     if (title && !isSuspicious) {
      isSuspicious = await SuspiciousWindowRegisteration.findOne({title});
      //console.log("title is suspicious", isSuspicious);
     }
     if (isSuspicious) {
      let openSuspiciousWindow = await OpenSuspiciousWindow.findOne({ deviceUser, app, title, host});
      if (openSuspiciousWindow && openSuspiciousWindow.date === date) {
        openSuspiciousWindow.duration += duration;
        await openSuspiciousWindow.save();
        openSuspiciousWindow.isSuspicious = true;
        console.log("this is the opened suspicious\n", openSuspiciousWindow)
        res.json(openSuspiciousWindow)
      }else{
        const openSuspiciousWindow = new OpenSuspiciousWindow({
          deviceUser,
          app,
          title,
          host,
          duration,
          date,
        });
        //if(!host) openSuspiciousWindow.host = title;
        await openSuspiciousWindow.save();
        console.log("this is the suspicious window", openSuspiciousWindow);
      }
        //return res.status(200).json(openSuspiciousWindow);
      
     }
     //end of checking if it is suspicious window.


      let activeWindow = await ActiveWindow.findOne({ deviceUser, app, title, host});
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
        //if(!host) activeWindow.host = title;
        await activeWindow.save();
      }
      return res.status(200).json({msg:"activewindow registered."});
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
