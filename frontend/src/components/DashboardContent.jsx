import Chessboard from "./Chessboard";
import UserProfile from "./UserProfile";
import UserGames from "./UserGames";
import UserGameMoves from "./UserGameMoves";
import { useGame } from "../context/GameContext";

const DashboardContent = ({ profile }) => {
    const { pgn, game, board, setBoard } = useGame();

    return (
        <div className="h-full w-full flex justify-center items-center pt-10 px-4 gap-10">
            <aside
                className={`h-[95%] font-serif flex ${
                    pgn ? "flex-col w-[25%] gap-2" : "w-full gap-10"
                }`}
            >
                <UserProfile profile={profile} />
                <UserGames />
            </aside>
            {pgn && (
                <main className="w-3/4 h-[95%] grid grid-cols-3 grid-rows-4 overflow-hidden place-items-center border rounded-lg shadow-md">
                    <div className="h-full w-full row-start-1 row-end-4 col-start-1 col-end-3 flex justify-center items-center overflow-hidden">
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
