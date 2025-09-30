const express = require("express");
const router = express.Router();
const FindCurrentUser = require("../middleware/FindCurrentUser");
const ResumeMulter = require("../middleware/ResumeMulter");
const { ResumeUpload, FindCandidateDetails, EditInterviewDetails, History, GetAllInterview, saveGenerateData } = require("../controller/InterviewController");

router.put("/upload", FindCurrentUser, ResumeMulter, ResumeUpload);
router.get("/details/:id", FindCurrentUser, FindCandidateDetails);
router.put("/editDetails/:id", FindCurrentUser, EditInterviewDetails);
router.get("/history/:id", FindCurrentUser, History);
router.get("/otherUser", FindCurrentUser, GetAllInterview);
router.put("/savedata/:id", FindCurrentUser, saveGenerateData);

module.exports = router;  