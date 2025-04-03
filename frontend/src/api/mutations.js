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
import { toast } from "react-toastify";

const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (userData) => {
            toast.loading("Registering...");
            return registerUser(userData);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Registration successful!");
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            toast.dismiss();
            toast.error(err.response?.data?.message);
        },
    });
};

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials) => {
            toast.loading("Logging in...");
            return loginUser(credentials);
        },
        onSuccess: (res) => {
            toast.dismiss();
            toast.success(`Welcome ${res.data.data.username}!`);
            dispatch(loginSuccess({ user: res.data.data.username }));
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            toast.dismiss();
            toast.error(err.response?.data?.message);
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
        mutationFn: () => {
            toast.loading("Logging out...");
            return logoutUser();
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Logged out!");
            dispatch(logoutSuccess());
            persistor.purge();
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            toast.dismiss();
            toast.error(err.response?.data?.message);
        },
    });
};

const useChangePassword = () => {
    return useMutation({
        mutationFn: (passwordData) => {
            toast.loading("Changing password...");
            return changePassword(passwordData);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Password changed successfully!");
        },
        onError: (err) => {
            toast.dismiss();
            toast.error(err.response?.data?.message);
        },
    });
};

const useChangeAvatar = () => {
    return useMutation({
        mutationFn: (avatarData) => {
            toast.loading("Changing avatar...");
            return changeAvatar(avatarData);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Avatar changed successfully!");
        },
        onError: (err) => {
            toast.dismiss();
            toast.error(err.response?.data?.message);
        },
    });
};

export { useRegister, useLogin, useLogout, useChangePassword, useChangeAvatar };
