const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const DeviceUser = require("../models/deviceUser");

const deviceUser = async(req,res)=>{
  
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
  module.exports ={
    deviceUser
  }