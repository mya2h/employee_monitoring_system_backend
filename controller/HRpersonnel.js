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
         roleType = req.body.roleType;
    if (!firstName || !lastName || !email || !roleType) {
      return res.status(400).send({
        message: "please fill correctly",
      });
    }

    const hr = new HRpersonnel({
        firstName: firstName,
        lastName:lastName,
        email:email,
        roleType:roleType,
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
        console.log(hr)
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


  module.exports.login = (req, res) => {
    HRpersonnel.findOne({ userName: req.body.userName })
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
            return res.json({
              token: token,
              status:200,
              message: "logged in",
            });
          } else {
            return res.json({ 
              message: "Auth failed" });
          }
        });
      })
      .catch((err) => {
        res.json({
          result: err,
          message: "Auth failed",
        });
      });
  };
  module.exports.logout = (req, res) => {
    req.logout();
    // res.redirect('/');
  };
  module.exports.getForgot = (req, res) => {
    res.render("forgot", {
      user: req.user,
    });
  };
  
  module.exports.forgot = (req, res) => {
    async.waterfall(
      [
        function (done) {
          crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString("hex");
            done(err, token);
          });
        },
        function (token, done) {
          HRpersonnel.findOne({ email: req.body.email }, function (err, hr) {
            if (!hr) {
              req.flash("error", "No account with that email address exists.");
              return res.redirect("/forgot");
            }
  
            hr.resetPasswordToken = token;
            hr.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
            hr.save(function (err) {
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
  
  module.exports.getresetwithtoken = (req, res) => {
  HRpersonnel.findOne(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
      function (err, hr) {
        if (!user) {
          req.flash("error", "Password reset token is invalid or has expired.");
          // return res.redirect('/forgot');
        }
        res.render("reset", {
          hr: req.user,
        });
      }
    );
  };
  
  const postresetwithtoken = (req, res) => {
    async.waterfall(
      [
        function (done) {
          HRpersonnel.findOne(
            {
              resetPasswordToken: req.params.token,
              resetPasswordExpires: { $gt: Date.now() },
            },
            function (err, hr) {
              if (!hr) {
                req.flash(
                  "error",
                  "Password reset token is invalid or has expired."
                );
                return res.redirect("back");
              }
  
              hr.password = req.body.password;
              hr.resetPasswordToken = undefined;
              hr.resetPasswordExpires = undefined;
  
              hr.save(function (err) {
                req.logIn(hr, function (err) {
                  done(err, hr);
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
    HRpersonnel
      .find({})
      .then((result) => {
        if (!result) return res.json({ succes: true, result: "No result found" });
        return res.json({ succes: true, result: result });
      })
      .catch((err) => {
        return res.json({ succes: false, result: err });
      });
  };
  