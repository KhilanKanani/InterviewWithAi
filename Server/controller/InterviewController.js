const ExtractResumeData = require("../config/ExtractResume");
const UploadOnCloudinary = require("../config/ImageCloudinary");
const Interview = require("../model/Interview");

const ResumeUpload = async (req, res) => {
    try {
        const id = req.userId;

        const allInterviews = await Interview.find({ userId: id });

        // If the user has previous interviews
        if (allInterviews && allInterviews.length > 0) {
            // Check if all interviews are completed
            const allCompleted = allInterviews.every(interview => interview.completed === true);

            if (!allCompleted) {
                // There is at least one pending interview
                return res.status(400).json({
                    success: false,
                    message: "Some interviews are still pending. Complete them before starting a new one.",
                });
            }
        }

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Upload to Cloudinary
        let resume = await UploadOnCloudinary(req.file.path);

        // Extract info
        const extracted = await ExtractResumeData(req.file.path);

        const updatedUser = new Interview({ userId: req.userId, resume, ...extracted, });
        await updatedUser.save();

        return res.status(200).json({
            success: true,
            message: "Resume uploaded & parsed successfully",
            user: updatedUser,
        });
    }

    catch (err) {
        console.error("ResumeUploader Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
        });
    }
};

const FindCandidateDetails = async (req, res) => {
    try {
        const userId = req.params.id;

        const findUser = await Interview.findById(userId);

        if (!findUser) {
            return res.status(500).json({
                sucess: false,
                message: "InterviewData Not Found..."
            })
        }

        return res.status(200).json({
            success: true,
            user: findUser
        })
    }

    catch (err) {
        console.log("FindCandidate Details Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const EditInterviewDetails = async (req, res) => {
    try {
        const { title, name, email, phone } = req.body;

        const findUser = await Interview.findByIdAndUpdate(req.params.id, { title, name, email, phone }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Update Interview Details...",
            user: findUser,
        });
    }

    catch (err) {
        console.error("EditInterviewDetails Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const History = async (req, res) => {
    try {
        const id = req.params.id;

        const history = await Interview.find({ userId: id }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            history
        });
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

const GetAllInterview = async (req, res) => {
    try {
        // $ne Means "NotEqualTo" => Current Id Je Login Chhe Eni Sivay Na Badha User Show Thase
        let AllUser = await Interview.find({ userId: { $ne: req.userId } });

        return res.status(200).json({
            success: true,
            user: AllUser
        });
    }

    catch (err) {
        console.log("GetOtherUser Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const saveGenerateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { answers, score } = req.body;

        // Find the interview by ID
        const interview = await Interview.findById(id);
        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        // Map answers to interviewHistory format
        interview.interviewHistory = answers.map(a => ({
            question: a.question,
            answer: a.answer,
        }));

        interview.score = score;
        interview.completed = true; // mark as completed
        await interview.save();

        return res.status(200).json({
            success: true,
            message: "Interview data saved successfully",
            data: interview,
        });
    }

    catch (err) {
        console.log("SaveGenerateData Error:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = { ResumeUpload, FindCandidateDetails, EditInterviewDetails, History, GetAllInterview, saveGenerateData };
