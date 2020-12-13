const express = require("express");
const router = express.Router();
const OpenSuspiciousWindow = require("../models/openSuspiciousWindow");
router.get("/",
    async (req, res) => {
      try {
        let openSuspiciousWindows = await OpenSuspiciousWindow.find();
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