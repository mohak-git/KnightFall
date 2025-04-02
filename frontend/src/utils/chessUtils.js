import { Chess } from "chess.js";

export const ChessPieces = {
    K: "♔",
    Q: "♕",
    R: "♖",
    B: "♗",
    N: "♘",
    P: "♙",
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♙",
};

export const coordsToSquare = (row, col) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    return files[col] + (8 - row);
};

export const generateGameFromMoves = (pgn = "") => {
    const chess = new Chess();
    if (pgn) chess.loadPgn(pgn);

    return chess;
};

export const formatMoves = (moves = []) =>
    moves
        .reduce((acc, move, i) => {
            if (i % 2 === 0) acc.push(`${i / 2 + 1}. ${move.move}`);
            else acc[acc.length - 1] += ` ${move.move}`;
            return acc;
        }, [])
        .join("\n");
