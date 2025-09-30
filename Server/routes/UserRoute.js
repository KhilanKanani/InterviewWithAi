const express = require("express");
const router = express.Router();
const FindCurrentUser = require("../middleware/FindCurrentUser");
const { GetCurrentUser, EditProfile } = require("../controller/UserController");
const ImageUpload = require("../middleware/ImageMulter");

router.get("/current", FindCurrentUser, GetCurrentUser);
router.put("/edit", FindCurrentUser, ImageUpload, EditProfile);

module.exports = router; 