import MyError from "./error.js";

class allAvailableArena {
    constructor() {
        this.arenas = [];
    }

    arenaExists(gameId) {
        return this.arenas.some(
            (arena) => arena.gameId.toString() === gameId.toString(),
        );
    }

    getArena(gameId) {
        return this.arenas.find(
            (arena) => arena.gameId.toString() === gameId.toString(),
        );
    }

    removeArena(gameId) {
        this.arenas = this.arenas.filter(
            (arena) => arena.gameId.toString() !== gameId.toString(),
        );
        return true;
    }

    getAllArenas() {
        return this.arenas;
    }

    createArena(gameId, player) {
        if (this.arenaExists(gameId)) {
            throw new MyError(
                400,
                `Arena for game ID ${gameId} already exists.`,
            );
        }

        const arena = {
            gameId,
            players: [player],
        };

        this.arenas.push(arena);
        return arena;
    }

    joinArena(gameId, player) {
        if (!this.arenaExists(gameId)) {
            throw new MyError(404, `No arena found for game ID ${gameId}.`);
        }

        const arena = this.getArena(gameId);

        if (arena.players.length === 2) {
            throw new MyError(400, "Arena is full.");
        }

        arena.players.push(player);
        return arena;
    }

    joinRandomArena(player) {
        const availableArenas = this.arenas.filter(
            (arena) => arena.players.length < 2,
        );

        if (availableArenas.length === 0) {
            throw new MyError(
                404,
                "No available arenas. Please create a new game.",
            );
        }

        const randomArena =
            availableArenas[Math.floor(Math.random() * availableArenas.length)];

        randomArena.players.push(player);
        return randomArena;
    }
}

export default allAvailableArena;
