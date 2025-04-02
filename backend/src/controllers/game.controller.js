import mongoose, { Types } from "mongoose";
import allAvailableArena from "../utils/availableArenas.js";
import User from "../models/user.model.js";
import Game from "../models/game.model.js";
import { asyncWrapper } from "../utils/errorWrapper.js";
import MyResponse from "../utils/response.js";
import MyError from "../utils/error.js";

const availableArenas = new allAvailableArena();

const createNewGame = asyncWrapper(async (req, res) => {
    const white = req.user._id;

    const game = await Game.create({
        white,
        black: null,
        moves: [],
    });

    if (!game) {
        throw new MyError(500, "Failed to create new game.");
    }

    const arena = availableArenas.createArena(game._id, white);

    if (!arena) {
        throw new MyResponse(500, "Failed to create new arena.");
    }

    await User.findByIdAndUpdate(white, { $push: { gameHistory: game._id } });

    return res
        .status(200)
        .json(new MyResponse(200, "New game created successfully!", { arena }));
});

const joinRandomGame = asyncWrapper(async (req, res) => {
    const black = req.user._id;

    const arena = availableArenas.joinRandomArena(black);

    if (!arena) {
        throw new MyError(404, "No available arenas.");
    }

    const game = await Game.findByIdAndUpdate(
        arena.gameId,
        { $set: { black, status: "ongoing" } },
        { new: true },
    );

    if (!game) {
        throw new MyError(500, "Failed to join random game.");
    }

    availableArenas.removeArena(arena.gameId);

    await User.findByIdAndUpdate(black, { $push: { gameHistory: game._id } });

    res.status(200).json(
        new MyResponse(200, "Joined random game successfully!", {
            arena,
        }),
    );
});

const goToActiveGame = asyncWrapper(async (req, res) => {
    const user = req.user._id;
    const gameId = req.params.gameId;

    if (!Types.ObjectId.isValid(gameId)) {
        throw new MyError(400, "Invalid game ID.");
    }

    const game = await Game.findById(gameId);

    if (!game) {
        throw new MyError(404, "Game not found.");
    }

    if (!game.white?.equals(user) && !game.black?.equals(user)) {
        throw new MyError(403, "Forbidden! You can't access this game.");
    }

    const color = game.white.equals(user) ? "white" : "black";

    if (game.status !== "ongoing" && game.status !== "pending") {
        throw new MyError(400, "Game has finished.");
    }

    return res.status(200).json(
        new MyResponse(200, "Going to active game successfully!", {
            game,
            color,
        }),
    );
});

const getLastGame = asyncWrapper(async (req, res) => {
    const userId = req.user._id;

    const games = await User.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(userId),
            },
        },
        {
            $project: {
                _id: 0,
                gameHistory: 1,
            },
        },
        {
            $unwind: "$gameHistory",
        },
        {
            $sort: {
                gameHistory: -1,
            },
        },
        {
            $limit: 1,
        },
        {
            $lookup: {
                from: "games",
                localField: "gameHistory",
                foreignField: "_id",
                as: "lastGame",
            },
        },
        {
            $unwind: "$lastGame",
        },
        {
            $project: {
                lastGame: 1,
            },
        },
    ]);

    if (!games.length) {
        throw new MyError(404, "No games found.");
    }

    const lastGame = games[0];

    return res
        .status(200)
        .json(
            new MyResponse(200, "Last game retrieved successfully!", lastGame),
        );
});

export { createNewGame, joinRandomGame, goToActiveGame, getLastGame };
