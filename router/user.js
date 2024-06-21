const express = require("express");
const userController = require("../controler/user");

const router = express.Router();

router.post("/signin" , userController.addNewAdmin);
// router.post("/doctor/addnew" , userController.addNewDoctor);

router.post("/loginu" , userController.loginUser);

module.exports = router;