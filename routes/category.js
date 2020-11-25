const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// routes
router.get("/get/:id", categoryController.findById);
router.get("/get", categoryController.findAll);
router.post("/register", categoryController.register);
router.put("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.delete);



module.exports = router;
