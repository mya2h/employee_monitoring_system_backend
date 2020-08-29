const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const config = require("../config/config");

module.exports.register = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log("newUser::", newUser);
  console.log("new user password", newUser.password);

  User.findOne({ username: req.body.username })
    .then((result) => {
      if (result) {
        console.log("resutl found");
        return res.json({ success: false, result: "user already exist" });
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res.json({
            succes: false,
            result: err,
            message: "password hass error",
          });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.json({ succes: false, result: err });
          newUser.password = hash;
          console.log("password hash", newUser);
          newUser
            .save()
            .then((result) => {
              return res.json({
                succes: true,
                result: result,
                message: "user successfuly registered",
              });
            })
            .catch((err) => {
              return res.json({ succes: false, result: err, message: "error" });
            });
        });
      });
    })
    .catch((err) => {
      return res.json({ succes: false, result: err, message: "error" });
    });
};

module.exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((result) => {
      bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(
            {
              _id: result._id,
              username: result.username,
              email: result.email,
            },
            config.secret,
            { expiresIn: 70000 }
          );
          return res.json({
            token: token,

            message: "logged in",
          });
        } else {
          return res.json({ message: "Wrong password" });
        }
      });
    })
    .catch((err) => {
      res.json({
        result: err,
        message: "user not found",
      });
    });
};

// /get authenticated user profile

module.exports.profile = (req, res) => {
  // console.log(req.user);
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "user profile",
        authData,
      });
    }
  });
};

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((result) => {
      if (!result) return res.json({ succes: true, result: "No result found" });
      return res.json({ succes: true, result: result });
    })
    .catch((err) => {
      return res.json({ succes: false, result: err });
    });
};
module.exports.getuserByName = (req, res) => {
  user
    .findOne({ username: req.body.username })
    .then((result) => {
      if (!req.body.username)
        return res.json({
          succes: false,
          message: "Please enter the username",
        });
      return res.json({ succes: true, result: result });
    })
    .catch((err) => {
      return res.json({ succes: false, result: true });
    });
};
