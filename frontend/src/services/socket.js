import { io } from "socket.io-client";

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

    socket.once("connect", () => socket.emit("joinRoom"));

    // socket.on("disconnect", () => console.log("Disconnected from the server"));
    // socket.on("message", (msg) => console.log("Message:", msg));
    // socket.on("error", (err) => console.log("Error:", err));
    // socket.on("success", (suc) => console.log("Success:", suc));
    // socket.on("gameNotStarted", (err) => console.log("Error : ", err));

    socket.on("connect_error", (err) => console.log("Connection error:", err));
    socket.on("socket_error", (err) => console.log("Server error:", err));
    socket.on("opponentJoined", () => setOpponentJoined(true));
    socket.on("opponentLeft", () => {
        console.log("Your opponent left the game. You won!");
        setIsGameActive(false);
    });

    socket.on("validatedMove", ({ data }) => {
        const appliedMove = game.move(data.move);
        if (appliedMove) setBoard(game.board());
        else console.error("Failed to apply move:", data);

        if (game.isGameOver()) setIsGameActive(false);
    });

    socket.on("gameOver", () => socket.disconnect());

    return socket;
};
