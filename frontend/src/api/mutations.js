import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
    changeAvatar,
    changePassword,
    loginUser,
    logoutUser,
    registerUser,
} from "../services/axios";
import { loginFailure, loginSuccess, logoutSuccess } from "../store/authSlice";
import { persistor } from "../store/store";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (userData) => await registerUser(userData),
        onSuccess: (res) => {
            console.log("Registration successful:", res.data);
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            console.error(
                "Registration failed:",
                err.response?.data?.message || err.message,
            );
        },
    });
};

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (credentials) => await loginUser(credentials),
        onSuccess: (res) => {
            console.log("Login successful:", res.data);
            dispatch(loginSuccess({ user: res.data.data.username }));
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.error(
                "Login failed:",
                err.response?.data?.message || err.message,
            );
            dispatch(
                loginFailure({ errorMessage: err.response?.data?.message }),
            );
        },
    });
};

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => await logoutUser(),
        onSuccess: () => {
            console.log("Logout successful");
            dispatch(logoutSuccess());
            persistor.purge();
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            console.error(
                "Logout failed:",
                err.response?.data?.message || err.message,
            );
        },
    });
};

const useChangePassword = () => {
    return useMutation({
        mutationFn: async (passwordData) => await changePassword(passwordData),
        onSuccess: (res) => {
            console.log("Password changed successfully:", res.data);
        },
        onError: (err) => {
            console.error(
                "Password change failed:",
                err.response?.data?.message || err.message,
            );
        },
    });
};

const useChangeAvatar = () => {
    return useMutation({
        mutationFn: async (avatarData) => await changeAvatar(avatarData),
        onSuccess: (res) => {
            console.log("Avatar changed successfully:", res.data);
        },
        onError: (err) => {
            console.error(
                "Avatar change failed:",
                err.response?.data?.message || err.message,
            );
        },
    });
};

export { useRegister, useLogin, useLogout, useChangePassword, useChangeAvatar };
