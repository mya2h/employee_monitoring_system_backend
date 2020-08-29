const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// routes
router.post("/authenticate", userController.login);
router.post("/register", userController.register);
// router.get("/", userController.getAll);
// router.get("/current", userController.getCurrent);
// router.get("/:id", userController.getById);
// router.put("/:id", userController.update);
// router.delete("/:id", userController._delete);

module.exports = router;
