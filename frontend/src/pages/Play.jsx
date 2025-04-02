import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetGame } from "../api/queries";
import { ChessGameProvider, useChessGame } from "../context/ChessGameContext";
import PlayContent from "../components/PlayContent";

const PlayWrapper = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { refetch } = useGetGame(gameId);
    const { setUserColor, opponentJoined } = useChessGame();

    useEffect(() => {
        const validateGame = async () => {
            const { data } = await refetch();
            if (!data) {
                navigate("/error");
                return;
            }
            setUserColor(data?.data?.data?.color);
        };

        if (gameId) validateGame();
        else navigate("/error");
    }, [gameId, refetch, navigate, setUserColor]);

    return opponentJoined ? (
        <PlayContent />
    ) : (
        <div className="animate-bounce text-3xl font-serif">Waiting for opponent...</div>
    );
};

const Play = () => {
    const { gameId } = useParams();

    return (
        <ChessGameProvider gameId={gameId}>
            <PlayWrapper />
        </ChessGameProvider>
    );
};

export default Play;
