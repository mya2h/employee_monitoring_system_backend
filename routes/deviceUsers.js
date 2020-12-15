const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const DeviceUser = require("../models/deviceUser");
const DoNotTrack = require("../controller/doNotTrack")
router.post(
  "/",
  [
    check("macAddress", "the macAddress is required").not().isEmpty(),
    check("deviceName", "the deviceName is required").not().isEmpty(),
    check("userName", "the user name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { macAddress, deviceName, userName } = req.body;

    try {
      let deviceUser = await DeviceUser.findOne({
        macAddress,
      });
      if (!deviceUser) {
        const online = true;
        deviceUser = new DeviceUser({
          macAddress,
          deviceName,
          userName,
          online,
        });
        await deviceUser.save();
      } else {
        deviceUser.online = true;
        await deviceUser.save();
        console.log("deviceUser already registered.");
      }
      return res.status(200).json(deviceUser);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
router.get("/", async (req, res) => {
  try {
    const deviceUser = await DeviceUser.find();
    res.json(deviceUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post("/doNotTrack",DoNotTrack.addUserToDoNotTrack)
router.get("/doNotTrack",DoNotTrack.getNotTrackedUser)
module.exports = router;
