const express = require("express");
const path = require('path');
const multer = require('multer');
const router = express.Router();
const resourceController = require("../controller/resource");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./Resources/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const uploadStorage = multer({ storage: storage })
// routes
router.get("/get/:id", resourceController.findById);
router.get("/get", resourceController.findAll);
router.post("/register", uploadStorage.single("resourcePath") , resourceController.register);
// router.put("/update/:id", resourceController.update);
// router.delete("/delete/:id", resourceController.delete);



module.exports = router;
