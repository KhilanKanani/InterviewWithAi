const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./Public")
    },

    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

const ResumeUpload = multer({ storage });
module.exports = ResumeUpload.single("resume"); 