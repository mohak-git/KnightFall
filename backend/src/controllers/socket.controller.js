import Game from "../models/game.model.js";
import User from "../models/user.model.js";
import MyError from "../utils/error.js";
import { socketWrapper } from "../utils/errorWrapper.js";
import MyResponse from "../utils/response.js";

const socketJoinRoom = socketWrapper(
    (socket, activeRooms, gameNamespace, disconnect) => {
        const gameId = socket.gameId;
        socket.join(gameId);
        const currRoom = activeRooms.addPlayer(gameId, socket.id);

        if (currRoom.black) {
            gameNamespace
                .to(gameId)
                .emit(
                    "opponentJoined",
                    new MyResponse(200, "Your opponent has joined the game!"),
                );
        }
    },
);

const socketMove = socketWrapper(
    async (socket, move, activeRooms, gameNamespace, disconnect) => {
        const gameId = socket.gameId;
        const chess = activeRooms.getRoom(gameId).chess;

        if (!move)
            return socket.emit("error", new MyError(400, "Invalid move."));

        const currentPlayer = activeRooms.getPlayerColor(gameId, socket.id);
        const turn = chess.turn();

        if (currentPlayer[0] !== turn) {
            return socket.emit(
                "error",
                new MyError(
                    401,
                    "It's not your turn. Please wait for your opponent to make a move.",
                ),
            );
        }

        const validatedMove = chess.validateMove(move);

        if (!validatedMove) {
            return socket.emit(
                "error",
                new MyError(400, "Invalid move. Please provide a valid move."),
            );
        }

        const game = await Game.findById(gameId);

        if (game.status === "pending") {
            return socket.emit(
                "gameNotStarted",
                new MyError(403, "Please wait for your opponent."),
            );
        }

        await game.addMove(validatedMove.san, validatedMove.after);

        gameNamespace.to(gameId).emit(
            "validatedMove",
            new MyResponse(200, "Move validated successfully.", {
                move: validatedMove,
            }),
        );

        if (chess.isGameOver()) {
            const gameStatus = chess.isDraw()
                ? "draw"
                : `${currentPlayer} wins`;
            await game.changeStatus(gameStatus);

            gameNamespace
                .to(gameId)
                .emit("gameOver", new MyResponse(200, "Game over."));
        }
    },
);

const socketDisconnect = socketWrapper(
    async (socket, activeRooms, gameNamespace, disconnect) => {
        const disconnectRoom = async (room) => {
            const sockets = await gameNamespace.in(room).fetchSockets();
            sockets.forEach((socket) => socket.disconnect());
        };

        const gameId = socket.gameId;

        if (gameId) {
            const game = await Game.findById(gameId);
            const user = await User.findById(socket.user._id);

            if (game.status === "pending") {
                await game.deleteOne();
                user.gameHistory.pull(gameId);
                await user.save();

                gameNamespace
                    .to(gameId)
                    .emit("success", new MyResponse(200, "Game cancelled."));
            } else if (game.status === "ongoing") {
                const currPlayer = activeRooms.getPlayerColor(
                    gameId,
                    socket.id,
                );
                const winner = currPlayer === "white" ? "black" : "white";

                const gameStatus = `${winner} wins`;
                await game.changeStatus(gameStatus);

                gameNamespace
                    .to(gameId)
                    .emit(
                        "opponentLeft",
                        new MyResponse(200, `${currPlayer} disconnected.`),
                    );
            }
            activeRooms.removePlayer(gameId, socket.id);
            disconnectRoom(gameId);
        }
    },
);

export { socketJoinRoom, socketMove, socketDisconnect };
