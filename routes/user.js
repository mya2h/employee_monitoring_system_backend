const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const file = require("../controller/filePath")
// routes
router.post("/signin", userController.login);
router.post("/signup", userController.register);
router.get("/logout", userController.logout);
router.get("/forgot", userController.getForgot);
router.post("/forgot", userController.forgot);
router.get("/reset/:token", userController.getresetwithtoken );
router.post("/reset/:token", userController.postresetwithtoken );
router.get("/allusers",userController.getUsers)
router.get("/profile/:id",userController.profile)
// router.delete("/:id", userController._delete);

module.exports = router;
