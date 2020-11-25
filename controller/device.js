var path = require('path');
const category = require('../models/category');
const Device = require("../models/device");
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var computerName = process.env['COMPUTERNAME'];

var loginId1 = path.join("domainName",userName);
var loginId2 = path.join("computerName",computerName);

console.log(loginId1);
console.log(loginId2);

module.exports.findById = (req, res) => {
    Device.findById(req.params.id)
      .then((device) => {
        if (!device) {
          return res.status(404).send({
            message: "device not found with id " + req.params.id,
          });
        }
        res.status(200).send(device);
        console.log(device);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving device with id " + req.params.id,
        });
      });
  };
  
  module.exports.findByDeviceName = (req, res) => {
    Device.find(req.params.deviceName)
      .then((device) => {
        if (!device) {
          
          return res.status(404).send({
            
            message: "device not found with id " + req.params.deviceName,
          });
        }
        res.status(200).send(device);
        console.log(device);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving device with id " + req.params.deviceName,
        });
      });
  };

  module.exports.findAll = (req, res) => {
    Device.find()
      .sort({ devicename: -1 })
      .then((devices) => {
        res.status(200).send(devices);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };

  module.exports.register = (req, res) => {

    if (!computerName || !userName) {
      return res.status(400).send({
        message: "No available computer to register",
      });
    }

    const device = new Device({
      deviceName: computerName,
      deviceUser: userName,
    });

    device
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the new device.",
        });
      });
  };

  