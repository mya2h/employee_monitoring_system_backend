const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category");

// routes
router.get("/get/:id", categoryController.findMemberById);
router.get("/getByCategory/:categoryId", categoryController.findMemberByCategoryId);
router.get("/get", categoryController.findMemberAll);
router.post("/register/:id", categoryController.registerMember);
router.put("/update/:id", categoryController.updateMember);
router.delete("/delete/:id", categoryController.deleteMember);





module.exports = router;
