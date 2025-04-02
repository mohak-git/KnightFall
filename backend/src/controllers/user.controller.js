import mongoose from "mongoose";
import { COOKIE_OPTIONS } from "../constants.js";
import User from "../models/user.model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import MyError from "../utils/error.js";
import MyResponse from "../utils/response.js";
import { asyncWrapper } from "../utils/errorWrapper.js";

const getUserProfile = asyncWrapper(async (req, res) => {
    const username = req.params.username;

    if (!username) {
        throw new MyError(400, "Username is required!");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new MyError(404, "User not found!");
    }

    return res
        .status(200)
        .json(new MyResponse(200, "User found!", user.sanitize()));
});

const generateTokens = async (userId) => {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const registerNewUser = asyncWrapper(async (req, res) => {
    const { username, email, password } = req.body;

    if (
        [username, email, password].some(
            (userField) => userField?.trim() === "",
        )
    ) {
        throw new MyError(400, "All fields are required!");
    }

    const userExists = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (userExists) {
        throw new MyError(409, "User already exists!");
    }

    const avatarLocalPath = req.file?.path;
    const avatar = await uploadFileOnCloudinary(username, avatarLocalPath);

    if (!avatar) {
        throw new MyError(500, "Failed to upload avatar to Cloudinary!");
    }

    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
        avatar,
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
        throw new MyError(500, "Failed to create user!");
    }

    return res
        .status(201)
        .json(
            new MyResponse(
                201,
                "User created successfully!",
                createdUser.sanitize(),
            ),
        );
});

const loginUser = asyncWrapper(async (req, res) => {
    if (req.cookies?.access_token) {
        throw new MyError(400, "Already logged in!");
    }

    const { username, password } = req.body;

    if (!username || !password) {
        throw new MyError(400, "Username and password are required!");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new MyError(404, "User not found!");
    }

    const isPasswordCorrect = await user.verifyPassword(password);

    if (!isPasswordCorrect) {
        throw new MyError(401, "Invalid credentials!");
    }

    const tokens = await generateTokens(user._id);

    if (!tokens) {
        throw new MyError(500, "Failed to generate tokens!");
    }

    return res
        .status(200)
        .cookie("access_token", tokens.accessToken, COOKIE_OPTIONS)
        .cookie("refresh_token", tokens.refreshToken, COOKIE_OPTIONS)
        .json(
            new MyResponse(
                200,
                "User logged in successfully!",
                user.sanitize(),
            ),
        );
});

const logoutUser = asyncWrapper(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    });

    return res
        .status(200)
        .clearCookie("access_token", COOKIE_OPTIONS)
        .clearCookie("refresh_token", COOKIE_OPTIONS)
        .json(new MyResponse(200, "User logged out successfully!"));
});

const refreshUserTokens = asyncWrapper(async (req, res) => {
    const userRefreshToken = req.cookies?.refresh_token;

    if (!userRefreshToken) {
        throw new MyError(401, "Unauthorized!");
    }

    const decodedToken = jwt.verify(
        userRefreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
    );

    if (!decodedToken) {
        throw new MyError(401, "Unauthorized!");
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new MyError(403, "Forbidden!");
    }

    if (userRefreshToken !== user?.refreshToken) {
        throw new MyError(403, "Forbidden!");
    }

    const tokens = await generateTokens(user._id);
    if (!tokens) {
        throw new MyError(500, "Failed to generate tokens!");
    }

    return res
        .status(200)
        .cookie("access_token", tokens.accessToken, COOKIE_OPTIONS)
        .cookie("refresh_token", tokens.refreshToken, COOKIE_OPTIONS)
        .json(
            new MyResponse(
                200,
                "User tokens refreshed successfully!",
                user.sanitize(),
            ),
        );
});

const changePassword = asyncWrapper(async (req, res) => {
    const { oldPassword, newPassword, confirmedPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmedPassword) {
        throw new MyError(400, "All fields are required!");
    }

    if (newPassword !== confirmedPassword) {
        throw new MyError(
            400,
            "New password and confirmed password do not match!",
        );
    }

    const user = await User.findById(req.user._id);
    const isPasswordCorrect = await user.verifyPassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new MyError(400, "Old password is incorrect!");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new MyResponse(200, "Password changed successfully!"));
});

const changeAvatar = asyncWrapper(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new MyError(400, "Avatar file is required!");
    }

    const avatar = await uploadFileOnCloudinary(
        req.user.username,
        avatarLocalPath,
    );

    if (!avatar) {
        throw new MyError(500, "Failed to upload avatar to Cloudinary!");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar,
            },
        },
        { new: true },
    );

    return res
        .status(200)
        .json(
            new MyResponse(
                200,
                "Avatar changed successfully!",
                user.sanitize(),
            ),
        );
});

const getUserGames = asyncWrapper(async (req, res) => {
    const username = req.params.username;

    if (req.user && username !== req.user.username) {
        throw new MyError(
            403,
            "You are not authorized to access this user's games",
        );
    }

    const userId = new mongoose.Types.ObjectId(req.user._id);

    const games = await User.aggregate([
        {
            $match: {
                username,
            },
        },
        {
            $lookup: {
                from: "games",
                localField: "gameHistory",
                foreignField: "_id",
                as: "gameHistory",
                pipeline: [
                    {
                        $addFields: {
                            yourColour: {
                                $cond: {
                                    if: { $eq: ["$white", userId] },
                                    then: "white",
                                    else: "black",
                                },
                            },
                            opponent: {
                                $cond: {
                                    if: { $eq: ["$black", userId] },
                                    then: "$white",
                                    else: "$black",
                                },
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "opponent",
                            foreignField: "_id",
                            as: "opponent",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        avatar: 1,
                                        _id: 0,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $unwind: "$opponent",
                    },
                    {
                        $project: {
                            status: 1,
                            moves: 1,
                            yourColour: 1,
                            opponent: 1,
                            _id: 0,
                        },
                    },
                ],
            },
        },
        { $project: { gameHistory: 1 } },
    ]);

    if (!games.length) {
        throw new MyError(404, "User has no games!");
    }

    return res
        .status(200)
        .json(new MyResponse(200, "User games retrieved successfully!", games));
});

export {
    getUserProfile,
    registerNewUser,
    loginUser,
    logoutUser,
    refreshUserTokens,
    changePassword,
    changeAvatar,
    getUserGames,
};
