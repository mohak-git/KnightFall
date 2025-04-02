import { Router } from "express";
import {
    getUserProfile,
    loginUser,
    registerNewUser,
    logoutUser,
    refreshUserTokens,
    changeAvatar,
    changePassword,
    getUserGames,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/u/:username").get(getUserProfile);

router.route("/register").post(upload.single("avatar"), registerNewUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyAccessToken, logoutUser);

router.route("/refresh-tokens").get(refreshUserTokens);

router.route("/change-password").patch(verifyAccessToken, changePassword);

router
    .route("/change-avatar")
    .patch(verifyAccessToken, upload.single("avatar"), changeAvatar);

router.route("/u/:username/games").get(verifyAccessToken, getUserGames);

export default router;
