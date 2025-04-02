import { useGame } from "../context/GameContext";

const UserGameMoves = () => {
    const { pgn } = useGame();

    return (
        <div className="h-full w-full flex flex-col items-center p-2">
            <span className="font-serif text-2xl [text-shadow:_2px_2px_2px_rgb(0_125_125)]">
                Moves
            </span>
            <ul className="w-full flex flex-col gap-2 text-sm">
                {pgn.split("\n").map((move, i) => (
                    <li key={i}>{move}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserGameMoves;
