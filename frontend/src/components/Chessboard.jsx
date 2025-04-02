import { useState } from "react";
import { ChessPieces, coordsToSquare } from "../utils/chessUtils";

const Chessboard = ({ size, game, board, socket, userColor, isGameActive }) => {
    const [availableMoves, setAvailableMoves] = useState({
        moves: [],
        captures: [],
    });
    const [fromSquare, setFromSquare] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const boardSizeClass =
        size === "small" ? "h-112 w-112 text-4xl" : "h-132 w-132 text-5xl";

    const getSquareColor = (row, col) =>
        isGameActive
            ? (row + col) % 2 === 0
                ? "bg-gradient-to-br from-sky-200 to-sky-300"
                : "bg-gradient-to-br from-cyan-500 to-cyan-700"
            : (row + col) % 2 === 0
            ? "bg-gradient-to-br from-rose-200 to-rose-300"
            : "bg-gradient-to-br from-pink-500 to-pink-700";

    const getPieceColor = (piece) =>
        piece.color === "w"
            ? "text-white drop-shadow-md"
            : "text-black drop-shadow-md";

    const clearSelection = () => {
        setAvailableMoves({ moves: [], captures: [] });
        setFromSquare(null);
    };

    const handleSelection = (square) => {
        const moves = game.moves({ square, verbose: true });
        if (!moves.length) return false;

        const moveSquares = moves.map((m) => m.to);
        const captureSquares = moves.filter((m) => m.captured).map((m) => m.to);

        setAvailableMoves({ moves: moveSquares, captures: captureSquares });
        setFromSquare(square);
        return true;
    };

    const executeMove = (from, to) => {
        const move = { from, to };
        socket.current.emit("move", move);
        clearSelection();
    };

    const handleOnDragStart = (piece, row, col) => () => {
        if (!piece) return;
        setIsDragging(true);

        const square = coordsToSquare(row, col);
        handleSelection(square);
    };

    const handleOnDragEnd = () => setIsDragging(false);

    const handleOnDragOver = (e) => e.preventDefault();

    const handleOnDrop = (row, col) => (e) => {
        e.preventDefault();
        if (!fromSquare) return;

        const toSquare = coordsToSquare(row, col);

        if (availableMoves.moves.includes(toSquare))
            executeMove(fromSquare, toSquare);
        else {
            console.log("invalid move");
            clearSelection();
        }

        setIsDragging(false);
    };

    const onSquareClick = (row, col, piece) => {
        if (isDragging) return;
        const square = coordsToSquare(row, col);

        if (fromSquare) {
            if (availableMoves.moves.includes(square))
                executeMove(fromSquare, square);
            else if (piece && piece.color === game.turn())
                handleSelection(square);
            else clearSelection();
        } else if (piece && piece.color === game.turn())
            handleSelection(square);
    };

    return (
        <div
            className={`${boardSizeClass} grid grid-cols-8 grid-rows-8 overflow-hidden ${
                userColor === "black" && "rotate-180"
            } rounded-lg border-4 border-cyan-900/50`}
        >
            {board.map((rowArray, row) =>
                rowArray.map((piece, col) => {
                    const square = coordsToSquare(row, col);
                    const isAvailable = availableMoves.moves.includes(square);
                    const isCapture = availableMoves.captures.includes(square);
                    const squareBg = isAvailable
                        ? isCapture
                            ? "bg-gradient-to-br from-pink-500 to-red-800 animate-capture-pulse"
                            : "bg-gradient-to-br from-purple-700 to-indigo-800 animate-move-glow"
                        : getSquareColor(row, col);
                    const allChecksOkay =
                        isGameActive &&
                        piece?.color === userColor[0] &&
                        piece?.color === game.turn();
                    return (
                        <div
                            key={`${row}-${col}`}
                            className={`w-full h-full flex items-center justify-center ${squareBg} transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-inner`}
                            onDragOver={handleOnDragOver}
                            onDrop={handleOnDrop(row, col)}
                            onClick={() => onSquareClick(row, col, piece)}
                        >
                            {piece && (
                                <span
                                    draggable={allChecksOkay && isGameActive}
                                    onDragStart={
                                        allChecksOkay
                                            ? handleOnDragStart(piece, row, col)
                                            : undefined
                                    }
                                    onDragEnd={
                                        allChecksOkay
                                            ? handleOnDragEnd
                                            : undefined
                                    }
                                    className={`
                                        ${getPieceColor(piece)}
                                        ${userColor === "black" && "rotate-180"}
                                        transition-all duration-200 ease-in-out transform
                                        ${
                                            allChecksOkay &&
                                            "hover:scale-125 hover:-translate-y-2 hover:drop-shadow-xl"
                                        }
                                        ${
                                            fromSquare === square &&
                                            "animate-piece-bounce"
                                        }
                                    `}
                                >
                                    {ChessPieces[piece.type]}
                                </span>
                            )}
                        </div>
                    );
                }),
            )}

            <style>{`
                @keyframes pieceBounce {
                    0%,
                    100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-10px) scale(1.1);
                    }
                }
                @keyframes moveGlow {
                    0%,
                    100% {
                        opacity: 0.7;
                    }
                    50% {
                        opacity: 1;
                    }
                }
                @keyframes capturePulse {
                    0%,
                    100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                .animate-piece-bounce {
                    animation: pieceBounce 0.5s infinite ease-in-out;
                }
                .animate-move-glow {
                    animation: moveGlow 1s infinite ease-in-out;
                }
                .animate-capture-pulse {
                    animation: capturePulse 0.8s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Chessboard;
