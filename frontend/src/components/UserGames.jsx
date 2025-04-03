import { useGame } from "../context/GameContext";

const UserGames = () => {
    const { games, pgn, handleGameSelection } = useGame();
    const wrapperClass = pgn ? "w-full h-100" : "w-full h-3/5 sm:w-2/3 sm:h-150";

    return (
        <div
            className={`border-t-2 rounded-t-none rounded-[20px] p-4 flex-col flex ${wrapperClass} overflow-y-scroll`}
        >
            <h1
                className={
                    pgn
                        ? "mb-4 text-center text-[25px]"
                        : "mb-4 text-center text-3xl sm:text-5xl"
                }
            >
                Games
            </h1>
            <ul className="w-full flex flex-col gap-2">
                {games.map(({ status, yourColour, opponent }, i) => {
                    const won = status.split(" ")[0] === yourColour;
                    const borderClasses =
                        i % 2
                            ? "border-b border-r border-pink-500"
                            : "border-t border-l border-purple-500";
                    const gradientClasses =
                        i % 2
                            ? "right-0 bg-gradient-to-tl from-pink-600"
                            : "left-0 bg-gradient-to-br from-purple-600";
                    return (
                        <li
                            key={i}
                            onClick={() => handleGameSelection(i)}
                            className={`relative h-10 sm:h-13 group w-full pr-4 pl-1 py-2 rounded-full overflow-hidden flex justify-between ${borderClasses} cursor-pointer`}
                        >
                            <span
                                className={`absolute ${gradientClasses} top-0 h-full w-0 group-hover:w-full transition-all duration-500`}
                            ></span>
                            <div
                                className="relative z-10 flex justify-between items-center w-full"
                                style={pgn ? { fontSize: "12px" } : {}}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={opponent.avatar}
                                        alt=""
                                        className="size-6 sm:size-10 rounded-full"
                                    />

                                    <div className="flex flex-col justify-center items-center pb-1">
                                        <span className="text-2xl leading-5">
                                            {opponent.username}
                                        </span>
                                    </div>
                                </div>
                                <span>
                                    {status.includes("wins")
                                        ? won
                                            ? "Won"
                                            : "Lost"
                                        : "Draw"}
                                </span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default UserGames;
