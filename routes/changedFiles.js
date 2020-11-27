const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const ChangedFile = require("../models/changedFile");

//posting file changed.
router.post(
  "/",
  [
    check("name", "the name is required").not().isEmpty(),
    check("changedMode", "the changeMode is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const changedFile = new ChangedFile({ name, cahngedMode });
      await changedFile.save();
      console.log("deviceUser already registered.");
      return res.status(200).json(changedFile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

//getting a changed file
router.get("/", async (req, res) => {
  try {
    const changedFiles = await ChangedFile.find();
    changedFiles.map((changedFile) =>
      changedFile.populate("deviceUser", ["deviceName", "userName"])
    );
    res.json(changedFiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
