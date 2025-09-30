const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./Public")
    },

    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

const ImageUpload = multer({ storage });
module.exports = ImageUpload.single("image"); 