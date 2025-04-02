import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     },
// );

const getUser = (username) => {
    return api.get(`/user/u/${username}`);
};

const registerUser = (userData) => {
    return api.post("/user/register", userData);
};

const loginUser = (credentials) => {
    return api.post("/user/login", credentials);
};

const logoutUser = () => {
    return api.post("/user/logout");
};

const refreshUserTokens = () => {
    return api.get("/user/refresh-tokens");
};

const changePassword = (passwordData) => {
    return api.patch("/user/change-password", passwordData);
};

const changeAvatar = (avatarData) => {
    return api.patch("/user/change-avatar", avatarData);
};

const getUserGames = (username) => {
    return api.get(`/user/u/${username}/games`);
};

const createGame = () => {
    return api.get("/game/create");
};

const joinRandomGame = () => {
    return api.get(`/game/joinRandom`);
};

const getCurrentGame = (gameId) => {
    return api.get(`/game/ongoing/${gameId}`);
};

const getLastGame = () => {
    return api.get("/game/lastGame");
};

export {
    getUser,
    registerUser,
    loginUser,
    logoutUser,
    refreshUserTokens,
    changePassword,
    changeAvatar,
    getUserGames,
    createGame,
    joinRandomGame,
    getCurrentGame,
    getLastGame,
};
