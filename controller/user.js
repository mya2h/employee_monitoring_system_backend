﻿const bcrypt = require("bcryptjs");
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


module.exports.forgote = (req, res) => {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport('SMTP', {
          service: 'SendGrid',
          auth: {
            user: '!!! YOUR SENDGRID USERNAME !!!',
            pass: '!!! YOUR SENDGRID PASSWORD !!!'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  }

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
