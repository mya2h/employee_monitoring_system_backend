const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// routes
router.get("/get/:id", categoryController.findById);
router.get("/get", categoryController.findAll);
router.post("/register", categoryController.registerCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);


module.exports = router;
