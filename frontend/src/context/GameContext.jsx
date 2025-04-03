import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { generateGameFromMoves, formatMoves } from "../utils/chessUtils";
import { toast } from "react-toastify";

const GameContext = createContext();

export const GameProvider = ({ games, children }) => {
    const [pgn, setPgn] = useState("");
    const game = useMemo(() => generateGameFromMoves(pgn), [pgn]);
    const [board, setBoard] = useState(game.board());

    useEffect(() => setBoard(game.board()), [game]);

    const handleGameSelection = useCallback(
        (index) => {
            const gameDetails = games[index];
            if (!gameDetails) return;

            const gameResult =
                gameDetails.status.split(" ")[0] === gameDetails.yourColour
                    ? "won"
                    : "lost";

            toast.info(
                `You ${gameResult} against ${gameDetails.opponent.username}.`,
            );

            const moves = gameDetails.moves;
            if (moves) setPgn(formatMoves(moves));
        },
        [games],
    );

    const value = useMemo(
        () => ({
            games,
            pgn,
            game,
            board,
            setBoard,
            handleGameSelection,
            setPgn,
        }),
        [games, pgn, game, board, handleGameSelection],
    );

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
