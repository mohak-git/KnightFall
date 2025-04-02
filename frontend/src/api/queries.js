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

const useGetProfile = (username) => {
    return useQuery({
        queryKey: ["profile", username],
        queryFn: async () => await getUser(username),
    });
};

const useRefreshTokens = () => {
    return useQuery({
        queryKey: "tokens",
        queryFn: async () => await refreshUserTokens(),
        enabled: false,
    });
};

const useGetGames = (username) => {
    return useQuery({
        queryKey: ["allGames", username],
        queryFn: async () => await getUserGames(username),
    });
};

const useCreateGame = () => {
    return useQuery({
        queryKey: ["newGame"],
        queryFn: async () => await createGame(),
        enabled: false,
    });
};

const useJoinRandomGame = () => {
    return useQuery({
        queryKey: ["joinGame"],
        queryFn: async () => await joinRandomGame(),
        enabled: false,
    });
};

const useGetGame = (gameId) => {
    return useQuery({
        queryKey: ["game", gameId],
        queryFn: async () => await getCurrentGame(gameId),
        enabled: false,
        retry: false,
    });
};

const useGetLastGame = () => {
    return useQuery({
        queryKey: ["lastGame"],
        queryFn: async () => await getLastGame(),
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
