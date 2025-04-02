import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { DEFAULT_USER_AVATAR_FILE_PATH } from "../constants.js";

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
});

const uploadFileOnCloudinary = async (username, fileLocalPath) => {
    try {
        if (!fileLocalPath) return DEFAULT_USER_AVATAR_FILE_PATH;
        const response = await cloudinary.uploader.upload(fileLocalPath, {
            public_id: `user-avatar-${username}`,
            folder: "knightfall",
            use_filename: true,
            overwrite: true,
            transformation: [{ width: 1000, height: 1000, crop: "limit" }],
        });
        fs.unlinkSync(fileLocalPath);
        return response.url;
    } catch (error) {
        fs.unlinkSync(fileLocalPath);
        return null;
    }
};

export default uploadFileOnCloudinary;
