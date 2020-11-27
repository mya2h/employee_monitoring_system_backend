var path = require('path');
const HRpersonnel = require("../models/HRpersonnel");


module.exports.findById = (req, res) => {
    HRpersonnel.findById(req.params.id)
      .then((hr) => {
        if (!hr) {
          return res.status(404).send({
            message: "HRpersonnel not found with id " + req.params.id,
          });
        }
        res.status(200).send(hr);
        console.log(hr);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving HRpersonnel with id " + req.params.id,
        });
      });
  };
  


  module.exports.findAll = (req, res) => {
    HRpersonnel.find()
      .sort({firstName: -1 })
      .then((hrs) => {
        res.status(200).send(hrs);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };

  module.exports.register = (req, res) => {
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        email = req.body.email;
    if (!firstName || !lastName || !email) {
      return res.status(400).send({
        message: "please fill correctly",
      });
    }

    const hr = new HRpersonnel({
        firstName: firstName,
        lastName:lastName,
        email:email,
        status:0
    });

    hr
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the new HRpersonnel.",
        });
      });
  };

  module.exports.activate = (req, res) => {
    HRpersonnel.findById(req.params.id)
    .then(hr => {
        
        hr.status = 1;
        hr.save()
        .then(hr =>{
            res.send({message: 'HR activated successfully',status:'success', hr: hr})
        })
            .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
    })
  };
  module.exports.deactivate = (req, res) => {
    HRpersonnel.findById(req.params.id)
    .then(hr => {
        
        hr.status = 0;
        hr.save()
        .then(hr =>{
            res.send({message: 'HR deactivated successfully',status:'success', hr: hr})
        })
            .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
    })
  };

 

  module.exports.delete = (req, res) => {
    HRpersonnel.findByIdAndRemove(req.params.id)
      .then((hr) => {
        if (!hr) {
          return res.status(404).send({
            message: "HRpersonnel not found ",
          });
        }
        res.send({ message: "HRpersonnel deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete HRpersonnel",
        });
      });
  };


  module.exports.update = (req, res) => {
    if (!req.body.firstName) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    HRpersonnel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((hr) => {
        if (!hr) {
          return res.status(404).send({
            message: "no HRpersonnel found",
          });
        }
        res.status(200).send(hr);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the HRpersonnel",
        });
      });
  };