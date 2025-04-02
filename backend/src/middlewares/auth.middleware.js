import jwt from "jsonwebtoken";
import MyError from "../utils/error.js";
import User from "../models/user.model.js";
import { asyncWrapper } from "../utils/errorWrapper.js";

const verifyAccessToken = asyncWrapper(async (req, res, next) => {
    const userAccessToken = req.cookies?.access_token;

    if (!userAccessToken) {
        throw new MyError(401, "Access denied! No token provided.");
    }

    const decodedAccessToken = jwt.verify(
        userAccessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
    );

    if (!decodedAccessToken) {
        throw new MyError(500, "Failed to verify access token!");
    }

    const user = await User.findById(decodedAccessToken?._id);

    if (!user) {
        throw new MyError(403, "Access denied! Invalid token.");
    }

    req.user = user.sanitize();
    next();
});

export default verifyAccessToken;
