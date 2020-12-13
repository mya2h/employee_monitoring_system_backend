const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require('../config/default');

//const config = require("../config/config");


const getUsers = (req, res) => {
  User
    .find({})
    .then((result) => {
      if (!result) return res.json({ succes: true, result: "No result found" });
      return res.json({ succes: true, result: result });
    })
    .catch((err) => {
      return res.json({ succes: false, result: err });
    });
};
const getuserByName = (req, res) => {
  User
    .findOne({ userName: req.body.userName })
    .then((result) => {
      if (!req.body.userName)
        return res.json({
          succes: false,
          message: "Please enter the userName",
        });
      return res.json({ succes: true, result: result });
    })
    .catch((err) => {
      return res.json({ succes: false, result: true });
    });
};
const profile = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      if (!req.params.id)
        return res.json({
          succes: false,
          message: "User does not exist",
        });
      return res.json({ succes: true, result: result });
    })
    .catch((err) => {
      return res.json({ succes: false, result: true });
    });
};
const register = (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    roleType:req.body.roleType,
    password: req.body.password
  });

  if(req.body.password == req.body.confirm_password){
  User.findOne({ userName: req.body.userName })
    .then((result) => {
      if (result) {
        return res.status(400).json({ success: false, result: "user name already exist" });
      }

      User.findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          return res.status(400).json({ success: false, result: "email already exist" });
        }

      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return res.status(400).json({
            succes: false,
            result: err,
            message: "password hass error",
          });
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(400).json({ succes: false, result: err });
          newUser.password = hash;
          console.log("password hash", newUser);
          newUser
            .save()
            .then((result) => {
              return res.status(200).json({
                succes: true,
                result: result,
                message: "user successfuly registered",
              });
            })
            .catch((err) => {
              return res.status(400).json({ succes: false, result: err, message: "error" });
            });
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({ succes: false, result: err, message: "error" });
    });
  })
  .catch((err) => {
    return res.status(400).json({ succes: false, result: err, message: "error" });
  });
}else{
  return res.status(409).json({
      message:'password not match!!!!'
  });
}
};


const login = (req, res) => {
  User.findOne({ userName: req.body.userName })
    .then((result) => {
      bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(
            {
              _id: result._id,
              userName: result.userName,
              email: result.email,
            },
            config.secret,
            { expiresIn: 70000 }
          );
          return res.status(200).json({
            roleType:result.roleType,
            token: token,
            status:200,
            message: "logged in in",
            
          });
        } else {
          return res.status(400).json({ 
            message: "Auth failed" });
        }
      });
    })
    .catch((err) => {
      res.status(400).json({
        result: err,
        message: "Auth failed",
      });
    });
};
const logout = (req, res) => {
  req.logout();
  // res.redirect('/');
};
const getForgot = (req, res) => {
  res.render("forgot", {
    user: req.user,
  });
};

const forgot = (req, res) => {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            req.flash("error", "No account with that email address exists.");
            return res.redirect("/forgot");
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "halle2019newon22@gmail.com", // email of employee monitor
            pass: "**********", // password
          },
        });
        var mailOptions = {
          to: user.email,
          from: "halle2019newon22@gmail.com",
          subject: "Node.js Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash(
            "info",
            "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          );
          done(err, "done");
        });
      },
    ],
    function (err) {
      if (err) return next(err);
      // res.redirect('/forgot');
    }
  );
};

const getresetwithtoken = (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        // return res.redirect('/forgot');
      }
      res.render("reset", {
        user: req.user,
      });
    }
  );
};

const postresetwithtoken = (req, res) => {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            }

            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err) {
              req.logIn(user, function (err) {
                done(err, user);
              });
            });
          }
        );
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport("SMTP", {
          service: "SendGrid",
          auth: {
            user: "!!! YOUR SENDGRID USERNAME !!!",
            pass: "!!! YOUR SENDGRID PASSWORD !!!",
          },
        });
        var mailOptions = {
          to: user.email,
          from: "passwordreset@demo.com",
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          req.flash("success", "Success! Your password has been changed.");
          done(err);
        });
      },
    ],
    function (err) {
      // res.redirect('/');
    }
  );
};


 module.exports = {
    register,
    login,
    profile,
    getUsers,
    logout,
    getForgot,
    forgot,
    getresetwithtoken,
    postresetwithtoken,
    getuserByName
 }