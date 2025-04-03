import { useQuery } from "@tanstack/react-query";
import {
    createGame,
    getCurrentGame,
    getLastGame,
    getUser,
    getUserGames,
    joinRandomGame,
    refreshUserTokens,
} from "../services/axios";
import { toast } from "react-toastify";

const useGetProfile = (username) => {
    return useQuery({
        queryKey: ["profile", username],
        queryFn: () => getUser(username),
    });
};

const useRefreshTokens = () => {
    return useQuery({
        queryKey: "tokens",
        queryFn: () => refreshUserTokens(),
        enabled: false,
    });
};

const useGetGames = (username) => {
    return useQuery({
        queryKey: ["allGames", username],
        queryFn: () => getUserGames(username),
    });
};

const useCreateGame = () => {
    return useQuery({
        queryKey: ["newGame"],
        queryFn: () => {
            return toast.promise(createGame(), {
                pending: "Creating a new game...",
                success: "Game created successfully!",
                error: "Failed to create game!",
            });
        },
        enabled: false,
    });
};

const useJoinRandomGame = () => {
    return useQuery({
        queryKey: ["joinGame"],
        queryFn: () => {
            return toast.promise(joinRandomGame(), {
                pending: "Joining a random game...",
                success: "Game joined successfully!",
                error: {
                    render({ data }) {
                        return data?.response?.data?.message;
                    },
                },
            });
        },
        enabled: false,
    });
};

const useGetGame = (gameId) => {
    return useQuery({
        queryKey: ["game", gameId],
        queryFn: () => getCurrentGame(gameId),
        enabled: false,
        retry: false,
    });
};

const useGetLastGame = () => {
    return useQuery({
        queryKey: ["lastGame"],
        queryFn: () => getLastGame(),
    });
};

export {
    useGetProfile,
    useRefreshTokens,
    useGetGames,
    useCreateGame,
    useJoinRandomGame,
    useGetGame,
    useGetLastGame,
};
