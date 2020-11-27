const express = require("express");
const router = express.Router();
const NotTrackController = require("../controller/notTrack");

router.get("/get", NotTrackController.findAll);
router.get("/get/:id",NotTrackController.getById);
router.post("/register", NotTrackController.register);
router.delete("/delete/:id",NotTrackController.delete);



module.exports = router;
