import Chessboard from "./Chessboard";
import GameMoves from "./GameMoves";
import { useChessGame } from "../context/ChessGameContext";

const PlayContent = () => {
    const { game, board, socketRef, userColor, isGameActive } = useChessGame();

    return (
        <div className="min-h-4/5 sm:w-5/6 flex flex-col sm:flex-row justify-between items-center py-6">
            <Chessboard
                size="large"
                game={game}
                board={board}
                socket={socketRef}
                userColor={userColor}
                isGameActive={isGameActive}
            />
            <GameMoves game={game} board={board} isGameActive={isGameActive} />

            {/* <div className="h-full w-1/5 border flex flex-col justify-center items-center gap-5">
                <GameControls game={game} setBoard={setBoard} />
            </div> */}
        </div>
    );
};

export default PlayContent;
