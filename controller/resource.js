
const express = require('express');
const path = require('path');
const multer = require('multer');
const Resource = require("../models/resource");


module.exports.findById = (req, res) => {
  Resource.findById(req.params.id)
      .then((resource) => {
        if (!resource) {
          return res.status(404).send({
            message: "resource not found with id " + req.params.id,
          });
        }
        res.status(200).send(resource);
        console.log(resource);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving resource with id " + req.params.id,
        });
      });
  };
  


  module.exports.findAll = (req, res) => {
    Resource.find()
    //   .sort({ devicename: -1 })
      .then((resources) => {
        res.status(200).send(resources);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occured",
        });
      });
  };



// const PATH = './public/';
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// const uploadStorage = multer({ storage: storage })


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, fileName)
//     }
// });


// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
//         }
//     }
// });


// app.post('/add', upload.single('image'), (req, res, next) => {
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         imageURL: req.file.path
//     });
//     user.save().then(result => {
//         res.status(201).json({
//             message: "User registered successfully!",
//         })
//     })
// })


  module.exports.register = (req, res, next) => {
    const resourceName = req.body.resourceName;
    const resourceType = req.body.resourceType;
    const resourcePath = req.body.resourcePath;
    // if (!resourceName || !resourceType || !resourcePath) {
    //   return res.status(400).send({
    //     message: "fields are required",
    //   });
    // }

    const resource = new Resource({
      resourceName: resourceName,
      resourceType: resourceType,
      resourcePath: req.file.path 
    });

    resource
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the new resource.",
        });
      });
  };



  module.exports.delete = (req, res) => {
    Resource.findByIdAndRemove(req.params.id)
      .then((resource) => {
        if (!resource) {
          return res.status(404).send({
            message: "resource not found ",
          });
        }
        res.send({ message: "resource deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete resource",
        });
      });
  };


  module.exports.update = (req, res) => {
    if (!req.body.resourceName) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    Resource.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((resource) => {
        if (!resource) {
          return res.status(404).send({
            message: "no resource found",
          });
        }
        res.status(200).send(resource);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the resource",
        });
      });
  };