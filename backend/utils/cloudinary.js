const cloudinary = require('cloudinary');
const fs = require("fs")
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder
        })
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

module.exports = uploadOnCloudinary