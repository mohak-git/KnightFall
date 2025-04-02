import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { socketInitializationAndHandling } from "../services/socket";

const ChessGameContext = createContext();

export const ChessGameProvider = ({ gameId, children }) => {
    const [userColor, setUserColor] = useState(null);
    const gameRef = useRef(new Chess());
    const [board, setBoard] = useState(gameRef.current.board());
    const socketRef = useRef(null);
    const [opponentJoined, setOpponentJoined] = useState(false);
    const [isGameActive, setIsGameActive] = useState(true);

    useEffect(() => {
        socketRef.current = socketInitializationAndHandling(
            gameRef.current,
            gameId,
            setBoard,
            setOpponentJoined,
            setIsGameActive,
        );

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [gameId]);

    const value = {
        game: gameRef.current,
        board,
        setBoard,
        userColor,
        setUserColor,
        socketRef,
        opponentJoined,
        setOpponentJoined,
        isGameActive,
        setIsGameActive,
    };

    return (
        <ChessGameContext.Provider value={value}>
            {children}
        </ChessGameContext.Provider>
    );
};

export const useChessGame = () => useContext(ChessGameContext);
