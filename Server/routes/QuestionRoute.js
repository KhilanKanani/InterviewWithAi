const express = require("express");
const router = express.Router();
const FindCurrentUser = require("../middleware/FindCurrentUser");
const GenerateQuestion = require("../controller/GenerateQuestion");
const GenerateSummary = require("../controller/GenerateSummary");

router.get("/generate/:id", FindCurrentUser, GenerateQuestion);
router.put("/generateSummary/:id", FindCurrentUser, GenerateSummary);

module.exports = router;  