
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

  module.exports.register = (req, res, next) => {
    const resourceName = req.body.resourceName;
    const resourceType = req.body.resourceType;
    
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