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
                className="border-2 h-120 w-100 md:w-120 flex flex-col items-center justify-center gap-5"
                onSubmit={handleSubmit}
            >
                <div className="h-1/6 w-3/5 flex justify-center items-center text-3xl">
                    Login
                </div>
                <div
                    className="h-1/2 md:w-3/5 flex flex-col justify-evenly *:flex *:items-center *:justify-between gap-3
            "
                >
                    <label>
                        Username :
                        <input
                            type="text"
                            name="username"
                            className="border h-8 p-2 rounded-[5px]"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Password :
                        <input
                            type="password"
                            name="password"
                            className="border h-8 p-2 rounded-[5px]"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <div className="w-3/5 place-self-center justify-center!">
                        <button
                            type="submit"
                            className="border px-2 py-1 rounded-full"
                            disabled={loginMutation.isPending}
                        >
                            Login
                        </button>
                    </div>
                </div>

                <div className="text-xs">
                    Not registered?
                    <Link
                        to="/register"
                        className="text-lg px-2 rounded-full hover:text-sky-400 transition-all duration-300"
                    >
                        <em>Register</em>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
