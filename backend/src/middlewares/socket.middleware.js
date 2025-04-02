import Game from "../models/game.model.js";
import User from "../models/user.model.js";
import { socketAuthWrapper } from "../utils/errorWrapper.js";
import MyError from "../utils/error.js";
import MyResponse from "../utils/response.js";
import jwt from "jsonwebtoken";

const verifyCredentials = socketAuthWrapper(async (socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    const accessToken = cookies
        ?.split(";")
        ?.find((cookie) => cookie.includes("access_token"))
        ?.split("=")[1];

    if (!accessToken)
        return next(
            new MyError(
                401,
                "Access denied! No valid access token found in cookies.",
            ),
        );

    const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
    );

    if (!decodedAccessToken)
        return next(new MyError(500, "Failed to verify access token!"));

    const user = await User.findById(decodedAccessToken?._id);
    if (!user)
        return next(new MyError(403, "Access denied! Invalid access token."));

    socket.user = user;

    socket.emit(
        "success",
        new MyResponse(200, "Access granted!", { user: user.sanitize() }),
    );
    next();
});

const verifyGameDetails = socketAuthWrapper(async (socket, next) => {
    const userId = socket.user._id;
    const gameId = socket.handshake.query.gameId;

    socket.gameId = gameId;

    const game = await Game.findById(gameId);

    if (!game) return next(new MyError(404, "Game not found."));

    if (!game.white.equals(userId) && !game.black.equals(userId))
        return next(
            new MyError(
                403,
                "Access denied! You are not a participant in this game.",
            ),
        );

    if (game.white.equals(userId)) socket.gameRole = "white";
    else socket.gameRole = "black";

    socket.emit(
        "success",
        new MyResponse(200, "Game details verified.", { game }),
    );
    next();
});

export { verifyCredentials, verifyGameDetails };
