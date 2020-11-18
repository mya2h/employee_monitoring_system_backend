const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// routes
router.post("/authenticate", userController.login);
router.post("/register", userController.register);
router.get("/logout", userController.logout);
router.get("/forgot", userController.getForgot);
router.post("/forgot", userController.forgot);
router.get("/reset/:token", userController.getresetwithtoken );
router.post("/reset/:token", userController.postresetwithtoken );
// router.delete("/:id", userController._delete);

module.exports = router;
