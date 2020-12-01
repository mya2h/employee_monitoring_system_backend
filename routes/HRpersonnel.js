const express = require("express");
const router = express.Router();
const HRController = require("../controller/HRpersonnel");

// routes
// router.get("/get/:id", deviceController.findById);
// router.get("/get/:deviceName", deviceController.findByDeviceName);
router.get("/get", HRController.findAll);
router.post("/register", HRController.register);
router.put("/activate/:id",HRController.activate);
router.put("/deactivate/:id",HRController.deactivate);



module.exports = router;
