import { io } from "socket.io-client";
import { toast } from "react-toastify";

export const socketInitializationAndHandling = (
    game,
    gameId,
    setBoard,
    setOpponentJoined,
    setIsGameActive,
) => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const socket = io(`${serverURL}/game`, {
        query: { gameId },
        withCredentials: true,
    });

    socket.on("connect_error", (err) => {
        console.log(err);

        toast.error("Failed to connect to the server.");
    });

    socket.on("socket_error", () =>
        toast.error("Failed to connect to the server."),
    );

    socket.once("connect", () => socket.emit("joinRoom"));

    socket.on("gameNotStarted", () =>
        toast.error("Game not started. Please wait for your opponent."),
    );

    socket.on("opponentJoined", ({ message }) => {
        toast.info(message);
        setOpponentJoined(true);
    });

    // socket.on("message", (msg) => console.log("Message:", msg));
    // socket.on("error", (err) => console.log("Error:", err));
    // socket.on("success", (suc) => console.log("Success:", suc));

    socket.on("validatedMove", ({ data }) => {
        const appliedMove = game.move(data.move);
        if (appliedMove) setBoard(game.board());
        else console.error("Failed to apply move:", data);

        if (game.isGameOver()) setIsGameActive(false);
    });

    socket.on("opponentLeft", () => {
        toast.info("Your opponent left the game. You won!");
        setIsGameActive(false);
    });

    socket.on("gameOver", () => {
        toast.info("Game over!");
        socket.disconnect();
    });

    socket.on("disconnect", () => toast.info("Disconnected from the server."));
    return socket;
};
