import multer from "multer";
import { AVATAR_TEMP_PATH } from "../constants.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${AVATAR_TEMP_PATH}`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

export default upload;
