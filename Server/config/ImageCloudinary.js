const cloudinary = require('cloudinary').v2;
const fs = require("fs");
const path = require("path");

// Configuration
cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.CLOUD_API_KEY}`,
    api_secret: `${process.env.CLOUD_API_SECRET}`
});

const UploadOnCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",  // important for PDF/DOC
        });
        // fs.unlinkSync(filePath);
        return result.secure_url;
    }

    catch (err) {
        fs.unlinkSync(filePath);
        console.error("UploadOnCloudinary Error:", err.message);
        throw err;
    }
};


module.exports = UploadOnCloudinary;