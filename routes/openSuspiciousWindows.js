const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const OpenSuspiciousWindow = require("../models/openSuspiciousWindow");
router.get("/",
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

        let openSuspiciousWindows = await OpenSuspiciousWindow.find(query).populate("deviceUser", ["macAddress", "deviceName", "userName"]);
        if (openSuspiciousWindows.length > 0) {
          console.log("the suspicious windows are ", openSuspiciousWindows)
          return res.status(200).json(openSuspiciousWindows)
        } else {
          return res.status(400).json({errors:[{msg:"no suspicious windows have been opened"}]})
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  );
  
  module.exports = router;