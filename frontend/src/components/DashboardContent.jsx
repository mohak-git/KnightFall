import Chessboard from "./Chessboard";
import UserProfile from "./UserProfile";
import UserGames from "./UserGames";
import UserGameMoves from "./UserGameMoves";
import { useGame } from "../context/GameContext";

const DashboardContent = ({ profile }) => {
    const { pgn, game, board, setBoard } = useGame();

    return (
        <div className="h-full w-full flex flex-col sm:flex-row justify-center items-center pt-10 px-4 gap-10 transition-all duration-1500">
            <aside
                className={`h-[95%] font-serif flex flex-col transition-all duration-1500 overflow-hidden ${
                    pgn ? "hidden sm:block sm:w-[25%] gap-2" : "w-full sm:flex-row gap-10"
                }`}
            >
                <UserProfile profile={profile} />
                <UserGames />
            </aside>
            {pgn && (
                <main className="w-full sm:w-3/4 h-[95%] flex flex-col sm:grid grid-cols-3 grid-rows-4 overflow-hidden place-items-center border rounded-lg shadow-md">
                    <div className="h-full w-full row-start-1 row-end-4 col-start-1 col-end-3 flex flex-col justify-center items-center overflow-hidden">
                        <Chessboard
                            size="small"
                            game={game}
                            board={board}
                            setBoard={setBoard}
                            isGameActive={false}
                        />
                    </div>
                    <div className="h-full w-full row-start-1 row-end-5 col-start-3 col-end-4">
                        <UserGameMoves />
                    </div>
                </main>
            )}
        </div>
    );
};

export default DashboardContent;
