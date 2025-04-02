import { useNavigate } from "react-router-dom";
import { useCreateGame, useJoinRandomGame } from "../api/queries";

const Play = () => {
    const navigate = useNavigate();
    const { refetch: createGameRefetch } = useCreateGame();
    const { refetch: joinGameRefetch } = useJoinRandomGame();

    const handleCreateGame = async () => {
        const { data } = await createGameRefetch();
        const gameId = data?.data?.data?.arena?.gameId;
        gameId && navigate(`/game/ongoing/${gameId}`);
    };

    const handleJoinGame = async () => {
        const { data } = await joinGameRefetch();
        const gameId = data?.data?.data?.arena?.gameId;
        gameId && navigate(`/game/ongoing/${gameId}`);
    };

    return (
        <div className="h-full w-full flex justify-center items-center gap-10 font-serif text-2xl">
            <button
                className="border px-4 py-2 rounded-md"
                onClick={handleCreateGame}
            >
                Create Game
            </button>

            <button
                className="border px-4 py-2 rounded-md"
                onClick={handleJoinGame}
            >
                Join Random
            </button>
        </div>
    );
};

export default Play;
