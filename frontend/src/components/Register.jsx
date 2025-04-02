import { useState } from "react";
import { useRegister } from "../api/mutations";
import { Link } from "react-router-dom";

const Register = () => {
    const registerMutation = useRegister();
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        avatar: null,
    });

    const handleDataChange = (e) =>
        setDetails({ ...details, [e.target.name]: e.target.value });

    const handleFileChange = (e) =>
        setDetails({ ...details, avatar: e.target.files[0] });

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append("username", details.username);
        userData.append("email", details.email);
        userData.append("password", details.password);
        userData.append("avatar", details.avatar);

        registerMutation.mutate(userData);
        setDetails({ username: "", email: "", password: "", avatar: null });
    };

    return (
        <div className="h-screen w-screen grid place-items-center">
            <form
                className="border-2 h-150 w-120 flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
            >
                <div className="h-1/7 w-3/5 flex justify-center items-center text-3xl">
                    Register
                </div>

                <div
                    className="h-1/2 w-3/5 flex flex-col justify-evenly *:flex *:items-center *:justify-between
                "
                >
                    <label>
                        Email : {"  "}
                        <input
                            type="email"
                            name="email"
                            className="border-1 h-8 p-2 rounded-[5px]"
                            value={details.email}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Username : {"  "}
                        <input
                            type="text"
                            name="username"
                            className="border-1 h-8 p-2 rounded-[5px]"
                            value={details.username}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Password :{" "}
                        <input
                            type="password"
                            name="password"
                            className="border-1 h-8 p-2 rounded-[5px]"
                            value={details.password}
                            onChange={handleDataChange}
                            required
                        />
                    </label>

                    <label>
                        Avatar :{" "}
                        <input
                            type="file"
                            name="avatar"
                            className="border-1 w-50 h-20 rounded-[5px]"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                </div>
                <div className="h-1/10 w-3/5 flex items-center justify-center">
                    <button
                        type="submit"
                        className="border-1 px-2 py-1 rounded-full"
                    >
                        {registerMutation.isPending ? "Loading..." : "Register"}
                    </button>
                </div>

                {registerMutation.isError && (
                    <p className="text-red-500 text-sm mt-2">
                        {registerMutation.error?.response?.data?.message ||
                            "Registration failed"}
                    </p>
                )}

                <div className="border-t w-full flex items-center justify-center mt-10 pt-5 gap-10">
                    <span className="text-xs">Already registered? </span>
                    <Link
                        to="/login"
                        className="border text-lg px-2 rounded-full"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
