const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const file = require("../controller/filePath")
// routes
router.post("/signin", userController.login);
router.post("/signup", userController.registerSuperAdmin );
router.get("/logout", userController.logout);
router.get("/forgot", userController.getForgot);
router.post("/forgot", userController.forgot);
router.get("/reset/:token", userController.getresetwithtoken );
router.post("/reset/:token", userController.postresetwithtoken );
<<<<<<< HEAD
// router.get("/allusers",userController.getUsers)
=======
//router.get("/allusers",userController.getUsers)
>>>>>>> 5df5682aad8d8bbd509a9c27499c44874bb2d23b
router.get("/profile/:id",userController.profile)
// router.delete("/:id", userController._delete);

module.exports = router;
