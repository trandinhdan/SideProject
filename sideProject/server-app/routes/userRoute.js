const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/register", userController.regesterUser);
router.post("/login", userController.loginUser);

module.exports = router;

