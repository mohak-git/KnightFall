import { useGame } from "../context/GameContext";
import { Link } from "react-router-dom";
const UserGameMoves = () => {
    const { pgn } = useGame();

    return (
        <div className="sm:h-full h-75 w-full flex flex-col items-center p-2">
            <span className="font-serif text-2xl [text-shadow:_2px_2px_2px_rgb(0_125_125)]">
                Moves
            </span>
            <ul className="w-full flex flex-col gap-2 text-sm">
                {pgn.split("\n").map((move, i) => (
                    <li key={i}>{move}</li>
                ))}
            </ul>
            <Link to="/" className="text-sky-400 text-lg font-serif border px-1 rounded-sm">Go back</Link>
        </div>
    );
};

export default UserGameMoves;
