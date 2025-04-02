import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_ROUNDS } from "../constants.js";
import jwt from "jsonwebtoken";

// Create a schema for the User model
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        avatar: {
            type: String,
        },
        gameHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Game",
            },
        ],
    },
    { timestamps: true },
);

// Hash the password before saving to the database
UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(
            this.password,
            BCRYPT_SALT_ROUNDS,
        );
        this.password = hashedPassword;
    }
});

// Compare the entered password with the hashed password in the database
UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Remove sensitive information before returning the user object
UserSchema.methods.sanitize = function () {
    const user = this.toObject();
    delete user.password;
    delete user.refreshToken;
    return user;
};

// Generate an access token for the user
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            avatar: this.avatar,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        },
    );
};

// Generate a refresh token for the user
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        },
    );
};

const User = mongoose.model("User", UserSchema);

export default User;
