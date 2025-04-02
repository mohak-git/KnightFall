import mongoose from "mongoose";

const MoveSchema = new mongoose.Schema(
    {
        move: {
            type: String,
        },
        fen: {
            type: String,
        },
    },
    { _id: false },
);

const GameSchema = new mongoose.Schema(
    {
        white: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        black: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "ongoing", "draw", "white wins", "black wins"],
            default: "pending",
        },
        moves: [MoveSchema],
    },
    { timestamps: true },
);

GameSchema.methods.changeStatus = async function (status) {
    this.status = status;
    await this.save();
    return this;
};
GameSchema.methods.addMove = async function (move, fen) {
    this.moves.push({ move, fen });
    await this.save();
    return true;
};

GameSchema.methods.exportPGN = function () {
    const PGN = this.moves
        .map((moveObj, index) =>
            index % 2 === 0
                ? `${Math.floor(index / 2) + 1}.${moveObj.move}`
                : moveObj.move,
        )
        .join(" ");
    return PGN;
};

const Game = mongoose.model("Game", GameSchema);

export default Game;
