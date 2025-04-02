import { useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const GameMoves = ({ game, board, isGameActive }) => {
    const gameHistory = useMemo(() => game.history(), [board]);
    const moveListRef = useRef(null);

    useEffect(() => {
        if (moveListRef.current)
            moveListRef.current.scrollTop = moveListRef.current.scrollHeight;
    }, [gameHistory]);

    return (
        <div className="h-140 w-1/3 border rounded flex flex-col p-6 overflow-y-scroll">
            <h2 className="text-2xl font-semibold border-b pb-2">Game Moves</h2>

            {gameHistory?.length ? (
                <ul ref={moveListRef} className="overflow-y-auto">
                    {gameHistory.map((move, i) =>
                        i % 2 === 0 ? (
                            <li key={i} className="p-2 flex">
                                <span className="font-bold mr-2">
                                    {i / 2 + 1}.
                                </span>
                                <span className="mr-4">{move}</span>
                                {gameHistory[i + 1] && (
                                    <span>{gameHistory[i + 1]}</span>
                                )}
                            </li>
                        ) : null,
                    )}
                </ul>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p>No moves made yet.</p>
                </div>
            )}
            {!isGameActive && (
                <Link
                    to={"/"}
                    replace
                    className="border rounded-md mt-4 py-2 px-4"
                >
                    Go To Dashboard
                </Link>
            )}
        </div>
    );
};

export default GameMoves;
