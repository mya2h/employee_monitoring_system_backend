const express = require("express");
const router = express.Router();
const deviceController = require("../controller/device");

// routes
router.get("/get/:id", deviceController.findById);
router.get("/get/:deviceName", deviceController.findByDeviceName);
router.get("/get", deviceController.findAll);
router.post("/register", deviceController.register);



module.exports = router;
