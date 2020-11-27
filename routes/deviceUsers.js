const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const DeviceUser = require("../models/deviceUser");

router.post(
  "/",
  [
    check("deviceName", "the deviceName is required").not().isEmpty(),
    check("userName", "the user name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { deviceName, userName } = req.body;
    try {
      let deviceUser = await DeviceUser.findOne({ deviceName, userName });
      if (!deviceUser) {
        const online = true;
        deviceUser = new DeviceUser({ deviceName, userName, online });
        await deviceUser.save();
      } else {
        deviceUser.online = true;
        await deviceUser.save();
        console.log("deviceUser already registered.");
      }
      return res.status(200).json({ deviceUserId: deviceUser.id });
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

module.exports = router;
