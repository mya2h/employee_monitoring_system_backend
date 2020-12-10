const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const SuspiciousActivityDone = require("../models/suspiciousActivityDone");

router.post(
    "/",
    [
      check("app", "the application name is required").not().isEmpty(),
      check("title", "the title is required").not().isEmpty(),
      check("duration", "the duration is required").not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let date = new Date().getDate();
      const { deviceUser, app, title, duration } = req.body;
      try {
        let suspiciousActivityDone = await SuspiciousActivityDone.findOne({ deviceUser, app, title });
        if (suspiciousActivityDone && suspiciousActivityDone.date === date) {
          suspiciousActivityDone.duration += duration;
          await suspiciousActivityDone.save();
        } else {
          suspiciousActivityDone = new SuspiciousActivityDone({
            deviceUser,
            app,
            title,
            duration,
            date,
          });
          await suspiciousActivityDone.save();
        }
        return res.status(200).json(suspiciousActivityDone);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  );

  module.exports = router;