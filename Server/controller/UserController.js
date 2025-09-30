const UploadOnCloudinary = require("../config/ImageCloudinary");
const User = require("../model/UserModel");

const GetCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;

        const findUser = await User.findById(userId);

        if (!findUser) {
            return res.status(500).json({
                sucess: false,
                message: "User Not Found..."
            })
        }

        return res.status(200).json({
            success: true,
            user: findUser
        })
    }

    catch (err) {
        console.log("GetCurrentUser Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const EditProfile = async (req, res) => {
    try {
        let image;

        if (req.file) {
            image = await UploadOnCloudinary(req.file.path);
        }

        const findUser = await User.findByIdAndUpdate(req.userId, { image }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Upload Image Successful",
            user: findUser,
        });
    }

    catch (err) {
        console.error("EditProfile Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};


module.exports = { GetCurrentUser, EditProfile };