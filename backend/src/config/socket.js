import { Server } from "socket.io";
import {
    socketDisconnect,
    socketJoinRoom,
    socketMove,
} from "../controllers/socket.controller.js";
import {
    verifyCredentials,
    verifyGameDetails,
} from "../middlewares/socket.middleware.js";
import ActiveRooms from "../utils/MyRooms.js";

const socketConnection = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true,
        },
    });

    const gameNamespace = io.of("/game");

    const activeRooms = new ActiveRooms();

    gameNamespace.use(verifyCredentials);
    gameNamespace.use(verifyGameDetails);

    gameNamespace.on("connection", (socket) => {
        socket.once("joinRoom", () =>
            socketJoinRoom(socket, activeRooms, gameNamespace, true),
        );

        socket.on("move", (move) =>
            socketMove(socket, move, activeRooms, gameNamespace, false),
        );

        socket.on("disconnect", () =>
            socketDisconnect(socket, activeRooms, gameNamespace, true),
        );
    });
};

export default socketConnection;
