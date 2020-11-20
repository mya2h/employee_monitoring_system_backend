var path = require('path');
var userName = process.env['USERPROFILE'].split(path.sep)[2];
var computerName = process.env['COMPUTERNAME'];
var loginId1 = path.join("domainName",userName);
var loginId2 = path.join("computerName",computerName);

console.log(loginId1);
console.log(loginId2);

exports.mdules.findOne = (req, res) => {
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

exports.findAll = (req, res) => {
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

exports.create,register = (req, res) => {

    if (!req.body.deviceName || !req.body.deviceUser) {
      return res.status(400).send({
        message: "Required field can not be empty",
      });
    }

    const device = new Device({
      deviceName: req.body.deviceName,
      deviceUser: req.body.deviceUser,
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