import MyChess from "../services/MyChess.js";
import MyError from "./error.js";

class ActiveRooms {
    constructor() {
        this.rooms = new Map();
    }

    roomExists(gameId) {
        return this.rooms.has(gameId);
    }

    addRoom(gameId) {
        if (this.roomExists(gameId))
            throw new MyError(409, `Room already exists.`);

        this.rooms.set(gameId, {
            white: null,
            black: null,
            chess: new MyChess(),
        });
    }

    getRoom(gameId) {
        if (!this.roomExists(gameId)) throw new MyError(404, `Room not found.`);

        return this.rooms.get(gameId);
    }

    removeRoom(gameId) {
        if (!this.roomExists(gameId)) throw new MyError(404, `Room not found.`);

        this.rooms.delete(gameId);
    }

    getAllRooms() {
        return [...this.rooms];
    }

    addPlayer(gameId, player) {
        if (!this.roomExists(gameId)) this.addRoom(gameId);

        const room = this.getRoom(gameId);

        if (room.white === null) room.white = player;
        else if (room.black === null) room.black = player;
        else throw new MyError(403, "Room is full.");

        return room;
    }

    removePlayer(gameId, player) {
        const room = this.getRoom(gameId);

        if (room.white !== player && room.black !== player)
            throw new MyError(403, "Player not found in room.");

        room.white === player ? (room.white = null) : (room.black = null);
        if (!room.white && !room.black) this.removeRoom(gameId);

        return room;
    }

    getPlayerColor(gameId, player) {
        const room = this.getRoom(gameId);
        if (room.white === player) return "white";
        else if (room.black === player) return "black";
        else throw new MyError(403, "Player not found in room.");
    }
}

export default ActiveRooms;
