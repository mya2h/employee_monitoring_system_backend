var path = require('path');
const NotTrack = require("../models/notTrack");


module.exports.findById = (req, res) => {
    NotTrack.findById(req.params.id)
      .then((notTrack) => {
        if (!notTrack) {
          return res.status(404).send({
            message: "NotTrack not found with id " + req.params.id,
          });
        }
        res.status(200).send(notTrack);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving category with id " + req.params.id,
        });
      });
  };
  


  module.exports.findAll = (req, res) => {
    NotTrack.find()
    //   .sort({ devicename: -1 })
      .then((notTracks) => {
        res.status(200).send(notTracks);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };

  module.exports.register = (req, res) => {
    deviceUser_id = req.body.deviceUser_id;
    resource_id = req.body.resource_id;
    if (!deviceUser_id || !resource_id) {
      return res.status(400).send({
        message: "please fill fields",
      });
    }

    const notTrack = new NotTrack({
        deviceUser_id: deviceUser_id,
        resource_id:resource_id
    });

    notTrack
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the user not track .",
        });
      });
  };

  module.exports.delete = (req, res) => {
    NotTrack.findByIdAndRemove(req.params.id)
      .then((notTrack) => {
        if (!notTrack) {
          return res.status(404).send({
            message: "NotTrack not found ",
          });
        }
        res.send({ message: "NotTrack deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete notTrack",
        });
      });
  };

