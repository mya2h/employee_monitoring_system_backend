const express = require("express");
const router = express.Router();
const userController=require("../controller/user")
const categoryController = require("../controller/category");
const deviceController=require("../controller/device")
const suspiciousController=require("../controller/suspiciousActivities")
const HRController=require("../controller/HRpersonnel")


// User Routes

router.post("/user/authenticate", userController.login);
router.post("/user/register", userController.register);
router.get("/user/logout", userController.logout);
router.get("/user/forgot", userController.getForgot);
router.post("/user/forgot", userController.forgot);
router.get("/user/reset/:token", userController.getresetwithtoken );
router.post("/user/reset/:token", userController.postresetwithtoken );

// Category Routes

router.get("/category/get/:id", categoryController.findById);
router.get("/category/get", categoryController.findAll);
//router.post("/category/register", categoryController.register);
//router.put("/category/update/:id", categoryController.update);
//router.delete("/category/delete/:id", categoryController.delete);


// Device Routes

router.get("/device/get/:id", deviceController.findById);
router.get("/device/get/:deviceName", deviceController.findByDeviceName);
router.get("/device/get", deviceController.findAll);
router.post("/device/register", deviceController.register);


// Device Users Routes


// Hr Personnel Routes

router.get("/hr/allusers", HRController.findAll);
router.post("/hr/register", HRController.register);
router.put("/hr/activate/:id",HRController.activate);
router.put("/hr/deactivate/:id",HRController.deactivate);
router.post("/signin", HRController.login);
router.post("/signup", HRController.register);
router.get("/logout", HRController.logout);
router.get("/forgot", userController.getForgot);
router.post("/forgot", userController.forgot);
router.get("/reset/:token", userController.getresetwithtoken );
router.post("/reset/:token", userController.postresetwithtoken );





module.exports= router