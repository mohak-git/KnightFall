import { useState } from "react";
import { useLogin } from "../api/mutations";
import { Link } from "react-router-dom";

const Login = () => {
    const loginMutation = useLogin();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) =>
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(credentials);
        setCredentials({ username: "", password: "" });
    };

    return (
        <div className="h-screen w-screen grid place-items-center">
            <form
                className="border-2 h-150 w-120 flex flex-col items-center justify-center gap-5"
                onSubmit={handleSubmit}
            >
                <div className="h-1/5 w-3/5 flex justify-center items-center text-3xl">
                    Login
                </div>
                <div
                    className="h-1/3 w-3/5 flex flex-col justify-evenly *:flex *:items-center *:justify-between
            "
                >
                    <label>
                        Username : {"  "}
                        <input
                            type="text"
                            name="username"
                            className="border-1 h-8 p-2 rounded-[5px]"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Password :{" "}
                        <input
                            type="password"
                            name="password"
                            className="border-1 h-8 p-2 rounded-[5px]"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="h-1/10 w-3/5 flex items-center justify-center">
                    <button
                        type="submit"
                        className="border-1 px-2 py-1 rounded-full"
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </button>
                </div>
                {loginMutation.isError && (
                    <p className="text-red-500 text-sm mt-2">
                        {loginMutation.error?.response?.data?.message ||
                            "Login failed"}
                    </p>
                )}

                <div className="border-t w-full flex items-center justify-center pt-5 gap-10">
                    <span className="text-xs">Not registered? </span>
                    <Link
                        to="/register"
                        className="border text-lg px-2 rounded-full"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
