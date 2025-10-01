const express = require("express");
const router = express.Router();
const { SignUp, Login, Logout } = require("../controller/AuthController");

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);

module.exports = router;